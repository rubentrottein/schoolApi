const mongoose = require('mongoose');
const { connectDB } = require('./config/db_config');
const Article = require('./models/Article.js');

describe('MongoDB Connection and Server Startup', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('devrait se connecter à MongoDB', async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1); // Connecté
  });

  test('devrait lancer une erreur en cas de connexion MongoDB échouée', async () => {
    jest.spyOn(mongoose, 'connect').mockImplementationOnce(() => {
      throw new Error("Échec de connexion à MongoDB");
    });
    await expect(connectDB()).rejects.toThrow("Échec de connexion à MongoDB");
  });
});

