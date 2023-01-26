from app.models import db, User, Board, environment, SCHEMA


def seed_boards():
    board1 = Board(
        name='Fashion',
        board_image='https://i.pinimg.com/736x/9a/95/a3/9a95a3fff0f1b014592af5e9d5f4b73b.jpg',
        user_id=1
    )

    board2 = Board(
        name='Hairstyles',
        board_image='https://i.pinimg.com/originals/e2/c1/f9/e2c1f9e650876e6f2c9a443c71bd12b1.png',
        user_id=2
    )

    board3 = Board(
        name='Interior Design',
        board_image='https://www.mymove.com/wp-content/uploads/2022/07/mm-things-you-should-know-about-becoming-an-interior-designer-hero.jpg',
        user_id=3
    )

    board4 = Board(
        name='Make Up Inspiration',
        board_image='https://i.pinimg.com/736x/bc/85/19/bc8519c31924d20cce98896b33a33502.jpg',
        user_id=4
    )

    board5 = Board(
        name='Vacations',
        board_image='https://i.pinimg.com/736x/38/47/34/384734a690b86fc66406a70f34b640dd--vacation-places-dream-vacations.jpg',
        user_id=5
    )

    board6 = Board(
        name='Sunglasses For Her',
        board_image='https://i.pinimg.com/736x/2a/b5/8c/2ab58c135ba581dce74e8be323a7841e.jpg',
        user_id=6
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)
    db.session.commit()

    print('Seeded Boards')


def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
