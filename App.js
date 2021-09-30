import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './src/components/Header/Header';
import StartGame from './Screens/StartGame/StartGame'
import ComputerGuesses from './Screens/ComputerGuesses/ComputerGuesses';
import GameOver from './Screens/GameOver/GameOver';


const fontsFetch = ()=>{
  return Font.loadAsync({
    'glutenBlack': require('./assets/static/Gluten-Black.ttf'),
    'glutenBold': require('./assets/static/Gluten-Bold.ttf'),
    'glutenExtraBold': require('./assets/static/Gluten-ExtraBold.ttf'),
    'glutenExtraLight': require('./assets/static/Gluten-ExtraLight.ttf'),
    'glutenLight': require('./assets/static/Gluten-Light.ttf'),
    'glutenMedium': require('./assets/static/Gluten-Medium.ttf'),
    'glutenRegular': require('./assets/static/Gluten-Regular.ttf'),
    'glutenSemiBold': require('./assets/static/Gluten-SemiBold.ttf'),
    'glutenThin': require('./assets/static/Gluten-Thin.ttf'),
  })
}

export default function App() {
 
  const [ fontsLoaded, setFontsLoaded ] = useState(false); 
  const [ startNumber, setStartNumber ] = useState();
  const [ numberOfRounds, setNumberOfRounds ] =  useState(0);

  if(!fontsLoaded){
    return  (<AppLoading
      startAsync={fontsFetch}
      onFinish={()=>{setFontsLoaded(true)}}
      onError={(error)=>{console.log(error)}}
  />)
  }

  const gameOverHandler = (updatedNumberOfRounds)=>{
    console.log('updated rounds', updatedNumberOfRounds)
    setNumberOfRounds(updatedNumberOfRounds);
  };
 

  const hasNumberToStarGame = (playNumber) =>{    
    if(playNumber){
      setStartNumber(playNumber);
      setNumberOfRounds(0);
    }
  };

  const reStartGame =()=>{
    setNumberOfRounds(0);
    setStartNumber(null)
  }

  let renderedComponent;
  renderedComponent = <StartGame hasNumber={hasNumberToStarGame}/>

  if(startNumber && numberOfRounds <=0){
    renderedComponent = <ComputerGuesses userNumber={startNumber} isGameOver={gameOverHandler}/>
  }else if (numberOfRounds > 0){
    renderedComponent = <GameOver roundsCount={numberOfRounds} userNumber={startNumber} onGameOver={reStartGame}/> 
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />     
      <Header title="NUMBER GUESSING GAME"/>      
      {renderedComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  }
  
});
