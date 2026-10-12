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
    paddingBottom: 55,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  headerSpace: {
    width: 40,
  },

  photoSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  profilePhoto: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: "#39FF14",
  },

  photoPlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#111111",
    borderWidth: 2,
    borderColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 3,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#050505",
  },

  changePhotoText: {
    color: "#39FF14",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
  },

  label: {
    color: "#CFCFCF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 16,
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

  usernameInput: {
    minHeight: 54,
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  atText: {
    color: "#39FF14",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 2,
  },

  usernameTextInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },

  bioHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  bioCount: {
    color: "#666666",
    fontSize: 11,
    marginBottom: 8,
  },

  bioInput: {
    minHeight: 110,
    paddingTop: 14,
  },

  saveButton: {
    minHeight: 56,
    backgroundColor: "#39FF14",
    borderRadius: 15,
    marginTop: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  disabledButton: {
    opacity: 0.4,
  },

  saveButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
});
