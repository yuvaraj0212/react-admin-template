import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Api from "./Api";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  api:Api,
  commonData: Common,
});

export default reducers;
