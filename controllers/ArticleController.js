const article = require("../models/Article");
const mongoose = require('mongoose');

/** Opérations sur tous les articles */
const getAllArticles = async ( req, res ) =>{
    try {
        const articleList = await article.find()
        res.json( articleList )
    } catch (error) {
        res.json( { message: 'Error fetching Articles', error } )
    }
}

/** Opérations sur un seul article **/
const getArticleById = async (req, res) => {
    try {
        console.log("ID brut reçu :", req.params.id); // ID brut reçu dans l'URL

        // Vérifier si l'ID est valide avant de procéder
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid article ID format' });
        }

        const articleId = new mongoose.Types.ObjectId(req.params.id);
       
        const currentArticle = await article.findById(articleId);
        if (!currentArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(currentArticle);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error); // Log l'erreur complète
        res.status(500).json({ message: 'Error fetching Article', error });
    }
};
const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id; // ID de l'article passé dans les paramètres de l'URL
        const deletedArticle = await article.findByIdAndDelete(articleId);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        res.json({ message: 'Article supprimé avec succès', article: deletedArticle });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'article', error });
    }
};


const createArticle = async (req, res) =>{
    try {
        const newArticle = new article({
            title: req.body.title,
            author: req.body.author,
            image: req.body.image,
            alt: req.body.alt,
            intro: req.body.intro,
            content: req.body.content,
            category: req.body.category,
            chapters: req.body.chapters,
            chaptersTitles: req.body.chaptersTitles,
            chaptersContent: req.body.chaptersContent
        });
    
        await newArticle.save();
        
        res.json({ "message": "Nouvel article créé", "summary": { id: newArticle._id, title: newArticle.title } });
    } catch (error) {
        res.json({ "message": "Erreur dans la création d'un article", "error": error });
    }
}

const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id; // Récupération de l'ID depuis les paramètres
        const updateData = req.body; // Données envoyées dans le corps de la requête

        // Vérifier si l'article existe
        const originalArticle = await article.findById(articleId);
        if (!originalArticle) {
            return res.status(404).json({ error: "Article non trouvé." });
        }

        // Mettre à jour uniquement les champs valides et non vides
        Object.keys(updateData).forEach((key) => {
            const value = updateData[key];
            if (value !== undefined && value !== "") {
                originalArticle[key] = value; // Mise à jour des champs spécifiques
            }
        });

        // Sauvegarder les modifications
        const updatedArticle = await originalArticle.save();

        // Répondre avec l'article mis à jour
        res.status(200).json({
            message: "Article mis à jour avec succès.",
            article: updatedArticle,
        });
    } catch (error) {
        res.status(500).json({
            error: "Une erreur est survenue lors de la mise à jour.",
            details: error.message,
        });
    }
};

module.exports = { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle }