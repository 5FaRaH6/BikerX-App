import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#A3A3A3",
    fontSize: 15,
  },

  notification: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#242424",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  unreadNotification: {
    borderColor: "#39FF14",
  },

  message: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 8,
  },

  date: {
    color: "#737373",
    fontSize: 12,
  },
});