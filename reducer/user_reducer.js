import { CONSTANTES } from "../action/action";

const DEFAULTS = {
	active_user:{},
	all:[],
	one:{}
};
export const REDUCER_user_add = ( state , action ) =>{
	var all = [ ...state.all ] ;
	let prestataire_index;
	let payeur_index;
	let one;
	let active_user;
	switch ( action.type ) {
	case CONSTANTES["User"].GET_ACTIVE_USER:
		return { ...state, active_user: action.payload  };
		break;
	case CONSTANTES["User"].LOG_IN:
		return { ...state, ...action.payload  };
		break;
	case CONSTANTES["User"].LOG_OUT:
		return { ...state, active_user: action.payload  };
		break;
	}
	return {...DEFAULTS, ...state};
};
