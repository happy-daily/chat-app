import { Dimensions, Platform, StatusBar } from 'react-native';
const window = Dimensions.get('window');

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;

export const API_TOKEN = "3dbdbd95376fc4d41980a6cd6dbaa2e12893912a";
