import React, { useState, useContext } from "react";
import { auth, provider } from "../../firebaseConfig";
import { TypeContext } from "../TypeContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthDisplay } = useContext(TypeContext);

  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setAuthDisplay(null)
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      setAuthDisplay(null)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10`}
        onClick={() => setAuthDisplay(null)}
      ></div>
      <div className="flex items-center justify-center h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 min-w-[360px]">
        <div className="p-10 bg-white rounded shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-black">Register</h1>
          <form onSubmit={registerWithEmailAndPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
            />
            <button
              type="submit"
              className="w-full py-2 mb-4 text-white bg-black rounded hover:scale-[1.03] duration-100"
            >
              Register
            </button>
          </form>
          <button
            onClick={signUpWithGoogle}
            className="w-full py-2 text-white bg-black rounded hover:scale-[1.03] duration-100"
          >
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
