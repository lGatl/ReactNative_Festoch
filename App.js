import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxPromise from "redux-promise";

import reducers from './reducer/reducers';
import TachesList from './TachesList';
import About from './About';

import { createBottomTabNavigator } from 'react-navigation';

  const Tabs = createBottomTabNavigator({
    RepoList: {screen:TachesList},
    About: {screen:About}
  })
  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style = {{flex:1, marginTop:40}}>
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
