import { GET_DOGS, GET_DOG_DETAIL, RESET_DETAIL, GET_DOG_BY_NAME, RESET_DOGS, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER, GET_TEMPERS, POST_DOG } from '../actions/types';

const initialState = {
    dogs: [],
    filterDogs: [],
    dogDetail: {},
    favorites: [],
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
        case FILTER:
            let filtered = [...state.filterDogs];
            if (payload === "temper") {
                // filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (payload === 'db' || payload === 'api') {
                console.log(payload);
                console.log(filtered.length);
                filtered = filtered.filter(el => el.origin === payload);
                console.log(filtered.length);
            }
            return {
                ...state,
                filterDogs: filtered
            }
        case ORDER:
            let sortedDogs = [...state.filterDogs];
            if (payload === "az") {
                sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
            } else if (payload === "za") {
                sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
            } else if (payload === "light") {
                sortedDogs.sort((a, b) => ((a.weight.split(' - ')[0] + a.weight.split(' - ')[1])/2) - ((b.weight.split(' - ')[0] + b.weight.split(' - ')[1])/2));
            } else if (payload === "heavy") {
                sortedDogs.sort((a, b) => ((b.weight.split(' - ')[0] + b.weight.split(' - ')[1])/2) - ((a.weight.split(' - ')[0] + a.weight.split(' - ')[1])/2));
            }
            return {
                ...state,
                filterDogs: sortedDogs
            };

            
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