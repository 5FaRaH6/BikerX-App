import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  scroll: {
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 50,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    marginTop: 8,
    marginBottom: 25,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 15,
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
    fontSize: 15,
  },

  passwordContainer: {
    height: 55,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
  },

  showPassword: {
    color: '#39FF14',
    paddingHorizontal: 15,
    fontSize: 13,
  },

  bikeContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  bikeButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedBikeButton: {
    borderColor: '#39FF14',
  },

  bikeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  error: {
    color: '#FF5757',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
  },

  signupButton: {
    height: 55,
    backgroundColor: '#39FF14',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  signupButtonText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: 'bold',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#242424',
  },

  orText: {
    color: '#737373',
    fontSize: 12,
    marginHorizontal: 15,
  },

  googleButton: {
    height: 55,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleIcon: {
    width: 25,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  googleIconText: {
    color: '#050505',
    fontSize: 15,
    fontWeight: 'bold',
  },

  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  loginText: {
    color: '#A3A3A3',
    fontSize: 14,
  },

  loginLink: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },

});