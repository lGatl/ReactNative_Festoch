/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";
import  {REDUCERS} from "./reducers";
import  ControleREDUCER from "./controle_reducer";

const ROOT_REDUCER = combineReducers({
	...REDUCERS,
	controle: ControleREDUCER,
});
export default ROOT_REDUCER;

