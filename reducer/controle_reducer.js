import { CONSTANTES } from "../action/action";
const DEFAULTS = {

};

export default function (  state = DEFAULTS, action ) {
	
	switch ( action.type ) {
		

	case CONSTANTES.Controle.SCROLL:
		let scroll = {...state.scroll}
		return { ...state, scroll: {...scroll,...action.payload}  };
		break;	

	case CONSTANTES.Controle.CHANGE_PAGE:
		return { ...state, page: {...state.page, ...action.payload}  };
		break;	
	
	
	}
	return state;
}
