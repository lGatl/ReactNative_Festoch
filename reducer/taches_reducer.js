import { GET_TACHES, PATCH_TACHES, POST_TACHES, DELETE_TACHES } from "../action/taches_action"

const DEFAULTS = { taches: [] }
export default function reducer(state = DEFAULTS , action) {
	const taches = [...state.taches]
  switch (action.type) {
    case GET_TACHES:
      return { ...state, taches:action.payload };
    break;
    case PATCH_TACHES:
				let index = taches.findIndex(tache=>tache.id == action.payload.id)
				taches.splice(index,1,{...taches[index],...action.payload})
      return { ...state, taches:taches };
    break;
    case POST_TACHES:
      return { ...state, taches:[...taches, action.payload] };
    break;
    case DELETE_TACHES:

    	taches.splice(taches.findIndex(tache=>tache.id==action.payload),1)
      return { ...state, taches };
    break;
  }
  return state;
}
