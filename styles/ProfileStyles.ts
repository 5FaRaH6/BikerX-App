import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
  },

  profileImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#39FF14',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profilePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: '#39FF14',
    alignSelf: 'center',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 11,
  },

  bio: {
    color: '#999999',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 7,
    paddingHorizontal: 30,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 70,
    marginTop: 23,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  statLabel: {
    color: '#888888',
    fontSize: 12,
    marginTop: 3,
  },

  editButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 17,
    paddingVertical: 9,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 14,
  },

  bikeCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 18,
    padding: 14,
    overflow: 'hidden',
  },

  bikePlaceholderText: {
    color: '#777777',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },

  bikeName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },

  bikeYear: {
    color: '#39FF14',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },

  bikeNickname: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  contentSection: {
    marginTop: 30,
  },

  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginBottom: 10,
  },

  tabsContainer: {
    flexDirection: 'row',
  },

  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTabButton: {
    borderBottomColor: '#39FF14',
  },

  tabText: {
    color: '#888888',
    fontSize: 13,
  },

  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  listContainer: {
    marginTop: 14,
    gap: 12,
  },

  emptyContainer: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  emptyText: {
    color: '#666666',
    fontSize: 13,
  },

  postCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 14,
  },

  postText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },

  postDescription: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },

  postImage: {
    width: '100%',
    height: 190,
    marginTop: 12,
  },

  meetupCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 14,
  },

  meetupImage: {
    width: '100%',
    height: 170,
    marginBottom: 12,
  },

  meetupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  meetupTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },

  meetupStatus: {
    color: '#39FF14',
    fontSize: 11,
    fontWeight: '600',
  },

  meetupAbout: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 9,
  },

  detailText: {
    color: '#888888',
    fontSize: 12,
    flexShrink: 1,
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 14,
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  actionText: {
    color: '#AAAAAA',
    fontSize: 12,
  },

  viewGarageButton: {
  marginTop: 16,
  borderWidth: 1,
  borderColor: '#39FF14',
  borderRadius: 12,
  paddingVertical: 10,
  alignItems: 'center',
},

viewGarageText: {
  color: '#39FF14',
  fontSize: 12,
  fontWeight: '700',
  letterSpacing: 0.7,
},
});