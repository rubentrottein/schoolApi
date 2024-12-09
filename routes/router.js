const { getAllArticles, createArticle, getArticleById, deleteArticle } = require("../controllers/ArticleController")
const { uploadMedia } = require("../controllers/MediaController")
const router = require("express").Router()

//General
router.get("/articles", getAllArticles)
router.get("/article/:id", getArticleById)
router.post("/articles/add", createArticle)
//router.post("/upload", uploadMedia)
router.delete("/articles/delete/:id", deleteArticle)

module.exports = router