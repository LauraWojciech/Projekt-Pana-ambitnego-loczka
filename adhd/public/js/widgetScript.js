
/// Referencje do elementów DOM
const widgetsList = document.getElementById('widgets-list');
const widgetForm = document.getElementById('widget-form');

//wczytaj widżety
getWidgets();

// Funkcja do tworzenia widżetu
function createWidgetDiv(id, title, content, type, quantity) {
    const widget = document.createElement('div');
    widget.className = 'widget';
    
    if (type === 'water') {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>Wypita woda: <span id="water-intake">${quantity}</span> ml</p>
            <button onclick="addWaterIntake(${id},this)">Dodaj 250ml</button>
            <button onclick="deleteWidgetDiv(${id},this)">Usuń</button>
        `;
    } else if (type === 'medication') {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>Przyjęta dawka: <span id="med-dose">${quantity}</span> tabletek</p>
            <label for="med-count">Ilość dawek:</label>
            <input type="number" id="med-count" value="1" min="1" max="10">
            <button onclick="addMedicationDose(${id},this)">Dodaj dawkę</button>
            <button onclick="deleteWidgetDiv(${id},this)">Usuń</button>
            <hidden></hidden>
        `;
    } else {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <button onclick="deleteWidgetDiv(${id},this)">Usuń</button>
        `;
    }
    widgetsList.appendChild(widget);
}

// Funkcja do dodawania wypitej wody
function addWaterIntake(id, button) {
    const waterSpan = button.parentElement.querySelector('#water-intake');
    let currentWater = parseInt(waterSpan.innerText);
    waterSpan.innerText = currentWater + 250;
    updateWidget(id, waterSpan.innerText);
}

// Funkcja do dodawania dawki leku
function addMedicationDose(id, button) {
    const doseSpan = button.parentElement.querySelector('#med-dose');
    const countInput = button.parentElement.querySelector('#med-count');
    let currentDose = parseInt(doseSpan.innerText);
    let count = parseInt(countInput.value);
    doseSpan.innerText = currentDose + count;
    updateWidget(id, doseSpan.innerText);
}

// Funkcja do usuwania widżetu
function deleteWidgetDiv(id,button) {
    const widget = button.parentElement;
    widgetsList.removeChild(widget);
    deleteWidget(id);
}

// Obsługa zdarzenia dla formularza widżetów
widgetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('widget-title').value;
    let content = document.getElementById('widget-content').value;
    let type = 'general';// "general" dla zwykłego widżetu

    if (title && content) {
        submitWidget(title, content, type, null);
        getWidgets();
        widgetForm.reset();
    } else {
        console.error('Tytuł i treść widżetu są wymagane.');
    }
});

// Funkcja do dodania widżetu do wody
function addWaterWidget() {
    submitWidget('Wypij wodę', '', 'water', 0);
    getWidgets();
}

// Funkcja do dodania widżetu do leków
function addMedicationWidget() {
    submitWidget('Przyjmij leki', '', 'medication', 1);
    getWidgets();
}

function submitWidget(title, content, type, quantity){
     fetch(location+'widgets', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            title:title,
            content:content,
            type:type,
            quantity: quantity
        }),
    })
        .then(result=> result.json())
        .then(data => {
            console.log(data);
        })
        .catch((err)=>console.log(err));
}

function getWidgets(){
    widgetsList.innerHTML='';
    fetch(location+'widgets', {
        method: 'GET',
        headers: {'Content-Type':'application/json'}})
        .then(response => response.json())
        .then(data =>{
            if(data.length>0){
                data.forEach(element => createWidgetDiv(element.id, element.title, element.content, element.type, element.quantity))
            }
        });
}

function updateWidget(id, quantity){
    fetch(location+'widgets', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id:id,
            quantity: quantity
        }),
    })
        .then(result  => result.json())
        .then(data=> console.log(data)) //after form submit
        .catch((err)=>console.log(err));
}

function deleteWidget(id){
    fetch(location+'widgets', {
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


