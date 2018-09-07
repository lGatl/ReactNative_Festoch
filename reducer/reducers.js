/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";
import  TachesREDUCER from "./taches_reducer";


const ROOT_REDUCER = combineReducers({

	taches: TachesREDUCER
});
export default ROOT_REDUCER;
