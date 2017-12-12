import constants from '../constants'
import { TurboClient } from '../utils'

export default {

	currentUserReceived: (user) => {
		return {
			type: 'CURRENT_USER_RECEIVED',
			data: user
		}
	}
	
}
