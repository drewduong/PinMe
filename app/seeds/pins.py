from app.models import db, User, Pin, environment, SCHEMA


def seed_pins():
    pin1 = Pin(
        title='Fashion Pin',
        description='Fashion description',
        pin_image='https://i.pinimg.com/736x/9a/95/a3/9a95a3fff0f1b014592af5e9d5f4b73b.jpg',
        user_id=1,
        board_id=1

    )

    pin2 = Pin(
        title='Hairstyle Pin',
        description='Hairstyle description',
        pin_image='https://i.pinimg.com/originals/e2/c1/f9/e2c1f9e650876e6f2c9a443c71bd12b1.png',
        user_id=2,
        board_id=2
    )

    pin3 = Pin(
        title='Interior Design Pin',
        description='Interior design description',
        pin_image='https://www.mymove.com/wp-content/uploads/2022/07/mm-things-you-should-know-about-becoming-an-interior-designer-hero.jpg',
        user_id=3,
        board_id=3
    )

    pin4 = Pin(
        title='Make Up Inspiration Pin',
        description='Make Up description',
        pin_image='https://i.pinimg.com/736x/bc/85/19/bc8519c31924d20cce98896b33a33502.jpg',
        user_id=4,
        board_id=4
    )

    pin5 = Pin(
        title='Vacation Pin',
        description='Vacation description',
        pin_image='https://i.pinimg.com/736x/38/47/34/384734a690b86fc66406a70f34b640dd--vacation-places-dream-vacations.jpg',
        user_id=5,
        board_id=5
    )

    pin6 = Pin(
        title='Sunglasses Pin',
        description='Sunglasses description',
        pin_image='https://i.pinimg.com/736x/2a/b5/8c/2ab58c135ba581dce74e8be323a7841e.jpg',
        user_id=6,
        board_id=6
    )

    db.session.add(pin1)
    db.session.add(pin2)
    db.session.add(pin3)
    db.session.add(pin4)
    db.session.add(pin5)
    db.session.add(pin6)
    db.session.commit()

    print('Seeded Pins')


def undo_pins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
