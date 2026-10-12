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
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#242424",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#777777",
    fontSize: 12,
    marginTop: 2,
  },

  heroCard: {
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "#1D391A",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#10220E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },

  heroDescription: {
    color: "#888888",
    fontSize: 12,
    lineHeight: 18,
  },

  sectionTitle: {
    color: "#707070",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginLeft: 4,
    marginBottom: 9,
    marginTop: 8,
  },

  sectionCard: {
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 24,
    overflow: "hidden",
  },

  settingItem: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  settingLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },

  iconBox: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#121C11",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  settingTextContainer: {
    flex: 1,
  },

  settingTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  settingDescription: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#1C1C1C",
    marginLeft: 51,
  },

  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  countButton: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#1B1B1B",
    borderWidth: 1,
    borderColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
  },

  countButtonDisabled: {
    opacity: 0.3,
  },

  countValue: {
    minWidth: 48,
    alignItems: "center",
  },

  countNumber: {
    color: "#39FF14",
    fontSize: 16,
    fontWeight: "800",
  },

  countSeconds: {
    color: "#666666",
    fontSize: 9,
    marginTop: -2,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D150C",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#183316",
    padding: 14,
    marginTop: 2,
  },

  infoText: {
    flex: 1,
    color: "#858585",
    fontSize: 11,
    lineHeight: 17,
    marginLeft: 10,
  },
});
