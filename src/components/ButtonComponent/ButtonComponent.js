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
  let hibridButton = TouchableOpacity;
  console.log(Platform.OS === 'android', 'android?')

  return (
    <TouchableOpacity {...props} activeOpacity={0.5} underlayColor="#325ce6">
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
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
