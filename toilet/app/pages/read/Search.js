import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import Util from '../../utils/Index';

class Search extends Component {
  render() {
    return (
      <View
        style={{
          height: 70,
          borderBottomWidth: Util.pixel,
          borderColor: '#F5F5F5',
          paddingBottom: 15,
        }}>
        <TextInput
          style={styles.search}
          placeholder="搜索"
          onSubmitEditing={this._onSubmitEditing.bind(this)}
          returnKeyType="search"
          placeholderTextColor="#494949"
          autoFocus={false}
          onChangeText={this._onChangeText}
        />
      </View>
    );
  }

  _onChangeText() {}

  _onSubmitEditing() {
    this.props.navigation.navigate('News', {
      type: 'it',
    });
  }
}

const styles = StyleSheet.create({
  search: {
    marginLeft: 10,
    marginRight: 10,
    height: 44,
    borderWidth: Util.pixel,
    borderColor: '#ccc',
    borderRadius: 3,
    marginTop: 25,
    paddingLeft: 10,
    fontSize: 15,
  },
});

export default Search;
