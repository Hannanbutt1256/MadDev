import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../store/user/userThunks";
import { RootState, AppDispatch } from "../store/store";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  bio: Yup.string().max(500, "Bio must be at most 500 characters").required(),
});

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Profileuser, isLoading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [authUser, authLoading, authError] = useAuthState(auth);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    Profileuser?.profilePicture
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  // Fetch user profile when the authUser is available
  useEffect(() => {
    if (authUser) {
      dispatch(fetchUserProfile(authUser.uid));
    }
  }, [authUser, dispatch]);

  // Prefill input fields when user data is available
  useEffect(() => {
    if (Profileuser) {
      setValue("username", Profileuser.username || "");
      setValue("bio", Profileuser.bio || "");
      setProfileImageUrl(
        Profileuser.profilePicture || "/assets/default-profile.png"
      );
    }
  }, [Profileuser, setValue]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.secure_url; // The URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle form submission
  const onSubmit = async (data: { username: string; bio: string }) => {
    let imageUrl = profileImageUrl;

    // Upload image to Cloudinary if a new image is selected
    if (profileImage) {
      const uploadedUrl = await uploadImageToCloudinary(profileImage);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    if (Profileuser) {
      const updatedUser = {
        ...Profileuser,
        ...data,
        profilePicture: imageUrl,
      };
      dispatch(updateUserProfile(updatedUser));
    }
  };

  if (authLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
    return <div>Error: {authError.message}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {Profileuser ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            <div className="md:flex items-center space-x-4">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm border border-light-button text-light-button dark:border-dark-button dark:text-dark-button file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-light-button file:text-light-background hover:file:bg-light-hover hover:file:text-light-background dark:file:bg-dark-button dark:file:text-dark-text dark:hover:file:bg-dark-hover2 dark:hover:file:text-dark-text rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              {...register("username")}
              className="mt-1 p-2 border rounded w-full dark:bg-dark-background"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={Profileuser.email}
              disabled
              className="mt-1 p-2 border rounded w-full bg-gray-200 cursor-not-allowed dark:bg-dark-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              {...register("bio")}
              className="mt-1 p-2 border rounded w-full dark:bg-dark-background"
              rows={4}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <div>No user profile found.</div>
      )}
    </div>
  );
};

export default ProfilePage;
