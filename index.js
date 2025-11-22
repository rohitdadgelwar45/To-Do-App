document.addEventListener('DOMContentLoaded',function(){
  let storedTask=JSON.parse(localStorage.getItem('taskList'));
  if(storedTask){
    for(let index=0; index<storedTask.length; index++){
      taskList[index]=storedTask[index];
    }
  }
  showTask();
  updateStat();
})


let taskList = [];

function saveTask(){
  localStorage.setItem('taskList',JSON.stringify(taskList));
}

document.getElementById("addBtn").addEventListener("click", function (event) {
  event.preventDefault();

  // first calling add function after click on add button
  addTask();
});

function addTask() {
  let inputEl = document.getElementById("inputEl");
  let task = inputEl.value.trim();
  //   console.log(task);

  if (task) {
    taskList.push({ task: task, completed: false });
  }

  showTask();
  updateStat();
  inputEl.value = "";
  saveTask();
}

function showTask() {
  let showTaskListEl = document.getElementById("taskList");

  showTaskListEl.innerHTML = "";
  for (let index = 0; index < taskList.length; index++) {
    let task = taskList[index];

    let newTask = document.createElement("li");
    newTask.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox ${
                      task.completed ? "checked" : ""
                    }">
                    <p>${task.task}</p>
                </div>
                <div class="icons">
                    <img src="./edit.png" alt="Edit" onclick="editTask(${index})">
                    <img src="./delete.png" alt="Delete" onclick="deleteTask(${index})">
                </div>
            </div>
            `;
    // console.log(task.completed);
    newTask.querySelector("input").addEventListener("change", function () {
      toggleTaskComplete(index);
    });
    showTaskListEl.appendChild(newTask);
  }
}

function toggleTaskComplete(index) {
  // taskList[index].completed = !taskList[index].completed;
  if (taskList[index].completed === true) {
    taskList[index].completed = false;
  } else {
    taskList[index].completed = true;
  }
  //   console.log(taskList[index].completed)
  showTask();
  updateStat();
  saveTask();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  showTask();
  updateStat();
  saveTask();
}

function editTask(index) {
  let inputEl = document.getElementById("inputEl");
  inputEl.value = taskList[index].task;

  taskList.splice(index, 1);
  showTask();
  updateStat();
  saveTask();
}

function updateStat() {
  let completeTask = taskList.filter((task) => task.completed).length;
  let totalTasks = taskList.length;
  let progress = (completeTask / totalTasks) * 100;
  let progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById('numbers').innerText=`${completeTask} / ${totalTasks}`;
  if(taskList.length && completeTask==totalTasks){
    blaskConfetti();
  }
}

// function for generate animation 
function blaskConfetti(){
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
