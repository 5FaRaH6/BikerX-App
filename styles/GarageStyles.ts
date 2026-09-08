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

  scrollContent: {
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 22,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
  },

  emptyDescription: {
    color: '#8A8A8A',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 10,
    paddingHorizontal: 25,
  },

  addButton: {
    marginTop: 30,
    backgroundColor: '#39FF14',
    width: '100%',
    minHeight: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  addButtonText: {
    color: '#050505',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.6,
  },

  heroCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#1F1F1F',
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
  },

  bikeImage: {
    width: '100%',
    height: 210,
    marginBottom: 10,
  },

  bikePlaceholder: {
    width: '100%',
    height: 210,
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  brand: {
    color: '#8A8A8A',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  model: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },

  year: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },

  nickname: {
    color: '#BFBFBF',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },

  sectionLabel: {
    color: '#8A8A8A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  detailsCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#1F1F1F',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  detailItem: {
    minHeight: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1C',
  },

  detailLabel: {
    color: '#7A7A7A',
    fontSize: 13,
    fontWeight: '600',
  },

  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },

  editButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  editButtonText: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});