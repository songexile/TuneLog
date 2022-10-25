import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    padding: 20,
  },
  circleImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
  },
  spacer: {
    marginTop: 20,
  },
  rectContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: "10%",
    width: "100%",
    borderRadius: 20,

    alignItems: "center",
  },
  roundContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: "20%",
    width: "100%",
    borderRadius: 20,

    alignItems: "center",
  },
});
