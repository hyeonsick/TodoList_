// Local Storage에서 ToDo 리스트 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM 요소들 가져오기
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// ToDo 리스트 추가 함수
function addTodo() {
  // 입력한 ToDo 가져오기
  const todo = input.value.trim();
  
  // 입력한 ToDo가 빈 문자열인 경우
  if (!todo) {
    alert('할 일을 입력해주세요!');
    return;
  }
  
  // ToDo 리스트에 추가
  todos.push(todo);
  
  // Local Storage에 ToDo 리스트 저장
  localStorage.setItem('todos', JSON.stringify(todos));
  
  // 화면에 ToDo 리스트 출력
  displayTodos();
  
  // 입력 폼 초기화
  input.value = '';
}

// ToDo 리스트 삭제 함수
function deleteTodo(index) {
  // ToDo 리스트에서 해당 ToDo 삭제
  todos.splice(index, 1);
  
  // Local Storage에서 해당 ToDo 삭제
  localStorage.setItem('todos', JSON.stringify(todos));
  
  // 화면에서 해당 ToDo 삭제
  displayTodos();
}

// ToDo 리스트 화면에 출력 함수
function displayTodos() {
  // 이전에 출력된 ToDo 리스트 삭제
  list.innerHTML = '';
  
  // ToDo 리스트를 순회하며 각 ToDo 항목을 화면에 출력
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });
    
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

// 초기화 함수
function init() {
  // 폼 제출 시 ToDo 리스트 추가
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
  });
  
  // 화면에 ToDo 리스트 출력
  displayTodos();
}

// 초기화 함수 호출
init();

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    showLoginForm();
}
localStorage.setItem('username', username);
localStorage.setItem('password', password);

if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
  localStorage.setItem('isLoggedIn', true);
}

localStorage.setItem('todoList', JSON.stringify(todoList));
function getTodoList() {
  // 로그인 여부를 확인합니다.
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 로그인이 되어있을 경우, TodoList를 가져옵니다.
  if (isLoggedIn) {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    return todoList;
  }

  // 로그인이 되어있지 않을 경우, 빈 배열을 반환합니다.
  return [];
}

function addTodoItem(todoItem) {
  const todoList = getTodoList();
  todoList.push(todoItem);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function updateTodoItem(todoItem) {
  const todoList = getTodoList();
  const index = todoList.findIndex(item => item.id === todoItem.id);
  todoList[index] = todoItem;
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTodoItem(id) {
  const todoList = getTodoList();
  const filteredList = todoList.filter(item => item.id !== id);
  localStorage.setItem('todoList', JSON.stringify(filteredList));
}
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    // 현재 유저의 TodoList를 가져옴
    const todoList = JSON.parse(localStorage.getItem(`todoList_${currentUser.id}`)) || [];

    // TodoList를 출력함
    const todoListUl = document.getElementById('todo-list');
    todoList.forEach((todo) => {
      const todoLi = document.createElement('li');
      todoLi.textContent = todo.title;
      todoListUl.appendChild(todoLi);
    });

    // 로그아웃 버튼에 이벤트 리스너 등록
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      // 로컬 스토리지에서 로그인 정보 삭제
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    });
  } else {
    // 로그인이 되어있지 않은 경우 로그인 페이지로 이동
    window.location.href = 'index.html';
  }
});

