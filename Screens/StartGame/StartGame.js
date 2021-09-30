import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import MainTitle from "../../src/components/MainTitle/MainTitle";
import Card from "../../src/components/Card/Card";
import ButtonComponent from "../../src/components/ButtonComponent/ButtonComponent";
import NumberInput from "../../src/components/NumberInput/NumberInput";
import Themes from "../../themes/themes";

const StartGame = (props) => {
  const [initialNumber, setInitialNumber] = useState();
  const [userConfirmation, setUserConfirmation] = useState(false);
  const [confirmedNumber, setConfirmedNumber] = useState();

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
    setUserConfirmation(true);
    setConfirmedNumber(chosenNumber);
    setInitialNumber("");
    Keyboard.dismiss();
  };

  let displayConfirmedNumber;
  if (confirmedNumber) {
    displayConfirmedNumber = (
      <Card style={styles.confirmedNumberContainer}>
        <View style={styles.displayeNumber}>
          <MainTitle style={styles.numberTitle}>YOUR NUMBER:</MainTitle>
          <View style={styles.showNumber}>
            <Text style={styles.number}>{confirmedNumber}</Text>
          </View>
          <ButtonComponent
            onPress={() => {
              props.hasNumber(confirmedNumber);
            }}
            style={styles.startButton}
          >
            <Text style={styles.buttonText}>START</Text>
          </ButtonComponent>
        </View>
      </Card>
    );
  }

  const resetHandler = () => {
    setInitialNumber("");
    setConfirmedNumber(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.startGameContainer}>
        <MainTitle>START GAME</MainTitle>
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
                <ButtonComponent onPress={resetHandler}>RESET</ButtonComponent>
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
    marginTop: 20,
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
  startButton: {
    marginTop: 20,
    width: "60%",
    backgroundColor: Themes.colors.darkBlue,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default StartGame;
