import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { User } from "../../assets/svgs/login/User";
import { Plus } from "../../assets/svgs/footer/Plus";
import { Home } from "../../assets/svgs/footer/Home";

interface FooterProps {
  onNewPost?: () => void;
}

export const Footer = ({ onNewPost }: FooterProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={FooterStyles.container}>
      <TouchableOpacity
        style={FooterStyles.button}
        hitSlop={8}
        onPress={() => navigation.navigate("Main")}
      >
        <Home color="white" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={FooterStyles.button}
        hitSlop={8}
        onPress={() => onNewPost?.()}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={FooterStyles.button}
        hitSlop={8}
        onPress={() => navigation.navigate("Profile")}
      >
        <User color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const FooterStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181616ff",
  },
  button: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
