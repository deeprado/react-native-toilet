import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS,
  TouchableOpacity,
  navigationIOS,
  ScrollView,
} from 'react-native';

import Util from '../utils/Index';
import Help from './setting/Help';
import Detail from './setting/Detail';
import Tips from './setting/Tips';
//import About from './setting/about';

const logoPng = require('../assets/images/logo.png');

class SettingView extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bg}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            设置
          </Text>
        </View>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
            <Image style={styles.icon} source={logoPng} resizeMode="contain" />
            <Text style={[styles.text, {fontSize: 13}]}>v1.0.0</Text>
          </View>
          <TouchableOpacity onPress={this._showDetail.bind(this)}>
            <View style={[styles.item, {borderTopWidth: Util.pixel}]}>
              <Text style={styles.text}>功能介绍</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showHelp.bind(this)}>
            <View style={styles.item}>
              <Text style={styles.text}>帮助中心</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showTips.bind(this)}>
            <View style={styles.item}>
              <Text style={styles.text}>服务条款</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showAbout.bind(this)}>
            <View style={styles.item}>
              <Text style={styles.text}>关于</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _showHelp() {
    this.props.navigation.push({
      component: Help,
      title: '帮助中心',
      barTintColor: '#fff',
    });
  }

  _showTips() {
    this.props.navigation.push({
      component: Tips,
      title: '服务条款',
      barTintColor: '#fff',
    });
  }

  _showAbout() {
    AlertIOS.alert('如有问题,联系', 'siversonw@126.com', [{text: '确认'}]);
    //this.props.navigation.push({
    //  component: About,
    //  title: '关于',
    //  barTintColor: '#fff'
    //});
  }

  _showDetail() {
    this.props.navigation.push({
      component: Detail,
      title: '功能介绍',
      barTintColor: '#fff',
    });
  }
}

class Setting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SettingView />
      </View>
      // <navigationIOS
      //   style={styles.container}
      //   initialRoute={{
      //     component: SettingView,
      //     title: '设置',
      //     navigationBarHidden: true,
      //   }}
      // />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: Util.pixel,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  bg: {
    backgroundColor: '#FFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    color: '#7E7F7E',
  },
  icon: {
    width: 88,
    height: 100,
  },
});

module.exports = Setting;
