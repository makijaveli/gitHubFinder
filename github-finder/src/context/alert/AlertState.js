// Initial state
import {useReducer} from "react";
import AlertReducer from "../alert/alertReducer";
import AlertContext from "../alert/alertContext";
import {REMOVE_ALERT, SET_ALERT} from "../types";

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // SET ALERT
    const setAlertHandler = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })

        setTimeout(() => {
           dispatch({
               type: REMOVE_ALERT
           })
        }, 5000)
    }

    return <AlertContext.Provider
        value={{
            alert: state,
            setAlertHandler
        }}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;