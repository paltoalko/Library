// modal popup close/open
document.getElementById('addbook').addEventListener('click', function () {
    document.querySelector(".bg-modal").style.display = "flex"
})

document.getElementById('close').addEventListener('click', function () {
    document.querySelector(".bg-modal").style.display = "none"
})


//submit button 

const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const checkread = document.querySelector("#isread")
const submit = document.querySelector(".modal-button")
const modalbar = document.querySelector(".modal-bar")
const errormsg = document.querySelector(".error-message")

submit.addEventListener("click", function () {
    ifEmpty ();
})  
    

//delete the decimal
pages.addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});

//check if is there a keyinput after

function ifTyped () {
    author.addEventListener("keydown" , function () {
        if (author.classList.contains("empty")) {
            author.classList.remove("empty")
        }
    })
    title.addEventListener("keydown" , function () {
        if (title.classList.contains("empty")) {
            title.classList.remove("empty")
        }
    })
    pages.addEventListener("keydown" , function () {
        if (pages.classList.contains("empty")) {
            pages.classList.remove("empty")
        }
    })
}

//clear modal and close 
function resetModal () {
    title.value = "";
    author.value = "";
    pages.value = "";
    checkread.checked = false;
    document.querySelector(".bg-modal").style.display = "none"
}

function ifEmpty () {
    if (title.value == "" && pages.value == "" && author.value == "") {
        title.classList.add("empty");
        pages.classList.add("empty");
        author.classList.add("empty");
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block"  
    } else if (title.value == "" && pages.value == "" && author.value !== "") {
        title.classList.add("empty");
        pages.classList.add("empty");
        
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block"  
    } else if (title.value == "" && author.value == "" && pages.value !== "") {
        title.classList.add("empty");
        author.classList.add("empty");
        
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block"  
    } else if (author.value == "" && pages.value == "" && title.value !== "") {
        pages.classList.add("empty");
        author.classList.add("empty");
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block" 
    } else if (author.value == "" && pages.value !== "" && title.value !== ""){
        author.classList.add("empty");
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block" 
    } else if (author.value !== "" && pages.value == "" && title.value !== "") {
        pages.classList.add("empty");
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block" 

    }  else if (author.value !== "" && pages.value !== "" && title.value == "") {
        title.classList.add("empty");
        modalbar.style.marginBottom = "10%"
        errormsg.style.display = "inline-block" 

    } else if (author.value !== "" && pages.value !== "" && title.value !== "") {
        if (checkread.checked) {
            addBookToLibrary(title.value, author.value, pages.value, true)
        } else {
            addBookToLibrary(title.value, author.value, pages.value, false)
        } resetModal ();
    }
}

ifTyped ();


// asign the values from modal to create new book info 

let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
  }