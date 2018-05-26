/**
 * Created by yussan on 02/10/16.
 */
import Kompetisi from '../client/containers/competition/reducer'
import Berita from '../client/containers/news/reducer'
import Pasang from './pasang/reducer'
import User from './user/reducer'

import {combineReducers} from 'redux'

const Reducers = combineReducers({
    Kompetisi,
    Berita,
    Pasang,
    User
})

export default Reducers
