/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play


let button = document.querySelector(".button");
let recipe = document.querySelector(".container");
let rec = document.querySelector("#input");
let body = document.querySelector("body");
let audioSource = document.querySelector("audio");


body.addEventListener("click", function playMusic(e) {
    if(e.target && e.target.matches("img")){
        console.log("you pressed a button", e.target);
        audioSource.src = e.target.getAttribute('data-music');
        audioSource.load();
        audioSource.play();
    }
});

button.addEventListener("click", function searchRecipes() {

  fetch("https://itunes.apple.com/search?term=" + rec.value)
    // Data is fetched and we get a promise.
    .then(
      // The promise returns a response from the server.
      function(response) {

        // We process the response accordingly.
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(res) {
            console.log("results is:", response);
            let template = "";
            res.results.forEach(function(data) {
              template += `
           <div recipe class="recipe">

              <img src="${data.artworkUrl100}" data-music="${data.previewUrl}">

            <p>${data.trackName}</p><h2>${data.artistName}</h2></div>`;
              recipe.innerHTML = template;
            });

          })
            .catch(function(err) {
              console.log("Fetch Error :-S", err);
          })
      });

})
