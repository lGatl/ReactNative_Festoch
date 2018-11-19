import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { ACTIONS } from './action/action';




class User extends Component {
	
	componentWillReceiveProps(newp) {
		if(newp.access_token!=this.props.access_token){
			this.getActiveUser(newp.user_id,newp.access_token)
		}
	}
	getActiveUser(user_id,access_token){
		console.log("GET ACTIVE USER")
		this.props.getActiveUser(user_id,access_token)
	}
	render() {

		return (
			
				<View></View>
		);
	}
}

function mapStateToProps( state ){

	return (
		{
			active_user: state.user.active_user,
			user_id: state.user.user_id,
			access_token: state.user.access_token,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		userControle: ACTIONS.User.controle,
		getActiveUser: ACTIONS.User.getActiveUser,
	}, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);


