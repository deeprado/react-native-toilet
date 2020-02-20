import {Platform} from 'react-native';

export const appName = 'Surmon.me';
export const webUrl = 'http://localhost:3000';
export const appApi = 'http://localhost:3000/api';
export const staticApi = 'http://localhost:3000/static';
export const gravatarApi = 'http://localhost:3000/avatar';
export const webviewApi = 'http://localhost:3000/webview';
export const dataApi = 'http://localhost:3000/data';
export const navigationPersistenceKey = __DEV__
  ? '___NavigationStateDEV__'
  : null;

export const IS_DEV = __DEV__;
export const IS_IOS = Object.is(Platform.OS, 'ios');
export const IS_ANDROID = !IS_IOS;
