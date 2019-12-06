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
            esriGraphic:'',
            esriGraphicLayer:'',
            esriFeatureLayer:''
        }

        this.mapRef = React.createRef();
        this.findCountry = this.findCountry.bind(this);
        this.drawMap = this.drawMap.bind(this);
        this.findAddress = this.findAddress.bind(this);
        this.createPath = this.createPath.bind(this);


    }

    findAddress = () =>{

        
    }

    createPath = (pathLayer) =>{
        
        let lineCoords = [];
        //console.clear();
     
        if(this.view.graphics.length > 1){
            console.log("inside the draw line with more than one point")
            //draw a line between them
            pathLayer.removeAll();
            console.log('length: ', this.view.graphics.length);
            for(let i = 0 ; i < this.view.graphics.length ; i++){
                let x = this.view.graphics.items[i].geometry.longitude;
                let y = this.view.graphics.items[i].geometry.latitude;
                

                lineCoords.push([x,y]);
            }
       
            console.log('Line Coords: ',lineCoords);
            var line = {
                type:'polyline',
                paths:lineCoords
            };
            var lineSymbol = {
                type:'simple-line',
                color:'green',
                width:4
            };
            var lineGraphic = new this.state.esriGraphic({
                geometry:line,
                symbol: lineSymbol,

            });
            pathLayer.add(lineGraphic);


        }
        else{
            console.log('theres only 1 point.');
        }

    }

    findCountry = () => {//find the coordinates of the destination
        var searchWidget = new this.state.esriSearch({
            view: this.view,
            searchTerm: this.props.country,
        })
        searchWidget.search();
        searchWidget.on('search-complete', e => {
            //console.log(e);
            if(e.numResults === 0){
                //console.log(this.props.country + ' was not found.')
            }
            else{
                let lat = e.target.results[0].results[0].feature.geometry.latitude;
                let long = e.target.results[0].results[0].feature.geometry.longitude;
                this.setState({ destLong: long, destLat: lat });
            }
          

        })
    }

    drawMap = () => {
        const map = new this.state.esriMap({
            basemap: 'topo'
        })
        this.view = new this.state.esriMapView({
            container: this.mapRef.current,
            map: map,
            zoom: 4,
            center: [this.state.destLong, this.state.destLat]
        })
        var pathLayer = new this.state.esriGraphicLayer({id:'paths'})
        
        map.add(pathLayer);

        this.view.on('click', (e) => {
            console.log('The event that was received onclick: ', e);
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
            this.findAddress();
            
            this.createPath(pathLayer);
        });
        this.view.on('double-click', (e)=> {
            console.log('hello from dbl clck'); 
            this.view.graphics.removeAll()
            pathLayer.removeAll();
            //console.log(e);
    
        });

   

    }

    componentDidMount = () => { //when the component is first mounted. load your required modules and then add them to state for easy use
        loadModules([
            'esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/widgets/Search','esri/layers/GraphicsLayer','esri/layers/FeatureLayer'
        ], { css: true })
            .then(([Map, MapView, Graphic, Search,GraphicLayer,FeatureLayer]) => {

                this.setState({ 
                    esriSearch: Search, 
                    esriMap: Map, 
                    esriMapView: MapView, 
                    esriGraphic:Graphic,
                    esriGraphicLayer:GraphicLayer,
                    esriFeatureLayer:FeatureLayer
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