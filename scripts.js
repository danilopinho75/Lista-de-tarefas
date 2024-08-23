const input = document.querySelector(".input-task");
const button = document.querySelector(".btn-add-task");
const taskList = document.querySelector(".list-tasks");

let list = [];

function addTask() {
  if(input.value === "") {
    Swal.fire({
      title: "Digite um valor",
      text: "O campo está vazio, digite uma tarefa!",
      icon: "warning",
      background: "#0F1117",
      color: "#D1D7E3",
      confirmButtonColor: "#1BDD5D",
      iconColor: "#DF1818",
      animation: true,
      backdrop: `
      rgba(0,0,0,0.7)
      no-repeat
      `,
    });
    return;
  }
    list.push({
    task: input.value,
    complete: false,
  });
  input.value = "";
  viewTask();
}

function viewTask() {
  let newTask = "";

  list.forEach((item, index) => {
    newTask =
      newTask +
      `
            <li class="task">
                <img class="icon" src="./imgs/check.svg" alt="Concluir tarefa" onClick="completeTask(${index})">
                <p class="${item.complete && "done"}">${item.task}</p>
                <img class="icon" src="./imgs/trash.svg" alt="Apagar tarefa" onClick="removeItem(${index})">
            </li>
        `;
  });
  taskList.innerHTML = newTask;
  localStorage.setItem("lista", JSON.stringify(list));
}

function removeItem(index) {
  list.splice(index, 1);

  viewTask();
}

function completeTask(index) {
  list[index].complete = !list[index].complete;

  viewTask();
}

function reloadTasks() {
  const taskLocalStorage = localStorage.getItem("lista");

  if (taskLocalStorage) {
    list = JSON.parse(taskLocalStorage);
  }

  viewTask();
}

reloadTasks();
button.addEventListener("click", addTask);
