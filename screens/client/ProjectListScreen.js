import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/projects";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import _ from "lodash";
import {Entypo} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as firebase from "firebase";

function ProjectListScreen(props) {
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
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false} 
        >
        <View style={styles.projectCard}>
            <FlatList
              style={styles.projectListContainer}
              data={listOfMyProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={styles.projectCardContainer}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("ProjectDetailsScreen", {
                          ...item,
                        })}
                    >
                      <View>
                        <View style={styles.textContainer}>
                          <Text style={styles.locationText}>
                            <Entypo name="location" size={14} color="#DDE2E4" /> {item.location}{" "}
                          </Text>
                          <Text style={styles.dateText}>
                            {item.date}
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={styles.descriptionText}>
                            {item.recording}
                          </Text>
                        </View>
                        {item.pilotID &&
                        props.listOfPilotProfiles.find(
                          (x) => x.userID === item.pilotID,
                        ) ? (
                          <Text style={styles.pilotText}>
                            {"@"}
                            {
                              props.listOfPilotProfiles.find(
                                (x) => x.userID === item.pilotID,
                              ).pilotFirstName
                            }{" "}
                            {
                              props.listOfPilotProfiles.find(
                                (x) => x.userID === item.pilotID,
                              ).pilotLastName
                            }
                          </Text>
                        ) : (
                          <Text style={styles.pendingText}>
                            Pending pilot
                          </Text>
                        )}
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
    width: "100%",
    backgroundColor: "rgba(171, 205, 239, 0.2)"
  },
  projectListContainer:{ 
    width: "100%" 
  },
  projectCardContainer:{
    borderTopColor: "#161616",
    borderTopWidth: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollContainer: {
    width: "100%",
  },
  textContainer:{
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#DDE2E4",  
  },
  clientText: {
    fontSize: 30,
    color: "#161616",
    textAlign: "center",
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#161616"
  },
  pendingText:{ 
    color: "white", 
    fontWeight: "800", 
    fontWeight: "200", 
    alignSelf: "center", 
    marginTop: 10, 
  },
  pilotText:{ 
    color: "#DDE2E4", 
    fontWeight: "200", 
    alignSelf: "center", 
    fontSize: 12, 
    marginTop: 10,
  },
  descriptionContainer:{
    backgroundColor: "rgba(221,226,228, 0.2)", 
    padding:10, 
    width: "100%", 
    marginTop: 10, 
    borderRadius: 5,
  },
  descriptionText:{ 
    color: "#DDE2E4", 
    fontWeight: "500", 
    fontSize: 14, 
  },
  dateText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 12, 
  },
  locationText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 13, 
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

{/* <View
style={{
  flexDirection: "row",
  justifyContent: "flex-end",
}}
>
<TouchableHighlight
  onPress={() =>
    props.navigation.navigate("EditProjectScreen", {
      projectDetails: item,
      fromList: true
    })}
>
  <View>
    <FontAwesome5 name="edit" size={32} color="white" />
  </View>
</TouchableHighlight>
<TouchableHighlight
  onPress={() => props.deleteProject(item.key)}
>
  <View>
    <MaterialIcons name="delete" size={24} color="white" />
  </View>
</TouchableHighlight>
</View> */}