/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import React, {Component} from 'react';

import {Dimensions, PixelRatio, ActivityIndicator} from 'react-native';

export default {
  navigationHeight: 44,
  navigationBarBGColor: '#3497FF',
  statusBarHeight: 20,
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback) {
    fetch(url)
      .then(response => response.text())
      .then(responseText => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err) {
        failCallback(err);
      });
  },
  /*loading效果*/
  loading: <ActivityIndicator color="#3E00FF" style={{marginTop: 40}} />,

  getAppBarHeight: () => {
    return 44;
    // return Platform.OS === 'ios'
    //     ? isLandscape && !Platform.isPad
    //         ? 32
    //         : 44
    //     : 56;
  },
  isAndroid() {
    return Platform.OS !== 'ios';
  },
  isIphoneX: () => {
    const d = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (d.height === 812 || d.width === 812)
    );
  },
  getIphoneStatusBarHeight: () => {
    return this.isIphoneX() ? 50 : 20;
  },
};
