from flask_wtf import FlaskForm
from wtforms import StringField


class SavePinForm(FlaskForm):
    filter = StringField("Filter")
