const ARTICLE = require("../models/Article");
const mongoose = require('mongoose');


const getAllArticles = async ( req, res ) =>{
    try {
        const article = await ARTICLE.find()
        res.json( article )
    } catch (error) {
        res.json( { message: 'Error fetching Articles', error } )
    }
}
const getArticleById = async (req, res) => {
    try {
        console.log("ID brut reçu :", req.params.id); // ID brut reçu dans l'URL

        // Vérifier si l'ID est valide avant de procéder
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid article ID format' });
        }

        const articleId = new mongoose.Types.ObjectId(req.params.id);
       
        const article = await ARTICLE.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(article);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error); // Log l'erreur complète
        res.status(500).json({ message: 'Error fetching Article', error });
    }
};
const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id; // ID de l'article passé dans les paramètres de l'URL
        const deletedArticle = await ARTICLE.findByIdAndDelete(articleId);

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
        const newArticle = new ARTICLE({
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
        
        res.json({ "message": "Nouvel article créé", "summary": { text: newArticle.title } });
    } catch (error) {
        res.json({ "message": "Erreur dans la création d'un article", "error": error });
    }    
}


module.exports = { getAllArticles, createArticle, getArticleById, deleteArticle }