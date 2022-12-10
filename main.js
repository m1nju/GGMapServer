const port = 80,
    express = require("express"),
    app = express();


    

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
  