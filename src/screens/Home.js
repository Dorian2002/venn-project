import { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Members from "./Members";
import ColorContext from "../ColorContext";
import Projects from "./Projects";

global.loggedMember;

const Tab = createBottomTabNavigator();

function Home({ route }) {
  const [color] = useContext(ColorContext);
  global.loggedMember = route.params;
  console.log(
    "faut faire : \n - verification des participants de projets \n - page modif de projet \n - recherche des membres par leur nom/prénom \n - actualisation des projets"
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: color,
        tabBarStyle: styles.tabBar,
        headerTitleStyle: styles.title,
      }}
    >
      <Tab.Screen
        name="Projets"
        component={Projects}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="briefcase-account" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Membres"
        component={Members}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account-multiple" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: "700",
    height: 32,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  tabBar: {
    height: 72,
  },
  logo: {
    height: 32,
    width: 32,
    marginLeft: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Home;
