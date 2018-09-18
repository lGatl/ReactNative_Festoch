export const CONSTANTE_Controle = { 
	RESIZE: "Controle_RESIZE",
	SCROLL: "Controle_SCROLL",
	CHANGE_PAGE: "Controle_CHANGE_PAGE",
	CONTENT_SIZE_CHANGE: "Controle_CONTENT_SIZE_CHANGE"
};

function resize(val){
	return {
		type: 		CONSTANTE_Controle.RESIZE,
		payload: 	val
	};
}
function scroll(val){
	return {
		type: 		CONSTANTE_Controle.SCROLL,
		payload: 	val
	};
}
function contentSizeChange(val){
	return {
		type: 		CONSTANTE_Controle.CONTENT_SIZE_CHANGE,
		payload: 	val
	};
}
function changePage(val){
	return {
		type: 		CONSTANTE_Controle.CHANGE_PAGE,
		payload: 	val
	};
}

export const ACTION_Controle = { 
	changePage,
	contentSizeChange,
	resize,
	scroll
};
