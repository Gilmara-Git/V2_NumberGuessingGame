import React from "react";

import { View, Text, StyleSheet } from "react-native";
import Themes from "../../../themes/themes";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
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
    fontSize: 25,
    fontFamily: Themes.fonts.glutenExtraBold,
  },
});

export default Header;
