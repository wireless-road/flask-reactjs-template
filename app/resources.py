from flask_restful import Resource, reqparse, request
from app.models import Userr, Post, RevokedTokenModel, FlightBaggage
from email_validator import validate_email, EmailNotValidError
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, \
    get_jwt_identity, get_raw_jwt


parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required=True)
parser.add_argument('password', help = 'This field cannot be blank', required=True)

parserRegistration = reqparse.RequestParser()
parserRegistration.add_argument('username', help = 'This field cannot be blank', required=True)
parserRegistration.add_argument('password', help = 'This field cannot be blank', required=True)
parserRegistration.add_argument('email', help = 'This field cannot be blank', required=True)

class UserRegistration(Resource):
    def post(self):
        # parse POST request args
        data = parserRegistration.parse_args()

        # validate email
        try:
            valid = validate_email(data['email'])
        except EmailNotValidError as e:
            return {'message': str(e), 'status': 'Failure' }

        # check if user exists already
        if Userr.find_by_username(data['username']):
            return { 'message': 'User {} already exists'.format(data['username'])}

        user = Userr(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        try:
            user.save_to_db()
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'message': 'User {} was created'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'status': 'Success',
            }
        except Exception as e:
            return {
                'message': 'Something went wrong',
                'traceback': str(e),
                'status': 'Failure'
            }, 500

        return {'message': data}

class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()

        # check if user with given name exist
        user = Userr.find_by_username(data['username'])
        if not user:
            return {
                'message': 'Username {} not found'.format(data['username']),
                'status': 'Failure',
            }, 400

        # check if password is correct
        if not user.check_password(data['password']):
            return {
                'message': 'Wrong password',
                'status': 'Failure',
            }, 400

        access_token = create_access_token(identity=data['username'])
        refresh_token = create_refresh_token(identity=data['username'])
        return {
            'message': 'Logged in as {}'.format(user.username),
            'username': data['username'],
            'access_token': access_token,
            'refresh_token': refresh_token,
            'status': 'Success'
        }


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {
                'message': 'Access token has been revoked',
                'status': 'Success'
            }
        except:
            return {
                'message': 'Access token revoking went wrong',
                'status': 'Failure'
            }, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {
                'message': 'Refresh token has been revoked',
                'status': 'Success'
            }
        except:
            return {
                'message': 'Refresh token revoking went wrong',
                'status': 'Failure'
            }, 500


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        user = get_jwt_identity()
        access_token = create_access_token(identity=user)
        return {
            'message': 'Token refresh',
            'access_token': access_token,
            'status': 'Success'
        }


class AllUsers(Resource):
    def get(self):
        users = Userr.return_all()
        return {
            'message': users,
            'status': 'Success',
        }

    # def delete(self):
    #     return {'message': 'Delete all users'}

from config import Config

class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42,
        }


class ApiGetPosts(Resource):
    @jwt_required
    def get(self):
        username = get_jwt_identity()
        result = Post.get_all_posts(username)
        return {
                'user': str(username),
                'message': result,
                'status': 'Success'
            }

class ApiGetBaggages(Resource):
    @jwt_required
    def get(self):
        username = get_jwt_identity()
        order = request.args.get('order', None)
        last_name = request.args.get('last_name', None)
        if order and last_name:
            result = FlightBaggage.get_all_baggages(order=order, last_name=last_name)
            return {
                    'user': str(username),
                    'message': result,
                    'status': 'Success'
                }
        else:
            return {
                    'user': str(username),
                    'message': 'order number or last_name not provided',
                    'status': 'Failure'
                }
