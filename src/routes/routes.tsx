import { createRoutesFromElements, Route } from "react-router";

import App from "../App";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CreatePostPage from "../pages/CreatePostPage";
import HelpPage from "../pages/HelpPage";
import HomePage from "../pages/HomePage";
// import PodcastListPage from "../pages/PodcastListPage";
import PodcastPage from "../pages/PodcastPage";
import PostPage from "../pages/PostPage";
import SavePostPage from "../pages/SavePostPage";
import ProfilePage from "../pages/ProfilePage";
import NotificationPage from "../pages/NotificationPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import CreatePodcastsPage from "../pages/CreatePodcastsPage";
import Tabs from "../components/Tabs";
import FollowedPage from "../pages/FollowedPage";
import DiscoverPage from "../pages/DiscoverPage";
import Protected from "../components/Protected";
import NotFound from "../common/NotFound";
import ErrorBoundary from "../common/ErrorBoundary";
const routes = createRoutesFromElements(
  <Route
    path="/"
    element={
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    }
  >
    <Route
      path="*"
      element={
        <div>
          <NotFound />
        </div>
      }
    />
    ,
    <Route index element={<HomePage />} />
    <Route path="/" element={<Tabs />}>
      <Route path="discover" element={<DiscoverPage />} />

      <Route
        path="following"
        element={
          <Protected>
            <FollowedPage />
          </Protected>
        }
      />
    </Route>
    <Route path="auth/login" element={<LoginPage />} />
    <Route path="auth/register" element={<RegisterPage />} />
    <Route
      path="create-post"
      element={
        <Protected>
          <CreatePostPage />
        </Protected>
      }
    />
    <Route
      path="save-post"
      element={
        <Protected>
          <SavePostPage />
        </Protected>
      }
    />
    <Route path="post/:id" element={<PostPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="help" element={<HelpPage />} />
    <Route
      path="podcasts"
      element={
        <Protected>
          <PodcastPage />
        </Protected>
      }
    />
    <Route path="podcast/:id" element={<PodcastPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="notifications" element={<NotificationPage />} />
    <Route path="subscription" element={<SubscriptionPage />} />
    <Route path="create-podcast" element={<CreatePodcastsPage />} />
  </Route>
);
export default routes;
