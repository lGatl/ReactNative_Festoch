import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from './action/action';

import { Animated,ScrollView } from 'react-native';

class ScrollInfini extends Component {
	constructor(){
		super();
		
	}
	componentWillMount(){
		this.init();
	}
	componentWillReceiveProps(newp){

		if(newp.nb_total&&newp.nb_charge&&newp.page
			&&newp.scroll&&newp.scroll.content_size_height&&newp.scroll.layout_height&&newp.page.nump){
			if(newp.scroll.content_size_height!=this.props.scroll.content_size_height||newp.scroll.content_offset!=this.props.scroll.content_offset){
				this.ajout(newp)
			}
		}
	}

	init(){
		
		this.props.countFnt(this.props.condition);
		this.props.initFnt(this.props.condition,{skip:0,limit:this.props.nbpp,order:"created_at DESC"})
		this.props.changePage({nump:1})
	}

	ajout(props){

		if((props.scroll.content_size_height*.9)<=(props.scroll.layout_height+(props.scroll.content_offset||0))){
			this.props.addFnt(this.props.condition,{skip:(props.page.nump*this.props.nbpp),limit:this.props.nbpp,order:"created_at DESC"})
			this.props.changePage({nump:props.page.nump+1})
		}
	}
	//==============CONTROLE====================

	onContentSizeChange(width,height){
		this.props.onScroll({content_size_height:height})
	

	}
	scroll(event){
		let n_e = event.nativeEvent
		this.props.onScroll({layout_height:n_e.layoutMeasurement.height,content_offset:n_e.contentOffset.y,content_size_height:n_e.contentSize.height});
	}
	onLayout(event){
		let n_e = event.nativeEvent
		this.props.onScroll({layout_height:n_e.layout.height});
	}
	//========================Preparation du rendu========================
	
	render(){

		return (
			<ScrollView scrollEventThrottle={200} onScroll={this.scroll.bind(this)} onContentSizeChange={this.onContentSizeChange.bind(this)} onLayout={this.onLayout.bind(this)} >
			{this.props.children}
			</ScrollView>
			
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			page: state.controle.page,
			scroll: state.controle.scroll,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		changePage: ACTIONS.Controle.changePage,
		onScroll: ACTIONS.Controle.scroll,
		contentSizeChange: ACTIONS.Controle.contentSizeChange

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ScrollInfini );


