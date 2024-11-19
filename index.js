const express = require('express');
const { connectDB } = require('./config/db_config');
const app = express();

// Connexion à la base de données
connectDB()
    .then(() => console.log("📦 Connexion DB réussie"))
    .catch(error => console.error("❌ Erreur connexion DB:", error));

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

// Utilisation des routes définies dans routes/router.js
app.use('/api/school', require('./routes/router'));

if (process.env.NODE_ENV !== 'production') {
    app.listen(3999, () => {
        console.log("🚀🚀 Lancement avec succès du serveur");
    });
}

module.exports = app;