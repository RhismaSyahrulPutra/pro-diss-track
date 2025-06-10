<h1 align="center">Pro Diss Track</h1>

Di Indonesia, terdapat sekitar 2 juta penyandang disabilitas rungu wicara, menurut data Kementerian Sosial Republik Indonesia. Mereka merupakan bagian signifikan dari masyarakat yang membutuhkan komunikasi inklusif. Namun, media pembelajaran bahasa isyarat untuk orang normal yang ingin belajar berkomunikasi dengan mereka masih sangat terbatas. Kurangnya akses terhadap platform edukatif yang mudah dipahami dan interaktif menyebabkan kesenjangan komunikasi dan menjadi hambatan dalam mendorong inklusi sosial antara masyarakat umum dan penyandang disabilitas rungu wicara.

**Tujuan Proyek:**

*   Mengembangkan platform pembelajaran bahasa isyarat berbasis web yang interaktif, mudah diakses, dan inklusif.
*   Meningkatkan pemahaman visual bahasa isyarat dengan penerapan teknologi Machine Learning seperti CNN.
*   Melakukan pengumpulan data bahasa isyarat dan pelatihan model machine learning yang akurat.
*   Melakukan integrasi Frontend dan Backend dengan Machine Learning dengan Tensorflow.js.
*   Mendukung komunikasi inklusif antara penyandang disabilitas rungu wicara dan masyarakat luas dengan teknologi ramah pengguna.

<h2>HOW TO USE</h2>

### Cloning the Repository

To get a local copy of this project on your machine, follow these steps:

1.  **Open your terminal or command prompt.**

2.  **Navigate to the directory where you want to store the project.**  For example:

    ```bash
    cd Documents/Projects
    ```

3.  **Clone the repository using the `git clone` command:**

    ```bash
    git clone <repository_url>
    ```

    Replace `<repository_url>` with the actual URL of the repository you want to clone. You can find this URL on the repository's page (usually a green "Code" button).  It will look something like this:

    ```
    git clone https://github.com/your-username/your-repository.git
    ```

4.  **The repository will be downloaded to your local machine.**  A new directory with the same name as the repository will be created in the directory you specified.

5.  **Navigate into the newly created directory:**

    ```bash
    cd your-repository
    ```

    Replace `your-repository` with the actual name of the repository you cloned.

You now have a local copy of the project and can start working on it!

### Frontend Setup Instructions

Follow these steps to get the frontend application up and running:

1.  **Install Dependencies:**

    Open your terminal, navigate to the `frontend` directory (or the root directory if the instructions are for the root), and run the following command to install all necessary dependencies:

    ```bash
    npm install
    ```

2.  **Configure Environment Variables:**

    Create a `.env` file in the root directory of the project (if it doesn't already exist). Add the following variables to the `.env` file, replacing the placeholders with the appropriate values for your backend setup:

    ```
    VITE_BACKEND_HOST=<your_backend_host>
    VITE_BACKEND_PORT=<your_backend_port>
    ```

    *   `VITE_BACKEND_HOST`:  The hostname or IP address where your backend server is running (e.g., `localhost`, `192.168.1.100`, or a domain name).
    *   `VITE_BACKEND_PORT`: The port number on which your backend server is listening (e.g., `3000`, `8080`).

3.  **Run the Development Server:**

    Start the development server using the following command:

    ```bash
    npm run dev
    ```

    This will typically start the application in your browser at a URL like `http://localhost:5173` (the exact URL will be displayed in your terminal output).

4.  **Code Formatting and Linting:**

    To ensure consistent code style and catch potential errors, use the following commands to format and lint your code after making changes:

    ```bash
    npm run format
    npm run lint
    ```

    These commands will automatically format your code according to the project's style guidelines and identify any linting issues.  Make sure to address any linting errors before committing your changes.
    
### Backend Setup Instructions

Follow these steps to set up and run the backend application:

1.  **Install Dependencies:**

    Open your terminal, navigate to the `backend` directory, and run the following command to install all necessary dependencies:

    ```bash
    npm install
    ```

2.  **Configure Environment Variables:**

    Create a `.env` file in the root directory of the `backend` folder (if it doesn't already exist). Add the following variables to the `.env` file, replacing the placeholders with the appropriate values for your environment:

    ```
    # Server configuration
    HOST=<your_host_address>
    PORT=<your_port_number>
    APP_HOST=<your_app_host>

    # PostgreSQL configuration
    PGUSER=<your_postgres_user>
    PGHOST=<your_postgres_host>
    PGPASSWORD=<your_postgres_password>
    PGDATABASE=<your_postgres_database>
    PGPORT=<your_postgres_port>

    # JWT keys and settings
    ACCESS_TOKEN_KEY=<your_access_token_key>
    REFRESH_TOKEN_KEY=<your_refresh_token_key>
    ACCESS_TOKEN_AGE=<access_token_expiration_time> # e.g., 1h, 1d, 30m

    # RabbitMQ configuration
    RABBITMQ_SERVER=amqp://<your_rabbitmq_server>

    # Redis configuration
    REDIS_SERVER=<your_redis_server>
    REDIS_PORT=<your_redis_port>
    ```

    **Explanation of Variables:**

    *   **Server Configuration:**
        *   `HOST`: The hostname or IP address the server will listen on (e.g., `localhost`, `0.0.0.0`).
        *   `PORT`: The port number the server will listen on (e.g., `3000`, `8080`).
        *   `APP_HOST`: The host where the application is accessible (e.g., `http://localhost:3000`).

    *   **PostgreSQL Configuration:**
        *   `PGUSER`: The PostgreSQL username.
        *   `PGHOST`: The PostgreSQL host address.
        *   `PGPASSWORD`: The PostgreSQL password.
        *   `PGDATABASE`: The PostgreSQL database name.
        *   `PGPORT`: The PostgreSQL port number.

    *   **JWT (JSON Web Token) Configuration:**
        *   `ACCESS_TOKEN_KEY`: A secret key used to sign access tokens.  **Important: Keep this secret!**
        *   `REFRESH_TOKEN_KEY`: A secret key used to sign refresh tokens. **Important: Keep this secret!**
        *   `ACCESS_TOKEN_AGE`: The expiration time for access tokens (e.g., `1h` for 1 hour, `1d` for 1 day, `30m` for 30 minutes).

    *   **RabbitMQ Configuration:**
        *   `RABBITMQ_SERVER`: The connection string for your RabbitMQ server (e.g., `amqp://user:password@localhost`).

    *   **Redis Configuration:**
        *   `REDIS_SERVER`: The Redis server address (e.g., `localhost`).
        *   `REDIS_PORT`: The Redis port number (e.g., `6379`).

3.  **Run Database Migrations (UP):**

    Apply database migrations to set up the database schema:

    ```bash
    npm run migrate up
    ```

4.  **Start the Server:**

    Start the backend server:

    ```bash
    npm start
    ```

5.  **Run Database Migrations (DOWN) - For Development/Cleanup:**

    If you need to undo the migrations (e.g., for development or to reset the database), you can run the migrations down:

    ```bash
    npm run migrate down
    ```

    **Warning:** Running `migrate down` will remove tables and data from your database. Use with caution!
6.  **Code Formatting and Linting:**

    To ensure consistent code style and catch potential errors, use the following commands to format and lint your code after making changes:

    ```bash
    npm run format
    npm run lint
    ```

    These commands will automatically format your code according to the project's style guidelines and identify any linting issues.  Make sure to address any linting errors before committing your changes.

### Backend Setup Instructions:

