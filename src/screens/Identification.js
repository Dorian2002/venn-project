import { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import app from "../../app.json";
import ColorContext from "../ColorContext";
import Button from "../components/Button";
import Greetings from "../components/Greetings";
import useGetAll from "../hooks/useGetAll";

function Identification({ navigation }) {
  const { data } = useGetAll("members");
  const [, setColor] = useContext(ColorContext);
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const styles = createStyles({
    error,
    member: Boolean(member),
  });
  const onChange = (text) => {
    setError(false);
    setMember(null);
    setValue(text);
  };
  const onPress = () => {
    if (value.length > 0 && data?.length > 0) {
      const found = data.find(({ lastname, firstname }) =>
        value.match(
          new RegExp(
            `(${firstname} ${lastname})|(${lastname} ${firstname})`,
            "i"
          )
        )
      );
      setMember(found);
      setError(!found);
      if (found) {
        setColor(found.favoriteColor);
      }
    }
  };
  const onNavigateToHome = () => {
    navigation.navigate("Accueil");
  };
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
    </View>
  );
  if (member) {
    return (
      <View style={styles.root}>
        {header}
        <View style={styles.content}>
          <Greetings {...member} />
          <View style={styles.actions}>
            <Button title="Aller à l'accueil" onPress={onNavigateToHome} />
          </View>
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.root}>
        {header}
        <View style={styles.content}>
          <View>
            <TextInput
              placeholder="Identifiant"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
            <Text style={styles.error}>Désolé, tu n'es pas enregistré·e.</Text>
          </View>
          <View style={styles.actions}>
            <Button title="S'enregistrer" />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {header}
      <View style={styles.content}>
        <TextInput
          placeholder="Identifiant"
          style={styles.input}
          value={value}
          onChangeText={onChange}
        />
        <View style={styles.actions}>
          <Button title="S'identifier" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

export default Identification;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: error || member ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error || member ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error || member ? 32 : 192,
      width: error || member ? 32 : 192,
      marginLeft: error || member ? 8 : 0,
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
    },
  });
