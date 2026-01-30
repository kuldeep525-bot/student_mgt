import { getAllNotes, createNote } from "../services/notes.service.js";

let notes = [];
let allNotes = [];
// DOM
const grid = document.getElementById("notesGrid");
const empty = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addNote");
const modal = document.getElementById("noteModal");
const closeModal = document.getElementById("closeModal");
const saveNoteBtn = document.getElementById("saveNote");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");

// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");

// load saved theme
const savedTheme = localStorage.getItem("memora_theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

// toggle theme
themeToggle.onclick = () => {
  document.body.classList.toggle("light-theme");

  localStorage.setItem(
    "memora_theme",
    document.body.classList.contains("light-theme") ? "light" : "dark",
  );
};

// MODAL
addBtn.onclick = () => modal.classList.add("active");
closeModal.onclick = () => modal.classList.remove("active");

// RENDER
function render(list) {
  grid.innerHTML = "";

  if (!list.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  list.sort((a, b) => b.id - a.id); // agar `id` = Date.now()

  list.forEach((n) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <h4>${n.title}</h4>
      <p>${n.content}</p>
    `;
    grid.appendChild(div);
  });
}

// FETCH NOTES
async function loadNotes() {
  try {
    const data = await getAllNotes();

    allNotes = data.notes || [];
    notes = [...allNotes]; // copy

    render(notes);
  } catch (err) {
    console.error(err);
  }
}

// SAVE NOTE
saveNoteBtn.onclick = async () => {
  if (!noteTitle.value || !noteContent.value) return;

  try {
    await createNote({
      title: noteTitle.value,
      content: noteContent.value,
    });

    noteTitle.value = "";
    noteContent.value = "";
    modal.classList.remove("active");

    loadNotes(); // refresh from DB
  } catch (err) {
    console.error(err);
  }
};

// SEARCH
function debounce(fn, d = 400) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), d);
  };
}

const handleSearch = debounce((v) => {
  v = v.toLowerCase();

  notes = allNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(v) || n.content.toLowerCase().includes(v),
  );

  render(notes);
});

searchInput.addEventListener("input", (e) => handleSearch(e.target.value));

// PAGE LOAD
loadNotes();
