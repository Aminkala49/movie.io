const watchlistBody = document.getElementById('mainWatchlist')

const storageItem = JSON.parse(localStorage.getItem('movieDB'))

if (storageItem.length) {
    watchlistBody.innerHTML = ''
    for(let i of storageItem) {
        const [poster, title, rating, time, genre, description] = i
        watchlistBody.innerHTML += `
        <div class="one">
            <div class="movie-item">
                <img
                    src="${poster}"
                    alt="movie cover image"
                    class="movie-cover"
                />
                <div class="textcontent">
                    <span
                    ><h3>${title}</h3>
                    <img
                        src="images/star-icon.svg"
                        alt="star icon"
                        class="star-icon"
                    />
                    <p>${rating}</p></span
                    >
                    <div class="movie-genre">
                    <p class="time">${time}</p>
                    <p class="genres">${genre}</p>
                    <div id="remove-movie" class='add-movie'>
                        <img
                        src="images/remove-icon.svg"
                        alt="add icon"
                        class="add-icon"
                        />
                        <p class='watchlist'>Remove</p>
                    </div>
                    </div>
                    <p class="description">
                        ${description}
                    </p>
                </div>
            </div>
            <hr class="line" />
        </div>
        `
        removeMovie()
    }
}

else {
    startPage()
}

function startPage(){
    watchlistBody.innerHTML = `
    <div class="start">
        <h2 class="h2">Your watchlist is looking a little empty...</h2>
        <div class="add-item">
        <img src="/images/add-icon.svg" alt="add icon" />
        <a href="index.html"
            ><p>Let’s add some movies!</p></a
        >
        </div>
    </div>
    `
}

function removeMovie(){
    const removeMovieEl = document.getElementsByClassName('add-movie')

    for(let i = 0; i < removeMovieEl.length; i++) {
        const movie = removeMovieEl[i]
        movie.addEventListener('click', () => {
            const movieItem = movie.parentElement.parentElement.parentElement.parentElement
            const movieTitle = movie.parentElement.parentElement.children[0].children[0].textContent
            watchlistBody.removeChild(movieItem)
            for(let i of storageItem){
                if (i[1] === movieTitle){
                    storageItem.splice(storageItem.indexOf(i), 1)
                }
            }
            localStorage.setItem('movieDB', JSON.stringify(storageItem))
            if(storageItem.length === 0){
                startPage()
            }
        })
    }
    
}
