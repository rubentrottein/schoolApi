const { createArticle, getArticleById } = require('./ArticleController');
const Article = require('../models/Article');
const mongoose = require('mongoose');

jest.mock('../models/Article'); // Mock the entire module

describe('createArticle', () => {
    it('should create a new article when title is provided', async () => {
        const articleData = { 
            "title": "Article chapitré",
            "author": "API",
            "createdAt": Date.now(),
            "image": "https://picsum.photos/id/138/1980/1280",
            "alt": "Photo d'illustration principale (poster de la vidéo)",
            "intro": "Cet article nous aide a tester les nouvelles entités Articles via l'API. C'est le 3ème. Il est désormais persistant sur la base mongoDB",
            "content": "<h2>Mise en place de l'affichage des articles</h2><p>Nous avons terminé la mise en place de l'affichage des articles. Jusqu'ici les données brutes étaient affichées dans la page test, et la page article ne pouvait garder qu'une partie des infos.</p><p>Tout semble OK, y compris le create (en requête) la prochaine étape sera la création d'article avec le wysiwyg</p><h2>Mise en place de l'ajout incrémental</h2><p>Nos articles sont constitués de chapitres, et nous allons permettre un affichage dynamique qui permettra de ségmenter les articles en leçons</p><p>Cet article nous aide a tester <ul><li>la requêtes API create au jour du 8 novembre 2024.</li><li>Le travail d'affichage par chapitre dans le template d'articles.</li><li>La mise en place de l'eventListener pour faire apparaître le texte par chapitre (front end JS)</li><li>Il est désormais persistant sur la base mongoDB</li></ul></p>",
            "category": "Developpement Front-end",
            "chapters": 3,
            "chaptersTitles" : [
                "Affichage des articles",
                "Ajout incrémental",
                "Résumé"
            ],
            "chaptersContent" : [
                "<p>Nous avons terminé la mise en place de l'affichage des articles. Jusqu'ici les données brutes étaient affichées dans la page test, et la page article ne pouvait garder qu'une partie des infos.</p><p>Tout semble OK, y compris le create (en requête) la prochaine étape sera la création d'article avec le wysiwyg</p>",
                "<p>Nos articles sont constitués de chapitres, et nous allons permettre un affichage dynamique qui permettra de ségmenter les articles en leçons</p>",
                "<p>Cet article nous aide a tester <ul><li>la requêtes API create au jour du 8 novembre 2024.</li><li>Le travail d'affichage par chapitre dans le template d'articles.</li><li>La mise en place de l'eventListener pour faire apparaître le texte par chapitre (front end JS)</li><li>Il est désormais persistant sur la base mongoDB</li></ul></p>"
            ]
        } 
        const req = { body: articleData };
        const res = { json: jest.fn() };

        // Mock Article constructor to return an object with a save function
        const saveMock = jest.fn().mockResolvedValue(articleData);
        Article.mockImplementation(() => ({
            save: saveMock
        }));

        await createArticle(req, res);

        expect(Article).toHaveBeenCalledTimes(1);
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ 
            message: "Nouvel article créé", 
            summary: expect.any(Object) 
        });

        // Verify if the object returned by save() has the correct properties
        const createdArticle = await saveMock.mock.results[0].value;
        expect(createdArticle).toMatchObject(articleData);
    });
});

describe('getArticleById', () => {
    // Retrieves an article successfully when a valid ID is provided
    it('should return the article when a valid ID is provided', async () => {
        const req = { params: { id: '672e3ef7e8e85397b5d435e7' } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };
        const article = { title: 'Test Article', content: 'Test Content' };
        jest.spyOn(Article, 'findById').mockResolvedValue(article);
    
        await getArticleById(req, res);
    
        expect(Article.findById).toHaveBeenCalledWith(new mongoose.Types.ObjectId(req.params.id));
        expect(res.json).toHaveBeenCalledWith(article);
    });

    // Handles invalid article ID format gracefully
    it('should return 400 status when the ID format is invalid', async () => {
        const req = { params: { id: 'invalid-id' } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    
        await getArticleById(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid article ID format' });
    });
});
