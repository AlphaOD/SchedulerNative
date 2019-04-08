import React, { Component } from "react";
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
    Drexel: {colors: ['#FFC600', '#006699'], start: [1, 0], end: [0.5, 0],},
    Reg: {colors: ['#006699', '#FFC600'], start: [1, 0], end: [0.2, 0],}
  };

  async componentDidMount() {
    // async for axios and data management
    var res = await this.axiosHandler();
    //load the data per hour 
    var final = this.dataLoad(res);
    console.log(final);
    //set state
    console.log ("here it is")
    this.setState({ data: final, results: res });
  }
    


  axiosHandler = () => {
    //Axios
    //Get values
    return axios
      .get("https://my-json-server.typicode.com/amad1101/test/db")
      .then(response => {
        // handle success

        //RegEx for day when new component will be created
        /* const day = today();
            const Comp = response.data.bookings;
            var res = null;
            for (var x = 0; x < Comp.length; x++) {
              if (Comp[x].Start.match(/[0-9][0-9][0-9][0-9][-][0-1][0-9][-][0-3][0-9]/i)[0] === day){
                res.push(Comp[x]);
              } ;
              //console.log(x, "=Done=>", Values[x].Start);
            }*/
            console.log ("Props: ",this.props.day)
        var res = response.data;
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
    var EndDate = null;
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


