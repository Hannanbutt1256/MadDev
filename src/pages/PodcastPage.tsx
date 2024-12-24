import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchPodcasts } from "../store/podcast/podcastThunks";
import AuthorName from "../components/AuthorName";
import { format } from "date-fns";

const PodcastPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { podcasts, isLoading, error } = useSelector(
    (state: RootState) => state.podcastData
  );

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading podcasts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-light-background mb-8 text-center">
          Podcasts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts && podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex flex-col md:flex-row p-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={podcast.coverImage}
                      alt={`${podcast.title} cover`}
                      className="w-full md:w-48 h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:ml-6 flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-light-background mb-2">
                      {podcast.title}
                    </h2>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {podcast.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        <p className="mb-1">
                          <span className="font-medium">Duration:</span>
                          {Math.floor(podcast.duration / 60)} minutes
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">Tags:</span>
                          {podcast.tags?.join(", ") || "No tags"}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">Created:</span>
                          {format(
                            podcast.createdAt instanceof Date
                              ? podcast.createdAt
                              : new Date(podcast.createdAt),
                            "MM/dd/yyyy"
                          )}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">Author:</span>
                          <span className="inline-block">
                            <AuthorName authorId={podcast.authorId} />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <audio controls className="w-full">
                        <source src={podcast.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">No podcasts available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;
