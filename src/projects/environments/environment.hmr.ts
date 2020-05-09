// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { env } from 'projects/environments/.env';

export const environment = {
  production: false,
  hmr: true,
  useHash: false,
  version: env.npm_package_version + '-dev',
  serverUrl: '/api',
  SERVER_URL: '',
  API_URL: 'https://localhost:44304',
  LOGIN_URL: '/api/account/login',
  defaultLanguage: 'tr-TR',
  supportedLanguages: ['tr-TR', 'en-US'],
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
