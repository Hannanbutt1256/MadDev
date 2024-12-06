import { createRoutesFromElements, Route } from "react-router";

import App from "../App";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CreatePostPage from "../pages/CreatePostPage";
import HelpPage from "../pages/HelpPage";
import HomePage from "../pages/HomePage";
import PodcastListPage from "../pages/PodcastListPage";
import PodcastPage from "../pages/PodcastPage";
import PostPage from "../pages/PostPage";
import SavePostPage from "../pages/SavePostPage";
import ProfilePage from "../pages/ProfilePage";
import NotificationPage from "../pages/NotificationPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import CreatePodcastsPage from "../pages/CreatePodcastsPage";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />
    <Route path="auth/login" element={<LoginPage />} />
    <Route path="auth/register" element={<RegisterPage />} />
    <Route path="create-post" element={<CreatePostPage />} />
    <Route path="save-post" element={<SavePostPage />} />
    <Route path="post/:id" element={<PostPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="help" element={<HelpPage />} />
    <Route path="podcasts" element={<PodcastListPage />} />
    <Route path="podcast/:id" element={<PodcastPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="notifications" element={<NotificationPage />} />
    <Route path="subscription" element={<SubscriptionPage />} />
    <Route path="create-podcast" element={<CreatePodcastsPage />} />
  </Route>
);
export default routes;
