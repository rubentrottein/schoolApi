# schoolApi

# 🚀 Get started here
This template guides you through CRUD operations (GET, POST, PUT, DELETE), variables, and tests.

------
# 🔖 How to use this template
- Step 1: Send requests
RESTful APIs allow you to perform CRUD operations using the POST, GET, PUT, and DELETE HTTP methods.

This collection contains each of these request types. Open each request and click "Send" to see what happens.

- Step 2: View responses
Observe the response tab for status code (200 OK), response time, and size.

- Step 3: Send new Body data
Update or add new data in "Body" in the POST request. Typically, Body data is also used in PUT request.

    Plain Text
    {
        "name": "Add your name in the body"
    }

- Step 4: Update the variable
Variables enable you to store and reuse values in Postman. We have created a variable called base_url with the sample request [https://postman-api-learner.glitch.me](https://postman-api-learner.glitch.me). Replace it with your API endpoint to customize this collection.

- Step 5: Add tests in the "Scripts" tab
Adding tests to your requests can help you confirm that your API is working as expected. You can write test scripts in JavaScript and view the output in the "Test Results" tab.


------
## 💪 Pro tips
Use folders to group related requests and organize the collection.
Add more scripts to verify if the API works as expected and execute workflows.

# Endpoints

## GET
### GetAllArticle
> http://localhost:3999/api/school/articles

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.

------

## GET
### GetOneArticle
> http://localhost:3999/api/school/articles/get

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.


### Body
raw (json)
json
    {
        "_id": "667d50562ed86d010266c3c0"
    }

# POST
Post data
> http://localhost:3999/api/school/articles/add

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.

A successful POST request typically returns a 200 OK or 201 Created response code.


### Body
raw (json)

json
    {
        "title": "Article chapitré",
        "image": "https://picsum.photos/id/138/1980/1280",
        "alt": "Photo d'illustration principale (poster de la vidéo)",
        "intro": "Cet article nous aide a tester les nouvelles entités Articles via l'API. C'est le 3ème. Il est désormais persistant sur la base mongoDB",
        "content": "<i>Contenu HTML de l'article</i><h2>Mise en place de l'affichage des articles</h2><p>Nous avons terminé la mise en place de l'affichage des articles. Jusqu'ici les données brutes étaient affichées dans la page test, et la page article ne pouvait garder qu'une partie des infos.</p><p>Tout semble OK, y compris le create (en requête) la prochaine étape sera la création d'article avec le wysiwyg</p><h2>Mise en place de l'ajout incrémental</h2><p>Nos articles sont constitués de chapitres, et nous allons permettre un affichage dynamique qui permettra de ségmenter les articles en leçons</p><p>Cet article nous aide a tester <ul><li>la requêtes API create au jour du 8 novembre 2024.</li><li>Le travail d'affichage par chapitre dans le template d'articles.</li><li>La mise en place de l'eventListener pour faire apparaître le texte par chapitre (front end JS)</li><li>Il est désormais persistant sur la base mongoDB</li></ul></p>",
        "category": "Developpement Front-end",
        "chapters": 3,
        "chaptersTitles" : [
            "Affichage des articles",
            "Ajout incrémental",
            "Résumé"
        ],
        "chaptersContent" : [
            "<i>ContenuHTML du chapitre 1</i><p>Nous avons terminé la mise en place de l'affichage des articles. Jusqu'ici les données brutes étaient affichées dans la page test, et la page article ne pouvait garder qu'une partie des infos.</p><p>Tout semble OK, y compris le create (en requête) la prochaine étape sera la création d'article avec le wysiwyg</p>",
            "<i>ContenuHTML du chapitre 2</i><p>Nos articles sont constitués de chapitres, et nous allons permettre un affichage dynamique qui permettra de ségmenter les articles en leçons</p>",
            "<i>ContenuHTML du chapitre 3</i><p>Cet article nous aide a tester <ul><li>la requêtes API create au jour du 8 novembre 2024.</li><li>Le travail d'affichage par chapitre dans le template d'articles.</li><li>La mise en place de l'eventListener pour faire apparaître le texte par chapitre (front end JS)</li><li>Il est désormais persistant sur la base mongoDB</li></ul></p>"
        ]
    }

------
## PUT
Update data
> https://postman-rest-api-learner.glitch.me//info?id=1

This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).

A successful PUT request typically returns a 200 OK, 201 Created, or 204 No Content response code.

------
Query Params
    id
    1
Body
raw (json)
json
    {
        "name": "Add your name in the body"
    }


## DELETE
Delete data
> http://localhost:3999/api/school/articles/delete/66d4b6bdfce350cc81f906a2

This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).

A successful DELETE request typically returns a 200 OK, 202 Accepted, or 204 No Content response code.

------

Body
raw (json)
json
    {
        "_id": "66d4b6bdfce350cc81f906a2"
    }