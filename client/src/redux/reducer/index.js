import { GET_DOGS, GET_DOG_DETAIL, RESET_DETAIL, GET_DOG_BY_NAME, RESET_DOGS, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER, GET_TEMPERS, POST_DOG_SUCCESS, POST_DOG_ERROR, POST_DOG_SUCCESS_RESET, POST_DOG_ERROR_RESET } from '../actions/types';

const initialState = {
    dogs: [],
    filterDogs: [],
    dogDetail: {},
    favorites: [],
    tempers: [],
    success: null,
    error: null
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
        case POST_DOG_SUCCESS:
            return {
                ...state,
                success: 'Dog created succesfully',
                dogs: [...state.dogs, payload]
            }
        case POST_DOG_SUCCESS_RESET:
            return {
                ...state,
                success: null
            };
        case POST_DOG_ERROR:
            return {
                ...state,
                error: payload
            }
        case POST_DOG_ERROR_RESET:
            return {
                ...state,
                error: null
            };
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
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, payload]
            };
        case GET_FAVORITES:
                return {
                    ...state,
                    favorites: state.favorites
                }
        case DELETE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((el) => el.id !== payload)
            };
        case FILTER:
            let filtered = [...state.filterDogs];
            if (payload === 'db' || payload === 'api') {
            filtered = filtered.filter(el => el.origin === payload);
            } else {
                filtered = filtered.filter(el => {
                    if (!el.temper) {
                        return false;
                    } else if (typeof el.temper === 'string') {
                        return el.temper.toLowerCase().includes(payload.toLowerCase());
                    } else {
                        return el.temper.filter(name => String(name.name).toLowerCase() === payload.toLowerCase()).length !== 0;
                    }
            });
            }
            return {
                ...state,
                filterDogs: filtered
            };

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