import axios from 'axios'
import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL
} from '../constants/carConstants'

export const listCars = (filters) => async (dispatch) => {
  try {
    dispatch({ type: CAR_LIST_REQUEST })

    const { data } = await axios.get('/api/cars', { params: filters })

    dispatch({
      type: CAR_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}