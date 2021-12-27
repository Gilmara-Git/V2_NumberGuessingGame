import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert, 
  FlatList,
  Dimensions
} from "react-native";
import Card from "../../src/components/Card/Card";
import MainTitle from "../../src/components/MainTitle/MainTitle";
import ButtonComponent from "../../src/components/ButtonComponent/ButtonComponent";
import { FontAwesome } from "@expo/vector-icons";
import Themes from "../../themes/themes";

const createComputerGuess = (min, max, numToExlcude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomGuess = Math.floor(Math.random() * (max - min)) + min;
  if (numToExlcude === randomGuess) {
    createComputerGuess(min, max, numToExlcude);
  }
  return randomGuess;
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.renderItems}>
    <Text style={styles.text}>#{listLength - itemData.index}</Text>
    <Text style={styles.text}>{itemData.item}</Text>
  </View>
);

const ComputerGuesses = (props) => {
  const lowerBoundary = useRef(1);
  const upperBoundary = useRef(150);
  const { userNumber, isGameOver } = props;

  const firstGuess = createComputerGuess(
    lowerBoundary.current,
    upperBoundary.current,
    userNumber
  );

  const [computerGuess, setComputerGuess] = useState(firstGuess);
  const [guessList, setGuessList] = useState([firstGuess.toString()]);
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateHeight = () => {
      setDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateHeight);
    return () => {
      Dimensions.removeEventListener("change", updateHeight);
    };
  })

  useEffect(() => {
    if (computerGuess === userNumber) {
      isGameOver(guessList.length);
    }
  }, [computerGuess, userNumber, isGameOver]);

  const createNewComputerGuessHandler = (direction) => {
    if (
      (direction === "down" && computerGuess < userNumber) ||
      (direction === "up" && computerGuess > userNumber)
    ) {
      Alert.alert("DON'T Cheat!", "Provide the correct direction", [
        { text: "Back", style: "cancel" },
      ]);
      return;
    }

    if (direction === "down") {
      upperBoundary.current = computerGuess;
    } else {
      lowerBoundary.current = computerGuess + 1; // This is to make key for ScrowList unique
    }

    const newGuess = createComputerGuess(
      lowerBoundary.current,
      upperBoundary.current,
      computerGuess
    );
    setComputerGuess(newGuess);
    // setRoundCounts(roundCounts + 1) ;
    setGuessList((currentGuessList) => [
      newGuess.toString(),
      ...currentGuessList,
    ]);
  };

let gameControls = (
<Card style={styles.computerGuessContainer}>
  <View style={styles.innerView}>
    <MainTitle>
      <Text style={styles.computerTitle}>Computer Guess</Text>
    </MainTitle>
    <View style={styles.showNumber}>
      <Text style={styles.guessNumber}>{computerGuess}</Text>
    </View>
    <View style={styles.upDownButtons}>
      <View style={styles.buttonSize}>
        <ButtonComponent
          onPress={createNewComputerGuessHandler.bind(this, "down")}
          style={styles.button}
        >
          <FontAwesome name="thumbs-down" size={20} />
        </ButtonComponent>
      </View>
      <View style={styles.buttonSize}>
        <ButtonComponent
          style={styles.button}
          onPress={createNewComputerGuessHandler.bind(this, "up")}
        >
          <FontAwesome name={"thumbs-up"} size={20} />
        </ButtonComponent>
      </View>
    </View>
  </View>
</Card>);

if(deviceHeight <=320){
  gameControls = (<View style={styles.innerView}>
    <MainTitle style={ {marginBottom: 2}}>
      <Text style={styles.computerTitle}>Computer Guess</Text>
    </MainTitle>
    <View style={{...styles.upDownButtons, marginBottom: deviceHeight <=320 ? 25 :35}}>
      <View style={styles.buttonSize}>
        <ButtonComponent
          onPress={createNewComputerGuessHandler.bind(this, "down")}
          style={styles.button}
        >
          <FontAwesome name="thumbs-down" size={20} />
        </ButtonComponent>
      </View>
        <View style={styles.showNumber}>
          <Text style={styles.guessNumber}>{computerGuess}</Text>
        </View>
      <View style={styles.buttonSize}>
        <ButtonComponent
          style={styles.button}
          onPress={createNewComputerGuessHandler.bind(this, "up")}
        >
          <FontAwesome name={"thumbs-up"} size={20} />
        </ButtonComponent>
      </View>
    </View>
  </View>);
}


  return (
    <View style={{...styles.oponentContainer, marginTop: deviceHeight <=320 ? 1 : 30}}>      
      {gameControls}
      <View style={styles.outerScrollView}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={guessList}
          keyExtractor={(item) => item}
          renderItem={renderListItem.bind(this, guessList.length)}
        />
        {/* <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    { guessList.map((guess, index) => renderListItem(guess, guessList.length - index))}
                </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  oponentContainer: {
    alignItems: "center",
    // marginTop: 30,
    flex: 1,
  },
  computerGuessContainer: {
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  innerView: {
    alignItems: "center",
  },
  computerTitle: {
    fontSize: 22,
  },
  computerNumber: {
    fontSize: 30,
    width: 60,
    color: Themes.colors.darkBlue,
    backgroundColor: Themes.colors.limeGreen,
    textAlign: "center",
    borderRadius: 8,
    fontFamily: Themes.fonts.glutenSemiBold,
    borderWidth: 2,
    borderColor: Themes.colors.darkBlue,
  },
  showNumber: {
    borderColor: Themes.colors.darkBlue,
    borderWidth: 2,
    borderRadius: 8,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    backgroundColor: Themes.colors.limeGreen,
  },
  guessNumber: {
    fontSize: 28,
    color: Themes.colors.darkBlue,
    fontFamily: Themes.fonts.glutenSemiBold,
    textAlign: "center",
  },
  upDownButtons: {
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginBottom: 35,
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: Themes.colors.darkBlue,
    borderRadius: 8,
  },
  buttonSize: {
    width: "20%",
  },
  outerScrollView: {
    // mudar nome
    width: "60%", // verificar aqui, estava 74%
    flex: 1,
  },
  flatListStyle: {
    // Mudar nome
    // alignItems: 'center',
    justifyContent: "flex-end",
    flexGrow: 1, // allow to grow and you still can view the first and last item
  },
  renderItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderWidth: 2,
    borderColor: Themes.colors.darkBlue,
    backgroundColor: Themes.colors.limeGreen,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    fontFamily: Themes.fonts.glutenBold,
    color: Themes.colors.darkBlue,
  },
});

export default ComputerGuesses;
