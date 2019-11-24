/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import GlobalInfo from "./src/utils/GlobalInfo";

GlobalInfo.init();

AppRegistry.registerComponent(appName, () => App);
