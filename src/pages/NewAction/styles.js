import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  scrollView: {
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  logoImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  fotoContent: {
    width: 130,
    height: 130,
    resizeMode: "contain",
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

  userDetails: {
    flexDirection: "column",
    marginLeft: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  userProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    marginRight: 8,
  },

  userValue: {
    fontSize: 15,
    color: "#737380",
  },

  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  title: { fontSize: 18, alignSelf: "center", marginBottom: 8 },

  inputDescription: {
    // alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  sendButton: {
    backgroundColor: "#62ad84",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },
});
