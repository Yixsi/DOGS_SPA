import { GET_DOGS, GET_DOG_DETAIL, GET_DOG_BY_NAME, GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, ORDER, FILTER, RESET_DETAIL, RESET_DOGS, GET_TEMPERS, POST_DOG_SUCCESS, POST_DOG_SUCCESS_RESET, POST_DOG_ERROR, POST_DOG_ERROR_RESET } from './types';

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
    try {
      const response = await axios.post('http://localhost:3001/dogs', dogData);

      if (response.status === 201) {
        dispatch({
          type: POST_DOG_SUCCESS,
          payload: response.data
        });
        // set success state to null after 5 seconds
        setTimeout(() => {
          dispatch({
            type: POST_DOG_SUCCESS_RESET
          });
        }, 5000);
      } else {
        dispatch({
          type: POST_DOG_ERROR,
          payload: "Failed to create dog."
        });
        // set error state to null after 5 seconds
        setTimeout(() => {
          dispatch({
            type: POST_DOG_ERROR_RESET
          });
        }, 5000);
      }
    } catch (error) {
      console.log(error); // log the error for debugging purposes
      dispatch({
        type: POST_DOG_ERROR,
        payload: "Failed to create dog."
      });
      // set error state to null after 5 seconds
      setTimeout(() => {
        dispatch({
          type: POST_DOG_ERROR_RESET
        });
      }, 5000);
    }
  };
};


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

export const filter = (id) =>{
  return{
    type: FILTER,
    payload: id
  }
}

export const order = (order) =>{
  return{
    type: ORDER,
    payload: order
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
