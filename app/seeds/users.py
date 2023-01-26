from app.models import db, User, environment, SCHEMA

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    alexis = User(
        username='alexis', email='alexis@aa.io', password='password')

    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    jessica = User(
        username='jessica', email='jessica@aa.io', password='password')

    tiffany = User(
        username='tiffany', email='tiffany@aa.io', password='password')

    henry = User(
        username='henry', email='henry@aa.io', password='password')

    db.session.add(demo)
    db.session.add(alexis)
    db.session.add(bobbie)
    db.session.add(jessica)
    db.session.add(tiffany)
    db.session.add(henry)
    db.session.commit()

    print('Seeded Users')

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
