import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { podcastSchema, PodcastSchemaType } from "../validation/podcastSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addPodcast } from "../store/podcast/podcastThunks";
// import { PodcastInterface } from "../types/podcast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
// Assuming you have this array defined somewhere
const predefinedTags = [
  "React",
  "JavaScript",
  "CSS",
  "Node.js",
  "Tailwind",
  "Next.js",
  "TypeScript",
  "HTML",
  "Python",
  "Django",
  "Flask",
  "Vue.js",
  "Angular",
  "Svelte",
  "Bootstrap",
  "jQuery",
  "Express",
  "GraphQL",
  "REST API",
  "SQL",
  "NoSQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "Redux",
  "Zustand",
  "Jest",
  "Cypress",
  "Mocha",
  "Chai",
  "Webpack",
  "Vite",
  "Parcel",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "AWS",
  "Azure",
  "Google Cloud",
  "Heroku",
  "Netlify",
  "Vercel",
  "Blockchain",
  "Cryptocurrency",
  "Bitcoin",
  "Ethereum",
  "Solidity",
  "Web3",
  "Smart Contracts",
  "NFT",
  "IPFS",
  "Rust",
  "Go",
  "C++",
  "C#",
  "Java",
  "Spring Boot",
  "Kotlin",
  "Swift",
  "iOS",
  "Android",
  "Flutter",
  "React Native",
  "Expo",
  "Tailwind CSS",
  "Material-UI",
  "Chakra UI",
  "Ant Design",
  "Styled Components",
  "SCSS",
  "LESS",
  "Figma",
  "Adobe XD",
  "Sketch",
  "UI/UX",
  "Responsive Design",
  "Accessibility",
  "SEO",
  "Web Performance",
  "WebAssembly",
  "WebSockets",
  "PWA",
  "Electron",
  "Tauri",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Data Science",
  "Data Visualization",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "FastAPI",
  "Cybersecurity",
  "Ethical Hacking",
  "DevOps",
  "CI/CD",
  "Agile",
  "Scrum",
  "JIRA",
  "Kanban",
  "Trello",
  "Asana",
  "Redux Toolkit",
  "MobX",
  "RxJS",
  "XState",
  "Emotion",
  "SASS",
  "Babel",
  "ESLint",
  "Prettier",
  "Storybook",
  "Jenkins",
  "Travis CI",
  "CircleCI",
  "GitHub Actions",
  "CodePen",
  "Replit",
  "Stack Overflow",
  "MDN",
  "W3C",
  "HTTP",
  "HTTPS",
  "OAuth",
  "JWT",
  "OpenID Connect",
  "SAML",
  "Webhooks",
  "Microservices",
  "Monolith",
  "Serverless",
  "Jamstack",
  "Headless CMS",
  "Contentful",
  "Sanity",
  "Strapi",
  "Ghost",
  "Hugo",
  "Jekyll",
  "Gatsby",
  "Nuxt.js",
  "Gridsome",
  "Astro",
  "Remix",
  "SWR",
  "React Query",
  "Apollo Client",
  "Prisma",
  "Sequelize",
  "Mongoose",
  "SQLite",
  "Redis",
  "RabbitMQ",
  "Kafka",
  "Nginx",
  "Apache",
  "DigitalOcean",
  "Linode",
  "Vagrant",
  "Ansible",
  "Terraform",
  "Prometheus",
  "Grafana",
  "ELK Stack",
  "Splunk",
  "Logstash",
  "Kibana",
  "New Relic",
  "Datadog",
  "Postman",
  "Swagger",
  "OpenAPI",
  "JMeter",
  "Load Testing",
  "Unit Testing",
  "Integration Testing",
  "End-to-End Testing",
  "Penetration Testing",
  "Mutation Testing",
  "Test-Driven Development (TDD)",
  "Behavior-Driven Development (BDD)",
  "Pair Programming",
  "Code Review",
  "Refactoring",
  "Design Patterns",
  "SOLID Principles",
  "Clean Code",
  "Performance Optimization",
  "Lazy Loading",
  "Memoization",
  "Virtual DOM",
  "State Management",
  "Server-Side Rendering (SSR)",
  "Static Site Generation (SSG)",
  "Incremental Static Regeneration (ISR)",
  "Progressive Web Apps (PWA)",
  "Authentication",
  "Authorization",
  "Middleware",
  "API Gateway",
  "GraphQL Subscriptions",
  "WebRTC",
  "Streams",
  "Multithreading",
  "Concurrency",
  "Parallelism",
  "Event Loop",
  "Garbage Collection",
  "Memory Leaks",
  "Closures",
  "Recursion",
  "Currying",
  "Higher-Order Functions",
  "Functional Programming",
  "Object-Oriented Programming",
  "Procedural Programming",
  "Declarative Programming",
  "Imperative Programming",
  "Frameworks",
  "Libraries",
  "Modules",
  "Packages",
  "Dependency Injection",
  "Containerization",
  "Virtualization",
  "Cloud Functions",
  "Lambda Functions",
  "Scripting",
  "Automation",
  "Shell Scripting",
  "Bash",
  "Zsh",
  "PowerShell",
  "Command Line Interface (CLI)",
  "Integrated Development Environment (IDE)",
  "Code Editors",
  "VS Code",
  "Sublime Text",
  "Atom",
  "IntelliJ IDEA",
  "WebStorm",
  "PyCharm",
  "Android Studio",
  "Xcode",
  "Emulators",
  "Simulators",
  "Debugging",
  "Profiling",
  "Logging",
  "Branching",
  "Merging",
  "Rebasing",
  "Pull Requests",
  "Code Merge Conflicts",
  "Hotfixes",
  "Release Management",
  "Continuous Deployment",
  "Continuous Delivery",
  "Blue-Green Deployment",
  "Canary Releases",
  "Feature Toggles",
  "A/B Testing",
  "Mocking",
  "Stubbing",
  "Spies",
  "Snapshots",
  "Regression Testing",
  "Code Coverage",
  "Load Balancing",
  "Caching",
  "CDN",
  "Edge Computing",
  "IoT",
  "Robotics",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)",
  "Game Development",
  "3D Graphics",
  "Unity",
  "Unreal Engine",
  "Blender",
  "Rendering",
  "Shaders",
  "OpenGL",
  "DirectX",
  "Vulkan",
  "WebGL",
  "Artificial Intelligence",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "Big Data",
  "Hadoop",
  "Spark",
  "Data Pipelines",
  "Business Intelligence",
  "Analytics",
  "Power BI",
  "Tableau",
  "Marketing Automation",
  "RESTful Services",
  "JSON",
  "YAML",
  "Markdown",
  "Regular Expressions",
  "Code Formatting",
  "Secrets Management",
  "Encryption",
  "SSL/TLS",
  "Firewalls",
  "Disaster Recovery",
  "Refactoring Patterns",
  "Storybook Stories",
  "Animation Libraries",
  "Motion Design",
  "Web Development",
  "Mobile App Development",
  "Full-Stack Development",
  "Cloud Computing",
  "Version Control",
];

const AddPodcastForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [authUser] = useAuthState(auth);
  const authorId = authUser?.uid;

  const CloudinaryUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const CloudinaryUrl1 = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL1;
  const CloudinaryUploadPreset1 = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET1;
  const CloudinaryUploadPreset2 = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET2;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioLoading, setAudioLoading] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_AUDIO_SIZE = 100 * 1024 * 1024;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3"];
  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const file = e.target.files[0];

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("Please select a JPEG or PNG image file.");
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image file size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CloudinaryUploadPreset1);

    setIsLoading(true);

    try {
      const response = await fetch(CloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.secure_url) {
        setCoverImageUrl(data.secure_url);
        alert("Image uploaded successfully!");
      } else {
        throw new Error("No secure URL in response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const file = e.target.files[0];

    // Validate file type
    if (!ACCEPTED_AUDIO_TYPES.includes(file.type)) {
      alert("Please select a valid audio file (MP3 or WAV).");
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_AUDIO_SIZE) {
      alert("Audio file size must be less than 100MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CloudinaryUploadPreset2);

    setAudioLoading(true);

    try {
      const response = await fetch(CloudinaryUrl1, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.secure_url) {
        setAudioUrl(data.secure_url);

        // Extract duration using the HTMLAudioElement
        const audio = new Audio();
        audio.src = data.secure_url;
        audio.addEventListener("loadedmetadata", () => {
          setAudioDuration(audio.duration);
          alert(
            `Audio uploaded successfully! Duration: ${audio.duration.toFixed(
              2
            )} seconds`
          );
        });
      } else {
        throw new Error("No secure URL in response");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Error uploading audio. Please try again.");
    } finally {
      setAudioLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PodcastSchemaType>({
    resolver: zodResolver(podcastSchema),
  });

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags, setValue]);

  const onSubmit: SubmitHandler<PodcastSchemaType> = (data) => {
    // Validate that files were uploaded
    if (!coverImageUrl) {
      alert("Please upload a cover image");
      return;
    }

    if (!audioUrl) {
      alert("Please upload an audio file");
      return;
    }
    if (!audioDuration) {
      alert("Unable to retrieve audio duration. Please try again.");
      return;
    }

    // Create the complete form data
    const formDataWithFiles = {
      id: "",
      title: data.title,
      description: data.description,
      tags: data.tags,
      coverImage: coverImageUrl,
      audio: audioUrl,
      duration: audioDuration,
      authorId: authorId,
      createdAt: new Date(),
    };

    dispatch(addPodcast(formDataWithFiles));
    // Handle your form submission here
  };

  // Rest of the component remains the same...
  const filteredTags = predefinedTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleInputFocus = () => {
    setShowTags(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-96 mx-8 m-2 rounded-md p-2 focus:outline-none dark:bg-dark-background"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 mx-8 mt-1 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="relative mb-4">
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-96 mx-8 m-2 rounded-md p-2 focus:outline-none dark:bg-dark-background"
          />
          {errors.description && (
            <p className="text-red-500 mx-8 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div ref={inputRef}>
          <input
            type="text"
            placeholder="Search tags..."
            onFocus={handleInputFocus}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 mx-8 m-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-dark-background dark:text-dark-text"
          />
          {showTags && (
            <div className="max-h-40 w-96 mx-8 m-2 overflow-y-auto border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`m-1 px-4 py-2 rounded-md cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-light-button text-light-background dark:bg-dark-button dark:text-dark-text"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          <div className="mt-4">
            {selectedTags.length > 0 && (
              <p className="mx-8 m-2">Selected Tags:</p>
            )}
            <div className="flex flex-wrap mx-8 m-2">
              {selectedTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-light-button text-light-background dark:bg-dark-button dark:text-dark-text px-2 py-1 m-1 rounded-md"
                >
                  <span className="mr-2">{tag}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleTagClick(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="coverImage"
            className="mx-8 p-2 block dark:text-dark-text"
          >
            Upload Cover Image
          </label>
          <input
            onChange={handleCoverImageChange}
            type="file"
            accept="image/*"
            className="mx-8 m-2 block w-64 text-sm border border-light-button text-light-button dark:border-dark-button dark:text-dark-button file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-light-button file:text-light-background hover:file:bg-light-hover hover:file:text-light-background dark:file:bg-dark-button dark:file:text-dark-text dark:hover:file:bg-dark-hover2 dark:hover:file:text-dark-text rounded-lg focus:outline-none"
          />

          {loading && <p className="mx-8 mt-1 text-sm">Uploading image...</p>}
        </div>

        <div className="relative mb-4">
          <label htmlFor="audio" className="mx-8 p-2 block dark:text-dark-text">
            Upload Audio
          </label>
          <input
            onChange={handleAudioChange}
            type="file"
            accept="audio/*"
            className="mx-8 m-2 block w-64 text-sm border border-light-button text-light-button dark:border-dark-button dark:text-dark-button file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-light-button file:text-light-background hover:file:bg-light-hover hover:file:text-light-background dark:file:bg-dark-button dark:file:text-dark-text dark:hover:file:bg-dark-hover2 dark:hover:file:text-dark-text rounded-lg focus:outline-none"
          />

          {audioLoading && (
            <p className="mx-8 mt-1 text-sm">Uploading audio...</p>
          )}
        </div>

        {/* <div className="relative mb-4">
          <input
            {...register("duration")}
            type="text"
            placeholder="Duration (in seconds)"
            className="w-96 mx-8 m-2 rounded-md p-2 focus:outline-none dark:bg-dark-background"
          />
          {errors.duration && (
            <p className="text-red-500 mx-8 mt-1 text-sm">
              {errors.duration.message}
            </p>
          )}
        </div> */}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="p-2 mx-8 m-2 text-xl font-bold rounded-md border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload Podcast"}
        </button>
      </div>
    </div>
  );
};

export default AddPodcastForm;
