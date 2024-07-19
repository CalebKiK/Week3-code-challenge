document.addEventListener("DOMContentLoaded", () => {

    const movieDetailsContainer = document.getElementById("movie-details");

    // Function to fetch and display the first movie's details
    function firstMovieDetails(){
        fetch("http://localhost:3000/films/1")
            .then(response => response.json())
            .then(data => {
                updateMovieCard(data);
            })
            .catch(error => console.error("Error fetching first movie:", error));
    }

    // Function to update the movie card with details
    function updateMovieCard(movie) {
        movieDetailsContainer.innerHTML = "";

        const movieCard = document.createElement("div");
        movieCard.id = "movie-card";

        const img = document.createElement("img");
        img.src = movie.poster;
        img.className = "movie-img";
        img.alt = movie.title;

        const contentCard = document.createElement('div');
        contentCard.className = 'displayed-movie-card';
        
        const movieTitle = document.createElement('h4');
        movieTitle.className = 'displayed-movie-title';
        movieTitle.textContent = movie.title;

        const movieDescription = document.createElement('p');
        movieDescription.className = 'displayed-movie-description';
        movieDescription.textContent = movie.description;
        
        const movieRuntime = document.createElement('p');
        movieRuntime.className = 'displayed-movie-runtime';
        movieRuntime.innerHTML = `Runtime: ${movie.runtime} minutes`;

        const movieShowtime = document.createElement('p');
        movieShowtime.className = 'displayed-movie-dets';
        movieShowtime.innerHTML = `Showtime: ${movie.showtime}`;

        const movieTickets = document.createElement('p');
        movieTickets.className = 'displayed-movie-dets';
        let availableTickets = movie.capacity - movie.tickets_sold;
        movieTickets.innerHTML = `Available Tickets: ${availableTickets}`;
        
        const buyTicketBtn = document.createElement("button");
        buyTicketBtn.className = "buy-ticket-button";
        
        if (availableTickets > 0) {
            buyTicketBtn.textContent = 'Buy Ticket';
        } else {
            buyTicketBtn.textContent = 'Sold Out';
            buyTicketBtn.disabled = true;
        }

        buyTicketBtn.addEventListener('click', () => {
            if (availableTickets > 0) {
                availableTickets--;
                movie.tickets_sold++;
                movieTickets.innerHTML = `Available Tickets: ${availableTickets}`;
                if (availableTickets === 0) {
                    buyTicketBtn.textContent = 'Sold Out';
                    buyTicketBtn.disabled = true;
                }
            }
        });

        contentCard.appendChild(movieTitle);
        contentCard.appendChild(movieDescription);
        contentCard.appendChild(movieRuntime);
        contentCard.appendChild(movieShowtime);
        contentCard.appendChild(movieTickets);
        contentCard.appendChild(buyTicketBtn);
        movieCard.appendChild(img);
        movieCard.appendChild(contentCard);

        movieDetailsContainer.appendChild(movieCard);
    }

    // Function to fetch all movies and populate the list
    function fetchAllMovies() {
        fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(data => {
                populateMovies(data);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }

    // Function to create elements for each film and add to the list
    function populateMovies(films) {
        const filmsList = document.getElementById("films");
        filmsList.innerHTML = ""; 
    
        films.forEach(film => {
            const li = document.createElement("li");
            li.className = 'film-item';
            li.dataset.movieId = film.id;
    
            const img = document.createElement("img");
            img.src = film.poster;
            img.className = "film-poster";
            img.alt = film.title;
    
            const textNode = document.createTextNode(film.title);
    
            li.appendChild(img);
            li.appendChild(textNode);
  
            li.addEventListener("click", () => {
                getMovieDetails(film.id);
            });
    
            filmsList.appendChild(li);
        });
    }

    // Function to get movie details by ID and update the movie card
    function getMovieDetails(movieId) {
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(res => res.json())
            .then(movie => {
                updateMovieCard(movie);
            })
            .catch(error => console.error(`Error fetching movie details for ID ${movieId}:`, error));
    }

    firstMovieDetails();
    fetchAllMovies();
});