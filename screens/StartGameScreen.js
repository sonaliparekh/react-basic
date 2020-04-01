import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGamesScreen = props => {
  const [enteredText, setenteredText] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const inputHandler = inputText => {
    setenteredText(inputText.replace(/[^0-9]/g, ""));
  };

  const resetValueHandler = () => {
    setenteredText("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredText);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >= 99) {
      Alert.alert("Invalid number", "Number has to be between 1 - 99", [
        { text: "Okay", style: "destructive", onPress: resetValueHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredText));
    setenteredText("");
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START BUTTON
        </MainButton>
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.inputStyle}
            keyboardType="numeric"
            maxLength={2}
            value={enteredText}
            onChangeText={inputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyle}>
              <Button
                title="Reset"
                onPress={resetValueHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  buttonStyle: {
    width: 100
  },
  inputStyle: {
    width: 50
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGamesScreen;
