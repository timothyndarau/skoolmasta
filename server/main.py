from flask import Flask, render_template, request, redirect, url_for, flash
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

if __name__ == '__main__':
    # Create the database tables
    with app.app_context():
        db.create_all()

    # Run the Flask application
    app.run(debug=True)