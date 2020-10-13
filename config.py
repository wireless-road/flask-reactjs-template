import os
import json
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    user = os.environ['POSTGRES_USER']
    password = os.environ['POSTGRES_PASSWORD']
    host = os.environ['POSTGRES_HOST']
    database = os.environ['POSTGRES_DB']
    port = os.environ['POSTGRES_PORT']
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    JWT_BLACKLIST_ENABLED = os.environ['JWT_BLACKLIST_ENABLED']
    JWT_BLACKLIST_TOKEN_CHECKS = json.loads(os.environ['JWT_BLACKLIST_TOKEN_CHECKS'])
