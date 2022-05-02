import { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as Location from "expo-location";
import app from "../../app.json";
import ColorContext from "../ColorContext";
import Button from "../components/Button";
import Greetings from "../components/Greetings";
import useGetAll from "../hooks/useGetAll";
import { UpdateLocation } from "../firebase";
import { GeoPoint } from "firebase/firestore";

function Identification({ navigation }) {
  const { data } = useGetAll("members");
  const [, setColor] = useContext(ColorContext);
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [errorMsgLogin, setErrorMsgL] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const styles = createStyles({
    errorMsgLogin,
    member: Boolean(member),
  });

  const onChange = (text) => {
    setErrorMsgL("");
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
      if (found) {
        setColor(found.favoriteColor);
      } else {
        setErrorMsgL("Aucuns utilisateur n'as été trouvé.");
      }
    }
  };
  const onNavigateToRegister = () => {
    navigation.navigate("S'enregistrer");
  };
  const onNavigateToHome = () => {
    UpdateLocation(
      member.id,
      new GeoPoint(location.coords.latitude, location.coords.longitude)
    );
    navigation.navigate("Accueil", {
      member: member,
    });
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
        <Text style={styles.error}>{errorMsgLogin ? errorMsgLogin : null}</Text>
        <View style={styles.actions}>
          <Button title="S'identifier" onPress={onPress} />
        </View>
        <View style={styles.actionsRetour}>
          <Button title="S'enregistrer" onPress={onNavigateToRegister} />
        </View>
      </View>
    </View>
  );
}

export default Identification;

const createStyles = ({ errorMsgLogin, member }) =>
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
    },
    input: {
      borderColor: errorMsgLogin ? "red" : "black",
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
    actionsRetour: {
      marginVertical: 16,
      justifyContent: "flex-start",
      display: "flex",
      flexDirection: "row",
      padding: 8,
    },
  });
