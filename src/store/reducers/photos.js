import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  byId: {},
  selected: [],
  allIds: [],
}

// Actions

export const selectImage = createAction('photos/selectImage', id => ({
  payload: {
    id,
  },
}))

export const unselectImage = createAction('photos/unselectImage', id => ({
  payload: {
    id,
  },
}))

export const unselectAll = createAction('photos/unselectAll')

export const selectAll = createAction('photos/selectAll')

export const initializeImages = createAction(
  'photos/initializeImages',
  initial => ({ payload: initial })
)

// Reducer

const photosReducer = createReducer(initialState, builder =>
  builder
    .addCase(initializeImages, (state, { payload }) => {
      const byId = payload
      state = {
        byId,
        selected: [],
        allIds: Object.keys(byId),
      }
      return state
    })
    .addCase(selectImage, (state, { payload }) => {
      state.selected.push(payload.id)
    })
    .addCase(unselectImage, (state, { payload }) => {
      state.selected = state.selected.filter(id => id !== payload.id)
      return state
    })
    .addCase(unselectAll, state => {
      state.selected = []
      return state
    })
    .addCase(selectAll, state => {
      state.selected = Object.keys(state.byId)
      return state
    })
    .addDefaultCase(state => state)
)

export default photosReducer
