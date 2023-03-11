"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Like, Comment
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)


#Start verify token integrity Endpoints
@api.route("/verify-token-integrity", methods=['GET'])
@jwt_required()
def verify_token_integrity():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).one_or_none()
    if user is not None:
        return jsonify(user.serialize()), 201
    else: 
        return jsonify("token is not valid"), 400
    
#End verify token integrity Endpoints

#Start User Endpoints
@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/signup', methods=['POST'])
def sign_up():
    new_user_data = request.json
    try:
        if "username" not in new_user_data or new_user_data["username"] == "":
            raise Exception("Username invalid",400)
        if "password" not in new_user_data or new_user_data["password"] == "":
            raise Exception("Password invalid",400)
        new_user = User.create(**new_user_data)
        return jsonify(new_user.serialize()), 201
    except Exception as error: 
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route("/user/<string:username_param>", methods=['GET'])
def get_user(username_param):
    user = User.query.filter_by(username = username_param).one_or_none()
    if user is not None:
        return jsonify(user.serialize()), 200
    else: 
        return jsonify("User doesn't exists"), 400

@api.route('/update-user', methods=['PUT'])
@jwt_required()
def update_user():
    new_user_data = request.json
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id = current_user_id).one_or_none()
    try:
        if "username" not in new_user_data or new_user_data["username"] == "":
            raise Exception("Username invalid", 400)
        if "password" not in new_user_data or new_user_data["password"] == "":
            raise Exception("Password invalid", 400)
        if "email" not in new_user_data or new_user_data["email"] == "":
            raise Exception("Email invalid", 400)
        if "avatar" not in new_user_data or new_user_data["avatar"] == "":
            raise Exception("Avatar invalid", 400)

        user.id = current_user_id
        user.username = new_user_data["username"]
        user.password = new_user_data["password"]
        user.email = new_user_data["email"]
        user.avatar = new_user_data["avatar"]
        db.session.commit()

        return jsonify(user.serialize()), 201
    except Exception as error: 
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500
#End User Endpoints

#Start Post Endpoints

@api.route('/create_post', methods=['POST'])
@jwt_required()
def create_post():
    current_user_id = get_jwt_identity()
    date = datetime.datetime.now()
    date = date.strftime("%d %b %Y")
    new_post_data = request.json
    new_post_data["user_id"] = current_user_id
    new_post_data["date"] = date
    try:
        if "title" not in new_post_data or new_post_data["title"] == "":
            raise Exception("title invalid",400)
        if "readme" not in new_post_data or new_post_data["readme"] == "":
            raise Exception("readme invalid",400)
        if "code" not in new_post_data or new_post_data["code"] == "":
            raise Exception("code invalid",400)
        if "description" not in new_post_data or new_post_data["description"] == "":
            raise Exception("description invalid",400)
        if "category" not in new_post_data or new_post_data["category"] == "":
            raise Exception("category invalid",400)
        new_post = Post.create(**new_post_data)
        return jsonify(new_post.serialize()), 201
    except Exception as error: 
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route('/get_posts_profile/<int:user_id_param>/<int:page_param>', methods=['GET'])
def get_posts_profile(user_id_param, page_param):
    pagination = Post.query.filter_by(user_id = user_id_param).order_by(Post.id.desc()).paginate(page=page_param, per_page=6)
    posts = []
    for post in pagination.items:
        serialize = post.serialize()
        likes = Like.query.filter_by(post_id = post.id)
        likes_count = 0
        for like in likes:
            likes_count = likes_count + 1
        comments = Comment.query.filter_by(post_id = post.id)
        comment_count = 0
        for comment in comments:
            comment_count = comment_count + 1
        serialize["likes_count"] = likes_count
        serialize["comments_count"] = comment_count
        posts.append(serialize)
    data = {}
    data["has_next"] = pagination.has_next
    data["next_page"] = pagination.next_num
    data["posts"] = posts
    return jsonify(data)

