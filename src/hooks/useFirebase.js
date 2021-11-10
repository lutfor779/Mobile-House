import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import initializeFirebase from "../firebase/firebase.init";



initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                setError('');

                // save user to database

                const destination = location?.state?.from || '/';
                history.replace(destination);
            })
            .catch(err => setError(err))
            .finally(setIsLoading(false));
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setError("");
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setError("")
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => setIsLoading(false))
    }


    // console.log(name, email);

    return {
        user,
        error,
        isLoading,
        setUser,
        setError,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;