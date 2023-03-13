from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False ,unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    avatar = db.Column(db.String(200), nullable=True)
    date = db.Column(db.String(80), nullable=False)
    post = db.relationship("Post", backref="user")
    comment = db.relationship("Comment", backref="user")
    bio = db.Column(db.String(140), nullable=True, default="Reactive is awesome!")

    def __init__(self, **kwargs):
        self.username = kwargs["username"]
        self.password = kwargs["password"]
        self.email = kwargs["email"]
        self.avatar = kwargs["avatar"]
        self.date = kwargs["date"]
        self.bio = kwargs["bio"]
    
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
            "avatar" : self.avatar,
            "date": self.date,
            "bio": self.bio
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    readme = db.Column(db.String(5000), nullable=False)
    image = db.Column(db.String(200), nullable=True)
    code = db.Column(db.String(10000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    like = db.relationship("Like", backref="post")

    def __init__(self, **kwargs):
        self.title = kwargs["title"]
        self.readme = kwargs["readme"]
        self.image = kwargs["image"]
        self.code = kwargs["code"]
        self.user_id = kwargs["user_id"]
        self.date = kwargs["date"]
        self.description = kwargs["description"]
        self.category = kwargs["category"]

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
            "description": self.description,
            "category": self.category,
            "user_id": self.user.id,
            "user_username": self.user.username,
            "user_avatar": self.user.avatar
        }

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

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

    
    def serializePost(self):
        return {
            "id" : self.post.id,
            "title" : self.post.title,
            "readme" : self.post.readme,
            "image" : self.post.image,
            "code" : self.post.code,
            "date": self.post.date,
            "description": self.post.description,
            "category": self.post.category,
            "user_id": self.post.user.id,
            "user_username": self.post.user.username,
            "user_avatar": self.post.user.avatar
        }

    def serialize(self):
        return {
            "id" : self.id,
            "post_id" : self.post_id,
            "user_id" : self.user_id
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(140), nullable=False)
    date = db.Column(db.String(80), nullable=False)

    def __init__(self, **kwargs):
        self.post_id = kwargs["post_id"]
        self.user_id = kwargs["user_id"]
        self.text = kwargs["text"]
        self.date = kwargs["date"]

    @classmethod
    def create(cls, **kwargs):
        new_comment = cls(**kwargs)
        db.session.add(new_comment)
        try:
            db.session.commit()
            return new_comment
        except Exception as Error: 
            raise Exception(Error.args[0], 400)

    def serialize(self):
        return {
            "id" : self.id,
            "post_id" : self.post_id,
            "user_id" : self.user.id,
            "username" : self.user.username,
            "user_avatar": self.user.avatar,
            "text" : self.text,
            "date": self.date
        }

