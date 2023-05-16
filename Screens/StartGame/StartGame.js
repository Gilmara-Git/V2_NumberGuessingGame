import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Platform
} from "react-native";

import MainTitle from "../../src/components/MainTitle/MainTitle";
import Card from "../../src/components/Card/Card";
import ButtonComponent from "../../src/components/ButtonComponent/ButtonComponent";
import NumberInput from "../../src/components/NumberInput/NumberInput";
import Themes from "../../themes/themes";

const StartGame = (props) => {
  const [initialNumber, setInitialNumber] = useState();
  // const [userConfirmation, setUserConfirmation] = useState(false);
  const [confirmedNumber, setConfirmedNumber] = useState();
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateHeight = () => {
      setDeviceHeight(Dimensions.get("window").height);
    };

    const updateHeightDim  = Dimensions.addEventListener("change", updateHeight);
    return () => {
      updateHeightDim.remove();
      // Dimensions.removeEventListener("change", updateHeight);
    };
  });

  const textChangeHandler = (numberEntered) => {
    setInitialNumber(numberEntered.replace(/[\D]/g, ""));
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(initialNumber);

    if (chosenNumber > 149 || isNaN(chosenNumber) || chosenNumber < 1) {
      Alert.alert("Message", "Please enter a number between 1 and 149", [
        {
          text: "Return",
          style: "destructive",
          onPress: () => {
            resetHandler();
          },
        },
      ]);
      return;
    }
    // setUserConfirmation(true);
    setConfirmedNumber(chosenNumber);
    setInitialNumber("");
    Keyboard.dismiss();
  };

  let displayConfirmedNumber;
  if (confirmedNumber) {
    displayConfirmedNumber = (
      <Card
        style={{
          ...styles.confirmedNumberContainer,
          margin: deviceHeight > 500 ? 10 : 20,
        }}
      >
        <View style={styles.displayeNumber}>
          <MainTitle style={styles.numberTitle}>YOUR NUMBER:</MainTitle>
          <View style={styles.showNumber}>
            <Text style={styles.number}>{confirmedNumber}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <ButtonComponent
              onPress={() => {
                props.hasNumber(confirmedNumber);
              }}
              style={styles.startButton}
            >
              <Text style={styles.buttonText}>START</Text>
            </ButtonComponent>
          </View>
        </View>
      </Card>
    );
  }

  const resetHandler = () => {
    setInitialNumber("");
    setConfirmedNumber(false);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.startGameContainer}>
          <MainTitle
            style={{
              fontSize: deviceHeight > 500 ? 30 : 35,
              marginBottom: deviceHeight > 500 ? 2 : 25,
            }}
          >
            START GAME
          </MainTitle>
          <Card style={styles.card}>
            <MainTitle style={styles.mainTitleContainer}>
              <Text style={styles.mainTitletext}>PICK A NUMBER</Text>
            </MainTitle>
            <View style={styles.cardElements}>
              <NumberInput
                onChangeText={textChangeHandler}
                value={initialNumber}
              />
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonSize}>
                  <ButtonComponent onPress={resetHandler}>
                    RESET
                  </ButtonComponent>
                </View>
                <View style={styles.buttonSize}>
                  <ButtonComponent onPress={confirmHandler}>
                    CONFIRM
                  </ButtonComponent>
                </View>
              </View>
            </View>
          </Card>
          {displayConfirmedNumber}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  startGameContainer: {
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: Themes.colors.darkBlue,
    padding: 4,
  },
  mainTitleContainer: {
    height: 25,
    margin: 10,
  },
  mainTitletext: {
    fontSize: 18,
    color: Themes.colors.limeGreen,
  },
  cardElements: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  buttonSize: {
    width: "40%",
  },
  confirmedNumberContainer: {
    width: 300,
    height: 200,
    margin: 20,
  },
  displayeNumber: {
    alignItems: "center",
  },
  numberTitle: {
    fontSize: 18,
    marginBottom: 0,
  },
  showNumber: {
    borderColor: Themes.colors.darkBlue,
    borderWidth: 2,
    borderRadius: 8,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.limeGreen,
  },
  number: {
    fontSize: 30,
    color: Themes.colors.darkBlue,
    fontFamily: Themes.fonts.glutenSemiBold,
    backgroundColor: Themes.colors.limeGreen,
  },
  buttonWrapper:{
    marginTop:20,
    width: "60%",
  },
  startButton: {    
    backgroundColor: Themes.colors.darkBlue,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default StartGame;
