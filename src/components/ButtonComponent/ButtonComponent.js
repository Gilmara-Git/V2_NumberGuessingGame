import React from "react";
import { 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  StyleSheet, 
  View, 
  Text,
  Platform
} from "react-native";
import Themes from "../../../themes/themes";

const ButtonComponent = (props) => {
  let HybridButton = TouchableOpacity;
  if(Platform.OS === 'android' && Platform.Version >=21){
    HybridButton = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <HybridButton {...props} activeOpacity={0.5} underlayColor="#325ce6">
        <View style={{...styles.button, ...props.style}}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </HybridButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    borderRadius: 8,
    overflow: 'hidden'
  },
  button: {
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: Themes.colors.limeGreen,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Themes.fonts.glutenLight,
    fontSize: 16,
    color: Themes.colors.limeGreen,
  },
});

export default ButtonComponent;
