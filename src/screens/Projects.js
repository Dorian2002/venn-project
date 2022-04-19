import { View, Text, StyleSheet, FlatList } from "react-native";

import useGetAll from "../hooks/useGetAll";
import Project from "./Project";

function Projects() {
  const { loading, error, data } = useGetAll("projects");
  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data?.length > 0) {
    return (
      <View style={styles.root}>
        <Text>Pas de projet.</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => <Project {...item} />;
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(project) => project.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Projects;
