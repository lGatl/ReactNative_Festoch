import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { getTaches, patchTaches, postTaches, deleteTaches } from './action/taches_action';

class TachesList extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}
	componentDidMount() {
		this.props.getTaches();
	}
	pressItem(id){
	
		this.props.patchTaches({id,done:!this.props.taches.find(tache=>tache.id==id).done})
	}
	pressSuppr(id){
		 this.props.deleteTaches(id)
	}
	pressAdd(){
		if(this.state.text.length>0){
		 this.props.postTaches({name:this.state.text,done:false})
		 this.setState({text:""})
		}
	}
	renderItem({ item }){
			return <TouchableOpacity onPress={this.pressItem.bind(this,item.id)} style={styles.item}>
			
				<Text style={{flex:4, color:item.done?"blue":"green"}}>{item.name}</Text>
				<Button onPress={this.pressSuppr.bind(this,item.id)} style={{flex:1}} title="X"/>
			</TouchableOpacity>
	}
	render() {
		const { taches } = this.props;
		//console.log("taches", taches);
		return (
			<View>
				<View style={{flexDirection:"row", display:"flex"}}>
					<TextInput
						style={{height:40, borderColor: 'gray', borderWidth: 1, flex:1}}
						onChangeText={(text) => this.setState({text})}
						value={this.state.text}
					/>
					<Button onPress={this.pressAdd.bind(this)} style={{flex:1}} title="+"/>
				</View>
					<FlatList
						style={styles.container}
						data={taches.slice().reverse()}
						renderItem={this.renderItem.bind(this)}
						keyExtractor={(item,i) => i.toString()}
					/>
			</View>
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
			taches: state.taches.taches,
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		getTaches: getTaches,
		patchTaches: patchTaches,
		postTaches: postTaches,
		deleteTaches: deleteTaches,
	}, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(TachesList);


