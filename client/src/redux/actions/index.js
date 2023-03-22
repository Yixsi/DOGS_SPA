import { GET_DOGS, GET_DOG_DETAIL, GET_DOG_BY_NAME, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FILTER_BY_TEMP, FILTER_BY_ORIGIN, ALPHAB_ORDER, ORDER_BY_WEIGHT, RESET_DETAIL, RESET_DOGS, GET_TEMPERS, POST_DOG } from './types';

import axios from 'axios'

export const getDogs = () =>{
    return async (dispatch) =>{
        const response = await axios('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}

export const getDogByName = (name) =>{
  return async (dispatch) =>{
    const response = await axios(`http://localhost:3001/dogs/?name=${name}`);
    return dispatch({
      type: GET_DOG_BY_NAME,
      payload: response.data
    })
  }
}

export const resetDogs = () => {
  return {
    type: RESET_DOGS
  }
}

export const getDogDetail = (id) => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/dogs/${id}`
    );
    return dispatch({
      type: GET_DOG_DETAIL,
      payload: response.data
    });
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  }
}

export const postDog = (dogData) => {
  return async (dispatch) => {
    const response = await axios.post('http://localhost:3001/dogs', dogData);
    return dispatch({
      type: POST_DOG,
      payload: response.data
    })
  }
}
export const addFavorite = (favorite) =>{
    return{
        type: ADD_FAVORITE,
        payload: favorite
    }
}

export const deleteFavorite = (id) =>{
    return{
        type: DELETE_FAVORITE,
        payload: id
    }
}

export const getFavorites = ()=>{
  return{
    type: GET_FAVORITES
  }
}

export const filterByOrigin = (origin) =>{
  return{
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
}

export const filterByTemp = (temper) =>{
  return{
    type: FILTER_BY_TEMP,
    payload: temper
  }
}

export const orderCardsAlpha = (alphabetic)=>{
  return{
    type: ALPHAB_ORDER,
    payload: alphabetic 
  }
}

export const orderCardsWeight = (alphabetic)=>{
  return{
    type: ALPHAB_ORDER,
    payload: alphabetic 
  }
}

export const getTempers = () =>{
  return async (dispatch) =>{
        const response = await axios('http://localhost:3001/tempers');
        return dispatch({
            type: GET_TEMPERS,
            payload: response.data
        })
    }
}