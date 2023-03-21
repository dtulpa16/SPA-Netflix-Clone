import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../../firebaseConfig';

const Login = () => {

  const signInWithGoogle = async () => {
    debugger;
    try {
      let response = await auth.signInWithPopup(provider);
      debugger
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-500">
      <div className="p-10 bg-white rounded shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-black">Log In</h1>
        <button
          onClick={signInWithGoogle}
          className="w-full py-2 text-white bg-black rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
