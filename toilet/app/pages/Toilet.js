import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TWebView from '../components/TWebView';

// const nearByURL = 'http://123.57.39.116:3000/html/nearby.html';
const nearByURL = 'http://localhost:3000/webview/nearby';

class ToiletPage extends Component {
  render() {
    return <TWebView url={nearByURL} isNearBy={true} />;
  }
}

module.exports = ToiletPage;
