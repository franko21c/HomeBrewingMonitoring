// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD9BjZaFkcm1g-4caYQR-r_ctlG2LvXnZw",
    authDomain: "homebrewing-beer-monitoring.firebaseapp.com",
    projectId: "homebrewing-beer-monitoring",
    storageBucket: "homebrewing-beer-monitoring.appspot.com",
    messagingSenderId: "149777872073",
    appId: "1:149777872073:web:7a1c4322edc88f1be44918"
  },
  dataTest:new Date(2016,6,26)
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
