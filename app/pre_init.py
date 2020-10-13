from app.models import Userr

def pre_init():
    user = Userr(username='guest', email=data['email'])
    user.set_password(data['password'])
