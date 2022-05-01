import { View, Text, Image, StyleSheet } from "react-native";
import Avatar from "./Avatar";

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <Avatar
          label={global.loggedMember.member.firstname[0].toLocaleUpperCase()}
          color={global.loggedMember.member.favoriteColor}
        />
      </View>
      <Text style={styles.title}>
        {global.loggedMember.member.firstname}{" "}
        {global.loggedMember.member.lastname}
      </Text>
      <View style={styles.logoPosition}>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    marginLeft: 16,
  },
  logoPosition: {
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    justifyContent: "flex-start",
  },
  title: {
    marginLeft: 8,
    justifyContent: "flex-start",
    fontSize: 32,
    fontWeight: "700",
  },
});
