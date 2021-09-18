// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDTpBr5tgxZ4RyH86Mw3HoG-2PDy5uj1UI",
    authDomain: "greenwashing-ad34a.firebaseapp.com",
    projectId: "greenwashing-ad34a",
    storageBucket: "greenwashing-ad34a.appspot.com",
    messagingSenderId: "803347760250",
    appId: "1:803347760250:web:a46918cb8577ac285d67c3"
  },
  env_api_url: 'http://localhost:8080/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
