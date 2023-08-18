"""added second participant column

Revision ID: ca3d8dd4498f
Revises: 37b8e7a15e4b
Create Date: 2023-08-18 11:18:44.955545

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca3d8dd4498f'
down_revision = '37b8e7a15e4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('matches', schema=None) as batch_op:
        batch_op.drop_constraint('fk_matches_participants_id_2_participants', type_='foreignkey')
        batch_op.drop_column('participants_id_2')

    with op.batch_alter_table('participants', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('participants', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    with op.batch_alter_table('matches', schema=None) as batch_op:
        batch_op.add_column(sa.Column('participants_id_2', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_matches_participants_id_2_participants', 'participants', ['participants_id_2'], ['id'])

    # ### end Alembic commands ###
