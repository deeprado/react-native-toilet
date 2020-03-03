import React from 'react';
import {Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 启动面
import SplashPage from './app/pages/splash/Index';
// 页面
import Toilet from './app/pages/Toilet';
import Weather from './app/pages/Weather';

// 设置
import Setting from './app/pages/Setting';
import Intro from './app/pages/setting/Intro';
import About from './app/pages/setting/About';
import Help from './app/pages/setting/Help';
import Tips from './app/pages/setting/Tips';
// 阅读
import Reader from './app/pages/Reader';
import News from './app/pages/read/News';
import Detail from './app/pages/read/Detail';

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={26} color={tintColor} />;
  };
  const headerTitle = () => {
    return <Text>{navTitle}</Text>;
  };
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    ToiletBox: {
      screen: Toilet,
      navigationOptions: () =>
        bottomTabOptions('厕所', {iconName: 'compass', typeName: 'feather'}),
    },
    ReaderBox: {
      screen: Reader,
      navigationOptions: () =>
        bottomTabOptions('阅读', {iconName: 'book-open', typeName: 'feather'}),
    },
    WeatherBox: {
      screen: Weather,
      navigationOptions: () =>
        bottomTabOptions('天气', {iconName: 'cloud', typeName: 'feather'}),
    },
    SettingBox: {
      screen: Setting,
      navigationOptions: () =>
        bottomTabOptions('设置', {iconName: 'settings', typeName: 'feather'}),
    },
  },
  {
    initialRouteName: 'ToiletBox',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        paddingTop: 5,
      },
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    // 设置-功能介绍
    Intro: {
      screen: Intro,
      navigationOptions: {
        headerShown: false,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        headerShown: false,
      },
    },
    Tips: {
      screen: Tips,
      navigationOptions: {
        headerShown: false,
      },
    },
    Help: {
      screen: Help,
      navigationOptions: {
        headerShown: false,
      },
    },
    // 阅读
    News: {
      screen: News,
      navigationOptions: {
        headerShown: false,
      },
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: SplashPage,
    },
    AppPage: AppAllStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    },
  },
);

export default createAppContainer(SplashStack);
