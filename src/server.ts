import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { authMiddleware } from "./middleware/authMiddleware";
import { graphqlUploadExpress } from "graphql-upload";
import { schema } from "./graphql/schema";
import cors from "cors";

const PORT = config.PORT || 4000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Initialize Express app
    const app = express();

    // Enable file uploads (for avatar)
    app.use(graphqlUploadExpress({ maxFileSize: 5_000_000, maxFiles: 1 }));

    // Protect /graphql with Auth0
    // app.use("/graphql", authMiddleware);
    app.use("/graphql-secure", authMiddleware);

    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({
        user: req.user?.sub ? { id: req.user.sub } : null,
      }),
    });

    // Add this before applying middleware:
    app.use(
      cors({
        origin: "https://studio.apollographql.com",
        credentials: true,
      })
    );

    await server.start();
    server.applyMiddleware({ app, path: "/graphql-secure" });

    // server.applyMiddleware({ app });

    // Start the server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
      logger.info(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
