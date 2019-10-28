# Countdown Event Timer
This is a Coundown event timer app for a musical artist that pulls from the songkick api and creates a countdown from the current date to the next avaliable event of a musical artist of your choosing 
## Installation
```
git clone https://github.com/jcyuen1995/the_venue
npm start
```

## Dependencies 
- react 
- @material-ui
- google-maps-react

## Required
Please create a config.js file in the /src directory which includes your api keys like so:
```
export const myConfig = { 
    MY_KEY : '(Your google API key here)',
    KEY_2 : '(You songkick API key here)'
    }