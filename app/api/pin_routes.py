from flask import Blueprint, jsonify, request, redirect
from app.models import Pin, db, User
from flask_login import current_user
from ..forms import PinForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

pin_routes = Blueprint('pins', __name__)
