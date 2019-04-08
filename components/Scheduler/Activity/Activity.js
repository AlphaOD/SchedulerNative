import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import { ListItem } from 'react-native-elements';

export default activity = (props) => { //list Item stateless component to create an activity for the day component
  return (
    <View style={styles.Elements}>
  <ListItem
  key={1}
  Component={TouchableScale}
  friction={90} //
  tension={100} // These props are passed to the parent component (here TouchableScale)
  activeScale={0.95} //
  linearGradientProps={props.type}
  title={props.title}
  titleStyle={{ color: 'white', fontWeight: 'bold' }}
  subtitleStyle={{ color: 'white' }}
  subtitle="Reserved"
  rightTitle={props.start}
  rightSubtitle={props.end}
  rightTitleStyle={{ color: 'black' }}
  rightSubtitleStyle={{ color: 'black' }}
/>
</View>
  );
};

const styles = StyleSheet.create({
    Elements: {
      marginBottom: 5,
    }})