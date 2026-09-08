import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  loading: {
    flex: 1,
    backgroundColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  headerSpace: {
    width: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  list: {
    gap: 10,
  },

  userCard: {
    minHeight: 70,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  photo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#39FF14',
  },

  defaultPhoto: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#39FF14',
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginLeft: 13,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  emptyText: {
    color: '#666666',
    fontSize: 13,
  },
});