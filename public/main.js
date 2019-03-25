// get articles from db
$.getJSON("/articles", data => {
    for (i in data) {
        console.log(data[i])
        $("#articles").append(`
        <div class="card" style="width: 18rem;">
            <img src=${data[i].image} class="card-img-top" alt=${data[i].title}>
            <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].summary}</p>
                <a href="#" id="view-note" article-id=${data[i]._id} class="btn btn-primary">Note</a>
                <a href=${data[i].url} target="empty" article-id=${data[i]._id} class="btn btn-primary">View Article</a>
             </div>
        </div>
        `)
    }
})

// view comment button
$("#articles").on("click", "#view-note", function (event) {
    var id = $(this).attr("article-id")
    $.get("/articles/"+id).then(function(response) {
        console.log(response)
        $("#notes").html(`
            <h2>${response.title}</h2>
            <input id="note-title" name="title">
            <textarea id="note-body" name="body"></textarea>
            <button class="btn btn-info" article-id="save-note">Save</button> 
        `)
    })
})

// scrape articles button
$("#scrape-articles").on("click", function (event) {
    $.get("/scrape").then(function (response) {
        console.log(response)
    })
})

// create comment button
$("#save-note").on("click", function() {
    var id = $(this).attr("article-id");
    var data = {
        title: $("#note-title").val(),
        body:  $("note-body").val()
    }
    $.post("/article/"+id, data)
    .then(function(response){
        console.log(response);
        $("#notes").empty();
    })
})
