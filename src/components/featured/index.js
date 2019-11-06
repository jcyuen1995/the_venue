import React, {Component} from 'react';
import Carrousel from './Carrousel'
import TimeUntil from './TimeUntil'

class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: this.props.deadline,
            name: this.props.name
        };
    }

    shouldComponentUpdate(nextState) {
        return this.state.deadline !== nextState.deadline;
    }

render() {
    return (
        <div style = {{position: 'relative'}}>
            
            <Carrousel/>
            <div className = "artist_name">
                <div className = "wrapper">
                    {this.state.name}
                </div>
            </div>
            <TimeUntil time = {this.state.deadline}/>
            
        </div>
        );
    };
}

export default Featured;