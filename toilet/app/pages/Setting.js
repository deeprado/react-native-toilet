import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Util from '../utils/Index';
import {Icon} from 'react-native-elements';

const logoPng = require('../assets/images/logo.png');

class SettingView extends Component {
  constructor(props) {
    super(props);
  }

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
          <TouchableOpacity
            onPress={this._showDetail.bind(this)}
            style={styles.opBox}>
            <View style={styles.item}>
              <Text style={styles.text}>功能介绍</Text>
            </View>
            <View>
              <Icon
                name="chevron-right"
                type="feather"
                color="#ccc"
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._showHelp.bind(this)}
            style={styles.opBox}>
            <View style={styles.item}>
              <Text style={styles.text}>帮助中心</Text>
            </View>
            <View>
              <Icon
                name="chevron-right"
                type="feather"
                color="#ccc"
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._showTips.bind(this)}
            style={styles.opBox}>
            <View style={styles.item}>
              <Text style={styles.text}>服务条款</Text>
            </View>
            <View>
              <Icon
                name="chevron-right"
                type="feather"
                color="#ccc"
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._showAbout.bind(this)}
            style={styles.opBox}>
            <View style={styles.item}>
              <Text style={styles.text}>关于</Text>
            </View>
            <View>
              <Icon
                name="chevron-right"
                type="feather"
                color="#ccc"
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _showHelp() {
    this.props.navigation.navigate('Help');
  }

  _showTips() {
    this.props.navigation.navigate('Tips');
  }

  _showAbout() {
    this.props.navigation.navigate('About');
  }

  _showDetail() {
    this.props.navigation.navigate('Detail');
  }
}

class Setting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SettingView navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  opBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: Util.pixel,
    borderColor: '#F4F4F4',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bg: {
    backgroundColor: '#FFF',
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

export default Setting;
