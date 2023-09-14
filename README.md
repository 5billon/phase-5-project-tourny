# From First to Last

From first to last is a single page web application that is under construction, what it will do is give the user the ability to build out basic tournaments and pick winners to see who wins!

## Setup

The first thing you want to do is setup the server with all the data.

To do that you first download the dependencies

```console
pipenv install
pipenv shell
```

It will be running Flask API on [`localhost:5555`](http://localhost:5555)

You can get that running by running:

```console
python server/app.py
```

The next thing you want to get running is the client side portion.

Simply open a new terminal and run:

```console
npm install --prefix client
```

Then run the command:

```console
npm start --prefix client
```

You should be all setup on your own personal computer now!

## What you can do

For now, the user can create a profile, view existing tournaments, create a new tournament if signed in, upload a profile picture, and delete their profile.

The app is still under construction so in the near future users will gain the ability to add participants to tournaments that you create, and start the tournament!

Forming a bracket and choosing winners, until the eventual champion of the tournament.

## Conclusion

The app is still under development, any tips or assistance is greatly appreciated in how to achieve full functionality.

Please enjoy this simple web app, From First to Last!