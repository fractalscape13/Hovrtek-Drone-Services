import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from "react-native";
import {
  PassSetYearsOfExperience,
  PassYearsOfExperienceState,
} from "../../screens/pilot/PilotProfileSetupPageOneScreen";
import { APP_STRINGS } from "../../constants/index";

//REFACTORED with APP_STRINGS and TERNARY VIA FRANKS SPECIFICATIONS

const DroneExperiencePicker = (props) => {
 
  const { setIsModalActive } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setYearsOfExperience = useContext(PassSetYearsOfExperience);
  const yearsOfExperience = useContext(PassYearsOfExperienceState);

  const openModal = () => {
    setIsModalVisible(true);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  const renderYearsOfExperienceButton = (buttonText = "") => {
    return (
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

    const renderYearsOfExperience = (yearsOfExperienceString) => {
      if(!yearsOfExperienceString){
        setYearsOfExperience(APP_STRINGS.noYearsOfExperience);
      }
    return (
      renderYearsOfExperienceButton(yearsOfExperience)
    )
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={APP_STRINGS.slide}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>{APP_STRINGS.yearsExperience}</Text>
          </View>
          <View>
            <Picker
              selectedValue={yearsOfExperience}
              onValueChange={(yearsOfExperience, itemIndex) =>
                setYearsOfExperience(yearsOfExperience)
              }
              >
              <Picker.Item
                color={"#DDE2E4"}
                label={APP_STRINGS.noYearsOfExperience}
                value={APP_STRINGS.noYearsOfExperience}
              />
              <Picker.Item label="Less than 1" value="Less than 1" color={"#DDE2E4"}/>
              <Picker.Item label="1" value="1" color={"#DDE2E4"}/>
              <Picker.Item label="2" value="2" color={"#DDE2E4"}/>
              <Picker.Item label="3" value="3" color={"#DDE2E4"}/>
              <Picker.Item label="4" value="4" color={"#DDE2E4"}/>
              <Picker.Item label="5" value="5" color={"#DDE2E4"}/>
              <Picker.Item label="6" value="6" color={"#DDE2E4"}/>
              <Picker.Item label="7" value="7" color={"#DDE2E4"}/>
              <Picker.Item label="8" value="8" color={"#DDE2E4"}/>
              <Picker.Item label="9" value="9" color={"#DDE2E4"}/>
              <Picker.Item label="10" value="10" color={"#DDE2E4"}/>
              <Picker.Item label="More than 10" value="More than 10" color={"#DDE2E4"}/>
            </Picker>
          </View>
          <View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>

      {renderYearsOfExperience(yearsOfExperience)}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 380,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#161616",
    borderWidth: 2,
    borderColor: '#DDE2E4',
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
    marginTop: 80,
    color: "#DDE2E4",
    textAlign: "center"
  },
  cancelWrapper: {},
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "#161616",
  },
  buttonText: {
    color: "#161616",
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '30%',
  },
});

export default DroneExperiencePicker;