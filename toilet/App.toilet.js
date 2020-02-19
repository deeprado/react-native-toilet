import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// import StackViewStyleInterpolator from 'react-navigation-stack/';
import {Icon} from 'react-native-elements';

// 启动面
import SplashPage from './app/pages/splash/Index';
// 页面
import Toilet from './app/pages/Toilet';
import Reader from './app/pages/Reader';
import Weather from './app/pages/Weather';
import Setting from './app/pages/Setting';

const bottomTabOptions = (tabBarTitle, iconName, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    let IconComponent = Icon;
    // You can return any component that you like here!
    return <IconComponent name={iconName} type="ionicon" size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    headerTitle,
    headerTitleStyle,
    headerStyle,
    tabBarVisible,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    ToiletBox: {
      screen: Toilet,
      navigationOptions: () => bottomTabOptions('厕所', 'ios-podium'),
    },
    ReaderBox: {
      screen: Reader,
      navigationOptions: () => bottomTabOptions('阅读', 'ios-book'),
    },
    WeatherBox: {
      screen: Weather,
      navigationOptions: () => bottomTabOptions('天气', 'ios-gift'),
    },
    SettingBox: {
      screen: Setting,
      navigationOptions: () => bottomTabOptions('设置', 'ios-person'),
    },
  },
  {
    initialRouteName: 'ToiletBox',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    // 厕所
    Toilet: {
      screen: Toilet,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      header: null,
    },
  },
);

const SplashStack = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    AppPage: AppAllStack,
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    // transitionConfig: () => ({
    //   screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // }),
  },
);

export default createAppContainer(SplashStack);
