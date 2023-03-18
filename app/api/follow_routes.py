from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, db
from ..forms import FollowForm
from .auth_routes import validation_errors_to_error_messages


follow_routes = Blueprint('follows', __name__)


# @follow_routes.route('/current', methods=['GET'])
# @login_required
# def get_user_followers():
#     """
#     Query for all followers and returns them in a list of followers dictionaries
#     """
#     followers = User.query.filter(current_user.id == User.followed_id).all()
#     return {'followers': [follower.to_dict() for follower in followers]}, 200


@follow_routes.route('/users/<int:id>', methods=['POST'])
@login_required
def create_following(id):
    """
    Initiate following a user
    """
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    follower_id = current_user.id
    followed_id = User.query.get(id)

    if form.validate_on_submit():
        new_follower = User()
        form.populate_obj(new_follower)
        new_follower.userId = follower_id

        db.session.add(new_follower)
        db.session.commit()

        return new_follower.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @follow_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def remove_follower(id):
#     follower = User.query.get(id)

#     db.session.delete(follower)
#     db.session.commit()
#     return jsonify('Successfully Deleted')
