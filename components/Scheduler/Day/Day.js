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
  } from 'react-native';
import aux from "../../hoc/Aux";

//import { Typography } from "antd";

//const { Text } = Typography;
const axios = require("axios");
var moment = require('moment');


//https://my-json-server.typicode.com/amad1101/test/db
class day extends Component {
  state = {
    data: [], //data daily
    today: this.props.day, //The day
    results: null, //axios results buffer
    EndDate: null, //Activity validator
    hasError: false, //Error boundaries
    Drexel: {colors: ['#FFC600', '#006699'], start: [1, 0], end: [0.5, 0],},//colors for Drexel events
    Reg: {colors: ['#006699', '#FFC600'], start: [1, 0], end: [0.2, 0],}
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
        console.log(value);
      }
      return value
    } catch (error) {
      return null
    }
  };

  async componentDidMount() {

    stored = this._retrieveData()
    console.log(stored)
    if (stored !== null ) {
      var today = new Date();
      if (stored[0] != undefined && today == stored[0].Start.match(/[0-2][0-9][:][0-5][0-9]/i)[0]){
        // stored if up to date
        res = stored
      }
      else{
        // async for axios and data management if stored is not up to date
        var res = await this.axiosHandler();
      }
    }
    else{
      // async for axios and data management if stored is null
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
      .get("https://grabify.link/KMY47A")
      .then(response => {
        
        
        // handle success
        console.log ("Props: ",this.props.day)
        var res = response.data[0].dah;
        //console.log(res);
        this._storeData(res);
        return res;
        //console.log ("res: ",res)
        if(this.props.day === "Today")
        {return res.today}
        else if(this.props.day === "Tomorrow")
        {return res.tomorow}
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  dataLoad = (res) => {
    //logic for validation
    const Values = res;
    var dataSource = []
    //Changhe the date with regex
    for (var x = 0; x < Values.length; x++) {
      //console.log(x, "=Before=>", Values[x].Start);
      console.log("here")
      console.log(Values[x])
      Values[x].Start = (Values[x].Start.match(/[0-2][0-9][:][0-5][0-9]/i)[0]);
      //console.log(x, "=Done=>", Values[x].Start);
      Values[x].End = (Values[x].End.match(/[0-2][0-9][:][0-5][0-9]/i)[0]);
    }
    //console.log(Values[0].Start.match(/[0-2][0-9][:][0-5][0-9]/i)[0]);
    //SET STATE
    //console.log("data", dataSource);
    //fills the activities
    for (x = 0; x < Values.length; x++) {
          //console.log(dataSource[i].time);
          dataSource.push(Values[x]);
          // console.log(dataSource[i]);
    }
    console.log(dataSource);
    return dataSource;
  };
  
  render() {
   // console.log(this.state);
    if (this.state.data !== null){
    const Rows = this.state.data.map((date, id) => {
      //console.log(date);
      //Rows of table
      //maping time and activity.stat to end en props du component Activity
      // console.log(EndDate);
      return (
         <Activity
         key={id}
              start={date.Start}
              end={date.End}
              title={date.Title}
              sub={date.Location}
              type={this.state.Drexel}
            />
      );
    });
    return <Aux>{Rows}</Aux>
    }
    else{
        return (<text>Nothing Scheduled for the current Day </text>);
        }
  }
}
export default day;


