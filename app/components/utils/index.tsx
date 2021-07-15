import { Dimensions, Platform, Linking, Share } from 'react-native';
import moment from 'moment';

/**
 * Check if remote debug is enabled
 */
export function isRemoteDebuggingEnabled() {
  const isEnabled = typeof atob !== 'undefined';
  return isEnabled;
}

export function getWindowDimensions() {
  return Dimensions.get('window');
}

export function getScreenDimensions() {
  return Dimensions.get('screen');
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function regexMatch(text, search) {
  const regex = new RegExp(
    '^[\\u0000-\\uFFFF\\s\\.\\t\\d\\w-]*' + search + '[\\u0000-\\uFFFF\\s\\.\\t\\d\\w-]*$',
    'gi',
  );
  return regex.test(text);
}

export function isFalseValue(value) {
  return (
    value === null ||
    value === undefined ||
    value === NaN ||
    value === false ||
    value === 0 ||
    value === '' ||
    value.length === 0
  );
}

export function isAnyFalseValue(...values) {
  return values.some((v) => isFalseValue(v));
}

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function createHitSlop(offset) {
  return {
    left: offset,
    right: offset,
    top: offset,
    bottom: offset,
  };
}

/**
 * Open phone call with provided number
 *
 * @param {string} phoneNumber
 * @param {boolean} prompt
 */
export function callPhone(phoneNumber, prompt) {
  if (prompt && isIOS()) {
    return Linking.openURL(`telprompt:${phoneNumber}`);
  } else {
    return Linking.openURL(`tel:${phoneNumber}`);
  }
}

export function getCurrentYMD() {
  return moment().format('YYYY-MM-DD');
}

export function clamp01(value) {
  if (value > 1.0) return 1.0;
  else if (value < 0) return 0;
  else return value;
}

export function clamp(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
}

/**
 * Convert data of image picker response to available 64 based data that can be sent
 * through http request
 * @param {object} imagePickerResponse Response data object from react native image picker
 */
export function get64BaseHttpImageData(imagePickerResponse) {
  let fileExt = imagePickerResponse.uri.substring(imagePickerResponse.uri.lastIndexOf('.') + 1);
  return `data:image/${fileExt};base64,${imagePickerResponse.data}`;
}

export function share(dataUrl) {
  if (isAndroid()) {
    Share.share({
      message: dataUrl,
      title: 'Share',
    });
  } else {
    Share.share({
      url: dataUrl,
    });
  }
}

export function mailTo(email) {
  Linking.openURL('mailto:' + email);
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
}

export function isImagePath(path) {
  return path.search(/.jpg|png|jpeg|bmp|tiff|JPG|PNG|JPEG|BMP|TIFF$/) >= 0;
}

function log(logFunc, message, ...optionalParams) {
  if (!isRemoteDebuggingEnabled() || typeof logFunc != 'function') {
    return;
  }
  logFunc(message, ...optionalParams);
}

export function logInfo(message, ...optionalParams) {
  log(console.log, message, ...optionalParams);
}

export function logWarn(message, ...optionalParams) {
  log(console.warn, message, ...optionalParams);
}

export function logError(message, ...optionalParams) {
  log(console.error, message, ...optionalParams);
}

/**
 * Check if the string value contains only numeric digits
 * @param {string} value
 */
export function isNumeric(value) {
  const reg = /[^0-9]/gi;
  return !reg.test(value);
}

export function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function extractFloatText(text) {
  return text.replace(/[^0-9\.]/g, '');
}

export function parseOnlyNumericString(value) {
  return value.replace(/\D/, '');
}

export const getVideoId = (url) => {
  const result = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  const videoIdWithParams = result[2];

  if (videoIdWithParams !== undefined) {
    const cleanVideoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0];

    return cleanVideoId;
  }

  return null;
};

/**
 * Api
 * -------------------------------------------------------------------------
 */

/**
 * Convert query paramters to string
 * Ex: { id: 1, usrname: "john" } => 'id=1&username=john'
 * @param {object} params { key: value, ... }
 */
export function convertQueryParamtersToString(params) {
  const ret = [];
  if (params) {
    for (let d in params) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
    }
  }
  return ret.join('&');
}

/**
 * Called to get value index of probabilities
 * @param {array} probs Array of number
 */
export function getProbability(probs = []) {
  let total = 0;

  for (let p of probs) {
    total += p;
  }

  let randomPoint = Math.random() * total;
  let i = 0;

  for (i = 0; i < probs.length; i++) {
    if (randomPoint < probs[i]) break;
    else randomPoint -= probs[i];
  }

  return i;
}

/**
 * Path
 * -------------------------------------------------------------------------
 */
export function getFileExtension(filename) {
  return filename.split('.').pop();
}

export function getFileNameWithoutExtension(filename) {
  const st = filename.split('/');
  return st[st.length - 1].split('.').shift();
}

export function getFileName(filePath) {
  const st = filePath.split('/');
  return st[st.length - 1];
}

/**
 * Android
 * -------------------------------------------------------------------------
 */
export function getAndroidBottomNavigationBarHeight() {
  return getScreenDimensions().height - getWindowDimensions().height;
}

/**
 * Array
 * -------------------------------------------------------------------------
 */
export function flattenDeepArray(arr1) {
  return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenDeepArray(val)) : acc.concat(val)), []);
}

/**
 * Flatlist
 * -------------------------------------------------------------------------
 */
export function createFlatListItemLayout(itemHeight) {
  return (data, index) => ({ length: itemHeight, offset: itemHeight * index, index });
}

/**
 * iOS Settings
 * References:
 * https://stackoverflow.com/questions/39081688/open-settings-app-from-another-app-in-ios-react-native
 * https://stackoverflow.com/questions/8246070/ios-launching-settings-restrictions-url-scheme
 * -------------------------------------------------------------------------
 */
function openiOSAppSettings() {
  return Linking.openURL('app-settings:');
}

function openiOSSettings(type, path) {
  let url = `App-Prefs:root=${type}`;
  if (!isFalseValue(path)) {
    url = `${url}&path=${path}`;
  }
  return Linking.openURL(url);
}

const iOSSettingType = {
  General: 'General',
  WiFi: 'WIFI',
  About: 'About',
  AirplaneMode: 'AIRPLANE_MODE',
  Accessibility: 'ACCESSIBILITY',
};

export const iOSSettings = {
  openAppSettings: openiOSAppSettings,
  openGeneralSettings: () => openiOSSettings(iOSSettingType.General),
  openAbout: () => openiOSSettings(iOSSettingType.General, iOSSettingType.About),
  openWiFiSettings: () => openiOSSettings(iOSSettingType.WiFi),
  openAirplaneMode: () => openiOSSettings(iOSSettingType.AirplaneMode),
  openAccessibility: () => openiOSSettings(iOSSettingType.General, iOSSettingType.Accessibility),
};

/**
 * App
 * -------------------------------------------------------------------------
 */


export function createBottomTab(label, SelectTabBarIcon, UnselectTabBarIcon, isPrivate = false) {
  return {
    SelectTabBarIcon,
    UnselectTabBarIcon,
    tabBarLabel: label,
    isPrivate,
  };
}

function isCompleted(state) {
  return state == 'completed';
}

export const requestStateChecker = {
  isCompleted,
};

