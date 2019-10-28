import React, { Component } from 'react';
import './resources/styles.css';
import {Element} from 'react-scroll';

import Header from './components/header_footer/Header';
import Featured from './components/featured';
import VenueInfo from './components/VenueInfo';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Location from './components/Location';
import Footer from './components/header_footer/Footer';

const myKey = 'FeCkM4AOvKl36vGF';

class App extends Component {

  state = {
    items: [],
    didLoad: false,
    query: null
  }

  async grabArtistInfo() {
    const url = `https://api.songkick.com/api/3.0/artists/4971683/calendar.json?apikey=${myKey}`
    const response =  await fetch(url);
    const data = await response.json();
    this.setState({items:data, didLoad:true});
    console.log(this.state.items)
  }

  async componentDidMount() {
    this.grabArtistInfo()   
  }

  getArtistName = (artist) => {
    this.setState({query: artist});
    console.log(this.state.query);
  }

  render() {
    if (this.state.didLoad === true) {
      return (
        <div className="App">
          <Header q = {(artist) => this.getArtistName(artist)} />
          <Element name = 'Featured'>
            <Featured 
              deadline = {this.state.items.resultsPage.results.event[0].start.datetime}
            />
          </Element>
          <Element name = "Venue_info">
            <VenueInfo/>
          </Element>
          <Element name = "Highlights">
            <Highlights/>
          </Element>
          <Element name = "Pricing">
            <Pricing/>
          </Element>
          <Element name = "Location">
            <Location 
              lng = {this.state.items.resultsPage.results.event[0].venue.lng} 
              lat = {this.state.items.resultsPage.results.event[0].venue.lat}
              desc = {this.state.items.resultsPage.results.event[0].venue.displayName}
              locationDetails = {this.state.items.resultsPage.results.event[0].location.city}
              />
          </Element>
          <Footer/>
        </div>
      );
    }
    else {
      return (
        <div>Loading ... </div>
      )
    }
  }
}

export default App;
