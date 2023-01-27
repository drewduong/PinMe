from flask import Blueprint, jsonify, request, redirect
from app.models import Board, db, User
from flask_login import current_user
from ..forms import BoardForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)


@board_routes.route('/current', methods=['GET'])
# Double check if needed
# @login_required
def get_user_boards():
    boards = Board.query.filter(current_user.id == Board.user_id).all()
    print('*****Query result***** from users boards**', boards)
    return {'boards': [board.to_dict() for board in boards]}, 200


@board_routes.route('/new', methods=['POST'])
# Double check if needed
@login_required
def create_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_board = Board(
            name=form.data['name'],
            board_image=form.data['board_image'],
            user_id=current_user.id
        )
        print('New board data input (route)', new_board)

        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:id>', methods=['PUT'])
# Double check if needed
@login_required
def update_board(id):
    board = Board.query.get(id)

    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board.name = form.data['name']
        board.board_image = form.data['board_image']
        db.session.commit()
        return board.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:id>', methods=['DELETE'])
# Double check if needed
@login_required
def delete_board(id):
    board = Board.query.get(id)

    db.session.delete(board)
    db.session.commit()
    return 'Successfully Deleted'
