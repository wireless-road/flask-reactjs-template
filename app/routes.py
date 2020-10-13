import os
from flask import jsonify

from flask import redirect, send_from_directory, render_template, url_for, flash, request
from app import app, db

@app.route('/', defaults={'path': ''})
def index():
    return jsonify({'message': 'Hello, world!'})


@app.route('/')
def root():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/index', defaults={'path': ''})
@app.route('/<path:path>')
# @login_required
def serve(path):
    # return jsonify({'path': str(path)})
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

