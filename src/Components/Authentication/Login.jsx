import React from 'react';
import { auth, provider } from '../../firebaseConfig';

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
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