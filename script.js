// modal popup close/open
document.getElementById('addbook').addEventListener('click', function () {
    document.querySelector(".bg-modal").style.display = "flex"
})

document.getElementById('close').addEventListener('click', function () {
    document.querySelector(".bg-modal").style.display = "none"
})

// menu rotate



//submit button 

const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const checkread = document.querySelector("#isread")
const submit = document.querySelector(".modal-button")
const modalbar = document.querySelector(".modal-bar")
const errormsg = document.querySelector(".error-message")
const deletebtn = document.querySelectorAll("#delete-button")

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
// check whether fields are filled correctly and add to library
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
        } 
    resetModal ();
    checkEmpty ();
    }

}

ifTyped ();


// asign the values from modal to create new book info 
// GET BOOKS FROM LOCAL STORAGE
let myLibrary = [];
if (localStorage.getItem('books') === null) {
    myLibrary = [];
  } else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
}


class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function displayBook() {
    localStorage.setItem('books', JSON.stringify(myLibrary));
    const bookCards = document.querySelector('.cards');
    bookCards.textContent = '';
    for (let i = 0; i < myLibrary.length; i += 1) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookcard');
        bookCards.appendChild(bookCard);

        const bookContent = document.createElement('div');
        bookContent.classList.add('cardcontent');
        bookCard.appendChild(bookContent);

        //top content
        const cardContentTop = document.createElement('div')
        const bookAuthor = document.createElement('p')
        cardContentTop.classList.add('cardcontent-top')
        bookAuthor.classList.add('author')
        bookAuthor.textContent = myLibrary[i].author
        bookContent.appendChild(cardContentTop)
        cardContentTop.appendChild(bookAuthor);
        
        // middle content
        const cardContentMiddle = document.createElement('div')
        const barelement = document.createElement('div')
        cardContentMiddle.classList.add('cardcontent-middle')
        barelement.classList.add('bar')
        bookContent.appendChild(cardContentMiddle)
        cardContentMiddle.appendChild(barelement)

        // bottom content
        const cardContentBottom = document.createElement('div');
        const bookTitle = document.createElement('p')
        cardContentBottom.classList.add('cardcontent-bottom')
        bookTitle.classList.add('title')
        bookTitle.textContent = myLibrary[i].title;
        bookContent.appendChild(cardContentBottom)
        cardContentBottom.appendChild(bookTitle)
        // footer content
        const cardContentFooter = document.createElement('div');
        const leftfoot = document.createElement('div')
        const readelement = document.createElement('i')
        const midfoot = document.createElement('div')
        const rightfoot = document.createElement('div')
        const deleteelement = document.createElement('i')
        cardContentFooter.classList.add('cardcontent-footer')
        leftfoot.classList.add('read')
        midfoot.classList.add('pages')
        rightfoot.classList.add('delete')
        deleteelement.setAttribute('id', 'delete-button')
        deleteelement.classList.add('far','fa-trash-alt','fa-lg')

        midfoot.textContent = myLibrary[i].pages;
        
        bookContent.appendChild(cardContentFooter)
        cardContentFooter.appendChild(leftfoot)
        leftfoot.appendChild(readelement)
        cardContentFooter.appendChild(midfoot)
        cardContentFooter.appendChild(rightfoot)
        rightfoot.appendChild(deleteelement)



        // BOOK STATUS BUTTON
        if (myLibrary[i].status === false) {
          readelement.classList.add('far','fa-check-square','fa-lg');
          readelement.setAttribute("id", "read-button")
        } else {
          readelement.classList.add('far','fa-check-square','fa-lg');
          readelement.setAttribute("id", "read-button-modified")
        }

        readelement.addEventListener('click', function () {
           if (myLibrary[i].status === false)  {
               readelement.setAttribute('id', 'read-button-modified')
               myLibrary[i].status = true
               localStorage.setItem('books', JSON.stringify(myLibrary));

           } else if (myLibrary[i].status === true){
               readelement.setAttribute('id', 'read-button')
               myLibrary[i].status = false
               localStorage.setItem('books', JSON.stringify(myLibrary));
           }
        })

        deleteelement.addEventListener("click", () => {
            bookCards.removeChild(bookCard);
            myLibrary.splice(bookCard, 1);
            localStorage.setItem('books', JSON.stringify(myLibrary));
            checkEmpty ();
    
          });
}}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
    displayBook();
}

// hide text if empty
function checkEmpty () {
    if (myLibrary.length !== 0) {
        document.querySelector('.nobooks').style.display ="none";
    } else if (myLibrary.length == 0){
        document.querySelector('.nobooks').style.display = "block";
    }
}
displayBook();
checkEmpty ();
