import {
    GET_PRODUCT,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,

} from "../../constants/ActionTypes";

import axios from 'util/Api'

export const getPoductsList = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.get('/product/product-list',
        ).then(({ data }) => {
            console.log("product-list: ", data);
            if (data.result) {
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: GET_PRODUCT, payload: data.result });
            } else {
                dispatch({ type: FETCH_ERROR, payload: data.error });
            }
        }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
            console.log("product-list Error****:", error.message);
        });
    }
};