import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Util from '../../utils/Index';
import * as Config from '../../config/Index';

const dataReadUrl = Config.dataApi + '/read?type=';

class News extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
    this.state = {
      type: this.props.navigation.state.params.type,
      data: [],
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    let that = this;
    let url = dataReadUrl + this.state.type;
    Util.get(
      url,
      function(res) {
        if (res.status) {
          that.setState({
            data: res.data,
          });
        } else {
          alert('服务异常,正在紧急修复,请耐心等待');
        }
      },
      function(err) {
        alert('服务异常,正在紧急修复,请耐心等待');
      },
    );
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

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  _separator() {
    return <View style={{height: 1, backgroundColor: '#F1F1F1'}} />;
  }

  _showDetail(title, url) {
    this.props.navigation.navigate('Detail', {
      title: title,
      url: url,
      isMargin: 1,
    });
  }

  _renderItem = ({item, index}) => {
    let rowData = item;
    return (
      <TouchableOpacity
        style={[styles.item, styles.row]}
        onPress={this._showDetail.bind(this, rowData.title, rowData.url)}
        key={index}>
        <View>
          <Image
            style={styles.img}
            source={{uri: rowData.img}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {rowData.title}
          </Text>
          <Text style={styles.name}>
            {rowData.time ? rowData.time.split('T')[0] : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={{
            text: '新闻列表',
            style: {color: '#222', fontSize: 24},
          }}
        />
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._separator}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: 60,
    width: 60,
    marginLeft: 10,
    marginTop: 5,
    borderWidth: Util.pixel,
    borderRadius: 3,
    borderColor: '#fff',
  },
  text: {
    marginLeft: 7,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    width: Util.size.width - 80,
  },
  name: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
  },
});

export default News;
