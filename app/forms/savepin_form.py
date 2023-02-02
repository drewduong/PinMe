from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Pin


class SavePinForm(FlaskForm):
    board_id = IntegerField("Board Id", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
