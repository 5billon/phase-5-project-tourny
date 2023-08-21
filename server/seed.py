#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Tournament, Participant, Match, MatchPart

fake = Faker()

with app.app_context():
    Tournament.query.delete()
    Participant.query.delete()
    Match.query.delete()
    MatchPart.query.delete()

    participants = []
    p1 = Participant(name='Tara Monroe', password_hash='password1', picture='https://media.istockphoto.com/id/992637094/photo/british-short-hair-cat-and-golden-retriever.jpg?s=612x612&w=0&k=20&c=MPxqqfyY1mhqlrqD9xCC3NA14qSR0DfZnD5SVJxs2Ik=')
    participants.append(p1)
    p2 = Participant(name='Rachel Ingram', password_hash='password2', picture='https://media.istockphoto.com/id/1265884839/photo/a-small-dog-and-a-kitten-sleep-at-home.jpg?s=612x612&w=0&k=20&c=VmF-gr24ygpSnZaKBSchc0VgVFW3PlL9IdSXHgVS6XU=')
    participants.append(p2)
    p3 = Participant(name='Dawn Smith', password_hash='password3', picture='https://adoptme.org/wp-content/uploads/2020/04/small-cute-dog-and-cat-together-cats-and-dogs-together-pinterest.jpg')
    participants.append(p3)
    p4 = Participant(name='Victoria Orozco', password_hash='password4', picture='https://w0.peakpx.com/wallpaper/201/860/HD-wallpaper-dog-and-cat-animal-animals-cute-cute-animals-dogs-puppy-small-thumbnail.jpg')
    participants.append(p4)
    p5 = Participant(name='Jennifer Wells', password_hash='password5', picture='https://www.hillspet.com/content/dam/cp-sites/hills/hills-pet/en_us/exported/pet-care/Skyword/images/puppy-and-cat-cuddling-SW.jpg')
    participants.append(p5)
    p6 = Participant(name='Elizabeth Beasley', password_hash='password6', picture='https://www.rd.com/wp-content/uploads/2021/08/GettyImages-868400288.jpg')
    participants.append(p6)
    p7 = Participant(name='Mario Mueller', password_hash='password7', picture='https://i.pinimg.com/750x/2d/5d/e6/2d5de66876db06fd8883e293126cecb6.jpg')
    participants.append(p7)
    p8 = Participant(name='Amanda Nichols', password_hash='password8', picture='https://previews.123rf.com/images/innocent/innocent1205/innocent120500055/13877856-small-dog-and-big-cat-isolated-on-white-background.jpg')
    participants.append(p8)
    p9 = Participant(name='Karen Pope', password_hash='password9', picture='https://insureberry.com/wp-content/uploads/2021/05/louis-philippe-poitras-sJgucUmcaKE-unsplash-scaled-e1621373840349.jpg')
    participants.append(p9)
    p10 = Participant(name='Amy Moore', password_hash='password10', picture='https://media.istockphoto.com/id/1203033096/photo/small-cat-and-puppy.jpg?s=612x612&w=0&k=20&c=JqMDegPtB5RPbiAkL36gUbeQS-9lOgsD3DzOPtDVBf8=')
    participants.append(p10)
    p11 = Participant(name='James Brown', password_hash='password11', picture='https://hips.hearstapps.com/hmg-prod/images/dogs-good-with-cats-1572920219.jpg?crop=1.00xw:0.754xh;0,0&resize=640:*')
    participants.append(p11)
    p12 = Participant(name='Sara Morgan', password_hash='password12', picture='https://d.newsweek.com/en/full/1898105/puppy-pair-kittens.jpg?w=790&f=55fe8561578416a133b60a4f8c596415')
    participants.append(p12)
    p13 = Participant(name='Tina Schmitt', password_hash='password13', picture='https://hips.hearstapps.com/edc.h-cdn.co/assets/16/05/1280x853/gallery-1454434238-gettyimages-157610688.jpg?resize=1200:*')
    participants.append(p13)
    p14 = Participant(name='Nichole Bishop', password_hash='password14', picture='https://www.msah.com/sites/default/files/cats-dogs-lifestyle-fit.jpg')
    participants.append(p14)
    p15 = Participant(name='Katelyn Diaz', password_hash='password15', picture='https://www.rd.com/wp-content/uploads/2021/08/GettyImages-107478815.jpg?fit=680%2C454')
    participants.append(p15)
    p16 = Participant(name='Glenn Sheppard', password_hash='password16', picture='https://w0.peakpx.com/wallpaper/545/919/HD-wallpaper-happy-moments-little-wonderful-special-together-beautiful-small-friendship-forever-friends-animals-dog-cat-tiny-magical-peaceful-sunshine-kitten.jpg')
    participants.append(p16)
    p17 = Participant(name='Heather Bird', password_hash='password17', picture='https://images.ctfassets.net/82d3r48zq721/45liwTLsDMSJt4N22RqrHX/cd992f88ca8737f95b085212906d6d86/Can-cats-and-dogs-get-coronavirus_resized.jpg?w=800&q=50')
    participants.append(p17)
    p18 = Participant(name='Dalton Campbell', password_hash='password18', picture='https://www.hillspet.com/content/dam/cp-sites/hills/hills-pet/en_us/exported/pet-care/Skyword/images/dog-and-cat-overlook-kitchen-table-SW.jpg')
    participants.append(p18)
    p19 = Participant(name='Kathleen Watson', password_hash='password19', picture='https://hips.hearstapps.com/goodhousekeeping-uk/main/embedded/26298/dogs-cats.jpg')
    participants.append(p19)
    p20 = Participant(name='Brianna Herrera', password_hash='password20', picture='https://media.istockphoto.com/id/1304796251/photo/dog-and-cat-together.jpg?s=612x612&w=0&k=20&c=tZOTEX9PtQDihX6zgBbKkHHW4liMnc2pOhKHxNKFihU=')
    participants.append(p20)
    p21 = Participant(name='Carla Conway', password_hash='password21', picture='https://m.media-amazon.com/images/I/71Hfdo2GFdL._AC_UF1000,1000_QL80_.jpg')
    participants.append(p21)
    p22 = Participant(name='Andrew Mercer II', password_hash='password22', picture='https://t4.ftcdn.net/jpg/01/88/11/19/360_F_188111975_FofFaorYokdknw4rMgGxKlVB8IRAyTd4.jpg')
    participants.append(p22)
    p23 = Participant(name='Monica Love', password_hash='password23', picture='https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0JTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80')
    participants.append(p23)
    p24 = Participant(name='Jacqueline Sanchez', password_hash='password24', picture='https://www.catster.com/wp-content/uploads/2017/10/A-gray-kitten-hanging-out-with-a-dog.jpg.optimal.jpg')
    participants.append(p24)
    p25 = Participant(name='Melanie Mitchell', password_hash='password25', picture='https://m.media-amazon.com/images/I/51QHi+esYoL.jpg')
    participants.append(p25)

    
    db.session.add_all(participants)
    db.session.commit()

    tournaments = []

    t1 = Tournament(name='The Fantasy Football League', tournament_contest='Football')
    tournaments.append(t1)
    t2 = Tournament(name='The Super Soccer Exstravaganza', tournament_contest='Soccer')
    tournaments.append(t2)
    t3 = Tournament(name='Super Smash bros. Tournament', tournament_contest='Super Smash Bros. Melee')
    tournaments.append(t3)
    t4 = Tournament(name='Little League Football Tournament', tournament_contest='Football')
    tournaments.append(t4)
    t5 = Tournament(name='Go Fish Live Tourny', tournament_contest='Go Fish')
    tournaments.append(t5)

    db.session.add_all(tournaments)
    db.session.commit()

    matchparts = [MatchPart() for mp in range(100)]

    for mp in matchparts:
        mp.participants = rc(participants)

    db.session.add_all(participants)
    db.session.commit()

    matches = [Match() for m in range(50)]

    for m in matches:
        m.tournament = rc(tournaments)
        m.matchparts = rc(matchparts)

    db.session.add_all(matches)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
