import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";

const randomNumberGenerator = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return randomNumberGenerator(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (noOfRounds, itemData) => (
  <View style={styles.listItem}>
    <Text>{(noOfRounds - itemData.index)}</Text>
    <Text>{(itemData.item)}</Text>
  </View>
);
const GamesScreen = props => {
  const initialGuess = randomNumberGenerator(1, 100, props.userChoice);
  const [guessnumber, setguessnumber] = useState(initialGuess);
  const [pastGuess, setpastGuess] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (guessnumber === userChoice) {
      props.onGameOver(pastGuess.length);
    }
  }, [guessnumber, userChoice, onGameOver]);
  const guessHandler = direction => {
    if (
      (direction === "lower" && guessnumber < props.userChoice) ||
      (direction === "higher" && guessnumber > props.userChoice)
    ) {
      Alert.alert("Invalid Hint", "Please Provide correct Hint", [
        { text: "Okay", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = guessnumber;
    } else {
      currentLow.current = guessnumber + 1;
    }
    const nextNumber = randomNumberGenerator(
      currentLow.current,
      currentHigh.current,
      guessnumber
    );
    setguessnumber(nextNumber);
    // setRounds(currentRounds => currentRounds + 1);
    setpastGuess(curPastGuess => [nextNumber.toString(), ...curPastGuess]);
  };
  return (
    <View style={styles.screen}>
      <Text>User's Guess</Text>
      <NumberContainer>{guessnumber}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={guessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={guessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuess}
          renderItem={renderListItem.bind(this, pastGuess.length)}
          contentContainerStyle={styles.listContents}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  list: {
    flex: 1,
    width: "80%"
  },
  listContent: {
    alignItems: "center",
    flexGrow: 1
  }
});

export default GamesScreen;
