from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__, static_folder='../static_/')

app.config.from_object(Config)

jwt = JWTManager(app)

db = SQLAlchemy(app)

migrate = Migrate(app, db)

from app import routes, models, resources

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return models.RevokedTokenModel.is_jti_blacklisted(jti)

api = Api(app)

api.add_resource(resources.UserLogin, '/auth/login')
api.add_resource(resources.UserRegistration, '/auth/registration')
api.add_resource(resources.UserLogoutAccess, '/auth/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/auth/logout/refresh')
api.add_resource(resources.TokenRefresh, '/auth/token/refresh')
api.add_resource(resources.AllUsers, '/users')
api.add_resource(resources.SecretResource, '/secret')
api.add_resource(resources.ApiGetPosts, '/api/posts')

api.init_app(app)
