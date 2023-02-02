from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Board


def image_check(field):
    url = field.data

    if '.png' not in url and '.jpg' not in url and '.jpeg' not in url:
        raise ValidationError(
            'Invalid image url. Valid types include ".png, .jpg, or .jpeg"')

    if not url.startswith('https://') and not url.startswith('http://'):
        raise ValidationError(
            'Invalid image url. Must begin with "http://" or "https://"')


class BoardForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    board_image = StringField("Board Preview Image", validators=[
                              DataRequired(), image_check])
    user_id = IntegerField("User Id", validators=[DataRequired()])
