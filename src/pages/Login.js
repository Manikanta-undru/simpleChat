import React, { useState } from "react";
import { Logo } from "../assets/Svgs";
import { Animals } from "../assets/Animal";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (e.target[0].name === "name") {
      const photoURL = Animals[Math.floor(Math.random() * Animals.length)];
      if (e.target[3].value === e.target[2].value) {
        const name = e.target[0].value.toLowerCase();
        const email = e.target[1].value;
        const password = e.target[2].value;
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in

            const user = userCredential.user;
            updateProfile(user, { displayName: name, photoURL: photoURL });
            await setDoc(doc(db, "users", user.uid), {
              displayName: name,
              email: email,
              uid: user.uid,
              photoURL: photoURL,
            });
            await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErr(errorMessage);

            // ..
          });
      } else {
        setErr("Password does not match!");
      }
    } else {
      const email = e.target[0].value;
      const password = e.target[1].value;
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setErr(error.message);
        });
    }
  };
  //firebase Login

  return (
    <div className=' bg-white w-full h-screen'>
      {loading && <Loader />}
      <div className=' w-full h-full flex flex-col justify-center'>
        <div className='flex justify-center items-center mb-2 '>
          <h1 className='font-bold text-3xl text-gray-600 mr-2 '>
            Simple Chat
          </h1>
          <Logo width={50} height={50} fill={"#3b82f6"} />
        </div>
        <p className='text-sm text-rose-500 text-center mt-4'>
          {err && <span>{err}</span>}
        </p>
        <div className=' w-62 px-8 py-4 rounded-md'>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            {signUp && (
              <input
                name='name'
                required
                placeholder='name'
                className='font-medium text-gray-500 py-2 px-2 border-2 border-gray-400 focus:outline-none focus:ring focus:border-blue-500 rounded-xl   mb-4  '
              />
            )}
            <input
              name='email'
              type='email'
              required
              placeholder='email'
              className='  font-medium text-gray-500 py-2 px-2 border-2 border-gray-400 focus:outline-none focus:ring focus:border-blue-500 rounded-xl  mb-4 '
            />
            <input
              type='password'
              name='password'
              required
              placeholder='password'
              className=' font-medium text-gray-500 py-2 px-2 border-2 border-gray-400 focus:outline-none focus:ring focus:border-blue-500 rounded-xl  mb-4 '
            />
            {signUp && (
              <input
                name='cfPassword'
                required
                placeholder='confirm password'
                className='font-medium text-gray-500 py-2 px-2 border-2 border-gray-400 focus:outline-none focus:ring focus:border-blue-500 rounded-xl   mb-4  '
              />
            )}
            {!signUp && (
              <button
                type='submit'
                className='font-bold  py-2 px-4 rounded-xl text-gray-100  bg-blue-500 mt-0 mb-2'
              >
                Login
              </button>
            )}
            {signUp && (
              <button
                type='sumbit'
                className='font-bold w-full  py-2 px-4 rounded-xl text-gray-100  bg-blue-500 '
              >
                Sign Up
              </button>
            )}
          </form>
          {!signUp && (
            <p className='text-sm text-gray-500 text-center mt-2s'>
              Don't have an account?{" "}
              <button
                href='#'
                className='text-blue-500'
                onClick={() => {
                  setSignUp(!signUp);
                  setErr(false);
                }}
              >
                Sign up now!
              </button>
            </p>
          )}

          {signUp && (
            <p className='text-sm text-gray-500 text-center mt-4'>
              Have an account?{" "}
              <button
                href='#'
                className='text-blue-500'
                onClick={() => {
                  setSignUp(!signUp);
                  setErr(false);
                }}
              >
                Sign In!
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
