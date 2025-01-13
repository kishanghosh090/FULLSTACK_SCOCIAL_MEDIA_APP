import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 3000;

// connect to database
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
