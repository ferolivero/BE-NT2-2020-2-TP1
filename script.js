const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}


const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let tareasList = [];
class Todo {
  constructor(titulo){
    this.titulo = titulo
    this.checked = false
    this.element = null
    this.checkbox = null
  }

  toogleCheckbox() {
    console.log('Checkbox clicked');
    // Toggle Check
    this.checked = !this.checked

    // Actualizo el valor del checkbox interno
    this.checkbox.checked = this.checked;

    // Renderizo nuevamente los contadores
    renderContadores();
  }

  // Hay manera de invocar directamente a la funcion de eliminar desde la accion de onclick???
  removeAction(){
    // Elimino el todo seleccionado
    removeTodo(this);
  }
}

function addTodo() {
  // Creo una nueva tarea a partir de un prompt
  let newTodo = new Todo(prompt("Ingrese el nombre de la tarea"));

  // Agrego la nueva tarea a la lista de tareas en memoria.
  tareasList.push(newTodo);

  // Renderizo la aplicacion
  render()
}

function removeTodo(todo) {
  // Remuevo de la lista la tarea correspondiente
  tareasList = tareasList.filter(x => x !== todo);

  // Renderizo la aplicacion sin el todo eliminado
  render();
}

function renderTarea(todo){
  // Si ya tiene elemento no se vuelve a crear.
  if (todo.element) return todo.element;

  // Creo el nuevo elemento INPUT
  const newCheckbox = document.createElement('input');
  newCheckbox.className = classNames.TODO_CHECKBOX;
  newCheckbox.type = 'checkbox';
  newCheckbox.onchange = todo.toogleCheckbox.bind(todo)

  // Creo el nuevo elemento button
  const newButton = document.createElement('button');
  newButton.className = classNames.TODO_DELETE;
  newButton.type = 'button';
  newButton.innerText = 'Eliminar';
  newButton.onclick = todo.removeAction.bind(todo)
  
  // Creo el nuevo elemento SPAN
  const newSpan = document.createElement('span');
  newSpan.className = classNames.TODO_TEXT;
  newSpan.innerHTML = todo.titulo;

  // Creo el nuevo elemento LI
  const newItem = document.createElement('li');
  newItem.className = classNames.TODO_ITEM;
  newItem.appendChild(newCheckbox)
  newItem.appendChild(newSpan);
  newItem.appendChild(newButton);

  // Referencio el nuevo LI y CHECKBOX al elemento dentro del objeto
  todo.element = newItem;
  todo.checkbox = newCheckbox
  return newItem;
}

function render(){
  // Se reinicia la lista de tareas
  list.innerHTML = ''
  
  // Se renderizan todas las tareas si no existen. Luego se agrega cada uno de los LI dentro de UL
  tareasList.map(renderTarea).forEach(liItem => list.appendChild(liItem));
  
  // Se renderizan denuevo los contadores
  renderContadores();
}

function renderContadores(){
  // Contabilizo de la lista de tareas, cuales no estan checkeadas.
  uncheckedCountSpan.innerText = counter(tareasList, tarea => !tarea.checked)

  // Renderizo el contador de tareas
  itemCountSpan.innerHTML = tareasList.length;
}

function counter(array, fn){
  // Por cada elemento del array, ejecuta la funcion y suma en el acumulador en caso verdadero. Inicializa el acumulador en 0
  return array.reduce((accumulator, currentValue) => fn(currentValue) ? accumulator + 1 : accumulator, 0)
}

