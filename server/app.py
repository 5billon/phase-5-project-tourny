#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api, Migrate, Flask
# Add your model imports
from models import Tournament, Participant, Match

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

        response = make_response(
            response_dict, 201,
        )
        return response

api.add_resource(Tournaments, '/tournaments')

class Participants(Resource):
    def post(self):
        data = request.get_json()
        participant = Participant(
            name=data['name'],
            picture=data['picture'],
            password_hash=data['password']
        )
        db.session.add(participant)
        db.session.commit()

        session['participant_id'] = participant.id

        response = make_response(user.to_dict(), 201)
        return response

api.add_resource(Participants, '/participants')

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

