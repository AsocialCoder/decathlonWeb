import React, { Component } from 'react';
import './MapScreen.scss';
import Images from '../Images';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { otherPage } from '../../redux/action';

class MapScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state= { data : [] , selectedIndex:null, zoom:6, center:[39.91987, 32.85427]};

        
       
    }

    render() { 

        let activitysRender = this.props.activityData.Data.map((val,index) => {
            return(
                <div className="ActivityDiv" key={index} 
                ref={val.Id} style={this.state.selectedIndex == val.Id ? {backgroundColor:"yellow"}:null}>
                    <img src={Images[index%6].src}/>
                    <div className="DescriptionDiv">
                        <span className="ActivityName">{val.ActivityName}</span>
                        <span className="Description">{val.Description}</span>
                        <span className="Address">{val.Address}</span>
                    </div>                       

                    <div className="Button"  onClick={() => this.showOnMap(val)}  >
                        <span >ETKİNLİK DETAYLARI</span>
                    </div>

                </div>
            );
        });

        let markerRender = this.props.activityData.Data.map((val,index) => {            
            return(

                <img src={require('../../img/icons/markerRun.png')}  
                className="mapMarker" 
                onClick={() => this.showActivityDiv(val)}  
                lat={val.ActivityLat}
                lng={val.ActivityLng}
                />

            );
        });


        return (
            <div className="Body">

            <div className="ActivitiesSide">
                <div className="ButtonArea">
                    <div className="Button" style={{backgroundColor:"yellow"}}>
                        <img src={require("../../img/icons/runner.png")} />
                    </div>
                    <div className="Button">
                        <img src={require("../../img/icons/store.png")} />
                    </div>
                </div>

                <div className="ActivitiesArea" onClick={() => console.log(this.refs)}>  

                    {activitysRender}

                </div>

            </div>

            <div className ="MapSide">

                <form autoComplete="off">
                    <select name="İl" className="dataList">
                    <option value="manisa">İl Seçiniz</option>
                    <option value="manisa">Manisa</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="izmir">İzmir</option>
                    <option value="Ankara">Ankara</option>
                    </select>
                    <select name="İlçe" className="dataList">
                    <option value="manisa">Tüm İlçeler</option>
                    <option value="manisa">Manisa</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="izmir">İzmir</option>
                    <option value="Ankara">Ankara</option>
                    </select>
                    <select name="Spor" className="dataList">
                    <option value="manisa">Spor Seçiniz</option>
                    <option value="manisa">Manisa</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="izmir">İzmir</option>
                    <option value="Ankara">Ankara</option>
                    </select>
                    <input type="submit" className="submit"  value="TÜM ETKİNLİKLERDE ARA"/>

                </form>     

                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={[39.91987, 32.85427]}
                    defaultZoom={6}
                    center={this.state.center}
                    lat={this.state.lat} lng={this.state.lag}
                    zoom={this.state.zoom}
                    >
                    
                    {markerRender}
                    </GoogleMapReact>
            </div>
                
                
            </div>
          );
    }

    showActivityDiv = (val) =>{
        this.refs[val.Id].scrollIntoView(); 
        if(this.state.zoom == 10)
            this.state.zoom+=1;
        else
            this.state.zoom=10;

        this.setState({selectedIndex:val.Id,center:[parseFloat(val.ActivityLat),parseFloat(val.ActivityLng)],zoom:this.state.zoom});
    }

    showOnMap = (val) =>{
        if(this.state.zoom == 12)
            this.state.zoom+=1;
        else
            this.state.zoom=12;

        this.setState({selectedIndex:val.Id,center:[parseFloat(val.ActivityLat),parseFloat(val.ActivityLng)],zoom:this.state.zoom});
    }


}

const mapStateToProps = (state) => {
    const { activityData } = state
    return { activityData }
  };
 
  export default connect(mapStateToProps,{otherPage})(MapScreen);
