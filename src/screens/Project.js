import { useMemo, useState } from "react";
import Button from "../components/Button";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import { UpdateProjectLinks } from "../firebase";
import Avatar from "../components/Avatar";
import Tag from "../components/Tag";
import useGetAll from "../hooks/useGetAll";
import { useNavigation } from "@react-navigation/native";

function Project({ route, projectId, tags, participants, links }) {
  const { data } = useGetAll("members");
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  //const [projectLinks, setProjectLinks] = useState(null);

  //navigation.addListener("focus", () => {
  //  getData();
  //});

  if (route != null) {
    projectId = route.params.projectId;
    tags = route.params.tags;
    participants = route.params.participants;
    links = route.params.links;
  }

  const onChangeTitle = (_title) => {
    setTitle(_title);
  };

  const onChangeLink = (_link) => {
    setLink(_link);
  };

  const onNavigateToHome = () => {
    links = null;
    navigation.navigate("Accueil", {
      member: global.loggedMember.member,
    });
  };

  const addLink = () => {
    UpdateProjectLinks(projectId, title, link, links);
    onNavigateToProject();
  };

  const onNavigateToProject = () => {
    navigation.navigate("AfficherUnProjet", {
      projectId: projectId,
      tags: tags,
      participants: participants,
      links: links,
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
    <ScrollView style={styles.root}>
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
      {route
        ? links.map((lnk) => (
            <View style={styles.root}>
              <Text style={styles.title}>{lnk.title}</Text>
              <Text style={styles.title} href={lnk.link}>
                {lnk.link}
              </Text>
            </View>
          ))
        : null}
      {route ? (
        <View>
          <TextInput
            placeholder="Titre"
            style={styles.input}
            onChangeText={onChangeTitle}
          />
          <TextInput
            placeholder="Lien"
            style={styles.input}
            onChangeText={onChangeLink}
          />
          <View style={styles.inputButton}>
            <Button title="Créer un nouveau lien" onPress={addLink} />
          </View>
        </View>
      ) : null}
      {route ? (
        <Button title="Retour" onPress={onNavigateToHome} />
      ) : (
        <Button title="Détails" onPress={onNavigateToProject} />
      )}
    </ScrollView>
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
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 200,
    fontSize: 20,
    fontWeight: "700",
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
