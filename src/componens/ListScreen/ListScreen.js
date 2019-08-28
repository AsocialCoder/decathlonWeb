import React, { Component } from 'react';
import './ListScreen.scss';
import Images from '../Images';
import { connect } from 'react-redux';
import { otherPage } from '../../redux/action';

class ListScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state= { data : [], Province:"", City:"", Sport: ""};
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() { 
        let activitysRender = this.props.activityData.Data.map((val,index) => {     
                if(val.Province === this.state.Province || this.state.Province === "")       
                return(
                    <div className="ActivityDiv" key={index}>
                        <div className="SportName">                   
                            <div/>
                            <span>{val.ActivitySports[0].SportName}</span>
                        </div>
                        <img src={Images[index%6].src}/>
                        <div className="DetailDiv">
                            <div className="ActivityName">
                                <span >{val.ActivityName}</span>
                            </div>
                            <div className="StartDate">
                                <span >Başlangıç Tarihi: 03 Ağustos 15:00</span>
                            </div>
                            <div className="Province">
                                <span >{val.Province+"/"+val.City}</span>
                                <img src={require("../../img/icons/location.png")}/>
                            </div>
                            <div className="Description">
                                <span >{val.Description}</span>
                            </div>                            
                        </div>
                        
                        <div className="MaximumParticipants">
                            <img src={require("../../img/icons/person.png")}/>
                            <span >{val.MaximumParticipants <= 0 ? "Sınırsız" : val.MaximumParticipants}</span>
                        </div>

                        <div className="Button" onClick={() => this.props.otherPage("map")}>
                            <span >MAĞAZA ETKİNLİĞİNİ İNCELE</span>
                        </div>
                        
                        
                    </div>
                );
            });


        return (
            <div className="Body" /*ref={(ref) => { this.scrollRef = ref; }} onScroll={ ()=> console.log("asd") }*/>
                <img src={require("../../img/banner.jpg")} className="Baneer"/>

                <div className="Wrap">  

                    <form autoComplete="off"  onSubmit={this.setSearching}>

                         <select name="Province" className="dataList" onChange={this.handleInputChange}>
                            <option value="manisa">İl Seçiniz</option>
                            <option value="Manisa">Manisa</option>
                            <option value="İstanbul">İstanbul</option>
                            <option value="İzmir">İzmir</option>
                            <option value="Ankara">Ankara</option>
                        </select>
                        <select name="City" className="dataList" onChange={this.handleInputChange}>
                            <option value="manisa">Tüm İlçeler</option>
                            <option value="manisa">Manisa</option>
                            <option value="istanbul">İstanbul</option>
                            <option value="izmir">İzmir</option>
                            <option value="Ankara">Ankara</option>
                        </select>
                        <select name="Sport" className="dataList" onChange={this.handleInputChange}>
                            <option value="manisa">Spor Seçiniz</option>
                            <option value="manisa">Manisa</option>
                            <option value="istanbul">İstanbul</option>
                            <option value="izmir">İzmir</option>
                            <option value="Ankara">Ankara</option>
                        </select>
                         <input type="submit" className="submit"  value="TÜM ETKİNLİKLERDE ARA"/>

                    </form>     

                    <div className="TitleDiv">
                         <span>Tüm Etkinlikler</span>
                         <div>
                            <input type="checkbox" name="vehicle1" value="Bike"/> 
                            <span>Geçmiş Etkinlikleri Göster</span>
                         </div>                        
                    </div> 

                    <div>
                        {activitysRender}
                    </div>


                </div>
                
                
            </div>
          );
    }

    setSearching = (event) =>{
        event.preventDefault();
        this.setState({searching:true})
    }

    onScroll = (event) => {
            if(document.documentElement.scrollHeight === document.documentElement.scrollTop+document.documentElement.clientHeight)
                console.log("scroll at bottom , getting new datas")
    }
}

const mapStateToProps = (state) => {
    const { activityData } = state
    return { activityData }
  };
 
  export default connect(mapStateToProps,{otherPage})(ListScreen);