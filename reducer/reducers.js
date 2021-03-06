
import { CONSTANTES } from "../action/action";
import { COLLECTIONS } from "../action/action";

import { REDUCER_user_add } from "./user_reducer";

var REDUCER = {};
COLLECTIONS.forEach((COLLECTION)=>{
  const DEFAULTS = {
    all: [],
    one: {},
    controle:{}
  };

  REDUCER[COLLECTION.toLowerCase()] = function (  state = DEFAULTS, action ) {
    var all = [ ...state.all ] ;
    switch ( action.type ) {  
    case  CONSTANTES[COLLECTION].ADD:

      if(typeof action.payload.state=="string"){
        return { ...state, [action.payload.state]:[action.payload.val, ...state[action.payload.state]]};
      }else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:[action.payload.val,...state[action.payload.state[obj]]]}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return { ...state, all: [action.payload.val,...state.all] };
      }     
      break;

    case CONSTANTES[COLLECTION].GET:
      if(typeof action.payload.state=="string"){
        return { ...state, [action.payload.state]:action.payload.val};
      }else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return { ...state, all: action.payload.val };
      }     
      break;

    case CONSTANTES[COLLECTION].GETADD:
      if(typeof action.payload.state=="string"){
        return { ...state, [action.payload.state]:[...state[action.payload.state],...action.payload.val]};
      }else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:[...state[action.payload.state[obj]],...action.payload.val]}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return { ...state, all: [...all,...action.payload.val] };
      }     
      break;

    case CONSTANTES[COLLECTION].GET1:
      if(typeof action.payload.state=="string"){
        return { ...state, [action.payload.state]:action.payload.val};
      }else if((typeof action.payload.state=="object") && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return { ...state, one: action.payload.val };
      }     
      break;

    case CONSTANTES[COLLECTION].COUNT:

      if(typeof action.payload.state=="string"){
        return { ...state, [action.payload.state]:action.payload.val};
      }else if((typeof action.payload.state=="object") && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return { ...state, count: action.payload.val };
      }     
      break;
      
    case CONSTANTES[COLLECTION].RM:
      var ALL;
      if(typeof action.payload.state=="string"){
        all = [...state[action.payload.state]];
        ALL = (typeof action.payload.val.id)=="string"? all.reduce((total,al)=>al.id == action.payload.val.id?total:[...total,al],[]):
          (typeof action.payload.val.id)=="object"? all.reduce((total,al)=>action.payload.val.id.$in.indexOf(al.id)>=0?total:[...total,al],[]):all;
        return { ...state, [action.payload.state]:ALL};
      }else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        all = [...state[action.payload.state][obj]];
        ALL = (typeof action.payload.val.id)=="string"? all.reduce((total,al)=>al.id == action.payload.val.id?total:[...total,al],[]):
          (typeof action.payload.val.id)=="object"? all.reduce((total,al)=>action.payload.val.id.$in.indexOf(al.id)>=0?total:[...total,al],[]):all;
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:ALL}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        ALL = (typeof action.payload.val.id)=="string"? all.reduce((total,al)=>al.id == action.payload.val.id?total:[...total,al],[]):
          (typeof action.payload.val.id)=="object"? all.reduce((total,al)=>action.payload.val.id.$in.indexOf(al.id)>=0?total:[...total,al],[]):all;
        return {...state, all:ALL}; 
      }     
      break;

    case CONSTANTES[COLLECTION].UP:
      var up;
      if(typeof action.payload.state=="string"){
        all = [...state[action.payload.state]];
        up = all.find(allu=>allu.id==action.payload.val.id);
        all.splice(all.indexOf(up),1,{...up,...action.payload.val});
        return { ...state, [action.payload.state]:all};
      }else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        all = [...state[action.payload.state][obj]];
        up = all.find(allu=>allu.id==action.payload.val.id);
        all.splice(all.indexOf(up),1,{...up,...action.payload.val});
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:all}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        up = all.find(allu=>allu.id==action.payload.val.id);
        all.splice(all.indexOf(up),1,{...up,...action.payload.val});
        return {...state, all, one:{...state.one,...action.payload.val}}; 
      }   
      break;    

    case CONSTANTES[COLLECTION].UPM:
      console.log("fonction state non testée");
      if(typeof action.payload.state == "string"){
        all = [...state[action.payload.state]];
        return { ...state, [action.payload.state]:all.reduce((total,upm)=>action.payload.val.id.indexOf(upm.id)>=0?[...total,{...upm,...action.payload.val,_id:upm.id}]:[...total,upm],[])};
      }else if((typeof action.payload.state == "object" ) && (action.payload.state != null)){
        let obj = Object.keys(action.payload.state)[0];
        all = [...state[action.payload.state][obj]];
        return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:all.reduce((total,upm)=>action.payload.val.id.indexOf(upm.id)>=0?[...total,{...upm,...action.payload.val,_id:upm.id}]:[...total,upm],[])}};
      }else if(action.payload.state == null||action.payload.state == undefined){
        return {...state, all:all.reduce((total,upm)=>action.payload.val.id.indexOf(upm.id)>=0?[...total,{...upm,...action.payload.val,_id:upm.id}]:[...total,upm],[])}; 
      }     
      break;

    case CONSTANTES[COLLECTION].CONTROLE:
      return { ...state, controle:{...state.controle,...action.payload} };
      break;
    }
    return COLLECTION == "User" ?
      {...state, ...REDUCER_user_add(state, action) } : state;
  };

});

export const REDUCERS = REDUCER;

