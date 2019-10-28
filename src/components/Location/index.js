import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { myConfig } from '../../config';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative'
    };

const containerStyle = {
    position: 'relative', 
    width: '100%', 
    height:'500px'
}
const myKey = myConfig.MY_KEY;



class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            showInfoWindow: false,
            long: this.props.lng,
            lat: this.props.lat,
            desc: this.props.desc,
            locationDetails: this.props.locationDetails
        }
    }
    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
        activeMarker: null,
        showingInfoWindow: false
    });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    };


    render() {
        return (
            <div className = "location_wrapper">
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    containerStyle = {containerStyle}
                    initialCenter={{
                    lat: this.state.lat,
                    lng: this.state.long
                    }}
                >
                    <Marker
                        name={this.state.desc}
                        position={{lat: this.state.lat, lng: this.state.long}}
                        onClick={this.onMarkerClick}
                        />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                        >
                        <div>
                            <h3 style = {{
                                textAlign: "center"
                            }}
                            >
                            {this.state.desc}</h3>
                            <h4 style = {{
                                textAlign: "center"
                            }}
                            >
                            {this.state.locationDetails}</h4>
                        </div>
                    </InfoWindow>
                </Map>
            <div className = "location_tag">
                <div>
                    <h3 style = {{
                        margin: "0"
                    }}
                    >Location</h3>
                    <h4 style = {{
                        fontSize: "10px"
                    }}
                    >(Click Marker for Details)</h4>
                </div>
            </div>
        </div>
        );
    }
}

export default GoogleApiWrapper({
        apiKey: `${myKey}`
    })(index);