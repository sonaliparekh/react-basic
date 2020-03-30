import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const StartGamesScreen = props => {
  const [enteredText, setenteredText] = useState("");

  const inputHandler = inputText => {
    setenteredText(inputText.replace(/^[0-9]/g, ""));
  };
  return (
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
            <Button title="Reset" onPress={() => {}} color={Colors.accent} />
          </View>
          <View style={styles.buttonStyle}>
            <Button title="Confirm" onPress={() => {}} color={Colors.primary} />
          </View>
        </View>
      </Card>
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
    marginVertical: 10
  },
  buttonStyle: {
    width: 100
  },
  inputStyle: {
    width: 50
  }
});

export default StartGamesScreen;
