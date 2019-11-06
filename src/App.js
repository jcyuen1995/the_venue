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
import { myConfig } from './config';

const myKey = myConfig.KEY_2;


class App extends Component {

  state = {
    items: [],
    didLoad: false,
    query: "ariana grande",
    names: []
  }

  async grabArtistInfo(artistSearched) {
    const artistSearch = `${artistSearched}`
    const url = `https://api.songkick.com/api/3.0/artists/${artistSearch}/calendar.json?apikey=${myKey}`
    const response =  await fetch(url);
    const data = await response.json();
    this.setState({items:data, didLoad:true});
  }


  async componentDidMount() {
    await this.getSearchedName(this.state.query)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.items !== nextState.items){
      return true;
    }
    else {
      return false;
    }
  }

  async getSearchedName(artist){
    const  searchUrl = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${myKey}&query=${artist}`
    const response = await fetch(searchUrl);
    const data = await response.json();
    this.setState({names: data, query: artist})
    this.grabArtistInfo(this.state.names.resultsPage.results.artist[0].id)
  }

  render() {
      if (this.state.didLoad === true) {
      return (
        <div className="App">
          <Header searched = {(artist) => this.getSearchedName(artist)} />
          <Element name = 'Featured'>
            <Featured 
              deadline = {(this.state.items.resultsPage.results.event[0].start.datetime)}
              name = {(this.state.items.resultsPage.results.event[0].performance[0].displayName)}
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
