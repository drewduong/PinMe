from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

# follows = db.Table(
#     "follows",
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
# )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    about = db.Column(db.String(255))

    boards = db.relationship('Board', back_populates='user')
    pins = db.relationship('Pin', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    '''
    Normally would return a dictionary, but we need to return JSON Object, 
    otherwise Flask converts the dictionary automatically in the frontend
    '''

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'about': self.about,
            # Add pins and board
            'boards': [board.name for board in self.boards],
            'pins': [pin.title for pin in self.pins]
        }


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    board_image = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='boards')
    pins = db.relationship('Pin', back_populates='board',
                           cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "board_image": self.board_image,
            "user_id": self.user_id,
            "user": self.user.to_dict()
        }


class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    pin_image = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('boards.id')), nullable=False)

    user = db.relationship('User', back_populates='pins')
    board = db.relationship('Board', back_populates='pins')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "pin_image": self.pin_image,
            "user_id": self.user_id,
            "board_id": self.board_id,
            "user": self.user.to_dict()
        }
