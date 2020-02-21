import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header, Icon} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import Constant from '../config/Constant';

import Util from '../utils/Index';
import ToastUtil from '../utils/ToastUtil';
import PermissionsUtil from '../utils/PermissionsUtil';

import CityListManager from '../components/CityListManager';
import WeatherComponent from '../components/WeatherComponent';

const icAddPng = require('../assets/images/ic_add.png');
const icSharePng = require('../assets/images/ic_share.png');
const uncodeGeoUrl = 'https://apis.map.qq.com/ws/geocoder/v1/?location=';

let currentTabIndex = 0;
let weatherComponentsArr;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 正在定位中
      requestLocation: true,
      cityList: [],
    };
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#222', fontSize: 24}}>天气预报</Text>
      </View>
    );
  }

  renderRightComponent() {
    return (
      <View>
        <Text style={{color: '#222'}}>选择城市</Text>
      </View>
    );
  }

  renderLeftComponent() {
    // return (
    //   <Icon
    //     name="left"
    //     color="#9D9D9D"
    //     type="antdesign"
    //     onPress={this.goBack}
    //   />
    // );
  }

  componentDidMount() {
    AsyncStorage.removeItem(Constant.city_list);

    this.props.navigation.setParams({
      headerRight: this._renderHeaderRight(),
      headerLeft: this._renderHeaderLeft(),
    });
    // 检查是否有定位权限
    if (Util.isAndroid()) {
      PermissionsUtil.checkPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        () => {
          this.locationPermissionRequestSuccess();
        },
        () => {
          this.requestLocationPermission();
        },
      );
    } else {
      this.locationPermissionRequestSuccess();
    }
  }

  /**
   * 请求定位权限
   */
  requestLocationPermission = () => {
    PermissionsUtil.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      successInfo => {
        ToastUtil.show(successInfo);
        this.locationPermissionRequestSuccess();
      },
      errorInfo => {
        ToastUtil.show(errorInfo);
      },
      Constant.permission_tips.REQUEST_PERMISSION_SUCCESS,
      Constant.permission_tips.REQUEST_PERMISSION_FAILURE,
    );
  };

  /**
   * 成功获取定位权限
   */
  locationPermissionRequestSuccess = () => {
    CityListManager.getCityList(cityList => {
      cityList = [];
      if (cityList && cityList.length > 0) {
        currentTabIndex = 0;
        this.setState({
          requestLocation: false,
          cityList: cityList,
        });
      } else {
        // 如果没有一个城市列表缓存则去定位
        this.tencentLocationRequest('30.280837', '120.09132');
        // navigator.geolocation.getCurrentPosition(
        //   location => {
        //     // 纬度
        //     const latitude = location.coords.latitude;
        //     // 经度
        //     const longitude = location.coords.longitude;
        //     this.tencentLocationRequest('30.280837', '120.09132');
        //   },
        //   error => {
        //     ToastUtil.show(error);
        //   },
        // );
      }
    });
  };

  /**
   * 使用腾讯定位api定位
   * @param latitude 纬度
   * @param longitude 经度
   */
  tencentLocationRequest = (latitude, longitude) => {
    let url =
      uncodeGeoUrl +
      latitude +
      ',' +
      longitude +
      '&key=' +
      Constant.tencent_location_api.APP_KEY;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(jsonData => {
        this.locationRequestSuccess(jsonData);
      })
      .catch(error => {
        ToastUtil.show(error.toString());
      });
  };

  // 定位成功回调，查询城市天气
  locationRequestSuccess = jsonData => {
    if (jsonData) {
      const address = jsonData.result.address_component;
      let locationCity = address.city;
      let locationProvince = address.province;
      let locationDistrict = address.district;
      const searchCityUrl =
        'http://zhwnlapi.etouch.cn/Ecalender/api/city?lon=&app_ts=1502957830998&app_key=99817749&foreign=true&device_id=29c82fbe10331817eb2ba134d575d541&ver_name=6.9.6&ver_code=716&uid=&keyword=' +
        address.district +
        '&channel=own&auth_token=eyJhY2N0ayI6IiIsInVwIjoiQU5EUk9JRCIsImRldmljZSI6IlNNLUc5NTUwMzUyNTYyMDc3MjY0MzM0In0%3D&lat=&type=search&devid=a47cc0669be48a6b49aba18d1c42e200&os_version=70';
      fetch(searchCityUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(result => {
          const results = result.data;

          if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
              const resultBean = results[i];
              if (
                resultBean.prov.indexOf(locationProvince) !== -1 ||
                locationProvince.indexOf(resultBean.prov) !== -1
              ) {
                // 省份校验通过
                if (
                  resultBean.upper.indexOf(locationCity) !== -1 ||
                  locationCity.indexOf(resultBean.upper) !== -1
                ) {
                  // 城市校验通过
                  if (
                    resultBean.name.indexOf(locationDistrict) !== -1 ||
                    locationDistrict.indexOf(resultBean.name) !== -1
                  ) {
                    // 区域校验通过
                    CityListManager.addCity(
                      resultBean.cityid,
                      resultBean.upper,
                      resultBean.name,
                      resultBean.prov,
                      -1,
                      -1,
                      -1,
                      null,
                      -1,
                      true,
                      cityList => {
                        this.refreshThisPage(cityList);
                      },
                    );
                    break;
                  }
                }
              }
            }
          }
          this.setState({requestLocation: false});
        })
        .catch(error => {
          ToastUtil.show(error.toString());
        });
    }
  };

  refreshThisPage = cityList => {
    if (cityList && cityList.length > 0) {
      currentTabIndex = 0;
      this.setState({
        requestLocation: false,
        cityList: cityList,
      });
    }
  };

  /**
   * 右边分享按钮
   */
  _renderHeaderRight = () => {
    if (Util.isAndroid()) {
      const Ripple = TouchableNativeFeedback.Ripple(
        'rgba(255, 255, 255, 0.4)',
        true,
      );
      return (
        <TouchableNativeFeedback
          background={Ripple}
          onPress={() => this._shareWeather()}>
          <View style={{padding: 4, marginEnd: 12}}>
            <Image
              source={icSharePng}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'cover',
                tintColor: 'rgba(255, 255, 255, 0.9)',
              }}
            />
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this._shareWeather()}>
        <View style={{padding: 4, marginEnd: 12}}>
          <Image
            source={icSharePng}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'cover',
              tintColor: 'rgba(255, 255, 255, 0.9)',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 左边添加城市加号按钮
   */
  _renderHeaderLeft = () => {
    if (Util.isAndroid()) {
      const Ripple = TouchableNativeFeedback.Ripple(
        'rgba(255, 255, 255, 0.4)',
        true,
      );
      return (
        <TouchableNativeFeedback
          background={Ripple}
          onPress={() => this._addCity()}>
          <View style={{padding: 4, marginStart: 12}}>
            <Image
              source={icAddPng}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'cover',
                tintColor: 'rgba(255, 255, 255, 0.9)',
              }}
            />
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this._addCity()}>
        <View style={{padding: 4, marginStart: 12}}>
          <Image
            source={icAddPng}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'cover',
              tintColor: 'rgba(255, 255, 255, 0.9)',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _addCity = () => {
    this.props.navigation.navigate('SelectCity', {
      callBack: (success, cityList) => {
        // success表示是否成功添加城市
        // cityList表示添加城市之后的缓存列表
        if (success) {
          this.refreshThisPage(cityList);
          // 跳转到刚刚添加的城市天气预报界面
          this.tabView.goToPage(cityList.length - 1);
        }
      },
    });
  };

  _shareWeather = () => {
    ToastUtil.show('分享功能待开发');
  };

  /**
   * 渲染天气界面
   */
  _renderWeatherComponent = (cityItem, index) => {
    return (
      <WeatherComponent
        ref={ref => {
          weatherComponentsArr[index] = ref;
        }}
        key={cityItem.cityId}
        cityItem={cityItem}
        navigation={this.props.navigation}
        refreshMainPage={cityList => this.refreshThisPage(cityList)}
      />
    );
  };

  /**
   * 渲染主界面
   */
  _renderMainComponent = () => {
    let cityList = this.state.cityList;
    if (cityList && cityList.length > 0) {
      let weatherComponents = [];
      weatherComponentsArr = [];
      for (let i = 0; i < cityList.length; i++) {
        let cityItem = cityList[i];
        weatherComponentsArr.push(null);
        weatherComponents.push(this._renderWeatherComponent(cityItem, i));
      }
      return (
        <View style={{flex: 1}}>
          <ScrollView
            ref={ref => (this.tabView = ref)}
            showsVerticalScrollIndicator={false}>
            {weatherComponents}
            <View
              style={{
                marginBottom: 10,
              }}
            />
          </ScrollView>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#464e96', '#547ea9', '#409aaf']}
          style={{
            flex: 1,
          }}>
          <StatusBar
            barStyle={'light-content'}
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0)'}
          />
          <View
            style={{
              flex: 1,
            }}>
            {this.state.requestLocation ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop:
                    Constant.STATUS_BAR_HEIGHT + Constant.APP_BAR_HEIGHT,
                }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: Constant.STATUS_BAR_HEIGHT,
                }}>
                {this._renderMainComponent()}
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Weather;
