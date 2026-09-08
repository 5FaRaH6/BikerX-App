import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  logoGreen: {
    color: '#39FF14',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    marginTop: 8,
  },

  form: {
    width: '100%',
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
    color: '#FFFFFF',
    paddingHorizontal: 16,
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
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
  },

  showPassword: {
    color: '#39FF14',
    fontSize: 13,
    paddingHorizontal: 15,
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  keepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    color: '#39FF14',
    fontSize: 18,
    marginRight: 7,
  },

  keepText: {
    color: '#A3A3A3',
    fontSize: 13,
  },

  forgotText: {
    color: '#39FF14',
    fontSize: 13,
  },

  error: {
    color: '#FF5757',
    fontSize: 13,
    marginTop: 15,
    textAlign: 'center',
  },

  loginButton: {
    height: 55,
    backgroundColor: '#39FF14',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  loginButtonText: {
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
    fontWeight: 'bold',
    fontSize: 15,
  },

  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  signupText: {
    color: '#A3A3A3',
    fontSize: 14,
  },

  signupLink: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },

});