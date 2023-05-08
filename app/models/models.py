from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


followers = db.Table(
    "followers",
    db.Column("follower_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True),
)


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
    # Primaryjoin describes the join between the left table and the junction table, aka "Find all rows in the followers table where follower_id is ____"
    # Secondaryjoin describes the join between the junction table and the right table, aka "Find all rows in the followers table where followed_id is ____"
    # When querying using user.followers, it will find them using the primaryjoin to query the followers table for all rows where followed_id == user.id
    # When querying using user.followed, it will find them using the secondaryjoin to query the followers table for all rows where follower_id == user.id
    followed = db.relationship(
        'User', secondary=followers, primaryjoin=(followers.c.follower_id == id), secondaryjoin=(followers.c.followed_id == id), backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def follow(self, user):
    #     if not self.is_following(user):
    #         self.followed.append(user)

    # def unfollow(self, user):
    #     if self.is_following(user):
    #         self.followed.remove(user)

    # def is_following(self, user):
    #     return self.followed.filter(followers.c.followed_id == user.id).count() > 0

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
            'boards': [board.name for board in self.boards],
            'pins': [pin.title for pin in self.pins],
            # 'following': [{'id': following.id, 'username': following.username, 'email': following.email} for following in self.followed],
            # 'followers': [{'id': follower.id, 'username': follower.username, 'email': follower.email} for follower in self.followers]
        }

    def to_dict_follow(self):
        return {
            'following': [{'id': following.id, 'username': following.username, 'email': following.email} for following in self.followed],
            'followers': [{'id': follower.id, 'username': follower.username, 'email': follower.email} for follower in self.followers]
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
