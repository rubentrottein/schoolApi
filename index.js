const express = require('express');
const { connectDB } = require('./config/db_config');
const app = express();
const path = require('path');

// Connexion à la base de données
connectDB()
    .then(() => {
        console.log("📦 Connexion DB réussie");
        // Ajoutez une route de test DB
        app.get('/test-db', async (req, res) => {
            try {
                // Remplacez par votre modèle réel
                const count = await YourModel.countDocuments();
                res.json({ status: 'DB Connected', documents: count });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    })
    .catch(error => {
        console.error("❌ Erreur connexion DB:", error);
        // Ajoutez une route pour voir l'erreur
        app.get('/db-status', (req, res) => {
            res.status(500).json({ error: error.message });
        });
    });

app.use(express.static('public'));

// Middleware pour le debug en production
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Ajouter le middleware 'body-parser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/test', (req, res) => {
    res.json({ status: 'API is running' });
});


// Servir les fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));

// Utilisation des routes définies dans routes/router.js
app.use('/api/school', require('./routes/router'));



if (process.env.NODE_ENV !== 'production') {
    app.listen(3999, () => {
        console.log("🚀🚀 Lancement avec succès du serveur");
    });
}

module.exports = app;