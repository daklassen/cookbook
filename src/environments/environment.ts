// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCLni7M_RANpgCFHjxgXCTWfhpCqg5KW0M',
    authDomain: 'cookbook-20d6c.firebaseapp.com',
    databaseURL: 'https://cookbook-20d6c.firebaseio.com',
    projectId: 'cookbook-20d6c',
    storageBucket: 'cookbook-20d6c.appspot.com',
    messagingSenderId: '59785332966'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
