import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Themes from "../../../themes/themes";

const MainTitle = (props) => {
  return (
    <View style={{ ...styles.titleContainer, ...props.style }}>
      <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    marginBottom: 25,
  },
  title: {
    marginTop: 10,
    fontFamily: Themes.fonts.glutenBold,
    color: Themes.colors.darkBlue,
    fontSize: 35,
    letterSpacing: 2,
  },
});

export default MainTitle;
