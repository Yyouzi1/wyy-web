// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as DiscoveryReducer } from '../../views/Discovery/store'
import { reducer as UserReducer } from '../../components/UserCenter/store'

const reducer = combineReducers({
    discovery: DiscoveryReducer,
    user: UserReducer,
})
export default reducer