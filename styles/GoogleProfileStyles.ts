import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 55,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
  },

  bikeOptions: {
    flexDirection: 'row',
    gap: 12,
  },

  bikeButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },

  selectedBikeButton: {
    borderColor: '#39FF14',
  },

  bikeText: {
    color: '#FFFFFF',
  },

  error: {
    color: '#FF5757',
    textAlign: 'center',
    marginTop: 20,
  },

  continueButton: {
    height: 55,
    backgroundColor: '#39FF14',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  continueText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: 'bold',
  },

});