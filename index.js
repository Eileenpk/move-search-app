
const searchBtn = document.querySelector('button')
const apiKey = '&apikey=94b72a74'
const movieContainer = document.querySelector('.movie-container')

let watchlistArr = []
let display = ''


const search = (e) => {
//     e.preventDefault()   
    const input = document.querySelector('input').value
    display = ""
    fetchFunc(input)
}

const addToWatchlist = (movie) => {
    watchlistArr = JSON.parse(localStorage.getItem('watchlistArr')) || []
    watchlistArr.push(movie)
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
    alert(movie)
}

const fetchFunc = (input) => {
    fetch (`http://www.omdbapi.com/?s=${input}${apiKey}`)
    .then(res => res.json())
    .then(data => {
        if(!data.Search) {
            movieContainer.innerHTML = `
            <h4 style="margin-top:207px; margin-left:115px;font-size:18px; width:321px; text-align:center;">Unable to find what you're looking for. Please try another search.</h4>
            `
            
        } else {
        data.Search.forEach((movie)=>{
            
            fetch(`http://www.omdbapi.com/?i=${movie.imdbID}${apiKey}`)
                .then(res => res.json())
                .then(data => {
                     display +=`
                    <div class="movie-slot">
                    <div class="img-container">
                        <img src="${movie.Poster}">
                    </div>
                    <div class="movie-info">
        
                        <div class="movie-header">
                            <h2>${movie.Title}</h2> 
                            <img src="./images/Icon (2).png">
                            <h3 class="info">${movie.imdbRating}</h3>
                        </div>
                        <div class="movie-stats">
                            <p>${data.Runtime} ${data.Genre} 
                                
                                <a onclick="addToWatchlist('${movie.imdbID}')" href="#" class="add-to-watchlist"><i class="fa-solid fa-circle-plus"></i> My Watchlist</a></p> 
                            
                        </div>
                        <p class="info">${data.Plot}</p>
                    </div>
                   </div>
                    ` 
                 
                    movieContainer.innerHTML = display
                })     
        })}
    })}


const alert = (movie) => {
    const popup = document.querySelector('.popup')
    fetch(`http://www.omdbapi.com/?i=${movie}${apiKey}`)
    .then(res => res.json())
    .then(data => {
        popup.innerHTML = `
        <h2>${data.Title} added to your watchlist!</h2>
        `
        popup.classList.toggle('show-popup')
        setTimeout(() => popup.classList.toggle('show-popup'), 3000)

    })

}

searchBtn.addEventListener('click', search)

