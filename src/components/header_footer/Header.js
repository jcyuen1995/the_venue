import React, { Component } from 'react';

import {AppBar , Toolbar, IconButton, InputBase} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


import SideDrawer from './SideDrawer';


const searchStyle = {
    base: {
        color: "#ffffff",
    }
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            headerShow: false,
            fromChild: ''
        };
    }

    

    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll);
    }


    handleScroll = () => {
        if(window.scrollY > 0){
            this.setState({
                headerShow: true
            })
        } else {
            this.setState({
                headerShow: false
            })
        }
    }


    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
    }

    handleChange = (e) => {
        if(e.keyCode === 13){
            this.setState({query: e.target.value})
            this.props.q(this.state.query)
        } else {
        this.setState({ query: e.target.value });
        }
    }

    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent',
                    boxShadow: 'none',
                    padding: '10px 0px'
                }}
            >
                <Toolbar>

                    <div className="header_logo">
                        <div className="font_righteous header_logo_venue">Musical Events</div>
                        <div className="header_logo_title">Countdown</div>
                    </div>
                    <div style = {searchStyle}>
                        
                        <InputBase
                            placeholder= "Search…"
                            inputProps= {{ 
                                'aria-label': 'search',
                                style:{color: "white"}
                            }}
                            value = {this.state.query}
                            onChange = {this.handleChange}
                            onKeyDown = {this.handleChange}
                        >
                        </InputBase>
                    </div>
                    <IconButton
                        aria-label="Search"
                        color = "inherit"
                        onClick = {this.handleChange}
                    >
                        <SearchIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="Menu"
                        color="inherit"
                        onClick={()=> this.toggleDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton> 

                    <SideDrawer
                        open={this.state.drawerOpen}
                        onClose={(value)=> this.toggleDrawer(value)}
                    />


                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;