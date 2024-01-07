document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Page de connexion
    const loginPage = `
        <div class="container">
            <h2>Connexion</h2>
            <input type="text" id="username" placeholder="Nom d'utilisateur">
            <input type="password" id="password" placeholder="Mot de passe">
            <button onclick="login()">Se connecter</button>
            <p id="loginError" style="color: red;"></p>
        </div>
    `;

    // Page d'inscription
    const registerPage = `
        <div class="container">
            <h2>Inscription</h2>
            <input type="text" id="newUsername" placeholder="Nom d'utilisateur">
            <input type="password" id="newPassword" placeholder="Mot de passe">
            <button onclick="register()">S'inscrire</button>
            <p id="registerError" style="color: red;"></p>
        </div>
    `;

    // Page des animes (après connexion)
    let animePage = `
        <div class="container">
            <h2>Animes</h2>
            <div id="animeList"></div>
        </div>
    `;

    const showAnimePage = async () => {
        app.innerHTML = animePage;
        const animeList = document.getElementById('animeList');
        try {
            const response = await fetch('http://localhost:3000/api/animes');
            const data = await response.json();
            data.forEach(anime => {
                const animeCard = document.createElement('div');
                animeCard.className = 'anime-card';
    
                animeCard.innerHTML = `
                    <img src="${anime.image || 'placeholder.jpg'}" alt="${anime.titre}" class="anime-image">
                    <div class="anime-details">
                        <h3>${anime.titre}</h3>
                        <p>${anime.description}</p>
                        <p>Genre: ${anime.genre || 'Non spécifié'}</p>
                        <p>Épisodes: ${anime.nb_episode}</p>
                        <p>Saisons: ${anime.nb_saison}</p>
                        <p>Date de sortie: ${anime.date_sortie ? new Date(anime.date_sortie).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
                        <p>Status: ${anime.status}</p>
                    </div>
                `;
    
                animeList.appendChild(animeCard);
            });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    

    // Fonctions de connexion et d'inscription (à compléter avec votre API)
    window.login = async () => {
        // À compléter avec votre API
        // Utilisez fetch pour appeler votre endpoint de connexion
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const url = 'http://localhost:3000/api/auth/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            localStorage.setItem('token', data);
            localStorage.setItem('expiryDate', new Date());
        } catch (error) {
            console.error('Error:', error);
        }
        showAnimePage();
    };

    window.register = async () => {
        // À compléter avec votre API
        // Utilisez fetch pour appeler votre endpoint d'inscription
    };

    app.innerHTML = loginPage;

    // Récupérer le token et sa date d'expiration du localStorage
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

       // Vérifier si le token est toujours valide
    if (token && expiryDate) {
        const now = new Date();
        // Convertir la date d'expiration en objet Date
        const expiryDateObj = new Date(expiryDate);

        // Si la date d'expiration est supérieure à "maintenant - 1 heure", afficher la page des animes
        if (expiryDateObj > new Date(now.getTime() - 3600000)) {
            showAnimePage();
        }
    }


 
});
