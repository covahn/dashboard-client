import { combineReducers } from '@reduxjs/toolkit'

import metaReducer from './meta'
import photosReducer from './photos'

export default combineReducers({ meta: metaReducer, photos: photosReducer })
