import React from 'react';

import {CountryMap} from '../components/CountryMap';
import '../styles/WebMap.css';

export class HotSpots extends React.Component{
    constructor(props){
        console.log("HotSpots Entered");
        super(props);
        this.state = {
            something: ''
        }
        this.mapRef = React.createRef();
    }
    
    componentDidMount = () => {console.log("HotSpots Mounted")};
    componentDidUpdate = () => {console.log("HotSpots Updated")}


    render(){
        return(
            <div>
                <h1>HotSpots</h1>
                <CountryMap country ={this.props.country}></CountryMap>
               
            </div>
        )
    }
}