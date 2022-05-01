import { useMemo, useState } from "react";
import Button from "../components/Button";
import { View, Text, StyleSheet } from "react-native";

import Avatar from "../components/Avatar";
import Tag from "../components/Tag";
import useGetAll from "../hooks/useGetAll";
import { useNavigation } from "@react-navigation/native";

function Project({ route, projectId, tags, participants }) {
  const { data } = useGetAll("members");
  const [thisProjectId, setProjectId] = useState(null);
  const [thisTags, setTags] = useState(null);
  const [thisParticipants, setParticipants] = useState(null);
  const navigation = useNavigation();

  if (route != null) {
    setProjectId(route.params.projectId);
    console.log(thisProjectId);
    console.log(projectId);
    setTags(route.params.tags);
    setParticipants(route.params.participants);
  }

  const onNavigateToProject = () => {
    navigation.navigate("AfficherUnProjet", {
      projectId: projectId,
      tags: tags,
      participants: participants,
    });
  };
  const avatars = useMemo(
    () =>
      participants
        .map((id) => {
          const participant = data?.find((member) => member.id === id);
          if (participant) {
            return {
              id,
              label: participant.firstname[0],
              color: participant.favoriteColor,
            };
          }
          return null;
        })
        .filter(Boolean),
    [data, participants]
  );
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{projectId}</Text>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Tag label={tag} />
          </View>
        ))}
      </View>
      <View style={styles.avatars}>
        {avatars.map((avatar) => (
          <View key={avatar.id} style={styles.avatar}>
            <Avatar label={avatar.label} color={avatar.color} />
          </View>
        ))}
      </View>
      <Button title="Détails" onPress={onNavigateToProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 5,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    marginVertical: 8,
  },
  tag: {
    margin: 8,
  },
  tags: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    margin: 8,
  },
});

export default Project;
