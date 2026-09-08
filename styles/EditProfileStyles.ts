import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#080808",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  headerSpace: {
    width: 42,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  photoSection: {
    alignItems: "center",
    marginBottom: 35,
  },

  photoWrapper: {
    position: "relative",
  },

  profilePhoto: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: "#39FF14",
  },

  defaultPhoto: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#131313",
    borderWidth: 2,
    borderColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#080808",
  },

  changePhotoText: {
    color: "#39FF14",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
  },

  inputGroup: {
    marginBottom: 21,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    minHeight: 50,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#303030",
    color: "#FFFFFF",
    paddingHorizontal: 14,
    fontSize: 14,
  },

  usernameContainer: {
    minHeight: 50,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#303030",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  atText: {
    color: "#39FF14",
    fontSize: 15,
    fontWeight: "700",
    marginRight: 3,
  },

  usernameInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },

  bioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bioInput: {
    height: 110,
    paddingTop: 13,
  },

  bioCount: {
    color: "#666666",
    fontSize: 11,
  },

  saveButton: {
    height: 52,
    backgroundColor: "#39FF14",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "800",
  },
});
