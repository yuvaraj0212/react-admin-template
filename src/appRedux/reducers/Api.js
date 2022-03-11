import { GET_PRODUCT } from "../../constants/ActionTypes";

const INIT_STATE = {
    token: JSON.parse(localStorage.getItem('token')),
    productList: [],
    authUser: JSON.parse(localStorage.getItem('user')),

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {


        case GET_PRODUCT: {
            return {
                ...state,
                productList: action.payload,
            };
        }



        default:
            return state;
    }
}