//fetch Notes

async function fetchNotes() {
  try {
    //get all notes api
    const response = await fetch(
      "http://localhost:4000/api/notes/getallnotes",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 401) {
      window.location.href = "login.html";
      return;
    }

    const data = await response.json();

    //show the userName to the top

    document.getElementById(
      "username"
    ).innerText = `Hello 👋,${data.user.name}`;

    document.getElementById("totalNotes").innerText = data.totalNotes;
    const table = document.getElementById("notesTable");
    table.innerHTML = "";

    data.notes.forEach((note) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${note.title}</td>
        <td>${new Date(note.createdAt).toLocaleDateString()}</td>
        <td>
          <button onclick="editNote('${note._id}')">Edit</button>
          <button onclick="deleteNote('${note._id}')">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });
  } catch (error) {
    alert("Failed to load notes");
  }
}

fetchNotes();
