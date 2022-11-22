import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

const getDatabase = async () => {
  if (!DATABASE_URL)
    throw new Error(
      "Impossible de se connecter à la base de données : l'URL n'est pas configurée"
    );

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return mongoose;
  }

  try {
    // Use new db connection
    return await mongoose.connect(DATABASE_URL);
  } catch (err) {
    console.error(`Failed to connect to database`);
    throw err;
  }
};

export default getDatabase;
