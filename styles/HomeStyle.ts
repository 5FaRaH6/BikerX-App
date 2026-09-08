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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#050505',
    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1D1D1D',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  logoGreen: {
    color: '#39FF14',
  },

  searchContainer: {
    height: 43,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#252525',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginTop: 15,
  },

  search: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 7,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 14,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: '#39FF14',
  },

  tabText: {
    color: '#777777',
    fontSize: 15,
    fontWeight: '600',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  list: {
    paddingTop: 190,
    paddingHorizontal: 14,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: '#202020',
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  userPhoto: {
    width: 43,
    height: 43,
    borderRadius: 22,
    marginRight: 10,
  },

  defaultPhoto: {
    width: 43,
    height: 43,
    borderRadius: 22,
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

  smallText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 2,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  description: {
    color: '#BBBBBB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },

  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 12,
  },

  meetupImage: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginBottom: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  location: {
    color: '#999999',
    fontSize: 13,
    marginLeft: 5,
    flex: 1,
  },

  meetupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },

  meetupInfo: {
    color: '#999999',
    fontSize: 13,
    marginLeft: 6,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    borderTopWidth: 1,
    borderTopColor: '#202020',
    paddingTop: 12,
    marginTop: 5,
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

  joinButton: {
    marginLeft: 'auto',
    backgroundColor: '#39FF14',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 8,
  },

  joinedButton: {
    backgroundColor: '#242424',
  },

  joinText: {
    color: '#050505',
    fontWeight: 'bold',
  },

  joinedText: {
    color: '#FFFFFF',
  },

  error: {
    position: 'absolute',
    top: 180,
    alignSelf: 'center',
    zIndex: 5,
    color: '#FF5A5A',
  },

  emptyText: {
    color: '#777777',
    textAlign: 'center',
    marginTop: 100,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: '#090909',
    borderTopWidth: 1,
    borderTopColor: '#202020',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 7,
  },

  navItem: {
    alignItems: 'center',
    width: 55,
  },

  navText: {
    color: '#777777',
    fontSize: 11,
    marginTop: 4,
  },

  navActiveText: {
    color: '#39FF14',
    fontSize: 11,
    marginTop: 4,
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#39FF14',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  createModalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  createModal: {
    backgroundColor: '#101010',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  modalLine: {
    width: 45,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#444444',
    alignSelf: 'center',
    marginBottom: 20,
  },

  createTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  createOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  createIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  createOptionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  createOptionText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },

  cancelCreate: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 2,
  },

  cancelCreateText: {
    color: '#999999',
    fontSize: 14,
  },
});