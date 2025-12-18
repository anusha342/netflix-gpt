import { useState, useRef } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          });
        })
        .catch((error) => setErrorMessage(error.message));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      ).catch((error) => setErrorMessage(error.message));
    }
  };
  return (
    <div className="relative h-screen w-screen">
      <Header />

      {/* Background */}
      <img
        className="absolute h-full w-full object-cover"
        src={BG_URL}
        alt="background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Login Card */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[90%] md:w-[420px]
          bg-black bg-opacity-80
          p-10
          rounded-md
          text-white
          shadow-2xl
        "
      >
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-4 mb-4 bg-gray-700 rounded outline-none"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="w-full p-4 mb-4 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-4 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-red-600"
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}

        <button
          className="
            w-full
            py-3
            mt-4
            bg-red-600
            hover:bg-red-700
            rounded
            font-semibold
            text-lg
          "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400 mt-6 text-sm">
          {isSignInForm ? "New to Netflix?" : "Already registered?"}
          <span
            className="text-white cursor-pointer ml-1 hover:underline"
            onClick={() => setIsSignInForm(!isSignInForm)}
          >
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
