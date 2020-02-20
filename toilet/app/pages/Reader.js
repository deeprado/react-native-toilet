import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Util from '../utils/Index';
import Recommend from './read/Recommend';
import Category from './read/Category';
import Search from './read/Search';
import Topic from './read/Topic';

import * as Config from '../config/Index';

const dataReadUrl = Config.dataApi + '/read';
const configDataUrl = dataReadUrl + '?type=config';

class ReadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      recommendTopic: null,
      hotTopic: null,
      category: null,
      other: null,
      refreshing: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Search navigation={this.props.navigation} />
        {this.state.isShow ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            style={[styles.container, {paddingTop: 20}]}>
            <Topic
              data={this.state.recommendTopic}
              navigation={this.props.navigation}
              type="manager"
            />
            <HrLine />
            <Recommend
              title="热门推荐"
              data={this.state.hotTopic}
              navigation={this.props.navigation}
              type="it"
            />
            <HrLine />
            <Category
              data={this.state.category}
              navigation={this.props.navigation}
            />
            <HrLine />
            <Recommend
              title="清新一刻"
              data={this.state.other}
              navigation={this.props.navigation}
              type="prose"
            />
            <Space />
          </ScrollView>
        ) : (
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            size="large"
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(callback) {
    let that = this;
    Util.get(
      configDataUrl,
      function(res) {
        if (res.status) {
          let obj = res.data;
          console.log('res', obj);

          that.setState({
            isShow: true,
            recommendTopic: obj.recommendTopic,
            hotTopic: obj.hotTopic,
            category: obj.category,
            other: obj.other,
            refreshing: false,
          });
        } else {
          alert('服务异常,正在紧急修复,请耐心等待');
        }
      },
      function(err) {
        alert(err);
        alert('服务异常,正在紧急修复,请耐心等待2');
      },
    );
  }

  _onRefresh() {
    let that = this;
    this.setState({refreshing: true});
    this._fetchData();
  }
}

class Read extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ReadView navigation={this.props.navigation} />
      </View>
    );
  }
}

class HrLine extends Component {
  render() {
    return <View style={styles.hr}></View>;
  }
}

class Space extends Component {
  render() {
    return <View style={styles.space}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hr: {
    borderWidth: Util.pixel,
    borderColor: '#ccc',
    marginTop: 20,
    marginBottom: 10,
  },
  space: {
    height: 70,
  },
});

export default Read;
