import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

import Tag from "../components/Tag";
import Avatar from "../components/Avatar";
import app from "../../app.json";
import Button from "../components/Button";
import { CreateNewProject } from "../firebase";
import useGetAll from "../hooks/useGetAll";

let participants = [];
let tags = [];

function CreateProject({ navigation }) {
  const [participant, setParticipant] = useState("");
  const [newProjectId, setProjectId] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsgParticipant, setErrorMsgP] = useState("");
  const [errorMsgCreate, setErrorMsgC] = useState("");
  const [tag, setTag] = useState("");
  const [displayTags, setDisplayTags] = useState(null);
  const [displayParticipants, setDisplayParticipants] = useState(null);
  const { data } = useGetAll("members");

  const styles = createStyles({
    error,
    member: Boolean(newProjectId),
  });

  const onChangeParticipant = (newParticipant) => {
    setError(false);
    setErrorMsgP("");
    setErrorMsgC("");
    setParticipant(newParticipant);
  };
  const onChangeTag = (newTag) => {
    setError(false);
    setErrorMsgP("");
    setErrorMsgC("");
    setTag(newTag);
  };

  const onChangeProjectName = (name) => {
    setError(false);
    setErrorMsgP("");
    setErrorMsgC("");
    setProjectId(name);
  };
  const onNavigateToHome = () => {
    tags = null;
    participants = null;
    navigation.navigate("Accueil", {
      member: global.loggedMember.member,
    });
  };
  const onPress = () => {
    if (newProjectId === "" || newProjectId === null) {
      setErrorMsgC("Votre projet doit porter un nom !");
    } else if (participants.length < 1) {
      setErrorMsgC("Votre projet doit avoir au moins 1 participant.");
    } else {
      const found = global.projects.find(({ projectId }) =>
        newProjectId.match(new RegExp(`(${projectId})`, "i"))
      );
      if (found) {
        setErrorMsgC("Un autre projet porte dejà ce nom.");
      } else {
        setErrorMsgP("");
        setErrorMsgC("");
        CreateNewProject(newProjectId, tags, participants);
        onNavigateToHome();
      }
    }
  };

  const isMember = () => {
    if (participant.length > 0) {
      const found = data.find(({ lastname, firstname }) =>
        participant.match(
          new RegExp(
            `(${firstname} ${lastname})|(${lastname} ${firstname})`,
            "i"
          )
        )
      );
      if (found) {
        if (participants.length > 0) {
          const added = participants.find((Id) => Id === found.id);
          if (added) {
            setErrorMsgP("Vous avez dejà ajouté cet utilisateur.");
            return false;
          }
        }
        participants.push(found.id);
        return true;
      } else {
        setErrorMsgP("Aucuns utilisateurs n'a été trouvé.");
        return false;
      }
    }
  };

  const addParticipant = () => {
    if (isMember()) {
      setDisplayParticipants(
        participants.map((item) => (
          <View style={styles.avatar} key={item}>
            <Avatar label={item[0].toLocaleUpperCase()} />
          </View>
        ))
      );
    }
  };

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.content}>
          {header}
          <TextInput
            placeholder="Nom du Projet"
            style={styles.input}
            projectId={newProjectId}
            onChangeText={onChangeProjectName}
          />
          <View style={styles.inputButton}>
            <View>
              <TextInput
                placeholder="Tag"
                style={styles.input}
                onChangeText={onChangeTag}
              />
              <Button
                title="Ajouter"
                onPress={() => {
                  if (tag !== "") {
                    tags.push(tag);
                    setTag("");
                    setDisplayTags(
                      tags.map((item) => (
                        <View style={styles.avatar} key={item}>
                          <Tag label={item} />
                        </View>
                      ))
                    );
                  }
                }}
              />
            </View>
            {displayTags}
          </View>
          <View style={styles.inputButton}>
            <TextInput
              placeholder="Participant"
              style={styles.input}
              onChangeText={onChangeParticipant}
            />
            <Button
              title="Ajouter"
              onPress={() => {
                addParticipant();
              }}
            />
            <Text style={styles.error}>
              {errorMsgParticipant ? errorMsgParticipant : null}
            </Text>
          </View>
          {displayParticipants}
          <View style={styles.actions}>
            <Button title="Créer" onPress={onPress} />
          </View>
          <Text style={styles.error}>
            {errorMsgCreate ? errorMsgCreate : null}
          </Text>
        </View>
        <View style={styles.actionsRetour}>
          <Button title="Annuler" onPress={onNavigateToHome} />
        </View>
      </View>
    </ScrollView>
  );
}

export default CreateProject;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
    },
    logo: {
      height: 192,
      width: 192,
      marginLeft: 0,
    },
    inputButton: {
      display: "flex",
      flexDirection: "column",
      padding: 8,
    },
    avatar: {
      flexDirection: "row",
      margin: 16,
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 200,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
      display: "flex",
      flexDirection: "row",
      padding: 8,
    },
    actionsRetour: {
      marginVertical: 16,
      justifyContent: "flex-start",
      display: "flex",
      flexDirection: "row",
      padding: 8,
    },
  });
