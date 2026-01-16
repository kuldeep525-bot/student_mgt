const tableBody = document.querySelector(".notes-table tbody");
const addNotes = document.getElementById("openAddNote");

//addNotes

addNotes.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "addNotes.html";
});

// Page load hote hi notes fetch karo
document.addEventListener("DOMContentLoaded", () => {
  fetchNotes();
});

async function fetchNotes() {
  try {
    const res = await fetch("http://localhost:4000/api/notes/getallnotes", {
      method: "GET",
      credentials: "include", // JWT cookie send
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch notes");
    }

    renderNotes(data.notes, data);
  } catch (error) {
    console.error(error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">Failed to load notes ❌</td>
      </tr>
    `;
  }
}

// Notes ko table me render karo
function renderNotes(notes) {
  tableBody.innerHTML = "";

  if (notes.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">No notes found</td>
      </tr>
    `;
    return;
  }

  notes.forEach((note) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Title">${note.title}</td>
      <td data-label="Student">${note.UserNote?.name || "N/A"}</td>
      <td data-label="Date">${formatDate(note.createdAt)}</td>
      <td data-label="Actions" class="text-right">
        <div class="table-actions">
          <button class="action-btn action-edit" data-id="${note._id}">
            Edit
          </button>
          <button class="action-btn action-delete" data-id="${note._id}">
            Delete
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

// Date format helper
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
