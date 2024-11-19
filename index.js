const express = require('express');
const { connectDB } = require('./config/db_config');
const app = express();

// Connexion à la base de données
try {
    connectDB();
} catch (error) {
    throw new Error(error);
}

app.use(express.static('public'));

//Ajouter le middleware 'body-parser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisation des routes définies dans routes/router.js
app.use('/api/school', require('./routes/router'));
app.listen(3999, () => {
    console.log("🚀🚀 Lancement avec succès du serveur");
});


module.exports = app