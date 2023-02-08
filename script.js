const randomButton = document.querySelector(".random-button");
const infoContainer = document.querySelector(".info-container");
const goalCounter = document.querySelector(".goal-counter h2");
const taskList = document.querySelector(".task-list");

const numberOfTasks = 100;
const numberOfTasksToComplete = 10;

const getRandomPastelColor = function () {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 50) + 50;
  const l = Math.floor(Math.random() * 20) + 70;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

randomButton.addEventListener("click", function (event) {
  if (event.shiftKey) {
    for (let i = 0; i < numberOfTasksToComplete; i++) {
      let task;
      let iterations = 0;
      do {
        let randomTask = Math.floor(Math.random() * numberOfTasks) + 1;
        task = document.querySelector(`#task-${randomTask}`);
        iterations++;
      } while (
        task.classList.contains("completed") &&
        iterations < numberOfTasks
      );

      if (iterations < numberOfTasks) {
        let randomColor = getRandomPastelColor();
        task.style.backgroundColor = randomColor;
        task.classList.add("completed");
        saveTask(task.id);
        updateInfo(task.id);
        updateCounter();
        removeExclamationMark();
      }
    }
  } else {
    let task;
    let iterations = 0;
    do {
      let randomTask = Math.floor(Math.random() * numberOfTasks) + 1;
      task = document.querySelector(`#task-${randomTask}`);
      iterations++;
    } while (
      task.classList.contains("completed") &&
      iterations < numberOfTasks
    );

    if (iterations < numberOfTasks) {
      let randomColor = getRandomPastelColor();
      task.style.backgroundColor = randomColor;
      task.classList.add("completed");
      saveTask(task.id);
      updateInfo(task.id);
      updateCounter();
      removeExclamationMark();
    }
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("task")) {
    event.target.classList.add("completed");
    updateTaskColor(event.target);
    saveTask(event.target.id);
    updateInfo(event.target.id);
    updateCounter();
    removeExclamationMark();
  }
});

const updateCounter = function () {
  let completedTasks = document.querySelectorAll(".completed");
  goalCounter.innerHTML = `Completed: ${completedTasks.length} / ${numberOfTasks}`;
};

const updateInfo = function (taskId) {
  let date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateString = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  let info = `Last Fulfilled: ${dateString}`;
  let infoElement = document.querySelector(".info");

  if (!infoElement) {
    infoElement = document.createElement("p");
    infoElement.classList.add("info");
    infoContainer.appendChild(infoElement);
  }

  infoElement.innerHTML = info;

  localStorage.setItem(taskId, dateString);
};

loadTasks = function () {
  taskList.querySelectorAll(".task").forEach((task) => {
    let taskId = task.id;
    let dateString = localStorage.getItem(taskId);

    if (dateString) {
      task.classList.add("completed");
      updateTaskColor(task);
      updateInfo(taskId);
    }
  });
};

// loadTasks();

const saveTask = function (taskId) {
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  completedTasks.push(taskId);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
};

const generateTasks = function () {
  const taskList = document.querySelector(".task-list");
  for (let i = 1; i <= numberOfTasks; i++) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = `task-${i}`;
    taskList.appendChild(task);
  }
};

const updateTaskColor = function (task) {
  task.style.backgroundColor = getRandomPastelColor();
};

const addExclamationMark = function () {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    if (!task.classList.contains("completed")) {
      task.innerHTML = "!";
    }
  });
};

// function to remove exclamation mark from completed task
const removeExclamationMark = function () {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    if (task.classList.contains("completed")) {
      task.innerHTML = "";
    }
  });
};

generateTasks();
loadTasks();
updateCounter();
addExclamationMark();
