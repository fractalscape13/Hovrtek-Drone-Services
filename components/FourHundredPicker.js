import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from "react-native";
import {
  PassSetFourHundred,
  PassFourHundredState,
} from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import { APP_STRINGS } from "../constants";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const FourHundredPicker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setFourHundred = useContext(PassSetFourHundred);
  const fourHundred = useContext(PassFourHundredState);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderFourHundredButton = (buttonText = '') => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={openModal}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  // Refactored 
  const renderFourHundred = (fourHundredStateExist) => {
    fourHundredStateExist
      ? renderFourHundredButton(fourHundred)
      : renderFourHundredButton(setFourHundred(APP_STRINGS.no));
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={"slide"}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>
              {APP_STRINGS.haveYouHadExperienceFlying}
            </Text>
          </View>
          <View>
            <Picker
              selectedValue={fourHundred}
              onValueChange={(fourHundred, itemIndex) =>
                setFourHundred(fourHundred)
              }
            >
              <Picker.Item label="No" value="No" />
              <Picker.Item label="Yes" value="Yes" />
            </Picker>
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={() => closeModal()} title={"Choose"}></Button>
          </View>
        </View>
      </Modal>

      {renderFourHundred(fourHundred)}

    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 300,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginTop: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: 150,
  },
  modalText: {
    fontSize: 20,
  },
  cancelWrapper: {},
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default FourHundredPicker;
