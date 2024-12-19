import { useState, useRef, useEffect } from "react";
import Editor from "../components/Editor/Editor";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addBlogPost } from "../store/posts/postThunks";
import { useGetPostDataFromLocalStorage } from "../utils/postCombine";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
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
  const navigate = useNavigate();
  const CloudinaryUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const CloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET1;
  const savedData = JSON.parse(localStorage.getItem("editPageData") || "{}");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    savedData.tags || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [title, setTitle] = useState(savedData.title || "");
  const [coverImage, setCoverImage] = useState<File | null>(
    savedData.coverImage || null
  );
  const inputRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CloudinaryUploadPreset);
      setIsLoading(true);
      try {
        const response = await fetch(
          CloudinaryUrl, // Replace with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.secure_url) {
          setCoverImage(data.secure_url);
          alert("Image uploaded successfully!");
        } else {
          alert("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    }
  };
  const postData = useGetPostDataFromLocalStorage();

  const handleFormSubmit = async () => {
    if (postData) {
      await dispatch(addBlogPost(postData));
      localStorage.removeItem("editPageData");
      localStorage.removeItem("editorContent");
      localStorage.removeItem("blogPosts");
      navigate("/");
    } else {
      alert("Failed to retrieve post data from localStorage.");
    }
  };
  // Save data to localStorage when inputs change
  useEffect(() => {
    const data = {
      title,
      tags: selectedTags,
      coverImage, // Save the full URL instead of name
    };
    localStorage.setItem("editPageData", JSON.stringify(data));
  }, [title, selectedTags, coverImage]); // Re-run when these states change

  // Initial Load from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("editPageData") || "{}");
    if (savedData) {
      setTitle(savedData.title || "");
      setSelectedTags(savedData.tags || []);
      setCoverImage(savedData.coverImage); // Load the URL directly
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="mx-8 m-2 rounded-md p-2 focus:outline-none dark:bg-dark-background"
        />
        <div className="mx-8 m-2" ref={inputRef}>
          <p className="mb-2">Search and select up to 3 tags:</p>
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-dark-background dark:text-dark-text"
          />
          {showTags && (
            <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
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
            <p>Selected Tags:</p>
            <div className="flex flex-wrap mt-2">
              {selectedTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-light-button text-light-background dark:bg-dark-button dark:text-dark-text px-2 py-1 m-1 rounded-md"
                >
                  <span className="mr-2">{tag}</span>
                  <button
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
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="mx-8 m-2 block w-64 text-sm border border-light-button text-light-button dark:border-dark-button dark:text-dark-button file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-light-button file:text-light-background hover:file:bg-light-hover hover:file:text-light-background dark:file:bg-dark-button dark:file:text-dark-text dark:hover:file:bg-dark-hover2 dark:hover:file:text-dark-text rounded-lg focus:outline-none"
        />
        {isLoading && (
          <div className="spinner mx-8">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#818cf8"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
      <Editor />
      <div className="mx-8 m-2 flex justify-end">
        <button
          onClick={handleFormSubmit}
          className="p-2 mb-10 px-4 text-xl font-bold rounded-md  md:flex border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditPage;
