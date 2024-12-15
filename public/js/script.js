const API_BASE_URL = 'https://school-api-omega.vercel.app/api/school/'; // Remplacez par l'URL de votre API

async function getAllArticles() {
    try {
        const response = await fetch(`${API_BASE_URL}/articles`);
        const data = await response.json();
        document.getElementById('all-articles-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('all-articles-output').textContent = `Erreur : ${error.message}`;
    }
}

async function getArticleById() {
    const articleId = document.getElementById('get-article-id').value;
    try {
        const response = await fetch(`${API_BASE_URL}/article/${articleId}`);
        const data = await response.json();
        document.getElementById('article-by-id-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('article-by-id-output').textContent = `Erreur : ${error.message}`;
    }
}

async function createArticle(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('create-article-form'));
    const articleData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE_URL}/articles/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleData)
        });
        const data = await response.json();
        document.getElementById('create-article-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('create-article-output').textContent = `Erreur : ${error.message}`;
    }
}

async function deleteArticle() {
    const articleId = document.getElementById('delete-article-id').value;
    try {
        const response = await fetch(`${API_BASE_URL}/article/delete/${articleId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        document.getElementById('delete-article-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('delete-article-output').textContent = `Erreur : ${error.message}`;
    }
}

async function updateArticle(event) {
    event.preventDefault();
    const articleId = document.getElementById('update-article-id').value;
    const formData = new FormData(document.getElementById('update-article-form'));
    const articleData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE_URL}/article/update/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleData)
        });
        const data = await response.json();
        document.getElementById('update-article-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('update-article-output').textContent = `Erreur : ${error.message}`;
    }
}

async function testUpload() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Test en cours...';
    
    try {
        const formData = new FormData();
        const fileInput = document.getElementById('fileInput');
        formData.append('image', fileInput.files[0]);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Résultat complet:', result);
        
        if (response.ok) {
            resultDiv.innerHTML = 'Succès: ' + JSON.stringify(result);
        } else {
            resultDiv.innerHTML = 'Erreur: ' + JSON.stringify(result);
        }
    } catch (error) {
        console.error('Erreur:', error);
        resultDiv.innerHTML = 'Erreur: ' + error.message;
    }
}

document.querySelector("#darkMode").addEventListener("click", darkMode)
function darkMode(){
    document.querySelector("body").classList.toggle("darkMode");
    document.querySelector("main").classList.toggle("darkMode");
    console.log(document.querySelector("body").classList.value)
    if(document.querySelector("body").classList.value ==['darkMode']){
        document.querySelector("#darkMode").innerHTML = "☀";
        document.querySelector("#darkMode").style.background = "#440000";
    } else {
        document.querySelector("#darkMode").innerHTML = "🌙";
        document.querySelector("#darkMode").style.background = "black";
    }
}g