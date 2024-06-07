// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spoonacularBaseUrl: process.env["SPOONACULAR_BASE_URL"],
  spoonacularApiKey: process.env["SPOONACULAR_API_KEY"],
  edamamBaseUrl: process.env["EDAMAM_BASE_URL"],
  edamamApiKey: process.env["EDAMAM_API_KEY"],
  edamamApiId: process.env["EDAMAM_API_ID"],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
