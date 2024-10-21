import express from "express";

const app = express();

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile("./src/index.html", { root: import.meta.dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./src/about.html", { root: import.meta.dirname });
});

app.get("/contact-me", (req, res) => {
  res.sendFile("./src/contact-me.html", { root: import.meta.dirname });
});

app.use((req, res) => {
  res.sendFile("./src/404.html", { root: import.meta.dirname });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// IMPLEMENTATION WITH VANILLA NODE.JS:
// const server = createServer(async (req, res) => {
//   const errorPagePath = "./src/404.html";
//   const filePath = req.url === "/" ? "./src/index.html" : `./src${req.url}`;
//   const extension = path.extname(filePath);
//   let contentType = "text/html";

//   if (extension === ".css") {
//     contentType = "text/css";
//   }

//   try {
//     const data = await readFile(filePath);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", contentType);
//     res.end(data);
//   } catch (error) {
//     const data = await readFile(errorPagePath);
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/html");
//     res.end(data);
//   }
// });
