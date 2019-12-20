//Book Const
function Book(title, author, isbn){
    this.title = title;
    this.author= author;
    this.isbn = isbn;
}


//UI const
function UI(){
}

UI.prototype.addBookRow = function(book){
    const list = document.getElementById('table-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
}

UI.prototype.deleteItem = function(event){

    if(event.target.className === 'delete'){
        event.target.parentElement.parentElement.remove();
    }

}


UI.prototype.clearFields = function(){
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
}

UI.prototype.errorMessage = function(message, errorClass){

    const div = document.createElement('div');

    div.className = `alert ${errorClass}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');

    const form = document.getElementById('form-book');

    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)

}




document.getElementById('form-book').addEventListener('submit', function(event){

    const title = document.getElementById('title').value,
          author =  document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    const book = new Book(title, author, isbn);
    const ui = new UI();


    if(title == '' || author == '' || isbn == ''){
        ui.errorMessage('Please Enter value in fields', 'error');
    }
    else{
        ui.addBookRow(book);
        ui.errorMessage('Added Successfully', 'success');
    }

    ui.clearFields();
    event.preventDefault();
});


document.getElementById('table-body').addEventListener('click', function(e){

    const ui = new UI();
    ui.deleteItem(e);

    ui.errorMessage('Deleted Item SuccessFully', 'success')
    e.preventDefault();
});