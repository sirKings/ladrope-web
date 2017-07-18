// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyDlN-RFjSBq4jBipkkyDYtF2AMuu8Kz1TY",
    authDomain: "ladrope-9e888.firebaseapp.com",
    databaseURL: "https://ladrope-9e888.firebaseio.com",
    projectId: "ladrope-9e888",
    storageBucket: "ladrope-9e888.appspot.com",
    messagingSenderId: "205152875857"
  }

};
