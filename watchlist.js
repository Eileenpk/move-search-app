
const apiKey = '&apikey=94b72a74'
const watchlistContainer = document.getElementById('watchlist-container')
let display = ''
let watchlist = JSON.parse(localStorage.getItem('watchlistArr'))

const viewWatchlist = (movie) => {
    
    watchlist.forEach(movie => {
        fetch(`https://www.omdbapi.com/?i=${movie}${apiKey}`)
            .then(res => res.json())
            .then(data => {
                
                display +=`
                    <div class="movie-slot">
                    <div class="img-container">
                        <img src="${data.Poster}">
                    </div>
                    <div class="movie-info">
        
                        <div class="movie-header">
                            <h2>${data.Title}</h2> 
                            <img src="./images/Icon (2).png">
                            <h3 class="info">${data.imdbRating}</h3>
                        </div>
                        <div class="movie-stats">
                            <p>${data.Runtime} ${data.Genre} 
                                
                                <a onclick="removeFromWatchlist('${data.imdbID}')" href="#" class="add-to-watchlist"><i class="fa-solid fa-circle-minus"></i> My Watchlist</a></p> 
                            
                        </div>
                        <p class="info">${data.Plot}</p>
                    </div>
                   </div>
                    ` 
                 
                    watchlistContainer.innerHTML = display
            })
    })
}

const alert = (movie) => {
    const popup = document.querySelector('.popup')
    fetch(`https://www.omdbapi.com/?i=${movie}${apiKey}`)
    .then(res => res.json())
    .then(data => {
        popup.innerHTML = `
        <h2>${data.Title} removed from your watchlist!</h2>
        `
        popup.classList.toggle('show-popup')
        setTimeout(() => popup.classList.toggle('show-popup'), 3000)

    })

}


const removeFromWatchlist = (movie) => {
    remove = true
    display = ''
    const index = watchlist.indexOf(movie) 
     watchlistArr = JSON.parse(localStorage.getItem('watchlistArr')) 
     watchlist.splice(index, 1)
     localStorage.setItem("watchlistArr", JSON.stringify(watchlist));
     if(watchlist.length === 0) {
        alert(movie)
        display = ''
        watchlistContainer.innerHTML = `
        <div class="icon-container">
            <h2 class="watchlist-filler-text">Your watchlist is looking a little empty...</h2>
        </div>
        <a aria-label="add movies to your watchlist" href="index.html" class="add-more"><i class="fa-solid fa-circle-plus"></i>Let's add some movies!</a>
    `
     } else {
        display = ''
        viewWatchlist(watchlist)
        alert(movie)
     }
}

viewWatchlist(watchlist)

