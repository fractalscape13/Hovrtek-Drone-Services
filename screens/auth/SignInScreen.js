import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import * as firebase from "firebase";
import landingPageImage from "../../assets/landingPageImage.png";
import hovrtekLogo from "../../assets/hovrtek_logo.png";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    if (email.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }
    if (!password.length) {
      Alert.alert("Please enter a password.");
      return;
    }
    navigation.push("Loading");
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            Alert.alert("Incorrect username or password");
          } else {
            console.log(error.code);
            Alert.alert(error.toString(error));
          }
          navigation.pop();
        });
    } catch {
      Alert.alert(error.toString(error));
    }
  };

  return (
    <ImageBackground source={landingPageImage} style={styles.MainContainer}>
      {/* <Image source={hovrtekLogo} style={styles.hovrtekLogo} /> */}
      <Text style={styles.imageText}>PROFESSIONAL DRONE SERVICES</Text>
      <Text style={styles.imageTextTwo}>
        THE FASTEST WAY TO GET AERIAL IMAGES AND DATA
      </Text>
      <TouchableOpacity>
        <Text style={styles.text}>Welcome Back</Text>
        <TextInput
          placeholder=" Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder=" Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title="Sign in" onPress={signIn} style={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("SignUp")}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  buttonText: {
    textAlign: "center",
    color: "grey",
  },

  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 8,
    width: 200,
    color: "white",
  },

  text: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  hovrtekLogo: {
    height: 50,
    width: 280,
    justifyContent: "center",
    // marginLeft: 0,
    marginBottom: 50,
  },

  imageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginLeft: 10,
  },

  imageTextTwo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3E90D0",
    textAlign: "left",
    margin: 10,
  },
});

export default SignInScreen;
