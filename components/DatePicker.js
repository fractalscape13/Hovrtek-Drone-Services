import React, { useState, useContext } from "react";
import {
  View,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { PassSetFaaLicenseContext } from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import { PassFaaLicenseState } from "../screens/pilot/PilotProfileSetupPageTwoScreen";
const DatePicker = () => {
  // Context Hook Stuff
  const setFaaLicenseContext = useContext(PassSetFaaLicenseContext);
  const faaLicenseState = useContext(PassFaaLicenseState);

  const [date, setDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handlePicker = (datetime) => {
    setIsVisible(false);
    setFaaLicenseContext(moment(datetime).format("MMMM, DD  YYYY"));
  };

  const hidePicker = () => {
    setIsVisible(false);
  };

  const showPicker = () => {
    setIsVisible(true);
  };

  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity style={styles.button} onPress={showPicker}>
        {faaLicenseState ? (
          <Text style={styles.buttonText}>{faaLicenseState}</Text>
        ) : (
          <Text style={styles.buttonText}>Pick a Date</Text>
        )}

        <DateTimePicker
          isVisible={isVisible}
          onConfirm={handlePicker}
          onCancel={hidePicker}
          mode={"date"}
          value={date}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  pickerWrapper: {
    alignItems: "center",
  },
  datePicked: {
    fontSize: 20,
  },
});

export default DatePicker;
