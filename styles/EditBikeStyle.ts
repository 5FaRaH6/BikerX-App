import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  loading: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
  },

  description: {
    color: "#888888",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 26,
  },

  label: {
    color: "#CFCFCF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
  },

  input: {
    minHeight: 54,
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 15,
    paddingHorizontal: 15,
    color: "#FFFFFF",
    fontSize: 15,
  },

  saveButton: {
    minHeight: 56,
    backgroundColor: "#39FF14",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },

  disabledButton: {
    opacity: 0.35,
  },

  saveButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
});
