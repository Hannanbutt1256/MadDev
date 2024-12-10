import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../store/user/userProfileSlice";
import { RootState, AppDispatch } from "../store/store";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/docyx1r6s/image/upload";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Profileuser, isLoading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [authUser, authLoading, authError] = useAuthState(auth);

  // Local state for input fields
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    Profileuser?.profilePicture
  );

  // Fetch user profile when the authUser is available
  useEffect(() => {
    if (authUser) {
      dispatch(fetchUserProfile(authUser.uid));
    }
  }, [authUser, dispatch]);

  // Prefill input fields when user data is available
  useEffect(() => {
    if (Profileuser) {
      setUsername(Profileuser.username || "");
      setBio(Profileuser.bio || "");
      setProfileImageUrl(
        Profileuser.profilePicture || "/assets/default-profile.png"
      );
    }
  }, [Profileuser]);

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = profileImageUrl;

    // Upload image to Cloudinary if a new image is selected
    if (profileImage) {
      const uploadedUrl = await uploadImageToCloudinary(profileImage);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    if (Profileuser) {
      const updatedUser = {
        ...Profileuser,
        username,
        bio,
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
    <div className="p-4">
      {Profileuser ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            <div className="flex items-center space-x-4">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border rounded w-full dark:bg-dark-background"
            />
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 border rounded w-full dark:bg-dark-background"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
