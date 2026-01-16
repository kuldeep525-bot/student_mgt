const addNote = document.getElementById("AddNote");

addNote.addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const Content = document.getElementById("Content").value.trim();

  if (!title || !Content) {
    alert("All Fields Are Required!");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/notes/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // JWT cookie
      body: JSON.stringify({ title: title, content: Content }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Notes created Successfully");
      window.location.href = "dashboard.html";
    } else {
      alert(
        data.message || (Array.isArray(data.error) ? data.error.join("\n") : "")
      );
    }
  } catch (error) {
    console.error(err);
    alert("Server error");
  }
});
