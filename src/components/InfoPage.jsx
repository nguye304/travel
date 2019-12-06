import React from 'react';

export class InfoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            country:this.props.country,
        };
        console.log("Info Page Entered")
    };



    render(){
        return(
            <div>
                <h1>InfoPage</h1>
            </div>
        )
    }

}