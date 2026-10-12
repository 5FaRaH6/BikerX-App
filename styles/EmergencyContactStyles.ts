import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  loading: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  sectionTitle: {
    color: "#A3A3A3",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 12,
  },

  emptyText: {
    color: "#737373",
    fontSize: 14,
    marginBottom: 10,
  },

  contactCard: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contactName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  contactPhone: {
    color: "#A3A3A3",
    fontSize: 14,
    marginTop: 4,
  },

  locationText: {
    color: "#39FF14",
    fontSize: 12,
    marginTop: 5,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    height: 55,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#242424",
    borderRadius: 12,
    color: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 15,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    padding: 15,
    marginTop: 18,
  },

  switchText: {
    flex: 1,
    marginRight: 15,
  },

  switchTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  switchDescription: {
    color: "#737373",
    fontSize: 12,
    marginTop: 5,
    lineHeight: 17,
  },

  error: {
    color: "#FF5757",
    fontSize: 13,
    textAlign: "center",
    marginTop: 15,
  },

  addButton: {
    height: 55,
    backgroundColor: "#39FF14",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  addButtonText: {
    color: "#050505",
    fontSize: 15,
    fontWeight: "800",
  },
});
