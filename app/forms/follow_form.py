from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Pin


class FollowForm(FlaskForm):
    follower_id = IntegerField("Follower")
    followed_id = IntegerField("Following")