@api.route('/get_posts/<int:page_param>', methods=['GET'])
def get_posts(page_param):
    pagination = Post.query.order_by(Post.id.desc()).paginate(page=page_param, per_page=6)
    posts = []
    for post in pagination.items:
        serialize = post.serialize()
        likes = Like.query.filter_by(post_id = post.id)
        likes_count = 0
        for like in likes:
            likes_count = likes_count + 1
        comments = Comment.query.filter_by(post_id = post.id)
        comment_count = 0
        for comment in comments:
            comment_count = comment_count + 1
        serialize["likes_count"] = likes_count
        serialize["comments_count"] = comment_count
        posts.append(serialize)
    data = {}
    data["has_next"] = pagination.has_next
    data["next_page"] = pagination.next_num
    data["posts"] = posts
    return jsonify(data)

@api.route('/post/<int:id_param>')
def get_post_by_id(id_param):
    post = Post.query.filter_by(id = id_param).one_or_none()
    if post is not None:
        serialize = post.serialize()
        comments = Comment.query.filter_by(post_id = id_param).order_by(Comment.id.desc())
        comments_dic = []
        comments_count = 0
        likes = Like.query.filter_by(post_id = id_param)
        likes_count = 0
        for like in likes:
            likes_count = likes_count + 1
        for comment in comments:
            comments_dic.append(comment.serialize())
            comments_count = comments_count+1
        serialize["comments"] = comments_dic
        serialize["comments_count"] = comments_count
        serialize["likes_count"] = likes_count
        return jsonify(serialize), 200
    else:
        return jsonify("Post not found"), 500


@api.route('/delete_post/<int:post_id_param>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id_param):
    current_user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id_param, user_id=current_user_id).one_or_none()
    if post is not None:
        db.session.delete(post)
        db.session.commit()
        return jsonify(f'{post_id_param} deleted successfully')
    else:
        return jsonify("Post not found"), 400

#End Post Endpoints

#Start Like Endpoints

@api.route('/create_like/<int:post_id_param>', methods=['GET'])
@jwt_required()
def create_like(post_id_param):
    current_user_id = get_jwt_identity()
    new_like_data = {}
    new_like_data["user_id"] = current_user_id
    new_like_data["post_id"] = post_id_param
    try:
        new_like = Like.create(**new_like_data)
        return jsonify(True), 201
    except Exception as error: 
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route('/is_liked/<int:post_id_param>', methods=['GET'])
@jwt_required()
def is_liked(post_id_param):
    current_user_id = get_jwt_identity()
    like = Like.query.filter_by(post_id = post_id_param, user_id = current_user_id).one_or_none()
    if like is not None:
        return jsonify(True), 200
    else:
        return jsonify(False), 200

@api.route('/delete_like/<int:post_id_param>', methods=['DELETE'])
@jwt_required()
def delete_like(post_id_param):
    current_user_id = get_jwt_identity()
    like = Like.query.filter_by(post_id=post_id_param, user_id=current_user_id).one_or_none()
    if like is not None:
        db.session.delete(like)
        db.session.commit()
        return jsonify(False), 200
    else:
        return jsonify("Like not found"), 400

#End Like Endpoints

#Start Comment Endpoints

@api.route('/create_comment/<int:post_id_param>', methods=['POST'])
@jwt_required()
def create_comment(post_id_param):
    current_user_id = get_jwt_identity()
    date = datetime.datetime.now()
    date = date.strftime("%d/%m/%Y")
    new_comment_data = request.json
    new_comment_data["post_id"] = post_id_param
    new_comment_data["user_id"] = current_user_id
    new_comment_data["date"] = date
    try:
        if "text" not in new_comment_data or new_comment_data["text"] == "":
            raise Exception("Comment invalid",400)
        new_comment = Comment.create(**new_comment_data)
        return jsonify(new_comment.serialize()), 201
    except Exception as error: 
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

