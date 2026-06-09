import { app } from "./src/app.js";
import { connectDb } from "./src/config/db.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
