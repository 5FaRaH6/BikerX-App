let idToken: string | null = null;
let keepLoggedIn = false;

export function saveGoogleSession(token: string, keep: boolean) {
  idToken = token;
  keepLoggedIn = keep;
}

export function getGoogleToken() {
  return idToken;
}

export function getGoogleKeepLoggedIn() {
  return keepLoggedIn;
}

export function clearGoogleSession() {
  idToken = null;
  keepLoggedIn = false;
}