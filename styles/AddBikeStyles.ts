import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  loading: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    marginBottom: 24,
  },

  list: {
    gap: 12,
    paddingBottom: 20,
  },

  modelCard: {
    minHeight: 100,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#1F1F1F',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedCard: {
    borderColor: '#39FF14',
    backgroundColor: '#111611',
  },

  brand: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  model: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },

  year: {
    color: '#39FF14',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
  },

  continueButton: {
    minHeight: 52,
    backgroundColor: '#39FF14',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  disabledButton: {
    opacity: 0.35,
  },

  continueText: {
    color: '#050505',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  
});