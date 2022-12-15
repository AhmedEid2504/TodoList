//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVent listeners
document.addEventListener('DOMContentLoaded', getTodos);
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
    //add todo to local storage 
    saveLocalTodos(todoInput.value);

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
        const todo = item.parentElement;
        item.parentElement.classList.add('sideswipe');
        removeLocalTodos(todo);
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

function saveLocalTodos (todo) {
    //check do i already have things in there 
    let todos;
    if ( localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos () {
    let todos;
    if ( localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoList.appendChild(todoDiv);

        //create li 
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-item');
        todoDiv.appendChild(todoLi);
        todoLi.innerText = todo ;
        

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
    })
}

function removeLocalTodos(todo) {
    let todos;
    if ( localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}