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
      Switch,
      TouchableHighlight,
      RefreshControl,
    } from 'react-native';
  import Day from "./Day/Day.js";
  //import ModalPicker from 'react-native-modal-picker'

  class schedule extends Component {
    state = { day: null, val: "today",};
    componentDidMount = () => {
      
      var dayValue = (
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Day key={0} day={this.state.val} />
        </View>
      );//sets the day component
      this.setState({ day: dayValue });
      //sets the day component in state
    };
     handleMenuClick = (i, v) => {
     // changes day component depending on selected value
        var tValue = (
            <View style={{ flex: 1, alignSelf: 'center', alignContent: "center" }}>
            <Day key={i} day={v} />
          </View>
        );
        
        this.setState({day: tValue});
    };
    handlePicker = data => { //Handles the value picked for day value
      if(data==="today"){
        this.setState({val: "tomorrow"});
      this.handleMenuClick(1, "tomorrow");
      }
      else if (data==="tomorrow"){
        this.handleMenuClick(0, "today");
        this.setState({val: "today"});}
    };
    

    render() {
      const picker = {
        ...Platform.select({
          ios: (
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
          selectedValue={this.state.val}
          onValueChange={() =>{
            this.handlePicker(this.state.val);
              }
          }>
                  <Picker.Item label="Today" value="today" />
                  <Picker.Item label="Tomorrow" value="tomorrow" />
          </Picker>
          ),
          android: (
            <TouchableHighlight
           style={styles.button}
           underlayColor = {'#FFC600'}
           onPress={() =>{
            this.handlePicker(this.state.val);
              }}
          >
           <Text style={{color: "#FFFFFF"}}> click to pick Day ==> <Text style={{color: "#FFC600"}}>{this.state.val}</Text> </Text>
          </TouchableHighlight>
          ),
        })
      }
  
      //console.log(this.state.picker);
      return (
          <Aux>
              <View style={{flexDirection:'row',flex: 1,alignItems: "center", alignSelf: 'center', paddingBottom: 10,}}>
              {/**/}
          {/*<Text>Today</Text>
          <Switch style={{
                width: 200,
                height: 80,
                backgroundColor: '#191919',
                shadowColor: '#006699',
                flex: 1,
                
                justifyContent: 'center',
                alignItems: 'center',
              }}
              value={this.state.picker}
              onValueChange={(value) =>{
                this.setState({picker: value});
                this.handleMenuClick(value);
                  }
              } />*/}
              {picker}
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
  
  const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#006699',
    shadowColor: '#006699',
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    justifyContent: 'center',
  }})
  