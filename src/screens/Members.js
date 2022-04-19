import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";

function Members() {
  const { loading, error, data } = useGetAll("members");
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
        <Text>Pas de membre.</Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.map((member) => (
          <View style={styles.avatar} key={member.id}>
            <Avatar
              label={member.firstname[0].toLocaleUpperCase()}
              color={member.favoriteColor}
            />
          </View>
        ))}
        <View style={styles.footer}>
          <Button title="Inviter" />
        </View>
      </ScrollView>
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  list: {
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
});
