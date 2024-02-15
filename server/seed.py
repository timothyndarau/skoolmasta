from models import db, Teacher, Student, Item, BorrowingHistory

# Create a session to interact with the database
session = db.session


# Example usage:
# Create some borrowers (teachers and students)
teacher1 = Teacher(name="Alice", subject="Math")
teacher2 = Teacher(name="Bob", subject="Science")

student1 = Student(name="John")
student2 = Student(name="Jane")

# Create some items
item1 = Item(name="Book 1", description="Math Book")
item2 = Item(name="Book 2", description="Science Book")
item3 = Item(name="Book 3", description="Literature Book")

# Create borrowing history
borrowing_history1 = BorrowingHistory(borrower_id=teacher1.id, teacher_id=teacher1.id, item=item1)
borrowing_history2 = BorrowingHistory(borrower_id=teacher1.id, teacher_id=teacher1.id, item=item2)
borrowing_history3 = BorrowingHistory(borrower_id=teacher2.id, teacher_id=teacher2.id, item=item3)

borrowing_history4 = BorrowingHistory(borrower_id=student1.id, student_id=student1.id, item=item1)
borrowing_history5 = BorrowingHistory(borrower_id=student1.id, student_id=student1.id, item=item2)
borrowing_history6 = BorrowingHistory(borrower_id=student2.id, student_id=student2.id, item=item3)

# Add objects to the session
session.add_all([teacher1, teacher2, student1, student2, item1, item2, item3, borrowing_history1, borrowing_history2, borrowing_history3, borrowing_history4, borrowing_history5, borrowing_history6])

# Commit the changes to the database
session.commit()
# Querying data
print("Teachers:")
for teacher in Teacher.query.all():
    print(teacher.name)

print("Students:")
for student in Student.query.all():
    print(student.name)

print("Items:")
for item in Item.query.all():
    print(item.name)
    if item.borrowing_history:
        print(f" - Borrowed by: {item.borrowing_history.borrower_id}")
    else:
        print(" - Not currently borrowed")

# Close the session
session.close()