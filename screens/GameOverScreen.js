import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  Button,
  Image } from "react-native";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text> Game is over!!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageP}
          source={{
            uri: 'https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
          }
          resizeMode="cover"
        />
      </View>
      <Text>Number of rounds: {props.noOfRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="Start new Game" onPress={props.startnewGame} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageP: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  }
});

export default GameOverScreen;
