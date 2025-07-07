### 🛠️ How to Set Up

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root folder and add:

   ```
   MONGODB_URI=<your-mongo-uri>
   AUTH0_AUDIENCE=<your-auth0-api-identifier>
   AUTH0_DOMAIN=<your-auth0-domain>
   PORT=4000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Test the GraphQL endpoint with curl**
   Replace `<your-access-token>` with a valid Auth0 access token:

   ```bash
   curl -X POST http://localhost:4000/graphql \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your-access-token>" \
     -d '{"query":"{ getCurrentUser { id name email } }"}'
   -----------------------
   for example 
   C:\Users\xyz>curl -X POST http://localhost:4000/graphql-secure -H "Authorization: Bearer ...................z0b-5fHzA.........." -H "Content-Type: application/json" --data "{\"query\": \"{ getProfile { id firstName } }\"}"
```


