import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingHorizontal: 18,
  },

  loading: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  headerSpace: {
    width: 25,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  userPhoto: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 11,
  },

  defaultPhoto: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
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

  date: {
    color: '#777777',
    fontSize: 12,
    marginTop: 3,
  },

  about: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  description: {
    color: '#BBBBBB',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },

  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  location: {
    color: '#AAAAAA',
    fontSize: 13,
    marginLeft: 5,
  },

  actions: {
    flexDirection: 'row',
    gap: 25,
    borderTopWidth: 1,
    borderTopColor: '#202020',
    paddingTop: 15,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    color: '#AAAAAA',
    fontSize: 14,
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
    marginTop: 4,
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
});