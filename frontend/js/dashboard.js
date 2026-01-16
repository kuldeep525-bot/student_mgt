async function fetchNotes() {
  try {
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
    console.log(data);

    // username
    document.getElementById(
      "username"
    ).innerText = `Hello 👋, ${data.user.name}`;

    // total notes
    document.getElementById("totalNotes").innerText = data.totalNotes;

    const table = document.getElementById("notesTable");
    table.innerHTML = "";

    // empty state
    if (data.notes.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="2" style="text-align:center; padding:20px;">
            No notes found 📭
          </td>
        </tr>
      `;
      document.getElementById("lastUpdated").innerText = "—";
      return;
    }

    // sort notes by createdAt descending for lastUpdated
    const sortedNotes = data.notes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // last updated (latest note)
    const latestDate = new Date(sortedNotes[0].createdAt);
    document.getElementById("lastUpdated").innerText =
      latestDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    // notes render
    sortedNotes.forEach((note) => {
      const createdDate = new Date(note.createdAt);
      const formattedDate = createdDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const row = document.createElement("tr");

      row.innerHTML = `
        <td data-label="Title">${note.title}</td>
        <td data-label="Created">${formattedDate}</td>
      `;

      table.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    alert("Failed to load notes");
  }
}

fetchNotes();
