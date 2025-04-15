//wczytaj uzytkownika
getUsers();

function getUsers(){
    fetch(location+'users', {
        method: 'GET',
        headers: {'Content-Type':'application/json'}})
        .then(response => response.json())
        .then(data =>{
            if(data.length>0){
                data.forEach(element => createUserRow(element.id, element.name, element.phone, element.email))
            }
        });
}

function createUserRow(id, name, phone, email){
    document.getElementById('user-name').innerHTML=name;
    document.getElementById('user-phone').innerHTML=phone;
    document.getElementById('user-email').innerHTML=email;

    document.getElementById('user-name-input').value=name;
    document.getElementById('user-phone-input').value=phone;
    document.getElementById('user-email-input').value=email;
    document.getElementById('edit-user-button').setAttribute( "onClick", `editUser(${id})`);
}

function showEditUserRow(){
    $("#user-edit-row").toggle();
}

function editUser(id){
    let name = document.getElementById('user-name-input').value;
    let phone = document.getElementById('user-phone-input').value;
    let email = document.getElementById('user-email-input').value;
    updateUser(id, name, phone, email);
    getUsers();
    $("#user-edit-row").toggle();
}

function updateUser(id, name, phone, email){
    fetch(location+'users', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id: id,
            name: name,
            phone: phone,
            email: email
        }),
    })
        .then(result  => result.json())
        .then(data=> console.log(data)) //after form submit
        .catch((err)=>console.log(err));
}