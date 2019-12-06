import React from 'react';
import { loadModules } from 'esri-loader';
import '../styles/WebMap.css';

export class CountryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destLong: 0,
            destLat: 0,
            esriSearch: '',
            esriMap: '',
            esriMapView: '',
            esriGraphic:''
        }

        this.mapRef = React.createRef();
        this.findCountry = this.findCountry.bind(this);
        this.drawMap = this.drawMap.bind(this);


    }

    findCountry = () => {//find the coordinates of the destination
        var searchWidget = new this.state.esriSearch({
            view: this.view,
            searchTerm: this.props.country,
        })
        searchWidget.search();
        searchWidget.on('search-complete', e => {
            console.log(e);
            if(e.numResults === 0){
                console.log(this.props.country + ' was not found.')
            }
            else{
                let lat = e.target.results[0].results[0].feature.geometry.latitude;
                let long = e.target.results[0].results[0].feature.geometry.longitude;
                this.setState({ destLong: long, destLat: lat });
            }
          

        })
    }

    drawMap = () => {
        console.log(this.state.esriMap)
        const map = new this.state.esriMap({
            basemap: 'topo'
        })
        this.view = new this.state.esriMapView({
            container: this.mapRef.current,
            map: map,
            zoom: 4,
            center: [this.state.destLong, this.state.destLat]
        })

        this.view.on('click', (e) => {
            //console.log(e);
            console.log("Longitude: " + e.mapPoint.longitude + " Latitude: " + e.mapPoint.latitude);
            var geom = {
                type:"point",
                longitude: e.mapPoint.longitude,
                latitude: e.mapPoint.latitude
            }
    
            var symbol = {
                type:'simple-marker',
                color:'red'
            }
            
            var graphic = new this.state.esriGraphic({geometry:geom,symbol:symbol});
            this.view.graphics.add(graphic);

        });
    }

    componentDidMount = () => { //when the component is first mounted. load your required modules and then add them to state for easy use
        loadModules([
            'esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/widgets/Search',
        ], { css: true })
            .then(([Map, MapView, Graphic, Search,]) => {

                this.setState({ 
                    esriSearch: Search, 
                    esriMap: Map, 
                    esriMapView: MapView, 
                    esriGraphic:Graphic
                });

                this.findCountry();

            })
            .catch((err) => { console.log(err); })
    }


    componentDidUpdate = () => {
        console.log("map updated");
        this.drawMap();
    }

    render() {
        return (
            <div>
                <h1>Map</h1>
                <div className="countryMap" ref={this.mapRef}></div>
                <h1>Longitude: {this.state.destLong}</h1>
                <h1>Latitude: {this.state.destLat}</h1>

            </div>
        )
    }
}