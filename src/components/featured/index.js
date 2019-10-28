import React from 'react';
import Carrousel from './Carrousel'
import TimeUntil from './TimeUntil'

const Featured = (props) => {
    return (
        <div style = {{position: 'relative'}}>
            
            <Carrousel/>
            <div className = "artist_name">
                <div className = "wrapper">
                    Arianna Grande
                </div>
            </div>
            <TimeUntil time = {props}/>
        </div>

        
    );
};

export default Featured;