import axios from 'axios'
export const GET_TACHES = 'GET_TACHES';
export const PATCH_TACHES = 'PATCH_TACHES';
export const POST_TACHES = 'POST_TACHES';
export const DELETE_TACHES = 'DELETE_TACHES';

export function getTaches() {
	let p = new Promise( ( resolve, reject ) => {
		axios.get("http://localhost:3000/api/taches")
		.then((response)=>{
			//console.log("response", response.data);
			resolve(response.data)
		})
	});
  return {
    type: GET_TACHES,
    payload: p
  };
}

export function patchTaches(param) {
	let p = new Promise( ( resolve, reject ) => {
		axios.patch("http://localhost:3000/api/taches", {
			...param
		})
		.then((response)=>{
			
		})
	});
  return {
    type: PATCH_TACHES,
    payload: param
  };
}
export function postTaches(param) {
	let p = new Promise( ( resolve, reject ) => {
		axios.post("http://localhost:3000/api/taches", {
			...param
		})
		.then((response)=>{
			resolve(response.data)
		})
	});
  return {
    type: POST_TACHES,
    payload: p
  };
}
export function deleteTaches(id) {
	console.log("id", id);
	let p = new Promise( ( resolve, reject ) => {
		axios.delete("http://localhost:3000/api/taches/"+id)
		.then((response)=>{
			
		})
	});
  return {
    type: DELETE_TACHES,
    payload: id
  };
}
