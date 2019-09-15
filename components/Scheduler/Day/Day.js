import React, { Component } from "react";
import {AsyncStorage} from 'react-native';
import Aux from "../../hoc/Aux";
import Activity from "../Activity/Activity";

//import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    RefreshControl,
  } from 'react-native';
import aux from "../../hoc/Aux";

//import { Typography } from "antd";

//const { Text } = Typography;
const axios = require("axios");
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
    height: 80
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 40,
    textAlign: 'center',
  }
});


//https://my-json-server.typicode.com/amad1101/test/db
class day extends Component {
  state = {
    data: [], //data daily
    today: this.props.day, //The day
    results: null, //axios results buffer
    EndDate: null, //Activity validator
    hasError: false, //Error boundaries
    Drexel: {colors: ['#FFC600', '#006699'], start: [1, 0], end: [0.5, 0],},//colors for Drexel events
    Reg: {colors: ['#006699', '#FFC600'], start: [1, 0], end: [0.2, 0],},
    refreshing: false,
    Values: null,
  };


  _storeData = async (val) => {
    try {
      await AsyncStorage.setItem('Schedule', JSON.stringify(val));
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Schedule');
      if (value !== null) {
        // We have data!!
        //console.log(value);
      }
      return value
    } catch (error) {
      return null
    }
  };

  async componentDidMount() {

    stored = this._retrieveData()
    
    if (stored !== null ) {
      var day = new Date();
      if (stored[0] != undefined && day == stored[0].Start.match(/[0-2][0-9][:][0-5][0-9]/i)[0]){
        console.log("Cache")
        // stored if up to date
        res = stored
      }
      else{
        // async for axios and data management if stored is not up to date
        //console.log("reg")
        var res = await this.axiosHandler();
      }
    }
    else{
      // async for axios and data management if stored is null
      //console.log("reg")
      var res = await this.axiosHandler();
    }

    //load the data per hour 
    var final = this.dataLoad(res);
    
    
    
    //set state
    this.setState({ data: final, results: res });
  };

  axiosHandler = () => {
    //Axios
    //Get values
    return axios
      .get("https://iplogger.org/2oUcz")
      .then(response => {
       
        
        
        // handle success
        //console.log ("Props: ",this.props.day)
        console.log(response);
        var res = response.data;
        //console.log(res);
        this._storeData(res);
        
        return res;
        // console.log ("res: ",res)
        // if(this.props.day === "Today")
        // {return res.today}
        // else if(this.props.day === "Tomorrow")
        // {return res.tomorow}
      })
      .catch(function(error) {
        // handle error
        //console.log(error);
      });
  };

  dataLoad = (res) => {
    //logic for validati
    console.log(res);
    if (this.state.today=="today"){
      Val = res.today;
      
    }else{
      Val = res.tomorow;
    }
    console.log("Val");
    console.log(Val);
    if(Val==null){
      this.setState({ Values:null });
    }else{
      this.setState({ Values:0 });
    }
    
    //console.log(res.tomorow);
    dataSource = [];
    //console.log(this.state.today);
    //Changhe the date with regex
    for (var x = 0; x < Val.length; x++){
        // console.log("here")
        // console.log(Val[x][y])
      Val[x].Start = (Val[x].Start.match(/[0-2][0-9][:][0-5][0-9]/i)[0]);
      //console.log(x, "=Done=>", Val[x].Start);
      Val[x].End = (Val[x].End.match(/[0-2][0-9][:][0-5][0-9]/i)[0]);

      dataSource.push(Val[x])

      }
    //console.log(dataSource);
    return dataSource;
  };
  
  async _onRefresh() {
    this.setState({refreshing: true});
    this.forceUpdate();
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    this.setState({refreshing: false});
  }

  render() {
   //console.log(this.state.data);
    if (this.state.Values == 0){
      //console.log("here");
    const Rows = this.state.data.map((data, key) => {
      //console.log(data.End);
      //Rows of table
      //maping time and activity.stat to end en props du component Activity
      // console.log(EndDate);
      return (
         <Activity
         key={key}
              start={data.Start}
              end={data.End}
              title={data.Title}
              sub={data.Location}
              type={this.state.Drexel}
            />
      );
    });
    return (<ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>
        } >
          <View style= {styles.title}>
            <Button
            title="Refresh"
            color='#006699'
            onPress={() => this._onRefresh()}
          /></View>
      {Rows}</ScrollView>);
    }
    else{
        return (<ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>
            } >
              <View style= {styles.title}>
                <Button
                title="Refresh"
                color='#006699'
                onPress={() => this._onRefresh()}
              /></View><Text style={styles.text}>Nothing Scheduled for the current Day </Text></ScrollView>);
        }
  }
}
export default day;


