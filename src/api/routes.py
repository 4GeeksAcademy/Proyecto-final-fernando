from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Course, Enrollment
from api.utils import generate_sitemap, APIException, hash_password, verify_password, create_token, decode_token
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import re
import os
import stripe

api = Blueprint('api', __name__)
CORS(api)

# Stripe initialization
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN", "http://localhost:3000")


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text[:220]


def get_current_user():
    auth = request.headers.get('Authorization', None)
    if not auth:
        return None
    parts = auth.split()
    if len(parts) != 2:
        return None
    token = parts[1]
    data = decode_token(token)
    if not data:
        return None
    return User.query.get(data.get('user_id'))


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


@api.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"msg": "email and password required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "email already registered"}), 400
    user = User(email=email, password=hash_password(password))
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "could not create user"}), 500
    return jsonify({"msg": "user created", "user": user.serialize()}), 201


@api.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"msg": "email and password required"}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(password, user.password):
        return jsonify({"msg": "invalid credentials"}), 401
    token = create_token(user.id)
    return jsonify({"token": token, "user": user.serialize()}), 200


@api.route('/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json() or {}
    email = data.get('email')
    if not email:
        return jsonify({"msg": "email required"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "if the email exists, a reset token was generated"}), 200
    token = create_token(user.id, hours=1)
    return jsonify({"msg": "reset token (dev)", "reset_token": token}), 200


@api.route('/courses', methods=['GET'])
def list_courses():
    courses = Course.query.order_by(Course.created_at.desc()).all()
    out = [c.serialize() for c in courses]
    return jsonify(out), 200


@api.route('/courses/<int:course_id>', methods=['GET'])
def course_detail(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify(course.serialize()), 200


@api.route('/courses', methods=['POST'])
def create_course():
    user = get_current_user()
    if not user or not user.is_admin:
        return jsonify({"msg": "forbidden"}), 403
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description', '')
    price = data.get('price', 0.0)
    image_url = data.get('image_url')
    if not title:
        return jsonify({"msg": "title required"}), 400
    slug = slugify(title)
    base_slug = slug
    i = 1
    while Course.query.filter_by(slug=slug).first():
        slug = f"{base_slug}-{i}"
        i += 1
    course = Course(
        title=title,
        slug=slug,
        description=description,
        price=float(price),
        image_url=image_url,
        author_id=user.id
    )
    db.session.add(course)
    db.session.commit()
    return jsonify({"msg": "created", "id": course.id}), 201


@api.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    user = get_current_user()
    if not user or not user.is_admin:
        return jsonify({"msg": "forbidden"}), 403
    course = Course.query.get_or_404(course_id)
    data = request.get_json() or {}
    title = data.get('title')
    if title:
        course.title = title
        new_slug = slugify(title)
        if new_slug != course.slug:
            base_slug = new_slug
            i = 1
            while Course.query.filter(Course.slug == new_slug, Course.id != course.id).first():
                new_slug = f"{base_slug}-{i}"
                i += 1
            course.slug = new_slug
    if 'description' in data:
        course.description = data.get('description') or course.description
    if 'price' in data:
        course.price = float(data.get('price', course.price))
    if 'image_url' in data:
        course.image_url = data.get('image_url')
    db.session.commit()
    return jsonify({"msg": "updated", "course": course.serialize()}), 200


@api.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    user = get_current_user()
    if not user or not user.is_admin:
        return jsonify({"msg": "forbidden"}), 403
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({"msg": "deleted"}), 200


@api.route('/checkout', methods=['POST'])
def checkout():
    user = get_current_user()
    if not user:
        return jsonify({"msg": "unauthenticated"}), 401
    data = request.get_json() or {}
    course_ids = data.get('course_ids') or []
    if not isinstance(course_ids, list) or not course_ids:
        return jsonify({"msg": "course_ids list required"}), 400
    created = []
    for cid in course_ids:
        course = Course.query.get(cid)
        if not course:
            continue
        exists = Enrollment.query.filter_by(user_id=user.id, course_id=course.id).first()
        if exists:
            continue
        enroll = Enrollment(user_id=user.id, course_id=course.id, purchased_at=datetime.utcnow())
        db.session.add(enroll)
        created.append(enroll)
    db.session.commit()
    return jsonify({"msg": "checkout complete", "created": [e.serialize() for e in created]}), 200


@api.route('/my-courses', methods=['GET'])
def my_courses():
    user = get_current_user()
    if not user:
        return jsonify({"msg": "unauthenticated"}), 401
    enrolls = Enrollment.query.filter_by(user_id=user.id).all()
    out = []
    for e in enrolls:
        course = Course.query.get(e.course_id)
        if course:
            out.append(course.serialize())
    return jsonify(out), 200



# STRIPE CHECKOUT ENDPOINT

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    user = get_current_user()
    if not user:
        return jsonify({"msg": "unauthenticated"}), 401

    data = request.get_json() or {}
    course_ids = data.get("course_ids", [])
    if not isinstance(course_ids, list) or not course_ids:
        return jsonify({"msg": "course_ids list required"}), 400

    line_items = []
    for cid in course_ids:
        course = Course.query.get(cid)
        if not course:
            continue
        price_cents = int(float(course.price) * 100)
        if price_cents <= 0:
            continue
        line_items.append({
            "price_data": {
                "currency": "eur",
                "product_data": {"name": course.title},
                "unit_amount": price_cents,
            },
            "quantity": 1
        })

    if not line_items:
        return jsonify({"msg": "no valid courses"}), 400

    course_ids_str = ",".join(str(cid) for cid in course_ids)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=f"{FRONTEND_DOMAIN}/payment-success?session_id={{CHECKOUT_SESSION_ID}}&course_ids={course_ids_str}",
            cancel_url=f"{FRONTEND_DOMAIN}/cart",
            metadata={"user_id": user.id}
        )
        return jsonify({"url": session.url}), 200
    except Exception as e:
        return jsonify({"msg": "stripe error", "detail": str(e)}), 500
