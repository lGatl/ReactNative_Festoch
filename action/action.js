import axios from 'axios'

import { CONSTANTE_Controle, ACTION_Controle } from "./controle_action";
import { CONSTANTE_User, ACTION_User } from "./user_action";


export let COLLECTIONS = ["Tache","User"]

const CONSTANTE = {};
const ACTION = {};
let lbf=(obj)=>{
	let multi = Object.keys(obj).reduce((total,key,i)=>{
		console.log(i)
		let val = obj[key]
		if(typeof val === 'string'){
			return total+'filter[where][and]['+i+']['+key+']='+val
		}else{
			return total+'filter[where][and]['+i+']['+key+']='+val+"&"
		}
	},"")
	console.log("multi", multi);
	return multi
}

COLLECTIONS.forEach((COLLECTION)=>{

	CONSTANTE[ COLLECTION ] ={ 
		ADD : COLLECTION+"_ADD",
		GET : COLLECTION+"_GET",
		GETADD : COLLECTION+"_GETADD",
		GET1 : COLLECTION+ "_GET1",
		COUNT : COLLECTION+"_COUNT",
		RM : COLLECTION+"_RM",
		UP : COLLECTION+"_UP",
		UPM : COLLECTION+"_UPM",
		UPS : COLLECTION+"_UPS",
		CONTROLE : COLLECTION+"_CONTROLE",
	};
//======================POST==================================
function add(obj, cbk=()=>{}){
		la_date = new Date(Date.now())
		let p = new Promise( ( resolve, reject ) => {
			axios.post("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s", {
			...obj,created_at:la_date
		})
		.then((response)=>{
			cbk(response.data)
			resolve( { val:{ ...obj,created_at:la_date, id:response.data.id }, state:null } );
		})
  
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	function add_state(obj,state, cbk=()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			axios.post("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s", {
			...obj
		})
		.then((response)=>{
			cbk(response.data)
					resolve( { val:{ ...obj, _id:response.data.id }, state } );
				
			})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	//_____________________________________________________________
	//=======================GET===========================

function get(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state:null})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_state(obj,state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_SSL(obj,SSL, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj,...SSL}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state:null})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
		function get_SSL_state(obj,SSL,state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj,...SSL}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function getAdd(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state:null})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
function getAdd_state(obj, state =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s")
		.then((response)=>{
					cbk( res );
					resolve( { val:response.data, state} );
				
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_SSL(obj, SSL, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj,...SSL}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state:null})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_SSL_state(obj, SSL, state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj,...SSL}))
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}

	//_____________________________________________________________________________

function up(modif, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			axios.patch("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s", {
			...modif
		})
		.then((response)=>{
			cbk(response.data)
			resolve( { val:{...modif,id:response.data.id},state:null} );
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p,
		};

	}
	function up_state(modif,state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			axios.patch("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s", {
			...modif
		})
		.then((response)=>{
					cbk( res );
					resolve( { val:{...modif,_id:res},state} );
				
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	function rm(id, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			axios.delete("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/"+id)
		.then((response)=>{
			cbk(response.data)
			resolve( { val:{id}, state:null} );
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].RM,
			payload: 	p,
		};
	}
	function rm_state(id, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			axios.delete("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/"+id)
		.then((response)=>{
			cbk(response.data)
			resolve( { val:{id}, state} );
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].RM,
			payload: 	p,
		};
	}

	function count(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/count/?filter="+JSON.stringify({where:obj}))
		.then((response)=>{
			cbk(response.data.count)
			resolve({ val:response.data.count, state:null})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
	function count_state(obj, state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/"+COLLECTION.toLowerCase()+"s/?filter="+JSON.stringify({where:obj})+"/count")
		.then((response)=>{
			cbk(response.data)
			resolve({ val:response.data, state})
		})
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
//===========================================
	function controle(val){
		return {
			type: 		CONSTANTES[ COLLECTION ].CONTROLE,
			payload: 	val
		};
	}

	ACTION[COLLECTION] = {
		add,
		add_state,
		rm,
		rm_state,
		get,
		get_state,
		getAdd,
		getAdd_state,
		get_SSL,
		get_SSL_state,
		getAdd_SSL,
		getAdd_SSL_state,
		up,
		up_state,
		count,
	
		controle,
	};

});


export const CONSTANTES = { ...CONSTANTE,
	Controle:{...CONSTANTE_Controle},
	User:{ ...CONSTANTE.User, ...CONSTANTE_User }
	
};
export const ACTIONS = { ...ACTION,
	Controle:{...ACTION_Controle},
	User:{ ...ACTION.User, ...ACTION_User }
	
};

