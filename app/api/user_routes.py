from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, db
from ..forms import ProfileForm, FollowForm
from .auth_routes import validation_errors_to_error_messages


user_routes = Blueprint('users', __name__)


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


# @user_routes.route('/<int:id>/follow', methods=['POST'])
# @login_required
# def follow_user(id):
#     """
#     Initiate following a user by user id
#     """
#     form = FollowForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     follower_id = current_user.id
#     followed_id = User.query.get(id)

#     if form.validate_on_submit():
#         new_follower = User()
#         form.populate_obj(new_follower)
#         new_follower.userId = follower_id

#         db.session.add(new_follower)
#         db.session.commit()

#         return new_follower.to_dict(), 201
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow(id):
    """
    Initiate following a user by user id
    """

    follower_id = current_user.id
    followed_id = User.query.get(id)

    if not followed_id:
        return {'errors': 'User not found'}, 404

    if follower_id == followed_id:
        return {'errors': 'You cannot follow yourself'}, 400

    current_user.follow(followed_id)
    db.session.commit()
    return jsonify(current_user.to_dict())


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_profile(id):
    """
    Updating user profile details
    """
    user = User.query.get(id)

    if not user:
        return {'errors': 'Page not found'}, 401

    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.about = form.data['about']

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
