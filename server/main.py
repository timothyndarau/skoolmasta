from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from models import db, Item, Teacher, Student, Inventory, BorrowingHistory  # Import all models
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db.init_app(app) 
login_manager = LoginManager(app)

# Define User model for authentication
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    is_admin = db.Column(db.Boolean, default=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid username or password', 'error')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    # Get username, password, and email from the request body
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    # Check if username or email already exists in the database
    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    if existing_email:
        return jsonify({'error': 'Email already exists'}), 400

    # Create a new user object
    new_user = User(username=username, email=email)

    # Hash the password before saving it
    new_user.set_password(password)

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    from models import Item  # Import Item here if needed
    if not current_user.is_admin:
        return redirect(url_for('login'))
    
    # Deleting a specific student by ID
    student = Student.query.get(1)
    db.session.delete(student)
    db.session.commit()
    
    # Fetching a specific teacher by ID and updating their subject
    teacher = Teacher.query.get(1)
    teacher.subject = "Math"
    db.session.commit()
    
    # Querying all teachers
    teacher = Teacher.query.all()

    # Querying all students
    student = Student.query.all()

    # Querying all items
    Item = Item.query.all()
    
    return render_template('index.html')

@app.route('/admin/attempts')
@login_required
def attempted_borrows():
    from models import Item  # Import Item here if needed
    if not current_user.is_admin:
        return redirect(url_for('login'))
    
    # Deleting a specific student by ID
    student = Student.query.get(1)
    db.session.delete(student)
    db.session.commit()
    
    # Fetching a specific teacher by ID and updating their subject
    teacher = Teacher.query.get(1)
    teacher.subject = "Math"
    db.session.commit()
    
    # Querying all teachers
    teacher = Teacher.query.all()

    # Querying all students
    student = Student.query.all()

    # Querying all items
    Item = Item.query.all()
    attempted_borrows = BorrowingHistory.query.all()
    
    return render_template('index.html', attempted_borrows=attempted_borrows)

# Define your Item model
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# Route for adding items to the inventory
@app.route('/api/inventory/add', methods=['POST'])
def add_to_inventory():
    if request.method == 'POST':
        data = request.get_json()
        item_name = data.get('itemName')
        quantity = data.get('quantity')
        if item_name and quantity:
            # Create a new item object
            new_item = Item(name=item_name, quantity=quantity)
            db.session.add(new_item)
            db.session.commit()
            return jsonify({'message': 'Item added successfully'})
        else:
            return jsonify({'error': 'Invalid request data'}), 400


if __name__ == '__main__':
    # Create the database tables
    with app.app_context():
        db.create_all()

    # Run the Flask application
    app.run(debug=True)