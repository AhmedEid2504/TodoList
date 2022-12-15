//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVent listeners
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click' , filterTodo);

//functions

function addTodo (event) {
    //prevent form from submiting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoList.appendChild(todoDiv);

    //create li 
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    todoLi.innerText = todoInput.value ;
    

    //create completed button 
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    completeBtn.classList.add('todo-complete');
    todoDiv.appendChild(completeBtn);

    //create delete button 
    const deleteBtn =document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('todo-delete');
    todoDiv.appendChild(deleteBtn);
    //clear todo input value 
    todoInput.value = "";
}

function deleteCheck (e) {
    const item = e.target;
    
    //delete 
    if(item.classList[0] === 'todo-delete') {
        item.parentElement.classList.add('sideswipe')
        item.parentElement.addEventListener('transitionend' , function() {
            item.parentElement.remove();
        })
        
    }
    if(item.classList[0] === 'todo-complete') {
        item.parentElement.classList.toggle("completed");
    }
    
}

function filterTodo (e) {
const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex' ; 
                }else {
                    todo.style.display = 'flex';
                }
                break;
            case "completed" :
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex' ; 
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted" :
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none' ; 
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}