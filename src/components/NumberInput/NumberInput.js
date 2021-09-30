import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Themes from "../../../themes/themes";

const NumberInput = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      keyboardType="number-pad"
      maxLength={3}
      blurOnSubmit
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: Themes.colors.limeGreen,
    width: 50,
    height: 30,
    color: Themes.colors.limeGreen,
    textAlign: "center",
    fontSize: 30,
    fontFamily: Themes.fonts.glutenRegular,
  },
});

export default NumberInput;
