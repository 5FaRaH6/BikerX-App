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
    paddingBottom: 45,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
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

  aboutInput: {
    height: 110,
    textAlignVertical: 'top',
  },

  imageButton: {
    height: 200,
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
    marginTop: 9,
  },

  removeImage: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  removeImageText: {
    color: '#FF5A5A',
    fontSize: 13,
  },

  pickerButton: {
    height: 50,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  pickerText: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 9,
    fontSize: 14,
  },

  placeholderText: {
    color: '#737373',
  },

  locationInput: {
    height: 50,
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
    marginLeft: 8,
    fontSize: 14,
  },

  locationButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  locationButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#292929',
    backgroundColor: '#111111',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
  },

  mapContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#292929',
  },

  map: {
    width: '100%',
    height: 260,
  },

  mapHelp: {
    backgroundColor: '#111111',
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  },

  selectedLocation: {
  backgroundColor: '#111111',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 9,
  gap: 6,
},

selectedLocationText: {
  color: '#39FF14',
  fontSize: 12,
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
    marginTop: 24,
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
    marginTop: 16,
  },

  createButton: {
    backgroundColor: '#39FF14',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  createButtonText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});