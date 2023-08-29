#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, abort, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized

# Local imports
from config import app, db, api, Migrate, Flask
# Add your model imports
from models import Tournament, Participant, Match, MatchPart

# Views go here!

class Tournaments(Resource):
    def get(self):
        tournament_list = [t.to_dict() for t in Tournament.query.all()]
        response = make_response(tournament_list, 200)
        return response
    
    def post(self):
        form_json = request.get_json()
        try:
            new_tournament = Tournament(
                name=form_json['name'],
                tournament_contest=form_json['tournament_contest']
            )
        except ValueError as e:
            abort(422, e.args[0])
        
        db.session.add(new_tournament)
        db.session.commit()

        response_dict = new_tournament.to_dict()

        response = make_response(response_dict, 201)
        return response

api.add_resource(Tournaments, '/tournaments')

class TournamentsById(Resource):
    def get(self, id):
        tournament = Tournament.query.filter_by(id = id).first()
        if not tournament:
            return make_response({'error': 'That tournament does not exist yet.'}, 404)
        return make_response(tournament.to_dict(), 200)
    
    def patch(self, id):
        tournament = Tournament.query.filter_by(id = id).first()
        if not tournament:
            return make_response({'error': 'That tournament does not exist yet.'}, 404)
        data = request.json
        for key in data:
            try:
                setattr(tournament, key, data[key])
            except ValueError as v_error:
                return make_response({'errors': [str(v_error)]}, 422)
        db.session.commit()
        return make_response(tournament.to_dict())
    
    def delete(self, id):
        tournament = Tournament.query.filter_by(id = id).first()
        if not tournament:
            return make_response({'errors': 'That tournament does not exist.'}, 404)
        db.session.delete(tournament)
        db.session.commit()
        return make_response('', 204)

api.add_resource(TournamentsById, '/tournaments/<int:id>')

class ParticipantByTournamentId(Resource):
    def get(self, id):
        tournament = Tournament.query.filter_by(id=id).first()
        if not tournament:
            return make_response({'error': 'That tournament does not exist yet.'}, 404)
        
        participants = [participant.to_dict() for participant in tournament.participants]
        # matches = tournament.matches
        # participants = []

        # for match in matches:
        #     participants.extend([participant.to_dict()for participant in match.participants])

        return make_response(participants, 200)

api.add_resource(ParticipantByTournamentId, '/tournaments/<int:id>/participants')

class Participants(Resource):
    def get(self):
        return make_response([p.to_dict() for p in Participant.query.all()])

    def post(self):
        data = request.get_json()

        existing_participant = Participant.query.filter_by(name=data['name']).first()
        if existing_participant:
            return make_response({'error':'That participant already exists, please use another name.'}, 400)
        try:
            new_participant = Participant(name=data['name'], password_hash=data['password'])
        except Exception as e:
            return make_response({'error': 'Unable to create participant' + str(e)}, 400)
            
        db.session.add(new_participant)
        db.session.commit()

        session['participant_id'] = new_participant.id

        response = make_response(new_participant.to_dict(), 201)
        return response

api.add_resource(Participants, '/participants')

class ParticipantById(Resource):
    def get(self, id):
        participant = Participant.query.filter_by(id = id).first()
        if not participant:
            return make_response({'error':'Participant does not exist yet.'}, 404)
        return make_response(participant.to_dict())
    
    def patch(self, id):
        data = request.get_json()
        participant = Participant.query.filter_by(id = id).first()
        if not participant:
            return make_response({'error': 'Participant does not exist yet.'}, 404)
        # for key in data:
        #     setattr(participant, key, data[key])
        if 'picture' in data:
            participant.picture = data['picture']
        
        db.session.commit()
        response = make_response(participant.to_dict(), 201)
        return response
    
    def delete(self, id):
        participant = Participant.query.get(id)
        if not participant:
            return make_response({'error': 'Participant does not exist.'}, 404)
        
        db.session.delete(participant)
        db.session.commit()

        return {'message': 'Participant has been deleted'}, 204

api.add_resource(ParticipantById, '/participants/<int:id>')

class Matches(Resource):
    def get(self):
        return make_response([m.to_dict() for m in Match.query.all()])
    
    def post(self):
        data = request.json
        try:
            match = Match(tournament_id=data['tournament_id'], matchparts_id=data['matchparts_id'])
        except ValueError as v_error:
            return make_response({'errors': [str(v_error)]}, 422)
        db.session.add(match)
        db.session.commit()
        return make_response(match.to_dict(), 204)

api.add_resource(Matches, '/matches')

class MatchById(Resource):
    def get(self, id):
        match = Match.query.filter_by(id = id).first()
        if not match:
            return make_response({'error':'Match does not exist yet.'}, 404)
        return make_response(match.to_dict())
    
    def patch(self, id):
        data = request.get_json()
        match = Match.query.filter_by(id = id).first()
        if not match:
            return make_response({'error': 'match does not exist yet.'}, 404)
        for key in data:
            setattr(match, key, data[key])
        
        db.session.commit()
        response = make_response(match.to_dict(), 201)
        return response

api.add_resource(MatchById, '/matches/<int:id>')

class MatchParts(Resource):
    def get(self):
        return make_response([mp.to_dict() for mp in MatchPart.query.all()])

api.add_resource(MatchParts, '/matchparts')

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     try:
#         participant = Participant.query.filter_by(name=data['name']).first()
#         if participant.authenticate(data['password']):
#             session['participant_id'] = participant.id
#             response = make_response(participant.to_dict(), 200)
#             return response
#     except:
#         return make_response({'error': 'Wrong password or name'}, 401)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']

    participant = Participant.query.filter_by(name=name).first()
    if not participant:
        return make_response({'error': 'Account not found'}, 404)
    
    if participant.authenticate(password):
        session['participant_id'] = participant.id
        return make_response(participant.to_dict(), 200)
    else:
        return make_response({'error':'Password is not correct'}, 401)

@app.route('/authorized', methods=['GET'])
def authorize():
    try:
        participant = Participant.query.filter_by(id=session.get('participant_id')).first()
        response = make_response(participant.to_dict(), 200)
        return response
    except:
        return make_response({'error': 'Account can not be found'}, 404)

@app.route('/logout', methods=['DELETE'])
def logout():
    session['participant_id'] = None
    return make_response('', 204)

@app.route('/check_session')
def check_session():
    participant = Participant.query.filter(Participant.id == session.get('participant_id')).first()
    if participant:
        return make_response(participant.to_dict())
    else:
        return {'error':'Unauthorized user in session'}, 401

@app.before_request
def check_login_status():
    if (request.endpoint in ['tournaments', 'tournamentbyid', 'logout'] and request.method != 'GET') \
            or request.endpoint == 'authorize':
        if not session.get('participant_id'):
            return make_response({'error': 'Unauthorized user in login status'}, 401)

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response('Not Found: Sorry does not exist, 404')
    return response

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

