import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

const LoginPage = () => {
  const navigate = useNavigate();

  // const { Profileuser } = useSelector((state: RootState) => state.userProfile);
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
        navigate("/");
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
      .then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // console.log(token);
        const user = result.user;
        console.log(user);

        // await setDoc(doc(db, "UserProfile", user.uid), {
        //   id: user.uid,
        //   username: Profileuser?.username || user.displayName,
        //   email: user.email,
        //   profilePicture: user.photoURL,
        //   bio: Profileuser?.bio,
        //   following: Profileuser?.following,
        //   followers: Profileuser?.followers,
        //   bookmarkedPosts: Profileuser?.bookmarkedPosts,
        // });
        console.log(user);
        alert("user is registered");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);

        const errorMessage = error.message;

        // // Log details for debugging
        // console.error("Google Sign-In Error:", errorCode, errorMessage);
        // console.log("Email:", error.customData?.email); // Safe access to email
        console.log(
          "Credential:",
          GoogleAuthProvider.credentialFromError(error)
        );

        // Use a switch statement for cleaner error handling
        switch (errorCode) {
          case "auth/popup-closed-by-user":
            toast.info("You closed the popup. Please try again."); // Use toast
            break;
          case "auth/account-exists-with-different-credential":
            toast.warning(
              "You already have an account with this email. Please sign in with that account."
            ); // More concise message
            break;
          case "auth/invalid-credential":
            toast.error(
              "Invalid credentials. Please check your email and password."
            ); // Use toast.error for errors
            break;
          case "auth/user-disabled":
            toast.error(
              "Your account has been disabled. Please contact support."
            );
            break;
          // Add more specific error cases as needed
          default:
            toast.error(`An unexpected error occurred: ${errorMessage}`); // Generic message for unknown errors
        }
      });
  };
  return (
    <div className="px-10 h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="rounded-md w-[350px] md:w-[500px] p-10 bg-light-background2 dark:text-dark-text text-light-text  dark:bg-dark-card">
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
