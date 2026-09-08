import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  loading: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#202020',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  headerSpace: {
    width: 25,
  },

  scroll: {
    padding: 18,
    paddingBottom: 45,
  },

  coverImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 18,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  userPhoto: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },

  defaultPhoto: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  defaultPhotoText: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: 'bold',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  infoText: {
    color: '#BBBBBB',
    fontSize: 14,
    marginLeft: 9,
    flex: 1,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  about: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 21,
  },

  ridersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },

  ridersText: {
    color: '#FFFFFF',
    marginLeft: 8,
  },

  joinButton: {
    backgroundColor: '#39FF14',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  joinedButton: {
    backgroundColor: '#202020',
  },

  joinButtonText: {
    color: '#050505',
    fontWeight: 'bold',
  },

  joinedButtonText: {
    color: '#FFFFFF',
  },

  actions: {
    flexDirection: 'row',
    gap: 25,
    borderTopWidth: 1,
    borderTopColor: '#202020',
    marginTop: 22,
    paddingTop: 15,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    color: '#AAAAAA',
  },

  reportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  reportText: {
    color: '#FF5A5A',
    marginLeft: 7,
  },

  errorText: {
    color: '#FF5A5A',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 25,
  },

  modal: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  input: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 9,
    color: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 12,
  },

  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  reportButton: {
    backgroundColor: '#39FF14',
    borderRadius: 9,
    paddingVertical: 13,
    alignItems: 'center',
  },

  reportButtonText: {
    color: '#050505',
    fontWeight: 'bold',
  },

  cancelText: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 16,
  },

  commentsSection: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: 20,
  },

  commentsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  commentInput: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFFFFF',
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#39FF14',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  commentsLoading: {
    marginVertical: 15,
  },

  noComments: {
    color: '#777777',
    textAlign: 'center',
    marginVertical: 15,
  },

  comment: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  commentPhoto: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 11,
  },

  defaultCommentPhoto: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 11,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  defaultCommentPhotoText: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: 'bold',
  },

  commentContent: {
    flex: 1,
  },

  commentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  commentUsername: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  commentDate: {
    color: '#666666',
    fontSize: 11,
  },

  commentText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },

  

});