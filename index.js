const inputEl = document.getElementById('search-input')
const btnEl = document.getElementById('search-btn')
const mainEl = document.getElementById('search-main')
const formEl = document.getElementById('form')

btnEl.addEventListener('click', getMovies)

function getMovies(event) {
    event.preventDefault()
    const movieSearch = inputEl.value
    //console.log(movieSearch)
    
    const api = `https://www.omdbapi.com/?s=${movieSearch}&apikey=ed71ffcd`
    fetch(api)
    .then(response => response.json())
    .then(data => {
        if(data.Response === 'False'){
            throw new Error('invaild movie name')
        }
        mainEl.innerHTML = ''
        mainEl.style.height = 'auto'
        for(let i = 0; i < data.Search.length; i++){
            let movieId = data.Search[i].imdbID
            fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=ed71ffcd`)
            .then(response => response.json())
            .then(data => {
                mainEl.innerHTML += `
                <div class="one">
                    <div class="movie-item">
                        <img
                            src="${data.Poster}"
                            alt="movie cover image"
                            class="movie-cover"
                        />
                        <div class="textcontent">
                            <span
                            ><h3>${data.Title}</h3>
                            <img
                                src="images/star-icon.svg"
                                alt="star icon"
                                class="star-icon"
                            />
                            <p>${data.imdbRating}</p></span
                            >
                            <div class="movie-genre">
                            <p class="time">${data.Runtime}</p>
                            <p class="genres">${data.Genre}</p>
                            <div id="add-movie" class='add-movie'>
                                <img
                                src="images/add-icon.svg"
                                alt="add icon"
                                class="add-icon"
                                />
                                <p class='watchlist'>Watchlist</p>
                            </div>
                            </div>
                            <p class="description">
                                ${data.Plot}
                            </p>
                        </div>
                    </div>
                    <hr class="line" />
                </div>
                `
                addMovieItem()
            })
            
        }
    })
    .catch(
        err => {
            mainEl.innerHTML = ''
            mainEl.style.height = '75vh'
            mainEl.innerHTML = `
            <div class="start-page">
                <h2 class='h2'>Unable to find what you’re looking for. Please try another search.</h2>
            </div>
            `
        }
    )
}

//localStorage.clear()

let watchlist = []
let watchItem = []
const movieStorage = JSON.parse(localStorage.getItem('movieDB'))
if(movieStorage){
    watchlist = movieStorage
}

function addMovieItem(){
    const movieEl = document.getElementsByClassName('add-movie')

    for(let i = 0; i < movieEl.length; i++) {
        const movie = movieEl[i]
        movie.addEventListener('click', () => {
            const poster = movie.parentElement.parentElement.parentElement.children[0].currentSrc
            const title = movie.parentElement.parentElement.children[0].children[0].textContent
            const rating = movie.parentElement.parentElement.children[0].children[2].textContent
            const time = movie.parentElement.children[0].textContent
            const genre = movie.parentElement.children[1].textContent
            const description = movie.parentElement.parentElement.children[2].textContent
            watchItem = [poster, title, rating, time, genre, description] 
            if (watchlist.length === 0) {
                watchlist.push(watchItem)
            }

            const uniques = watchlist.find((item) => item[1] === watchItem[1])
            if(uniques === undefined){
                watchlist.push(watchItem)
            }
            //console.log(watchlist)
            // console.log(watchlist.length)
            // console.log(watchlist)  
            localStorage.setItem('movieDB', JSON.stringify(watchlist))
            movie.children[1].classList.add('color')
        })
    }
}

