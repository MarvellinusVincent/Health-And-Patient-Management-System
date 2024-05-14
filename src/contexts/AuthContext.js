import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                console.log("User ID:", userId);
                return userId;
            });
    }

    const login = async (email, password) => {


        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        const token = await user.getIdToken();
        console.log(token);
        return token;
    }
    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}