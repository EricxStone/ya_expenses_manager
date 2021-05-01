import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '_scenes/home';

const StackNavigatorConfig: any = {
  initialRouteName: 'Home',
  headerMode: 'none',
};

const RouteConfigs = {
  Home:{
    screen:HomeScreen,
  }
};

const AppNavigator = createStackNavigator(RouteConfigs, StackNavigatorConfig);

export default AppNavigator;
