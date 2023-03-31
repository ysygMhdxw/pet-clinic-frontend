import {useEffect} from "react";
import {Login} from "./login";
import AuthSelection from "./authSelection";
import propTypes from "prop-types";

function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}
export const Home = (props) => {


    useEffect(() => {
       if (isLocalStorageAvailable()) {
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                props.setIsAuthenticated(true);
            }
        }
    }, [props.isAuthenticated]);
    if(!props.isAuthenticated){
        return <Login isAuthenticated={props.isAuthenticated} setIsAuthenticated={props.setIsAuthenticated}/>
    }
    else return <AuthSelection/>

}
Home.propTypes = {
    isAuthenticated: propTypes.bool,
    setIsAuthenticated:propTypes.func
};