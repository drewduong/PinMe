from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Board


class ProfileForm(FlaskForm):
    first_name = StringField("First Name")
    last_name = StringField("Last Name")
    about = StringField("About Me")
