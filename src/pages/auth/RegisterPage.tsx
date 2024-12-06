import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterInterface } from "../../types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/authSchema";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    console.log(data);
    //Firebase Auth
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created successfully:", user);
        alert("User created successfully");
        navigate("/create-post");
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
      });
  };
  //Google Auth by Firebase
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
        alert(errorCode);
        alert(errorMessage);

        const email = error.customData.email;
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  return (
    <div className="px-10 h-full w-screen mt-4">
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="rounded-md w-[350px] md:w-[500px] p-10 bg-light-background2 text-light-text dark:text-dark-text dark:bg-dark-card">
          <h1 className="text-3xl text-center text-light-text mb-2 dark:text-dark-text ">
            Create an account
          </h1>
          <div className="flex flex-col p-2 mb-2">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className="bg-light-background2 dark:bg-dark-card p-2 border-2 rounded-md border-gray-300 dark:border-gray-400 dark:hover:border-dark-hover2 hover:border-black"
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="bg-light-background2 dark:bg-dark-card p-2 border-2 rounded-md border-gray-300 dark:border-gray-400 dark:hover:border-dark-hover2 hover:border-black"
              />
              {errors.email && <p>{errors.email.message}</p>}
              {errors.username && <p>{errors.username.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSubmit(onSubmit)}
              className="border rounded-md border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text outline-none p-2"
            >
              Register
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
            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-500 mr-2">
                Already have an account?
              </span>
              <Link to="/auth/login" className="text-blue-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
