import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import TWebView from '../../components/TWebView';
import * as Config from '../../config/Index';

class Detail extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state);

    this.state = {
      title: this.props.navigation.state.params.title,
      url: this.props.navigation.state.params.url,
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#222', fontSize: 24}}>{this.state.title}</Text>
      </View>
    );
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

  render() {
    let that = this;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
        />
        <TWebView url={this.state.url} isNearBy={false} isWeather={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Detail;
