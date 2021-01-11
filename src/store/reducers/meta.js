import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  dark: false,
}

export const setDarkTheme = createAction('meta/setDarkTheme')

const metaReducer = createReducer(initialState, builder => {
  builder
    .addCase(setDarkTheme, (state, action) => {
      state.dark = action.payload
    })
    .addDefaultCase(state => state)
})

export default metaReducer
