const newNote_btn = document.querySelector(".add-newnote-icon");
const close_btn = document.querySelector(".close-icon");
const save_btn = document.querySelector(".save-icon");
const notes = document.querySelector(".widgets");
const note_title = document.querySelector(".title input");
const note_content = document.querySelector(".content textarea");
const todoList_switch_button = document.querySelector('.todolist-icon');
const backto_mainpage_btn = document.querySelector('.backToMainMenu-icon');
// const deletenote_btn = document.querySelector(".note-widget .deleteNote-icon");

backto_mainpage_btn.addEventListener('click', ()=> {
  document.querySelector('.main-menu').style.display = 'block';
  document.querySelector('.todoList-container').style.display = 'none';
});

todoList_switch_button.addEventListener('click', ()=> {
  document.querySelector('.main-menu').style.display = 'none';
  document.querySelector('.todoList-container').style.display = 'block';
});

notes.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("note-widget") ||
    e.target.tagName === "H1" ||
    e.target.tagName === "P"
  ) {
    console.log("notes fun run");
    document.querySelector(".main-menu").style.display = "none";
    document.querySelector(".editor-container").style.display = "block";

    const note_widget = e.target.closest(".note-widget");
    const h1text = note_widget.querySelector("h1").innerHTML;
    const text = note_widget.querySelector("p").innerHTML;
    note_title.value = h1text;
    note_content.value = text;
    note_title.classList.add("created");

    note_widget.classList.add("opened");
    current_note_title = note_widget.querySelector("h1").innerHTML;
    current_note_content = note_widget.querySelector("p").innerHTML;
  }
});

save_btn.addEventListener("click", () => {
  const current_note = notes.querySelector(".note-widget.opened");
  if (note_title.value != "" || note_content.value != "") {
    if (!note_title.classList.contains("created")) {
      const div = document.createElement("div");
      div.classList.add("note-widget");
      div.innerHTML = `<h1>${note_title.value}</h1>
        <p>${note_content.value}</p>
        <div class="deleteNote-icon">
                    <i class='bx bx-trash'></i>
        </div>`;
      notes.appendChild(div);
      console.log("note create");
    } else {
      console.log("else condition of save btn is run");

      if (current_note) {
        current_note.querySelector("h1").innerHTML = note_title.value;
        current_note.querySelector("p").innerHTML = note_content.value;
      }
      current_note.classList.remove("opened");
    }
  }

  if (note_title.value === "" && note_content.value === "") {
    current_note.remove();
  }
  // localStorage.setItem("myNotes", notes.innerHTML);

  note_title.value = "";
  note_content.value = "";
  document.querySelector(".main-menu").style.display = "block";
  document.querySelector(".editor-container").style.display = "none";
  note_title.classList.remove("created");
});

newNote_btn.addEventListener("click", () => {
  note_title.value = "";
  note_content.value = "";

  document.querySelector(".main-menu").style.display = "none";
  document.querySelector(".editor-container").style.display = "block";
});

close_btn.addEventListener("click", () => {
  note_title.classList.remove("created");
  document.querySelector(".main-menu").style.display = "block";
  document.querySelector(".editor-container").style.display = "none";
});

// Attach the event listener to the parent element 'notes' to delete the note widget
notes.addEventListener("click", function (e) {
  // Check if the clicked element or its ancestor has the class 'deleteNote-icon'
  if (e.target.closest(".deleteNote-icon")) {
    // Find the closest '.note-widget' ancestor and remove it
    const noteWidget = e.target.closest(".note-widget");
    if (noteWidget) {
      noteWidget.remove();
    }
  }
});

// window.onbeforeunload = function () {
//   return true;    // preventing page from loading
// }

// document.addEventListener("DOMContentLoaded", () => {
//   notes.innerHTML = localStorage.getItem('myNotes');
// });











//  todoList-container scripting

const list = document.querySelector(".list");
const typingInput = document.querySelector(".typing-input");
const submitBtn = document.querySelector(".typing-form .input-wrapper .icon");
const typingForm = document.querySelector(".typing-form");

function loadData() {
  list.innerHTML = localStorage.getItem("Data");
}

function saveData() {
  localStorage.setItem("Data", list.innerHTML);
}

list.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" || e.target.tagName === "P") {
    e.target.parentElement.classList.toggle("complete");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  // saveData();
});

function addTask() {
  const div = document.createElement("div");
  div.classList.add("list-item");
  div.innerHTML = `<button></button><p>${typingInput.value}</p>                
  <span class='icon bx bxs-trash' ></span> `;
  list.appendChild(div);
  // saveData();
}

typingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  typingForm.reset();
});

// loadData();

// Make sure that the data stored and retrieved from local storage correctly 