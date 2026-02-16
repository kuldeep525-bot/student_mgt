import cron from "node-cron";
import Notes from "../models/notes.model.js";

// Run daily at 2:00 AM
cron.schedule("0 2 * * *", async () => {
  try {
    console.log("Running automatic cleanup job...");

    // Current date
    const now = new Date();

    // 30 days ago date
    const thresholdDate = new Date();
    thresholdDate.setDate(now.getDate() - 30);

    // Delete notes older than 30 days
    const result = await Notes.deleteMany({
      isDeleted: true,
      deletedAt: { $lte: thresholdDate },
    });

    console.log(`${result.deletedCount} old notes permanently deleted.`);
  } catch (error) {
    console.log("Cleanup Job Error:", error);
  }
});
