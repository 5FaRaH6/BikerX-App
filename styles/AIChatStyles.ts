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

  loadingText: {
    color: "#888888",
    fontSize: 13,
    marginTop: 12,
  },

  header: {
    height: 95,
    paddingTop: 35,
    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#202020",

    backgroundColor: "#090909",
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#141414",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#242424",
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  subtitle: {
    color: "#777777",
    fontSize: 11,
    marginTop: 2,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 35,
  },

  bigAIIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,

    backgroundColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  emptyText: {
    color: "#888888",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  topicRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  topic: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 13,
    paddingVertical: 9,

    backgroundColor: "#111111",

    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 20,
  },

  topicText: {
    color: "#BBBBBB",
    fontSize: 12,
    marginLeft: 6,
  },

  messagesList: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 15,
  },

  messageRow: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-end",
  },

  userMessageRow: {
    justifyContent: "flex-end",
  },

  aiMessageRow: {
    justifyContent: "flex-start",
  },

  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,

    backgroundColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 18,
  },

  userBubble: {
    maxWidth: "78%",
    backgroundColor: "#39FF14",
    borderBottomRightRadius: 5,
  },

  aiBubble: {
    maxWidth: "90%",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#262626",
    borderBottomLeftRadius: 5,
  },

  messageText: {
    color: "#EDEDED",
    fontSize: 14,
    lineHeight: 20,
  },

  userMessageText: {
    color: "#050505",
  },

  typingRow: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,
    paddingBottom: 8,
  },

  typingBubble: {
    height: 38,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#121212",

    borderWidth: 1,
    borderColor: "#242424",
    borderRadius: 18,

    paddingHorizontal: 13,
  },

  typingText: {
    color: "#888888",
    fontSize: 12,
    marginLeft: 8,
  },

  error: {
    color: "#FF5757",
    fontSize: 12,
    textAlign: "center",

    paddingHorizontal: 15,
    marginBottom: 8,
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "flex-end",

    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 47,

    backgroundColor: "#090909",

    borderTopWidth: 1,
    borderTopColor: "#202020",
  },

  input: {
    flex: 1,
    maxHeight: 110,
    minHeight: 48,

    backgroundColor: "#141414",

    borderWidth: 1,
    borderColor: "#292929",
    borderRadius: 24,

    color: "#FFFFFF",

    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 13,

    fontSize: 14,

    marginRight: 9,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonDisabled: {
    opacity: 0.35,
  },
});
