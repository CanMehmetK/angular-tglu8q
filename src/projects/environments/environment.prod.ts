import { env } from 'projects/environments/.env';

export const environment = {
  production: true,
  hmr: false,
  useHash: false,
  version: env.npm_package_version + '-prod',
  serverUrl: '/api',
  SERVER_URL: '',
  API_URL: 'https://localhost:44304',
  LOGIN_URL: '/api/account/login',
  defaultLanguage: 'tr-TR',
  supportedLanguages: ['tr-TR', 'en-US'],
};
