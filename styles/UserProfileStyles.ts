import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },

  loading: {
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  headerSpace: {
    width: 36,
  },

  profilePhoto: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: '#39FF14',
    alignSelf: 'center',
  },

  defaultPhoto: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#39FF14',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
  },

  username: {
    color: '#8A8A8A',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },

  bio: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 25,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 70,
    marginTop: 24,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  statLabel: {
    color: '#888888',
    fontSize: 12,
    marginTop: 3,
  },

  followButton: {
    minHeight: 48,
    backgroundColor: '#39FF14',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  followingButton: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
  },

  followText: {
    color: '#050505',
    fontSize: 14,
    fontWeight: '800',
  },

  followingText: {
    color: '#FFFFFF',
  },

  bikeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },

  bikeSectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },

  bikeSectionTitle: {
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

  tabs: {
    flexDirection: 'row',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 13,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: '#39FF14',
  },

  tabText: {
    color: '#777777',
    fontSize: 13,
  },

  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  list: {
    marginTop: 15,
    gap: 12,
  },

  emptyText: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 30,
  },

  card: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 14,
    padding: 14,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cardText: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 7,
  },

  postImage: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    marginTop: 12,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 14,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  actionText: {
    color: '#AAAAAA',
    fontSize: 12,
  },

  meetupImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  meetupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  status: {
    color: '#39FF14',
    fontSize: 11,
    fontWeight: '700',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },

  detailText: {
    color: '#888888',
    fontSize: 12,
    flexShrink: 1,
  },
});