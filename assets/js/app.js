var gifElm = document.getElementById("gifs-appear-here");
var btns = document.getElementById("buttons");

var suggestions = ["Trending", "Football","Comedy","Tv Shows","Movies"]

function createBtns(){
    for(var i = 0; i < suggestions.length; i++){
        var suggestionsBtn = document.createElement("button");
        suggestionsBtn.setAttribute("class", "btn btn-secondary")
        suggestionsBtn.setAttribute("data-input", suggestions[i])
        suggestionsBtn.textContent = suggestions[i];

        btns.appendChild(suggestionsBtn);
    };
};
createBtns();

function btnSearch(input) {
    console.log(input)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    input + "&api_key=XdEqRHbc1bUMrE6Ga9bOKg8zCQu6PpJf&limit=10";

    fetch(queryURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    
        var results = data.data;
        for (var i = 0; i < results.length; i++) {
            //var gifDiv = $("<div class='item'>");
            var gifDiv = document.createElement("div");
            gifDiv.setAttribute("class", "gif-div");
            
            // var rating = results[i].rating;

            // var p =  document.createElement("p");
            // p.textContent = `Rating: ${rating}`

            var inputImage = document.createElement("img");
            inputImage.setAttribute("class", "gif");
            inputImage.setAttribute("src", results[i].images.fixed_height_small_still.url);
            inputImage.setAttribute("data-still", results[i].images.fixed_height_small_still.url);
            inputImage.setAttribute("data-animate", results[i].images.fixed_height_small.url);
            inputImage.setAttribute("data-state", "still");

            gifDiv.appendChild(inputImage);

            gifElm.appendChild(gifDiv)
        };
    });

};

document.addEventListener("click", function(event) {
    event.preventDefault();

    var input = event.target.dataset.input;
    var selectedImg = event.target;
    var state = selectedImg.getAttribute("data-state");
    var still = selectedImg.getAttribute("data-still");
    var animate = selectedImg.getAttribute("data-animate");

    // This line grabs the input from the textbox
    var suggestionInput = document.getElementById("gif-input");
    var userInput = suggestionInput.value;

    //normalize data. if user useses all caps or all lowercase
    //it will capitalize the first letter of every word and lower case remaining word
    userInput = userInput.toLowerCase()
        .trim()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    // The movie from the textbox is then added to our array
    if(suggestions.indexOf(userInput) === -1 && userInput !== ""){
        suggestions.push(userInput);
    }
    //clear the input box after every search
    suggestionInput.value = "";
    if(event.target.className.includes("gif")){
   
        if(state === "still"){
            selectedImg.setAttribute("src", animate);
            selectedImg.setAttribute("data-state", "animate");
            
          }else{
            selectedImg.setAttribute("src", still);
            selectedImg.setAttribute("data-state", "still");
        };
    }if(event.target.tagName === "BUTTON"){
        gifElm.textContent = "";
        btnSearch(input);
    }
    //clear buttons div before we create so we dont get repeats
    btns.textContent = "";

    createBtns();
    // if(event.target.id === "select-gif") {
    //     gifElm.textContent = "";
    //     btnSearch(input);

    // }


});
