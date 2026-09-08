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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  description: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    color: '#BDBDBD',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    minHeight: 52,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#232323',
    borderRadius: 14,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 15,
  },

  saveButton: {
    minHeight: 54,
    backgroundColor: '#39FF14',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },

  disabledButton: {
    opacity: 0.35,
  },

  saveButtonText: {
    color: '#050505',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
});