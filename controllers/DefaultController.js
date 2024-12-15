const path = require('path');

const landing = (req, res) => {
    const filePath = path.join(__dirname, '../index.html'); // Chemin vers le fichier HTML
    res.status(200).sendFile(filePath);
};

module.exports = { landing }