import { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import createNewUserId from "../scripts/createNewUserId";
import { HexColorPicker } from "react-colorful";
import * as Location from "expo-location";
import app from "../../app.json";
import ColorContext from "../ColorContext";
import Button from "../components/Button";
import Greetings from "../components/Greetings";
import { RegisterUser } from "../firebase";
import { GeoPoint } from "firebase/firestore";

function Register({ navigation }) {
  const [, setColor] = useContext(ColorContext);
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [favoritecolor, setFcolor] = useState("");
  const [member, setMember] = useState(null);
  const [errorN, setErrorN] = useState(false);
  const [errorP, setErrorP] = useState(false);

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
    errorN,
    errorP,
    member: Boolean(member),
  });
  const onChangeLname = (text) => {
    setErrorMsg("");
    setErrorN(false);
    setErrorP(false);
    setMember(null);
    setLname(text);
  };
  const onChangeFname = (text) => {
    setErrorMsg("");
    setErrorP(false);
    setErrorN(false);
    setMember(null);
    setFname(text);
  };
  const onNavigateToconnect = () => {
    navigation.navigate("Identification");
  };
  const onNavigateToHome = () => {
    navigation.navigate("Accueil", {
      member: member,
    });
  };
  const onPress = () => {
    if (lastname === "") {
      setErrorN(true);
      setErrorMsg("Votre nom ne peut pas être vide.");
    } else if (firstname === "") {
      setErrorP(true);
      setErrorMsg("Votre prénom ne peut pas être vide.");
    } else {
      RegisterUser(
        createNewUserId(firstname, lastname),
        firstname,
        lastname,
        favoritecolor,
        new GeoPoint(location.coords.latitude, location.coords.longitude)
      ).then((newMember) => {
        setMember(newMember);
        setColor(newMember.favoriteColor);
      });
    }
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
          placeholder="Nom"
          style={styles.inputN}
          lastname={lastname}
          onChangeText={onChangeLname}
        />
        <TextInput
          placeholder="Prénom"
          style={styles.inputP}
          firstname={firstname}
          onChangeText={onChangeFname}
        />
        <Text style={styles.error}>{errorMsg ? errorMsg : null}</Text>
        <HexColorPicker favoritecolor={favoritecolor} onChange={setFcolor} />
        <View style={styles.actions}>
          <Button title="S'enregistrer" onPress={onPress} />
        </View>
        <View style={styles.actionsRetour}>
          <Button title="S'identifier" onPress={onNavigateToconnect} />
        </View>
      </View>
    </View>
  );
}

export default Register;

const createStyles = ({ error, errorP, errorN, member }) =>
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
    inputN: {
      borderColor: errorN ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    inputP: {
      borderColor: errorP ? "red" : "black",
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
