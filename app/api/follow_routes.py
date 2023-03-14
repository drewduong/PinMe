from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import User, db
from ..forms import FollowForm
from .auth_routes import validation_errors_to_error_messages


follow_routes = Blueprint('follows', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_profile(id):
    """
    Updating user profile details
    """
    user = User.query.get(id)

    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.about = form.data['about']

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
