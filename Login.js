import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { ACTIONS } from './action/action';


 class Login extends Component {
  login(){
    let { email, password } = this.props.controle
    this.props.logIn({email,password})
  }
  logout(){
    this.props.logOut()
  }
  render() {
    let { active_user } = this.props
    console.log("active_user", active_user);
    return (
      <View >
        <Text>APROPOS{active_user&&active_user.email?active_user.email:"inconnu"} </Text>
        
          {
            active_user&&active_user.username?
              <View style={{display:"flex"}}>
              <Text>Salut{" "+active_user.username + " "}</Text>
              <Button onPress={this.logout.bind(this)} style={{flex:1}} title="LOGOUT"/>
            </View>:
            <View style={{display:"flex"}}>
              <TextInput
                autoCapitalize="none"
                style={{height:40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(email) => this.props.userControle({email})}
                value={this.props.controle.email}
              />
              <TextInput
                style={{height:40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.props.userControle({password})}
                value={this.props.controle.password}
              />
              <Button onPress={this.login.bind(this)} style={{flex:1}} title="LOGIN"/>
            </View>
            
          }
       
     </View>
    );
  }
}

function mapStateToProps( state ){

  return (
    {
      active_user: state.user.active_user,
      controle:state.user.controle,


      
    }
  );
}

function mapDispatchToProps( dispatch ){
  return bindActionCreators({
    userControle: ACTIONS.User.controle,
    logIn: ACTIONS.User.logIn,
    logOut: ACTIONS.User.logOut
    
  }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
