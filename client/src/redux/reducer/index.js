import { GET_DOGS, GET_DOG_DETAIL, RESET_DETAIL, GET_DOG_BY_NAME, RESET_DOGS, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FILTER_BY_TEMP, FILTER_BY_ORIGIN, ALPHAB_ORDER, ORDER_BY_WEIGHT, GET_TEMPERS, POST_DOG } from '../actions/types';

const initialState = {
    dogs: [],
    filterDogs: [],
    dogDetail: {},
    favorites: [],
    filter: {
        origin: '',
        temper: []
    },
    tempers: []
}



export default function rootReducer(state = initialState, { type, payload }){

    switch(type){
        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
                filterDogs: payload
            }
        case RESET_DOGS:
            return {
                ...state,
                filterDogs: state.dogs
            }
        case POST_DOG:
            return {
                ...state,
                dogs: [...state.dogs, payload]
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                dogDetail: {}
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                filterDogs: payload
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
        case GET_TEMPERS:
            return {
                ...state,
                tempers: payload
            }
        default:
            return {
                ...state
            }
    }
}