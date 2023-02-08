// localStorage.clear();

const randomButton = document.querySelector(".random-button");
const infoContainer = document.querySelector(".info-container");
const goalCounter = document.querySelector(".goal-counter h2");
const taskList = document.querySelector(".task-list");

const numberOfTasks = 100;
const numberOfTasksToComplete = 5;

let mouseDown = false;

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
        task.classList.add("pulsate");
        saveTask(task.id);
        updateInfo(task.id);
        updateCounter();
        markAsFinished();
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
      task.classList.add("pulsate");
      saveTask(task.id);
      updateInfo(task.id);
      updateCounter();
      markAsFinished();
    }
  }
});

const handleTaskClick = function (event) {
  if (
    event.target.classList.contains("task") &&
    !event.target.classList.contains("completed")
  ) {
    event.target.classList.add("completed");
    event.target.classList.add("pulsate");
    updateTaskColor(event.target);
    saveTask(event.target.id);
    updateInfo(event.target.id);
    updateCounter();
    markAsFinished();
  }
};

document.addEventListener("mousedown", function (event) {
  mouseDown = true;
  handleTaskClick(event);
});

document.addEventListener("mousemove", function (event) {
  if (mouseDown && event.target.classList.contains("task")) {
    handleTaskClick(event);
  }
});

document.addEventListener("mouseup", function (event) {
  mouseDown = false;
});

document.addEventListener("mouseleave", function () {
  mouseDown = false;
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

const markAsUnfinished = function () {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    if (!task.classList.contains("completed")) {
      task.innerHTML = "!";
    }
  });
};

// function to remove exclamation mark from completed task
const markAsFinished = function () {
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
markAsUnfinished();
