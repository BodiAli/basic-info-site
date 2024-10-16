import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const PORT = 3000;

const server = createServer(async (req, res) => {
  const errorPagePath = "./src/404.html";
  const filePath = req.url === "/" ? "./src/index.html" : `./src${req.url}`;
  const extension = path.extname(filePath);
  let contentType = "text/html";

  if (extension === ".css") {
    contentType = "text/css";
  }

  try {
    const data = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  } catch (error) {
    const data = await readFile(errorPagePath);
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
