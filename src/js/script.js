{
'use strict';

class BooksList {
    constructor(){

        const  thisBook = this;

        thisBook.filter = [];

        thisBook.renderBooks();
        thisBook.initActions();

    }

    renderBooks(){

       const thisBook = this;

        //save data from data.js file
        thisBook.data = dataSource.books;
    
        //find templpate
        const templates = Handlebars.compile(document.querySelector("#template-book").innerHTML);
    
        /* find menu container */
        const container = document.querySelector(".books-list");
    
    
        for (let book of thisBook.data){
    
            console.log(book.rating);
    
            const ratingProcent = (book.rating/10) * 100
    
            if (book.rating < 6){
                book.style = "background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%); width: 50%"
            } else if (book.rating  > 6 && book.rating <= 8){
                book.style = "background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%); width: "+ratingProcent+"%"
            } else if (book.rating  > 8 && book.rating <= 9) {
                book.style = "background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%); width: "+ratingProcent+"%"
            } else {
                book.style = "background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%); width: "+ratingProcent+"%"
            }
            
            console.log(book)
    
            //create html based on data and template
            const generatedHtml = templates(book);
    
            /* create element usting utils.createDOMFromHTML */
            const element = utils.createDOMFromHTML(generatedHtml);
            
    
            /* insert html into container*/
            container.appendChild(element);
        }
            
    };

    initActions(){

        const thisBook = this;

        const favoriteBooks = [];

        const filtersDom = document.querySelector(".filters");
    
        //find books in DOM
        const container = document.querySelector(".books-list");
    
        //event listner for favoriteBooks
        container.addEventListener('dblclick', function(event) {
    
                
                /* prevent default action for event */
                event.preventDefault();
    
                if (event.target.offsetParent.classList.contains('book__image')){
    
                    if (event.target.offsetParent.dataset.id in favoriteBooks){
    
                        const indexBookArray = favoriteBooks.indexOf(event.target.offsetParent.dataset.id);
    
                        //to correct
                        if (indexBookArray > -1) {
                            favoriteBooks.splice(indexBookArray, 1);
                        }
    
                        event.target.offsetParent.classList.remove('favorite');
    
    
                    } else {
    
                        favoriteBooks.push(event.target.offsetParent.dataset.id);
    
                        event.target.offsetParent.classList.add('favorite');
    
                    }
    
                }
                    
            })
        
        //event listener for filters
    
        filtersDom.addEventListener('click', function(event){
    
            //check the target if it ok
            if (event.target.tagName == 'INPUT' && event.target.type == "checkbox" && event.target.name == "filter"){
                if (event.target.checked){
                    thisBook.filter.push(event.target.value);
                    console.log(thisBook.filter)
                    thisBook.hideBook(event.target.value);
                } else {
                    const index = thisBook.filter.indexOf(event.target.value);
    
                        if (index > -1) {
                            thisBook.filter.splice(index, 1);
                        }
                    thisBook.hideBook(event.target.value);
                }
                
            }
        })
    
    }

    hideBook(param){

        const thisBook = this;

        //save data from data.js file
        const booksData = dataSource.books;
    
        //container of books
        const bookImages = document.querySelectorAll(".book__image");
    
        for (let image of bookImages){
            for(let book of booksData){
                if(image.getAttribute("data-id") == book.id && book.details[param] && (thisBook.filter.includes(param) || !(thisBook.filter.includes(param)))){
                    image.classList.toggle("hidden");
                }
            }
        }
    
    
    }
    
}

const app = new BooksList();

}