from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Board


class BoardForm(FlaskForm):
    name = StringField("Name")
    board_image = StringField("Board Preview Image")
    user_id = IntegerField("User Id")
