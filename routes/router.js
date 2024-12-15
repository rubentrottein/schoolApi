const { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle } = require("../controllers/ArticleController")
const { landing } = require("../controllers/DefaultController")
const { uploadMedia } = require("../controllers/MediaController")
const router = require("express").Router()

//General
router.get("/home", landing)
router.get("/articles", getAllArticles)
router.get("/article/:id", getArticleById)
router.post("/articles/add", createArticle)
router.post("/upload", uploadMedia)
router.put("/article/update/:id", updateArticle)
router.delete("/article/delete/:id", deleteArticle)

module.exports = router