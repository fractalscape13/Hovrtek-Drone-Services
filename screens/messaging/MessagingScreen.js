import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { getMessages } from "../../actions/messages";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import { getClientProfiles } from "../../actions/clientProfiles";
import * as firebase from "firebase";
import _ from "lodash";

function MessagingScreen(props) {
  
  useEffect(() => {
    props.getMessages();
    props.getPilotProfiles();
    props.getClientProfiles();
  }, []);

  let user = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  let contacts = [];
  let contact = null;
  let listOfProfiles = null;
  let listOfMyMessages = [];

  if (
    props.listOfPilotProfiles &&
    props.listOfClientProfiles &&
    props.listOfMessages
  ) {
    listOfProfiles = props.listOfPilotProfiles.concat(
      props.listOfClientProfiles
    );
    props.listOfMessages.forEach((message) => {
      if (message.userOneID === user.uid || message.userTwoID === user.uid) {
        listOfMyMessages.push(message);
      }
    });
  }

  const unreadMessageList = props.listOfMessages.filter(message => {
    if (message.userOneID === user.uid || message.userTwoID === user.uid) {
      if(!message.read){
        return message.userTwoID === user.uid
      }
    }
  })
  const unreadContactsUserID = unreadMessageList.map(contact => contact.userOneID)
  
  if (props.listOfMessages && listOfProfiles) {
    props.listOfMessages.forEach((message) => {
      if (message.userOneID === user.uid) {
        contact = listOfProfiles.find((x) => x.userID === message.userTwoID);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      } else if (message.userTwoID === user.uid) {
        contact = listOfProfiles.find((x) => x.userID === message.userOneID);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      }
    });
  }

  function goToChat(item) {
    props.navigation.navigate("ChatScreen", { ...item });
  }

  return (
    <View style={styles.container}>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View style={styles.headerRow}>
                {item.profileImageUrl ? (
                  <Image
                    source={{
                      uri: item.profileImageUrl,
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
                {item.pilotFirstName ? (
                  <TouchableOpacity
                  style={styles.contact}
                  onPress={() => {
                    goToChat(item);
                  }}
                  >
                    <Text style={styles.names}>
                      {item.pilotFirstName} {item.pilotLastName}
                    </Text>
                    {unreadContactsUserID.includes(item.userID) ? <View style={styles.dot}/>: null}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.contact}
                    onPress={() => goToChat(item)}
                  >
                    <Text style={styles.names}>
                      {item.firstName} {item.lastName}
                    </Text>
                    {unreadContactsUserID.includes(item.userID) ? <View style={styles.dot}/>: null}
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles.textNoContacts}>( No contacts yet )</Text>
      )}
    </View>
  );
}

function mapStateToProps(state) {
  const listOfMessages = _.map(state.messagesList.messagesList, (val, key) => {
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
    }
  );
  const listOfClientProfiles = _.map(
    state.clientProfilesList.clientProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );

  return {
    listOfMessages,
    listOfPilotProfiles,
    listOfClientProfiles,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: "#161616",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: { 
    flexDirection: "row",
    alignItems: "center",
  },
  textNoContacts:{
    alignSelf: 'center',
    marginTop: "15%",
    color: "#DDE2E4"
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4",
    marginHorizontal: 10,
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: "rgb(221, 226, 228)",
    margin: 15,
    },
  dot:{
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 90,
    zIndex: 3,
  }
});

export default connect(mapStateToProps, {
  getMessages,
  getPilotProfiles,
  getClientProfiles,
})(MessagingScreen);
