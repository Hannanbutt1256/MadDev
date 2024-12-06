import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { loginSchema } from "../../validation/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInterface } from "../../types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, provider } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  //Login with Firebase
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    const auth = getAuth();
    const email = data.email;
    const password = data.password;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/create-post");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  //Firbase Login for Google
  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // console.log(token);
        const user = result.user;
        console.log(user);
        alert("user is registered");
        navigate("/create-post");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        const email = error.customData.email;
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };
  return (
    <div className="px-10 h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="rounded-md  md:w-[500px] p-10 bg-light-background dark:text-dark-text text-light-text  dark:bg-dark-card">
          <h1 className="text-3xl text-center  mb-2 ">Login</h1>
          <div className="flex flex-col p-2 mb-2">
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="bg-light-background2 dark:bg-dark-card p-2 border-2 rounded-md border-gray-300 dark:border-gray-400 dark:hover:border-dark-hover2 hover:border-black"
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="bg-light-background2 dark:bg-dark-card p-2 border-2 rounded-md border-gray-300 dark:border-gray-400 dark:hover:border-dark-hover2 hover:border-black"
              />

              {errors.email && <p>{errors.email.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSubmit(onSubmit)}
              className="border rounded-md border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text outline-none p-2"
            >
              Login
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="border rounded-md border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text outline-none p-2"
            >
              Continue with Google
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-500 mr-2">Don't have an account?</span>
            <Link to="/auth/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
