import mongoose from "mongoose";
import dotenv from "dotenv";
import Notes from "./src/models/notes.model.js";
import connectdb from "./src/config/db.js";

dotenv.config();

// DB Connect
await connectdb();

// Change this to the ID of the user you want to assign notes to
const USER_ID = "69747b00d2d41e52a74790c9"; // example userId

async function seedNotes() {
  try {
    const notesArray = [];
    let timestamp = Date.now(); // base timestamp

    for (let i = 1; i <= 100; i++) {
      notesArray.push({
        title: `Test Note ${i}`,
        content: `This is a dummy note for testing purposes number ${i}.`,
        UserNote: USER_ID,
        isArchived: false,
        isDeleted: false,
        isFavourite: false,
        createdAt: new Date(timestamp),
        updatedAt: new Date(timestamp),
      });
      timestamp += 1000; // next note 1 second later
    }

    await Notes.insertMany(notesArray);
    console.log("✅ 100 dummy notes created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedNotes();
