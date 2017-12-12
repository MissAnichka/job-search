let initialState = {
	currentUser: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch(action.type){
		case 'CURRENT_USER_RECEIVED':
			console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.data))
			newState['currentUser'] = action.data
			return newState

		default:
			return state

	}
	
}