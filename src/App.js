import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListScreen from './componens/ListScreen/ListScreen'
import MapScreen from './componens/MapScreen/MapScreen'
import { connect } from 'react-redux';
import { editActivityData } from './redux/action';
import list from './componens/list'

class App extends React.Component{

  constructor(props){
    super(props);
    const { navigation } = this.props;
}
 
 render(){
  this.props.editActivityData(list);
  if(this.props.page == "list")
  return (
    <ListScreen />
  );
  else
  return (
    <MapScreen />
  );
 } 
}

const mapStateToProps = (state) => {
  const { activityData, page} = state
  return { activityData, page }
};

export default connect(mapStateToProps,{editActivityData})(App);
