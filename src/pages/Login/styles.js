import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  image: {
    // flex: 1,
    width: "100%",
    height: 110,
    resizeMode: "contain",
  },

  login: {
    width: "100%",
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  entrar: {
    backgroundColor: "#62ad84",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
});
