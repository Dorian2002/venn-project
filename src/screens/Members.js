import { useState } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";
import isMemberWithinDistance from "../scripts/isMemberWithinDistance";
import Header from "../components/Header";

function Members() {
  const { loading, error, data } = useGetAll("members");
  const [value, setValue] = useState("");
  const [errorMsg, setError] = useState(false);
  const [distance, setDistance] = useState();

  //distance par défaut
  if (distance === null) {
    setDistance(10);
  }

  const onChange = (text) => {
    setError(false);
    setValue(text);
  };

  const onChangeDistance = (d) => {
    setError(false);
    setDistance(d);
  };

  const isMemberWithName = (member) => {
    member.id.match(new RegExp(`(${value})`, "i"));
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <View style={styles.root}>
          <Header />
        </View>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data?.length > 0) {
    return (
      <View style={styles.root}>
        <Header />
        <Text>Pas de membre.</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.root}>
        <Header />
      </View>
      <View style={styles.root}>
        <TextInput
          placeholder="Identifiant"
          style={styles.input}
          value={value}
          onChangeText={onChange}
        />
        <TextInput
          placeholder="Rayon de recherche (en km)"
          style={styles.input}
          value={distance}
          onChangeText={onChangeDistance}
        />
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.map((member) =>
          isMemberWithinDistance(global.loggedMember, member, distance) ? (
            <View style={styles.avatar} key={member.id}>
              <Avatar
                label={member.firstname[0].toLocaleUpperCase()}
                color={member.favoriteColor}
              />
            </View>
          ) : null
        )}
        <View style={styles.footer}>
          <Button title="Inviter" />
        </View>
      </ScrollView>
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  list: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatar: {
    margin: 16,
  },
  footer: {
    width: "100%",
    padding: 32,
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    height: 50,
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 64,
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
});
