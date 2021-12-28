import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import MainTitle from "../../src/components/MainTitle/MainTitle";
import Themes from "../../themes/themes";
import ButtonComponent from "../../src/components/ButtonComponent/ButtonComponent";


const GameOver = (props) => {
  const { roundsCount, userNumber } = props;
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateWidth = () => {
      setDeviceWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateWidth);
    return () => {
      Dimensions.removeEventListener("change", updateWidth);
    };
  })

  return (
    <ScrollView>
    <View style={styles.gameOverScreen}>
      <MainTitle>
        <Text style={{fontSize: deviceWidth <=320 ? 35 : 45}}>Play Again</Text>
      </MainTitle>
      <View style={
        {
          ...styles.imageContainer, 
          width: deviceWidth <=320 ? 250 :300, 
          height: deviceWidth <=320 ? 250 :300,
          marginVertical: deviceWidth <=320 ? 2: 20
          }}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFmC1jjg7yypFXXUvG3s8_G1yJxVgE7WYpIg&usqp=CAU",
          }}
        />
      </View>

      <Text style={styles.final}>
        Rounds Taken:
        <Text style={styles.finalNumber}> {roundsCount}</Text>
      </Text>
      <Text style={styles.final}>
        Your Number:
        <Text style={styles.finalNumber}> {userNumber}</Text>
      </Text>
      
        <ButtonComponent
          onPress={props.onGameOver}
          style={styles.startOverButton}
        >
          <Text style={styles.buttonTitle}>START OVER</Text>
        </ButtonComponent>
 
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameOverScreen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  // title: {
  //   fontSize: 45,
  // },
  imageContainer: {
    // width: 300,
    // height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Themes.colors.limeGreen,
    backgroundColor: Themes.colors.black,
    overflow: "hidden",
    // marginVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  startOverButton: {
    backgroundColor: Themes.colors.darkBlue,
    borderRadius: 8,
    width: "50%",
  },
  buttonTitle: {
    fontSize: 22,
  },
  final: {
    fontSize: 22,
    color: Themes.colors.limeGreen,
    textAlign: "center",
    fontFamily: Themes.fonts.glutenRegular,
    // marginVertical: 2,
    marginBottom: 25
  },
  finalNumber: {
    color: Themes.colors.darkBlue,
    fontSize: 30,
    letterSpacing: 2,
    fontFamily: Themes.fonts.glutenSemiBold,
  },
});

export default GameOver;
