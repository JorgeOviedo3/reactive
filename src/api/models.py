from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False ,unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    avatar = db.Column(db.String(200), nullable=True)
    post = db.relationship("Post", backref="user")

    def __init__(self, **kwargs):
        self.username = kwargs["username"]
        self.password = kwargs["password"]
        self.email = kwargs["email"]
        self.avatar = kwargs["avatar"]
    
    @classmethod
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        db.session.add(new_user)

        try:
            db.session.commit()
            return new_user
        except Exception as Error: 
            raise Exception(Error.args[0], 400)
    
    def serialize(self):
        return {
            "id" : self.id,
            "username" : self.username,
            "email" : self.email,
            "avatar" : self.avatar
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    readme = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(200), nullable=True)
    code = db.Column(db.String(10000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.String(80), nullable=False)

    def __init__(self, **kwargs):
        self.title = kwargs["title"]
        self.readme = kwargs["readme"]
        self.image = kwargs["image"]
        self.code = kwargs["code"]
        self.user_id = kwargs["user_id"]
        self.date = kwargs["date"]

    @classmethod
    def create(cls, **kwargs):
        new_post = cls(**kwargs)
        db.session.add(new_post)

        try:
            db.session.commit()
            return new_post
        except Exception as Error: 
            raise Exception(Error.args[0], 400)

    def serialize(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "readme" : self.readme,
            "image" : self.image,
            "code" : self.code,
            "date": self.date,
            "user_id": self.user.id,
            "user_username": self.user.username,
            "user_avatar": self.user.avatar
        }

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    def __init__(self, **kwargs):
        self.post_id = kwargs["post_id"]
        self.user_id = kwargs["user_id"]

    @classmethod
    def create(cls, **kwargs):
        new_like = cls(**kwargs)
        db.session.add(new_like)
        try:
            db.session.commit()
            return new_like
        except Exception as Error: 
            raise Exception(Error.args[0], 400)

    def serialize(self):
        return {
            "id" : self.id,
            "post_id" : self.post_id,
            "user_id" : self.user_id
        }

