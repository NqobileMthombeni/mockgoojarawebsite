document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {});
});

function searchMovies() {
    var query = encodeURIComponent(document.getElementById('searchInput').value);
    var apiKey = '2dfd6b7c';
    var url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`;

    // Display loading indicator
    var movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '<p>Loading...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data['Response'] === 'True') {
                var movies = data['Search'];
                movieResults.innerHTML = '';

                movies.forEach(movie => {
                    var movieDiv = document.createElement('div');
                    movieDiv.classList.add('movie');

                    var title = document.createElement('h3');
                    title.textContent = movie['Title'];

                    var posterLink = document.createElement('a');
                    posterLink.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(movie['Title'])}`;
                    posterLink.target = '_blank';

                    var poster = document.createElement('img');
                    poster.src = movie['Poster'];
                    poster.alt = movie['Title'];

                    poster.addEventListener('mouseenter', function() {
                        document.body.style.backgroundImage = `url(${movie['Poster']})`;
                    });

                    poster.addEventListener('mouseleave', function() {
                        document.body.style.backgroundImage = '';
                    });

                    posterLink.appendChild(poster);

                    movieDiv.appendChild(title);
                    movieDiv.appendChild(posterLink);
                    movieResults.appendChild(movieDiv);
                });
            } else {
                movieResults.innerHTML = 'No movies found with the query: ' + query;
            }
        })
        .catch(error => {
            movieResults.innerHTML = 'Error: ' + error.message;
        });
}

function changBg(bg, title, newTitle) {
    document.body.style.backgroundImage = `url('${bg}')`;
    document.getElementById("movieTitle").src = newTitle;
}

document.getElementById('trailerButton').addEventListener('click', function() {
    var trailerLink = document.querySelector('.carousel-item.active').getAttribute('data-trailer');
    window.open(trailerLink, '_blank');
});
