import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  PassSetLocation,
  PassLocationState,
} from "../../screens/client/NewProjectScreenOne";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../../constants/index";

const ClientLocationPicker = (props) => {
  const { setIsModalActive } = props
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setLocation = useContext(PassSetLocation);
  const locationState = useContext(PassLocationState);

  const openModal = () => {
    setIsModalVisible(true);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  const renderClientLocationButton = (buttonText) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={openModal}
        title={"Open modal"}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderClientLocation = (hasClientLocation) => {
    return hasClientLocation
      ? renderClientLocationButton(locationState)
      : renderClientLocationButton("Please Set Location");
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={APP_STRINGS.slide}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>{APP_STRINGS.whereIsTheLocation}</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              autoFocus={true}
              maxLength={26}
              onChangeText={setLocation}
              value={locationState}
            />
          </View>
          <View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>
      {renderClientLocation(locationState)}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 300,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    // backgroundColor: "#474A49",
    backgroundColor: "#161616",
    borderColor: "#DDE2E4",
    borderWidth: 1,
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
    color: "#DDE2E4"
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#161616",
    fontSize: 20,
  },
  input: {
    margin: 20,
    marginTop: 20,
    height: 30,
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    color: "#DDE2E4"
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
  }
});

export default ClientLocationPicker;
