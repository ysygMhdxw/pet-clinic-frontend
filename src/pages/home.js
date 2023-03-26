import {useEffect, useState} from "react";
import {Login} from "./login";
import AuthSelection from "./authSelection";
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
export const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (isLocalStorageAvailable()) {
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                setIsAuthenticated(true);
            }
        }
    }, []);
    if(!isAuthenticated){
        return <Login/>
    }
    else return <AuthSelection/>

}