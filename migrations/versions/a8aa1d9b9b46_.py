"""empty message

Revision ID: a8aa1d9b9b46
Revises: fea18ca8de8b
Create Date: 2023-02-25 16:54:56.615585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8aa1d9b9b46'
down_revision = 'fea18ca8de8b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.String(length=30), nullable=False))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=80),
               existing_nullable=False)
        batch_op.drop_constraint('user_email_key', type_='unique')
        batch_op.create_unique_constraint(None, ['username'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('user_email_key', ['email'])
        batch_op.alter_column('email',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.drop_column('phone')
        batch_op.drop_column('username')

    # ### end Alembic commands ###