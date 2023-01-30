from flask import Blueprint, jsonify, request, redirect
from app.models import Pin, db, User
from flask_login import current_user
from ..forms import PinForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

pin_routes = Blueprint('pins', __name__)


@pin_routes.route('/')
def get_pins():
    pin = Pin.query.all()
    return pin.to_dict(), 200


@pin_routes.route('/current', methods=['GET'])
# Double check if needed
# @login_required
def get_board_pins():
    pins = Pin.query.filter(current_user.id == Pin.user_id).all()
    print('*****Query result***** from users pins**', pins)
    return {'pins': [pin.to_dict() for pin in pins]}, 200


@pin_routes.route('/new', methods=['POST'])
# Double check if needed
@login_required
def create_pin():
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_pin = Pin(
            title=form.data['title'],
            description=form.data['description'],
            pin_image=form.data['pin_image'],
            user_id=current_user.id,
            board_id=form.data['board_id']
        )
        print('New pin data input (route)', new_pin)

        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@pin_routes.route('/<int:id>', methods=['PUT'])
# Double check if needed
@login_required
def update_pin(id):
    pin = Pin.query.get(id)

    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pin.title = form.data['title']
        pin.description = form.data['description']
        pin.pin_image = form.data['pin_image']
        pin.board_id = form.data['board_id']
        db.session.commit()
        return pin.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@pin_routes.route('/<int:id>', methods=['DELETE'])
# Double check if needed
@login_required
def delete_pin(id):
    pin = Pin.query.get(id)

    db.session.delete(pin)
    db.session.commit()
    return jsonify('Successfully Deleted')
