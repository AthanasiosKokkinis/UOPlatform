import { View, Text, StyleSheet, Image } from "react-native";

export const Comment = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.row}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" }}
          style={styles.avatar}
        />
        <Text style={{color: "white"}}>Mean User</Text>
      </View>

      <View>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, I don't remember the rest and I am too bored to generate another. I need to install a VScode plugin for this.
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  text: {
    color: "white",
    marginTop: 8,
  },
});