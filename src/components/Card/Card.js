import React from "react";
import { View, StyleSheet } from "react-native";
import Themes from "../../../themes/themes";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Themes.colors.limeGreen,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 8,
    elevation: 5,
  },
});

export default Card;
