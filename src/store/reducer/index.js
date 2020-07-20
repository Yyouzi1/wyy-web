// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as DiscoveryReducer } from '../../views/Discovery/store'

const reducer = combineReducers({
    discovery: DiscoveryReducer,
})
export default reducer