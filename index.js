document.addEventListener("DOMContentLoaded", () => {

// Function to fetch the first movie from the server
    function firstMovieDetails(){
        fetch("http://localhost:3000/films/1")
        .then(response => response.json())
        .then(data => {
            let cardOne = document.createElement("li");
    
            data.tickets_available = data.capacity - data.tickets_sold;
    
            cardOne.className = "cardOne";
            cardOne.innerHTML = `
            <h2>${data.title}</h2>
            <div class="movie-content">
                <p>Movie runtime: ${data.runtime}</p>
                <p>Capacity: ${data.capacity} seats</p>
                <p>Showtime: ${data.showtime}</p>
                <p>Tickets sold: ${data.tickets_sold}</p>
                <p>Tickets available: ${data.tickets_available}</p>
                <p>Movie description: ${data.description}</p>
                <img src="${data.poster}">
            </div>
            `
            let firstMovieCard = document.createElement("ul");
            firstMovieCard.id = "first-movie";

            document.body.appendChild(firstMovieCard);
            firstMovieCard.appendChild(cardOne);
            })
    
        .catch(error => console.error("Error fetching first movie:", error))
    };

// Function to fetch all the movie details
    function fetchAllMovies() {
        fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {populateMovies(data);})
        .catch(error => console.error("Error fetching movies:", error));
    };

    // Function to create elements for each film
    function populateMovies(films) {
        const filmsList = document.getElementById("films");

        films.forEach(film => {
            const li = document.createElement("li")
            li.textContent = film.title;
            li.classList.add("film", "item");
            li.addEventListener("click", () => {
                const movieDetails = document.getElementById("movie-details");

            const movieTitle = document.createElement("h3");
            movieTitle.textContent = `Movie Title: ${film.title}`;
            movieDetails.appendChild(movieTitle);

            const movieRuntime = document.createElement("p");
            movieRuntime.textContent = `Runtime: ${film.runtime} minutes`;
            movieDetails.appendChild(movieRuntime);

            const movieCapacity = document.createElement("p");
            movieCapacity.textContent = `Capacity: ${film.capacity} seats`;
            movieDetails.appendChild(movieCapacity);

            const movieShowtime = document.createElement("p");
            movieShowtime.textContent = `Show Time: ${film.showtime}`;
            movieDetails.appendChild(movieShowtime);

            const movieTicketsSold = document.createElement("p");
            movieTicketsSold.textContent = `Sold Tickets: ${film.tickets_sold} tickets`;
            movieDetails.appendChild(movieTicketsSold);

            const availableTickets = document.createElement("p");
            availableTickets.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
            movieDetails.appendChild(availableTickets);

            const movieDescription = document.createElement("p");
            movieDescription.textContent = `Description: ${film.description}`;
            movieDetails.appendChild(movieDescription);

            const moviePoster = document.createElement("img");
            moviePoster.textContent = `Poster: ${film.poster}`;
            moviePoster.src = film.poster;
            movieDetails.appendChild(moviePoster);

            const buyTicketBtn = document.createElement("button");
            buyTicketBtn.textContent = "Buy Ticket";
            movieDetails.appendChild(buyTicketBtn);

            buyTicketBtn.addEventListener("click", () => buyTicket(films));

            document.body.appendChild(movieDetails);
        });
        
        filmsList.appendChild(li);
        })
    };

    // Function for buying tickets
    function buyTicket(films) {
        if (availableTicket > 0) {
            films.tickets_sold += 1;
            availableTickets.textContent = `Available Tickets: ${films.capacity - films.tickets_sold}`;

            fetch(`http://localhost:3000/films/${films.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({tickets_sold: films.tickets_sold}),
            })
            .then(response => response.json())
            .then(data => console.log("Updated movie data:", data))
            .catch(error => console.error("Error updating movie details:", error));
        } else {
            alert ("No tickets available");
        }
    };

    firstMovieDetails();
    fetchAllMovies();
})






    




