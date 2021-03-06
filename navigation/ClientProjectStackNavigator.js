import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import NewProjectScreenOne from "../screens/client/NewProjectScreenOne";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import GlobalHeader from "../components/shared/GlobalHeader";

const ProjectStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#161616",
  height: 100,
};

const ClientProjectStackNavigator = () => {
  return (
    <ProjectStack.Navigator initialRouteName="ProjectListScreen">
      <ProjectStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} subheaderTitle={"My Projects"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Project Details"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="EditProjectScreen"
        component={NewProjectScreenOne}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Edit Details"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Pilot Profile"}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
    </ProjectStack.Navigator>
  );
};

export default ClientProjectStackNavigator;