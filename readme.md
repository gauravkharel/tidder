## Tidder - Twitter Clone with Next.js
Tidder is a Twitter clone built using Next.js with a modern tech stack, including Tailwind CSS, React Query, PostgreSQL, Prisma ORM, and NextAuth for Google login. The application provides features such as post creation, editing, and deletion, lazy loading, and real-time updates using Redis for an enhanced user experience.

### Getting Started

1. Clone the Repository:
    ```
    git clone https://github.com/gauravkharel/tidder.git
    cd tidder
    ```
2. Install Dependencies:
    ```
    Copy code
    npm install
    ```
3. Set Up Environment Variables:

    Create a .env.local file in the root directory and configure the following variables:
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/tidder"
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    REDIS_URL="redis://localhost:6379"
    REDIS_SECRET=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=

    ```
    Replace placeholders with your actual values.

4. Run the Application:
    ```
    npm run dev
    ```
    Open http://localhost:3000 in your browser.

### Scripts
- 'npm run dev': Run the development server.
- 'npm run build': Build the production-ready application.
- 'npm start': Start the production server.
- 'npm run lint': Run linting checks.
- 'npm run postinstall': Generate Prisma client.

### Features
- Authentication: Utilizes NextAuth for secure Google login.
- Editor: Includes a powerful editor supporting various content types for creating and editing posts.
- Real-time Updates: Implements Redis for real-time updates, ensuring an almost instant response to likes and dislikes.
- Lazy Loading: Enhances performance with lazy loading for efficient content rendering.
- Tailwind CSS: Utilizes Tailwind CSS for a highly customizable and responsive UI.

### Tech Stack
- Next.js
- Tailwind CSS
- React Query
- PostgreSQL
- Prisma ORM
- NextAuth
- Redis

### Dependencies
View the package.json file for an extensive list of dependencies used in the project.

