import React, { Component } from "react";
import Aux from "../hoc/Aux";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Picker,
    View,
  } from 'react-native';
import Day from "./Day/Day.js";
//import ModalPicker from 'react-native-modal-picker'

function today(x = 0) {
  var tempDate = new Date();
  return (
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    String(Number(tempDate.getDate()) + Number(x))
  );
}
class schedule extends Component {
  state = { day: null, picker: "Today"};
  componentDidMount = () => {
    var dayValue = (
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Day key={0} day={this.state.picker} />
      </View>
    );
    //console.log(this.state);
    this.setState({ day: dayValue });
    //console.log(this.state);
  };
   handleMenuClick = (index, value) => {
   // console.log(VAL);
      var tValue = (
          <View style={{ flex: 1, alignSelf: 'center', alignContent: "center" }}>
          <Day key={index} day={value} />
        </View>
      );
      this.setState({ day: tValue});
  };

  handlePicker = data => {
    this.setState({picker: data});
    if(data==="Today"){
    this.handleMenuClick(1, data);}
    else if (data==="Tomorrow"){this.handleMenuClick(2, data);}
  };

  render() {
console.log(this.state.picker);
const data = [
  { key: index++, section: true, label: 'Today' },
  { key: index++, label: 'Tomorow' }]
    return (
        <Aux>
            <View style={{flex: 1, alignSelf: 'stretch', paddingBottom: 10,}}>
            <Picker
            style={{
              width: 200,
              height: 80,
              backgroundColor: '#191919',
              shadowColor: '#006699',
              alignSelf: "center",
              justifyContent: 'center',
            }}
            itemStyle={{
              color: '#FFC600',
              textShadowColor: '#006699',
            }}
        selectedValue={this.state.picker}
        onValueChange={(itemValue, itemIndex) =>{
          this.setState({picker: itemValue});
          this.handleMenuClick(itemIndex, itemValue);
            }
        }>
                <Picker.Item label="Today" value="Today" />
                <Picker.Item label="Tomorrow" value="Tomorrow" />
        </Picker>
        {/*<ModalPicker
                    data={this.data}
                    initValue="Select something yummy!"
                    onChange={
                    (option) =>{
                      console.log(option);
                      this.setState({picker: option.label});
                      this.handleMenuClick(option.key, option.label);
                        }} />*/}
        
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'stretch', paddingTop: 15,}}>{this.state.day}</View>
        </Aux>
    );
  }
}
export default schedule;
