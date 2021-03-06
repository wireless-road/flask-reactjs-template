"""jwt revoke tokens

Revision ID: 351d613f09d8
Revises: a5b9000f295e
Create Date: 2020-10-11 17:03:47.484913

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '351d613f09d8'
down_revision = 'a5b9000f295e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('revoked_tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('revoked_tokens')
    # ### end Alembic commands ###
