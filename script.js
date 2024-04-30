document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });
  
  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach(function(task, index) {
      var li = document.createElement('li');
      li.textContent = task;
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', function() {
        deleteTask(index);
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
  
  function addTask() {
    var taskInput = document.getElementById('taskInput');
    var task = taskInput.value.trim();
    if (task !== '') {
      var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      loadTasks();
    }
  }
  
  function deleteTask(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
  