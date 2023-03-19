import { GET_DOGS, GET_DOG_DETAIL, GET_DOG_BY_NAME, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FILTER_BY_TEMP, FILTER_BY_ORIGIN, ALPHAB_ORDER, ORDER_BY_WEIGHT } from '../actions/types';

const initialState = {
    dogs: [],
    dogDetail: {},
    favorites: [],
    filter: {
        origin: '',
        temper: []
    },
    filteredDogs: []
}

export default function rootReducer(state = initialState, { type, payload }){

    switch(type){
        case GET_DOGS:
            return {
                ...state,
                dogs: payload
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: payload
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                dogs: payload,
                filteredDogs: payload
            }
        case GET_FAVORITES:
            return {
                ...state,
                favorites: state.favorites
            }
        case FILTER_BY_ORIGIN:
            return {
                ...state,
                fitler: {...state.filter, origin: payload}
            }
        case FILTER_BY_TEMP:
            return {
                ...state,
                fitler: {...state.filter, temper: payload}
            }
        default:
            return {
                ...state
            }
    }
}