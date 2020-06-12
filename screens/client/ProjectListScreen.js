import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/projects";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import _ from "lodash";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import ClientSubheader from "../../components/client/ClientSubheader";


function ProjectListScreen(props, { getProjects, getPilotProfiles }) {
  useEffect(() => {
    props.getProjects();
    props.getPilotProfiles();
  }, []);

  let user = "";
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  const listOfMyProjects = [];
  props.listOfProjects.forEach((project) => {
    if (project.clientID === user.uid) {
      listOfMyProjects.push(project);
    }
  });

  return (
    <View style={styles.projectListWrapper}>
      <View style={styles.ClientProjectListTextWrapper}>
        <Text style={styles.clientText}>My Projects</Text>
      </View>
      <ScrollView>
        <View style={styles.projectCard}>
            <FlatList
              style={{ width: "100%" }}
              data={listOfMyProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginTop: 25,
                    }}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("EditProjectScreen", {
                          ...item,
                        })}
                    >
                      <View style={{ marginRight: 15 }}>
                        <FontAwesome5 name="edit" size={32} color="#a9b8de" />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => props.deleteProject(item.key)}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="delete"
                          size={32}
                          color="#a9b8de"
                        />
                      </View>
                    </TouchableHighlight>
                  </View>
                );
              }}
            />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  projectCard: {
    width: "95%",
    marginBottom: 140,
  },
  clientText: {
    fontSize: 30,
    color: "darkblue",
    textAlign: "center",
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
    marginTop: 15,
  },
  subheaderWrapper: {
    marginBottom: 10,
  },
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
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
    listOfProjects,
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  getPilotProfiles,
})(ProjectListScreen);
