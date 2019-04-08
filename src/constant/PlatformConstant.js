import { Dimensions, Platform, StatusBar } from 'react-native';

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;
