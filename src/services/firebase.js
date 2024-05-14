import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import getUser from "../contexts/getUser";
import updateUser from "../contexts/updateUser";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_MOH770FdvF2u4lFhyS3lhMZgClYhI7c",
    authDomain: "patientinsurancemanagement.firebaseapp.com",
    projectId: "patientinsurancemanagement",
    storageBucket: "patientinsurancemanagement.appspot.com",
    messagingSenderId: "394971398506",
    appId: "1:394971398506:web:8b87c08931fd1633e96513",
    measurementId: "G-9CSB2NTZF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const storage = getStorage();

export { auth, storage };

export default app;

export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, "images/" + currentUser.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, {photoURL});

    setLoading(false);
    alert('Profile picture saved!');
    console.log("firebase currentUser: ", photoURL);
    return photoURL;
}