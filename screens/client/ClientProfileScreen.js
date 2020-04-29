import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import personIcon from '../../assets/personIcon.png';
import princePic01 from '../../assets/princePic01.jpg';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import _ from "lodash";
import { getClientProfiles } from "../../actions/index";

function ClientProfileScreen(props, { getClientProfiles }) {

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  const [profileDetails, setProfileDetails] = useState('');

  if (firebase.auth().currentUser) {
    const user = firebase.auth().currentUser
    // if user is client, get client profile
    if (user.photoURL === "C") {
      try {
        setProfileDetails(props.listOfClientProfiles.find((x) => x.userID === user.uid));
        console.log("profile details: ", profileDetails);
      } catch {
        // code is hitting this catch block every single time. And it breaks without it. why????
        // Alert.alert("User page unavailable 1");
      }
    // if user is pilot sent from JobsList, get client associated with that job's profile
  } else if (props.route.params.clientID) {
      setProfileDetails(props.listOfClientProfiles.find((x) => x.userID === props.route.params.clientID));
    } else {
      Alert.alert("User page unavailable");
      props.navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      { profileDetails ? (
        <View>
          <Image source={princePic01} style={styles.backgroundImage}/>
          <Image source={personIcon} style={styles.profileImage}/>
          <Text style={styles.name}>{profileDetails.clientName}</Text>
          <View style={styles.info}>
            <Text style={{fontSize: 20}}>Location: This client is in {profileDetails.clientLocation}</Text>
            <Text style={{fontSize: 20, marginTop: 10}}>Bio: </Text>
            <Text style={{fontSize: 15}}>Amelia Mary Earhart (/ˈɛərhɑːrt/, born July 24, 1897; disappeared July 2, 1937) was an American aviation pioneer and author.[1][Note 1] Earhart was the first female aviator to fly solo across the Atlantic Ocean.[3][Note 2] She set many other records,[2] wrote best-selling books about her flying experiences, and was instrumental in the formation of The Ninety-Nines, an organization for female pilots.[5] </Text>
            <Text style={{fontSize: 20, marginTop: 10}}>Client links:</Text>
          </View>
        </View>
      ) : (
        <Text>User unavailable</Text>
      )}
    </View>
  )
};

function mapStateToProps(state) {
  const listOfClientProfiles = _.map(state.clientProfilesList.clientProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfClientProfiles
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  name: {
    fontSize: 30,
    marginLeft: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginLeft: 20
  },
  info: {
    margin: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 130,
    position: 'absolute'

  }
});

export default connect(mapStateToProps, {getClientProfiles })(ClientProfileScreen);
