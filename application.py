from app import app, db
from app import app
from app.models import Userr


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': Userr}
