from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt

# Models go here!

class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    tournament_contest = db.Column(db.String, nullable=False)

    matches = db.relationship('Match', back_populates='tournament')
    participants = association_proxy('matches', 'participants')

    serialize_rules = ('-matches',)

    @validates('name')
    def validate_tournament_name(self, key, new_tournament_name):
        if not new_tournament_name:
            raise ValueError('Please enter the name of the tournament.')
        return new_tournament_name
    
    @validates('tournament_contest')
    def validate_name(self, key, new_contest):
        if not new_contest:
            raise ValueError('Please enter the game or sport that is being played.')
        return new_contest

class Participant(db.Model, SerializerMixin):
    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    picture = db.Column(db.String)
    match_id = db.Column(db.Integer, db.ForeignKey('matches.id'))

    _password_hash = db.Column(db.String, nullable=False)

    matchparts = db.relationship('MatchPart', back_populates='participant')
    
    tournaments = association_proxy('matches', 'tournament')

    serialize_rules = ('-matchparts',)

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_password_string):
        byte_object = new_password_string.encode('utf-8')
        encrypted_hash_object = bcrypt.generate_password_hash(byte_object)
        hash_object_as_string = encrypted_hash_object.decode('utf-8')
        self._password_hash = hash_object_as_string
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates
    def validate_participant_name(self, key, new_participant_name):
        if not new_participant_name:
            raise ValueError('Please enter a name.')
        return new_participant_name

class Match(db.Model, SerializerMixin):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'))
    matchparts_id = db.Column(db.Integer, db.ForeignKey('matchparts.id'))

    tournament = db.relationship('Tournament', back_populates='matches')
    matchparts = db.relationship('MatchPart', back_populates='matches')

    participants = association_proxy('matchparts', 'participant')

    serialize_rules = ('-matchparts.matches', '-matchparts.tournament.matchparts', '-matchparts.participants._password_hash', '-matchparts.participants.matches', '-matchparts.participants.match_id')

    @validates
    def validate_tournament_id(self, key, new_tournament_id):
        if not new_tournament_id:
            raise ValueError('There must be a tournament id.')
        return new_tournament_id

    @validates
    def validate_participant_id(self, key, new_participant_id):
        if not new_participant_id:
            raise ValueError('There must be a participant id.')
        return new_participant_id

class MatchPart(db.Model, SerializerMixin):
    __tablename__ = 'matchparts'

    id = db.Column(db.Integer, primary_key=True)
    participants_id = db.Column(db.Integer, db.ForeignKey('participants.id'))

    matches = db.relationship('Match', back_populates='matchparts')
    participant = db.relationship('Participant', back_populates='matchparts')

    serialize_rules = ('-matches','-participants.password_hash')