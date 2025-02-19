import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

import Header from "../components/Header";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";
import Project from "./Project";

function Projects({ navigation }) {
  const { loading, error, data, getData } = useGetAll("projects");
  global.projects = data;
  navigation.addListener("focus", () => {
    getData();
  });

  const onNavigateToCreateProject = () => {
    console.log(navigation);
    navigation.navigate("CréationDeProjet");
  };

  //let focused = useIsFocused();
  if (loading) {
    return (
      <View style={styles.root}>
        <Header />
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data?.length > 0) {
    return (
      <View style={styles.root}>
        <Header />
        <Text>Pas de projet.</Text>
        <Button title="Créer un projet" onPress={onNavigateToCreateProject} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Project {...item} navigation={navigation} />
  );
  return (
    <>
      <View style={styles.root}>
        <Header />
      </View>
      <ScrollView style={styles.root}>
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(project) => project.id}
          />
        </View>
      </ScrollView>
      <View style={styles.root}>
        <Button title="Créer un projet" onPress={onNavigateToCreateProject} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
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

export default Projects;
