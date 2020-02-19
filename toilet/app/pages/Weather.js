import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TWebView from '../components/TWebView';
const weacherUrl = 'http://localhost:3000/webview/weather';
// const weacherUrl = 'http://123.57.39.116:3000/html/weather.html';

class Weather extends Component {
  render() {
    return <TWebView url={weacherUrl} isWeather={true} />;
  }
}

const styles = StyleSheet.create({});

module.exports = Weather;
