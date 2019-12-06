
import React from 'react';

import {HotSpots} from '../webpages/HotSpots';
import {NavBarHam} from '../components/NavBarHam';

export class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            country: '',
            loadNext: false,
            currentView: [],
            showForm:true
        }
        console.log("Home Page Entered")
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    };


    //React lifeCycles
    componentDidMount() {
        console.log("HomePage Component Mounted");
    }
    componentDidUpdate() {
        console.log("HomePage Updated ");

    }
    componentWillUnmount() {
        console.log("HomePage Unmounted")
    }


    //form event handlers
    submitHandler = (e) => {
        e.preventDefault();
        this.setState({ currentView: <HotSpots country={this.state.country}></HotSpots>, showForm:false })

    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ country: e.target.value });
    }


    render() {
        return (
            <div>
                
                <div style = {this.state.showForm ? {}: {display:'none'}}>
                    <h1>The country you want is : {this.state.country}</h1>
                    <form onSubmit={this.submitHandler}>
                        <input
                            type='text'
                            defaultValue="Enter a Country!"
                            name="Country"
                            onChange={this.handleChange}>
                        </input>

                        <button type='submit' value="go" name="goTo">Go!</button>
                        <button type='submit' value="randomize" name="randomize">Random</button>
                    </form>
                </div>

                {this.state.currentView}
            </div>
        )

    }

}
