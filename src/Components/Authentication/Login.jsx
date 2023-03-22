import React, { useState } from 'react';
import { auth, provider } from '../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-10 bg-white rounded shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-black">Log In</h1>
        <form onSubmit={signInWithEmailAndPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 mb-4 text-white bg-black rounded"
          >
            Log In
          </button>
        </form>
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