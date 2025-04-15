getTodoList()


function getTodoList(){
    //clean list before load
    let todoList = document.getElementById("todo-list").rows;
    Array.from(todoList).forEach(row =>{
        if(row.id!=="todo-add-row"){row.remove();}
    });

    //load
    fetch(location+'todo', {
        method: 'GET',
        headers: {'Content-Type':'application/json'}})
        .then(response => response.json())
        .then(data =>{
            if(data.length>0){
                data.forEach(element => createTodoRow(element.id, element.text, element.checked))
            }
        });
}

function createTodoRow(id, text, checked){
    let row = document.createElement('tr');
    let checkInbox = checked === 1 ? "checked" : "";
    row.innerHTML=`
                <td><input onchange="changeCheckedTodoElement(${id},this)" type="checkbox" ${checkInbox} ></td>
                <td>${text}</td>
                <td><button onclick="removeTodoElement(${id})">Usuń</button></td>
    `;
    document.getElementById("todo-list").appendChild(row);
}

function addTodoElement(){
    let text = document.getElementById("todo-text-input").value;
    submitTodo(text);
    getTodoList();
}

function changeCheckedTodoElement(id, checkbox){
    let checked = checkbox.checked ? 1 : 0;
    updateTodoList(id,checked);
    getTodoList();
}

function removeTodoElement(id){
    deleteTodo(id);
    getTodoList();
}



function submitTodo(text){
    fetch(location+'todo', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            text:text,
        }),
    })
        .then(result=> result.json())
        .then(data => {
            console.log(data);
        })
        .catch((err)=>console.log(err));
}

function updateTodoList(id, checked){
    fetch(location+'todo', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id:id,
            checked: checked
        }),
    })
        .then(result  => result.json())
        .then(data=> console.log(data)) //after form submit
        .catch((err)=>console.log(err));
}

function deleteTodo(id){
    fetch(location+'todo', {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id:id,
        }),
    })
        .then(result  => result.json())
        .then(data=> console.log(data)) //after form submit
        .catch((err)=>console.log(err));
}