import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
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

  logoCard: {
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "#1D391A",
    borderRadius: 22,
    paddingVertical: 27,
    alignItems: "center",
    marginBottom: 28,
  },

  logoIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#10220E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
  },

  logoX: {
    color: "#39FF14",
  },

  tagline: {
    color: "#888888",
    fontSize: 12,
    marginTop: 5,
  },

  versionBadge: {
    backgroundColor: "#131313",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    marginTop: 15,
  },

  versionText: {
    color: "#AAAAAA",
    fontSize: 10,
    fontWeight: "600",
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

  card: {
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: "row",
    paddingVertical: 16,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#121C11",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  itemDescription: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 17,
  },

  divider: {
    height: 1,
    backgroundColor: "#1C1C1C",
    marginLeft: 53,
  },

  smallRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  smallTextContainer: {
    marginLeft: 13,
  },

  smallTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  smallDescription: {
    color: "#777777",
    fontSize: 11,
    marginTop: 3,
  },

  footer: {
    color: "#555555",
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },
});
