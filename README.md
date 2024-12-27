# MadDev Blog Application

## Overview

MadDev is a podcast application that allows users to create, manage, and listen to podcasts. This README provides an overview of the project structure, setup instructions, and usage guidelines.

## Project Structure

```
MadDev/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   │   └── Toolbar.tsx
│   │   ├── Protected.tsx
│   │   ├── Tabs.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ...
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CreatePostPage.tsx
│   │   ├── CreatePodcastsPage.tsx
│   │   ├── DiscoverPage.tsx
│   │   ├── FollowedPage.tsx
│   │   ├── HelpPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotificationPage.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── PodcastPage.tsx
│   │   ├── PostPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SavePostPage.tsx
│   │   ├── SubscriptionPage.tsx
│   │   ├── SuccessPage.tsx
│   │   └── ...
│   ├── routes/
│   │   └── routes.tsx
│   ├── utils/
│   │   └── firebase.ts
│   ├── validation/
│   │   └── podcastSchema.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── public/
│   ├── favicon.svg
│   └── ...
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── ...
```

### Key Files

- `src/validation/podcastSchema.ts`: Defines the schema for podcast validation using Zod.
- `src/utils/firebase.ts`: Initializes Firebase and exports authentication and Firestore instances.
- `src/routes/routes.tsx`: Defines the routes for the application.
- `src/pages/SubscriptionPage.tsx`: Handles the subscription logic and UI.
- `src/components/Editor/Toolbar.tsx`: Contains the toolbar for the text editor.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/MadDev.git
    cd MadDev
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing project.
3. Add a new web app to your project.
4. Copy the Firebase configuration and add it to your `.env` file as shown above.

### Running the Application

To start the development server:
```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Firebase Integration

Firebase is initialized in `src/utils/firebase.ts`. The following instances are exported:
- `auth`: Firebase authentication instance.
- `provider`: Google authentication provider.
- `db`: Firestore database instance.

## Contributing

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [Brackets](mailto:bracketsltd123@gmail.com).

