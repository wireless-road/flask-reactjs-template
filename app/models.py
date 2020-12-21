from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from app import login


class Userr(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'password': x.password_hash,
                'email': x.email,
                'id': x.id
            }
        return { 'Users': list(map(lambda x: to_json(x), Userr.query.all()))}


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    body = db.Column(db.String(1400))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('userr.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)

    @classmethod
    def get_all_posts(cls, username):
        u = db.session.query(Userr).filter_by(username=username).first()
        posts = u.posts.all()
        # result = list( map( lambda x: {"id": x.id, "title": x.title, "body": x.body.replace('\n', '<br/>')}, posts) )
        result = list( map( lambda x: {"id": x.id, "title": x.title, "body": x.body}, posts) )
        return result

class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)

class Flight(db.Model):
    __tablename__ = 's7_flight'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    air_uuid = db.Column(db.String(36), unique=True)
    description = db.Column(db.String(16))

class Code(db.Model):
    __tablename__ = 's7_code'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    description = db.Column(db.String(16))

class Passanger(db.Model):
    __tablename__ = 's7_passanger'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    passport = db.Column(db.String(64))
    order = db.Column(db.String(64))

class Baggage(db.Model):
    __tablename__ = 's7_baggage'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    overweight = db.Column(db.Boolean, default=False)
    amount = db.Column(db.BigInteger)
    unit = db.Column(db.String(8))
    weight = db.Column(db.BigInteger)
    description = db.Column(db.String(256))
    registered = db.Column(db.Boolean, default=False)
    code = db.Column(db.BigInteger, db.ForeignKey('s7_code.id'), nullable=False)
    passanger_id = db.Column(db.BigInteger, db.ForeignKey('s7_passanger.id'), nullable=False)

class FlightBaggage(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    flight_id = db.Column(db.BigInteger, db.ForeignKey('s7_flight.id'), nullable=False)
    baggage_id = db.Column(db.BigInteger, db.ForeignKey('s7_baggage.id'), nullable=False)

    @classmethod
    def get_all_baggages(cls, order, last_name):
        # baggages = db.session.query(
        #     Passanger.name,
        #     Passanger.last_name,
        #     Passanger.passport,
        #     Passanger.order,
        # ).filter(db.and_(Passanger.last_name==last_name, Passanger.order==order)).all()

        baggages = db.session.query(
            Baggage.overweight.label('baggabe_overweight'),
            Baggage.amount.label('baggabe_amount'),
            Baggage.unit.label('baggabe_unit'),
            Baggage.weight.label('baggabe_weight'),
            Baggage.description.label('baggabe_description'),
            Baggage.registered.label('baggabe_registered'),
            Code.description.label('code_description'),
            Passanger.name.label('passanger_name'),
            Passanger.last_name.label('passanger_last_name'),
            Passanger.passport.label('passanger_passport'),
            Passanger.order.label('passanger_passport'),
            FlightBaggage.id.label('flight_baggage_id'),
            Flight.air_uuid.label('air_uuid')
        ).join(Code, Code.id == Baggage.code)\
            .join(Passanger, Passanger.id == Baggage.passanger_id)\
            .outerjoin(FlightBaggage, FlightBaggage.baggage_id == Baggage.id)\
            .outerjoin(Flight, Flight.id == FlightBaggage.flight_id)\
            .filter(db.and_(Passanger.last_name==last_name, Passanger.order==order)).all()

        result = list( map( lambda x: {"baggabe_overweight": x.baggabe_overweight,
                                       "baggabe_amount": x.baggabe_amount,
                                       "baggabe_unit": x.baggabe_unit,
                                       "baggabe_weight": x.baggabe_weight,
                                       "baggabe_description": x.baggabe_description,
                                       "baggabe_registered": x.baggabe_registered,
                                       "code_description": x.code_description,
                                       "passanger_name": x.passanger_name,
                                       "passanger_last_name": x.passanger_last_name,
                                       "passanger_passport": x.passanger_passport,
                                       "flight_baggage_id": x.flight_baggage_id,
                                       "air_uuid": x.air_uuid}, baggages))
        return result
