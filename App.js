import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGamesScreen from "./screens/StartGameScreen";
import GamesScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const loadFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf")
  });
};
export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const newGameHandler = () => {
    setGuessRounds(0);
    setuserNumber(null);
  };
  const startGameHandler = selectedNumber => {
    setuserNumber(selectedNumber);
  };

  const gameoverHandler = numofRounds => {
    setGuessRounds(numofRounds);
  };
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={error => console.log(error)}
      />
    );
  }
  let content = <StartGamesScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = (
      <GamesScreen userChoice={userNumber} onGameOver={gameoverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        numofRounds={guessRounds}
        startnewGame={newGameHandler}
      />
    );
  }
  return (
    <View style={styles.screenView}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1
  }
});
