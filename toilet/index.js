/**
 * @format
 */
import {AppRegistry} from 'react-native';
// import {enableScreens} from 'react-native-screens';

// import 'react-native-gesture-handler';
// enableScreens();

// import App from './App';
import App from './App.toilet';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
