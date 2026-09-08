import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 25,
  },

  item: {
    minHeight: 58,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  itemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  logoutButton: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#3A1B1B',
    backgroundColor: '#120B0B',
    borderRadius: 14,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  logoutText: {
    color: '#FF5C5C',
    fontSize: 14,
    fontWeight: '700',
  },
});