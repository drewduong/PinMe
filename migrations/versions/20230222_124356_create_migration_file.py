"""Create migration file

Revision ID: 15a5363afbe3
Revises: 05783bb0dfc1
Create Date: 2023-02-22 12:43:56.402466

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15a5363afbe3'
down_revision = '05783bb0dfc1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('first_name', sa.String(length=40), nullable=True))
    op.add_column('users', sa.Column('last_name', sa.String(length=40), nullable=True))
    op.add_column('users', sa.Column('about', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'about')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    # ### end Alembic commands ###