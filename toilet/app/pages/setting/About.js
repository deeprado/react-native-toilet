import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, Icon} from 'react-native-elements';

class About extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={{
            text: '帮助中心',
            style: {color: '#222', fontSize: 24},
          }}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.text}>如果问题,请联系: siversonw@126.com</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 3,
  },
});

export default About;
