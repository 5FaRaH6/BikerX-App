import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  logoGreen: {
    color: '#39FF14',
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
    marginTop: 10,
  },

  email: {
    color: '#39FF14',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'center',
    letterSpacing: 4,
  },

  error: {
    color: '#FF5757',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 15,
  },

  button: {
    height: 55,
    backgroundColor: '#39FF14',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backText: {
    color: '#39FF14',
    textAlign: 'center',
    marginTop: 25,
  },

});