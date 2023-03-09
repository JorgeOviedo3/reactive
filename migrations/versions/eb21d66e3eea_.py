"""empty message

Revision ID: eb21d66e3eea
Revises: 1c4e60d53f98
Create Date: 2023-03-09 13:36:40.179757

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb21d66e3eea'
down_revision = '1c4e60d53f98'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(length=500), nullable=False))
        batch_op.add_column(sa.Column('category', sa.String(length=80), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_column('category')
        batch_op.drop_column('description')

    # ### end Alembic commands ###