from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Board


class BoardForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    board_image = StringField("Board Preview Image",
                              validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
