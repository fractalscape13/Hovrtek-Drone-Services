import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

function ProjectDetailsScreen(props, { getPilotProfiles }) {
  const projectDetails = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  let pilot = null;
  let user = null;

  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  if (props.listOfPilotProfiles.find((x) => x.userID === projectDetails.pilotID)) {
    pilot = props.listOfPilotProfiles.find(
      (x) => x.userID === projectDetails.pilotID,
    );
  }

  return (
    <View style={styles.container}>
      {(user.uid === projectDetails.clientID) && (
        <TouchableOpacity
        style={styles.editIcon}
        onPress={() =>
          props.navigation.navigate("EditProjectScreen", {
            ...projectDetails,
          })
        }
        >
          <AntDesign name="edit" size={40} />
        </TouchableOpacity>
      )}
      <Text style={styles.ProjectText}>Details:</Text>
      <View style={styles.line} />
      <Text style={styles.detailsHeader}>Where</Text>
      <Text style={styles.DetailsText}>{projectDetails.location}</Text>
      <Text style={styles.detailsHeader}>When</Text>
      <Text style={styles.DetailsText}>{projectDetails.date}</Text>
      <Text style={styles.detailsHeader}>What</Text>
      <Text style={styles.DetailsText}>{projectDetails.recording}</Text>
      <Text style={styles.detailsHeader}>Your pilot</Text>
      {pilot ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PilotProfileWelcomeScreen", {
              ...pilot,
            })}
        >
          <View style={{ flexDirection: "row" }}>
            {pilot.profileImageUrl ? (
              <Image
                source={{
                  uri: pilot.profileImageUrl,
                }}
                style={styles.profilePic}
              />
            ) : (
              <Image
                source={{
                  uri:
                    "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200",
                }}
                style={styles.profilePic}
              />
            )}
            <Text style={styles.nameText}>
              {pilot.pilotFirstName} {pilot.pilotLastName}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri:
                "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200",
            }}
            style={styles.profilePic}
          />
          <Text style={styles.unnamedText}>Pending Pilot</Text>
        </View>
      )}
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.pop()}
        >
          <Text style={styles.backButtonText}>Back to projects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3E90D0",
    marginBottom: 20,
    marginTop: 10,
    zIndex: 0
  },
  DetailsText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    fontWeight: "800",
  },
  nameText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    marginTop: 20,
    fontWeight: "bold",
    color: "darkblue",
  },
  unnamedText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    marginTop: 20,
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: "darkblue",
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 90,
    marginTop: 5,
    // borderWidth: 4,
    // borderColor: "#092455",
    marginRight: 10,
  },
  backButton: {
    backgroundColor: "#092455",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  backButtonText: {
    color: "white",
  },
  backButtonWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  editIcon: {
    top: "4%",
    position: "absolute",
    right: "6%",
    zIndex: 1
  },
});

function mapStateToProps(state) {
  const listOfPilotProfiles = _.map(
    state.pilotProfilesList.pilotProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    },
  );
  return {
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles })(
  ProjectDetailsScreen,
);
