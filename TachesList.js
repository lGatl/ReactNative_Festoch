import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { ACTIONS } from './action/action';

import ScrollInfini from './ScrollInfini';

import {dateToFormat} from "./_libs/date"

class TachesList extends Component {
	
	componentDidMount() {
		//console.log(this.props)
		//this.props.getTaches({});
	}
	pressItem(id){
		this.props.tacheUp({id, done:!this.props.taches.find(tache=>tache.id==id).done})
	}
	pressSuppr(id){
		 this.props.tacheRm(id)
	}
	pressAdd(){
		if(this.props.controle.text.length>0){
		 this.props.tacheAdd({name:this.props.controle.text,done:false})
		 this.props.tacheControle({text:""})
		}
	}
	renderItem({ item }){
			let la_date = new Date(item.created_at)
			let heure = la_date.getHours()
			return <TouchableOpacity onPress={this.pressItem.bind(this,item.id)} style={styles.item}>
			
				<Text style={{flex:4, color:item.done?"blue":"green"}}>{item.name+" "+dateToFormat(la_date)+heure}</Text>
				<Button onPress={this.pressSuppr.bind(this,item.id)} style={{flex:1}} title="X"/>
			</TouchableOpacity>
	}
	
	render() {

		const { taches, controle, active_user } = this.props;
		return (
			
				<ScrollInfini 
					nbpp = {2}
					reload={false}
					nb_charge={this.props.taches.length}
					nb_total={this.props.nb_taches}
					initFnt = {this.props.tacheGetSSL.bind(this)}
					addFnt = {this.props.tacheGetAddSSL.bind(this)}
					countFnt = {this.props.tacheCount.bind(this)}
					condition = {{}}
					fnt = {()=>{}}
				>
				<View style={{flexDirection:"row", display:"flex"}}>
				<Text>LISTE{active_user&&active_user.username?active_user.username:"inconnu"} </Text>
					<TextInput
						style={{height:40, borderColor: 'gray', borderWidth: 1, flex:1}}
						onChangeText={(text) => this.props.tacheControle({text})}
						value={controle.text}
					/>
					<Button onPress={this.pressAdd.bind(this)} style={{flex:1}} title="+"/>
				</View>
					<FlatList
						style={styles.container}
						data={taches&&taches.length>0?taches:[]}
						renderItem={this.renderItem.bind(this)}
						keyExtractor={(item,i) => i.toString()}
					/>
			</ScrollInfini>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		
	},
	item: {
		display:"flex",
		flexDirection:"row",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	}
});

function mapStateToProps( state ){

	return (
		{
			active_user: state.user.active_user,
			controle:state.tache.controle,
			taches: state.tache.all,
			nb_taches: state.tache.count,

			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		tacheControle: ACTIONS.Tache.controle,
		tacheGetSSL: ACTIONS.Tache.get_SSL,
		tacheGetAddSSL: ACTIONS.Tache.getAdd_SSL,
		tacheUp: ACTIONS.Tache.up,
		tacheAdd: ACTIONS.Tache.add,
		tacheRm: ACTIONS.Tache.rm,
		tacheCount: ACTIONS.Tache.count,
	}, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(TachesList);


