from flask import Blueprint, jsonify, request, redirect
from app.models import Board, db, User
from flask_login import current_user
from ..forms import BoardForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)
