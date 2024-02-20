from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.orm import relationship
#from models import 


db = SQLAlchemy()
class Teacher(db.Model):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    subject = db.Column(db.String(100))
    borrowing_history_id = db.Column(db.Integer, db.ForeignKey('borrowing_history.id'))

    borrowing_history = db.relationship('BorrowingHistory', foreign_keys='BorrowingHistory.teacher_id', backref='teachers')

class Student(db.Model, UserMixin):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    borrowing_history_id = db.Column(db.Integer, db.ForeignKey('borrowing_history.id'))
    borrowing_history = db.relationship("BorrowingHistory", back_populates="student")

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
    availability = db.Column(db.Boolean, default=True)
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'))
    inventory = db.relationship("Inventory", back_populates="item")
    borrowing_history = db.relationship("BorrowingHistory", back_populates="item")

class BorrowingHistory(db.Model):
    __tablename__ = 'borrowing_history'
    id = db.Column(db.Integer, primary_key=True)
    borrower_id = db.Column(db.Integer)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    returned = db.Column(db.Boolean, default=False)
    teacher = db.relationship("Teacher", back_populates="borrowing_history")
    student = db.relationship("Student", back_populates="borrowing_history")
    item = db.relationship("Item", back_populates="borrowing_history")


class Inventory(db.Model):
    __tablename__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    quantity = db.Column(db.Integer, default=0)
    item = db.relationship("Item", back_populates="inventory")