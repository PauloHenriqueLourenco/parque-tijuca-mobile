import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  logout: {
    alignItems: "flex-end",
  },

  header: {
    height: "25%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 5,
    paddingBottom: 24,
    marginBottom: 16,
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

  listContainer: {
    height: "75%",
    flexDirection: "column",
  },

  actionList: {
    marginTop: 24,
  },

  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
  },

  acaoImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 8,
  },

  actionType: {
    fontWeight: "bold",
    fontSize: 18,
  },

  actionDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
  },

  textEmptyComponent: {
    fontSize: 15,
    color: "#737380",
  },

  floatButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#62ad84",
    borderRadius: 30,
  },
});
