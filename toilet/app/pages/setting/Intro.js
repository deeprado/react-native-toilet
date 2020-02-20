import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Util from '../../utils/Index';

const help1Png = require('../../assets/images/help_1.png');
const help2Png = require('../../assets/images/help_1.png');
const help3Png = require('../../assets/images/help_1.png');

class Detail extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={{
            text: '功能介绍',
            style: {color: '#222', fontSize: 24},
          }}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView>
          <View style={styles.center}>
            <Text style={styles.text}>附近卫生间并导航</Text>
            <View style={styles.items}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={help1Png}
              />
            </View>
          </View>

          <View style={styles.center}>
            <Text style={styles.text}>实时天气预报</Text>
            <View style={styles.items}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={help2Png}
              />
            </View>
          </View>

          <View style={styles.center}>
            <Text style={styles.text}>阅读美好文章</Text>
            <View style={styles.items}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={help3Png}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 300,
    height: 530,
  },
  items: {
    width: 300,
    marginBottom: 10,
    shadowOpacity: 1,
    shadowColor: '#ccc',
    shadowOffset: {width: 1 * Util.pixel, height: Util.pixel},
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 15,
  },
});

export default Detail;
