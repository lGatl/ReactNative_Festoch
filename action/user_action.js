import axios from 'axios'

export const CONSTANTE_User = { 
	CREE_COMPTE: "User_CREE_COMPTE",
	GET_ACTIVE_USER: "User_GET_ACTIVE_USER",
	LOG_IN: "User_LOG_IN",
	LOG_OUT: "User_LOG_OUT"
};

// function creeCompte(user, cbk = ()=>{}){
// 	let p = new Promise( ( resolve, reject ) =>{
// 		Accounts.createUser(user, (err)=>{
// 			if(err){ console.log(err); }else{
// 				cbk()
// 				resolve(user);
// 			}
// 		});
// 	});
// 	return {
// 		type: 		CONSTANTE_User.CREE_COMPTE,
// 		payload: 	p
// 	};
// }
function logIn(obj, cbk = ()=>{}){
	
		let p = new Promise( ( resolve, reject ) => {
			axios.post("http://localhost:3000/api/users/login", {
			...obj
		})
		.then((response)=>{
			resolve({ access_token:response.data.id, user_id:response.data.userId });
		})
  
		});
	return {
		type: 		CONSTANTE_User.LOG_IN,
		payload: 	p
	};
}
function logOut( cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) => {
			axios.post("http://localhost:3000/api/users/logout", {
			...obj
		})
		.then((response)=>{
			resolve({ access_token:undefined, user_id:undefined });
		})
  
		});
	return {
		type: 		CONSTANTE_User.LOG_OUT,
		payload: 	p
	};
}

export function getActiveUser(id,access_token, cbk = ()=>{} ){
	console.log("getActiveUser");
	
		let p = new Promise( ( resolve, reject ) =>{
			axios.get("http://localhost:3000/api/Users/"+id+"?access_token="+access_token)
		.then((response)=>{
			cbk(response.data)
			resolve(response.data)
		})
		});
	return {
		type: 		CONSTANTE_User.GET_ACTIVE_USER,
		payload: 	p
	};
}

export const ACTION_User = { 
	//creeCompte,
	logIn,
	logOut,
	getActiveUser
};
