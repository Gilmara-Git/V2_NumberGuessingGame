import React, { useState, useEffect } from "react";

import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions 

} from "react-native";
import Themes from "../../../themes/themes";

const Header = (props) => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  console.log(deviceWidth)
  console.log(deviceHeight)


useEffect(()=>{
  const updateDimensions = ()=>{
    setDeviceWidth(Dimensions.get('window').width);
    setDeviceHeight(Dimensions.get('window').height);
  }

  Dimensions.addEventListener("change", updateDimensions);
  return ()=>{
    Dimensions.removeEventListener("change", updateDimensions);
  }
});

  return (
    <View style={styles.container}>
      <Text style={{...styles.text, fontSize: deviceWidth >= 320 ? 20 : 25}}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: Themes.colors.darkBlue,
    width: "100%",
  },
  text: {
    color: Themes.colors.limeGreen,  
    fontFamily: Themes.fonts.glutenExtraBold,
  },
});

export default Header;
