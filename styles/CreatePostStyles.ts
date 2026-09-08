import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
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
    width: 27,
  },

  scroll: {
    padding: 18,
    paddingBottom: 40,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 10,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  imageButton: {
    height: 190,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageButtonText: {
    color: '#AAAAAA',
    marginTop: 8,
  },

  removeImage: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  removeImageText: {
    color: '#FF5A5A',
    fontSize: 13,
  },

  locationInput: {
    height: 48,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  locationTextInput: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 7,
  },

  commentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 10,
    padding: 14,
    marginTop: 22,
  },

  commentsTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  commentsText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },

  error: {
    color: '#FF5A5A',
    textAlign: 'center',
    marginTop: 15,
  },

  postButton: {
    backgroundColor: '#39FF14',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
  },

  postButtonText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: 'bold',
  },
});