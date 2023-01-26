from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Pin


class PinForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    pin_image = StringField("Pin Preview Image", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    board_id = IntegerField("Board Id", validators=[DataRequired()])
