import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  center: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  loadingText: {
    color: "#888888",
    fontSize: 13,
    marginTop: 14,
  },

  errorTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 15,
    marginBottom: 8,
  },

  errorText: {
    color: "#888888",
    fontSize: 13,
    textAlign: "center",
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 27,
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

  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    color: "#777777",
    fontSize: 12,
    marginTop: 2,
  },

  readyCard: {
    backgroundColor: "#0D150C",
    borderWidth: 1,
    borderColor: "#1D391A",
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  readyIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#10220E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  readyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  readyDescription: {
    color: "#7D7D7D",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  statusCard: {
    minHeight: 75,
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#121C11",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  statusTextContainer: {
    flex: 1,
    paddingRight: 8,
  },

  statusTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  statusDescription: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  statusBadge: {
    minWidth: 42,
    height: 27,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },

  statusBadgeActive: {
    backgroundColor: "#11290E",
  },

  statusBadgeText: {
    color: "#777777",
    fontSize: 10,
    fontWeight: "800",
  },

  statusBadgeTextActive: {
    color: "#39FF14",
  },

  startButton: {
    height: 58,
    backgroundColor: "#39FF14",
    borderRadius: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  startButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginLeft: 8,
  },

  footer: {
    color: "#555555",
    fontSize: 11,
    textAlign: "center",
    marginTop: 17,
  },

  map: {
    flex: 1,
  },

  locationMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#39FF14",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  activeHeader: {
    position: "absolute",
    top: 52,
    left: 18,
    right: 18,
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "#232323",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  activeLabel: {
    color: "#39FF14",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  activeTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 3,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10220E",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#39FF14",
    marginRight: 6,
  },

  liveText: {
    color: "#39FF14",
    fontSize: 9,
    fontWeight: "900",
  },

  ridePanel: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 20,
    backgroundColor: "#090909",
    borderWidth: 1,
    borderColor: "#242424",
    borderRadius: 24,
    padding: 16,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#101010",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#202020",
    paddingVertical: 13,
    alignItems: "center",
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },

  statLabel: {
    color: "#777777",
    fontSize: 10,
    marginTop: 3,
  },

  safetyTitle: {
    color: "#666666",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 17,
    marginBottom: 8,
    marginLeft: 3,
  },

  safetyBox: {
    backgroundColor: "#101010",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#202020",
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  safetyItem: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
  },

  safetyText: {
    color: "#DDDDDD",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 8,
  },

  safetyTextOff: {
    color: "#666666",
  },

  endButton: {
    height: 52,
    backgroundColor: "#D93636",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  endButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 7,
    letterSpacing: 0.7,
  },
});
