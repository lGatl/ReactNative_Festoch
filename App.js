import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxPromise from "redux-promise";

import reducer from './reducer/reducer';
import TachesList from './TachesList';
import About from './About';
import Login from './Login';
import User from './User';

import { createBottomTabNavigator } from 'react-navigation';

  const Tabs = createBottomTabNavigator({
    Login: {screen:Login},
    RepoList: {screen:TachesList}
  })
  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style = {{flex:1, marginTop:40}}>
          <User/>
          <Tabs />
        </View>
        
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});
