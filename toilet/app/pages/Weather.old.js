import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import TWebView from '../components/TWebView';
import * as Config from '../config/Index';

const weacherUrl = Config.webviewApi + '/weather';

class Weather extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          centerComponent={{
            text: '天气预报',
            style: {color: '#222', fontSize: 24},
          }}
        />
        <TWebView url={weacherUrl} isWeather={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Weather;
