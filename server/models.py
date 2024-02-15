from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from models import Item


db = SQLAlchemy()

class Teacher(db.Model, UserMixin):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    subject = db.Column(db.String(100))
    borrower_id = db.Column(db.Integer, db.ForeignKey('borrowing_history.id'))
    borrowing_history = relationship("BorrowingHistory", back_populates="student")

class Student(db.Model, UserMixin):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    borrowing_history_id = db.Column(db.Integer, db.ForeignKey('borrowing_history.id'))
    borrowing_history = relationship("BorrowingHistory", back_populates="student")

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
    availability = db.Column(db.Boolean, default=True)
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'))
    inventory = relationship("Inventory", back_populates="item")
    borrowing_history = relationship("BorrowingHistory", back_populates="item")

class BorrowingHistory(db.Model):
    __tablename__ = 'borrowing_history'
    id = db.Column(db.Integer, primary_key=True)
    borrower_id = db.Column(db.Integer)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    returned = db.Column(db.Boolean, default=False)
    teacher = relationship("Teacher", back_populates="borrowing_history")
    student = relationship("Student", back_populates="borrowing_history")
    item = relationship("Item", back_populates="borrowing_history")


class Inventory(db.Model):
    __tablename__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    quantity = db.Column(db.Integer, default=0)
    item = relationship("Item", back_populates="inventory")