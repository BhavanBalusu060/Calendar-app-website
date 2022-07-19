import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBoJ9qNhK4N6NwhwCGuLY1bVlpzZEmyMI0",
	authDomain: "calendar-app-4ccfd.firebaseapp.com",
	projectId: "calendar-app-4ccfd",
	storageBucket: "calendar-app-4ccfd.appspot.com",
	messagingSenderId: "1064061358197",
	appId: "1:1064061358197:web:fd950c6e54671adb26a83c",
	measurementId: "G-S0K46V43FB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert("Invalid Email or Password");
	}
};

const register = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			location: "None",
		});
	} catch (err) {
		console.log(err);
		alert(
			"There was an error creating your account"
		);
	}
};

const forgotPassword = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent! Check spam if you don't see it");
	} catch (err) {
		alert("Invalid Email");
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, login, register, forgotPassword, logout };
