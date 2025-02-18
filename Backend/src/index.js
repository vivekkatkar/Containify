const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const simpleGit = require("simple-git");
const path = require("path");
const rimraf = require("rimraf"); 
const {storeDockerFile, getDockerFiles} = require("./db.js")


const app = express();
const git = simpleGit().env({ GIT_ASKPASS: "echo" });

const techStackConfig = {
  nodejs: { baseImage: "node:18-alpine", installCmd: "RUN npm install" },
  python: { baseImage: "python:3.10", installCmd: "RUN pip install -r requirements.txt" },
  java: { baseImage: "openjdk:17", installCmd: "RUN mvn install" },
  golang: { baseImage: "golang:1.19", installCmd: "RUN go mod tidy" },
};

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/generate-dockerfile", async (req, res) => {
  try {
    const { serviceName, repoUrl, baseImage, envVariables, ports, startupCommand } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ success: false, message: "Repository URL is required" });
    }

    const selectedStack = techStackConfig[baseImage.toLowerCase()];
    if (!selectedStack) {
      return res.status(400).json({ success: false, message: "Unsupported tech stack" });
    }

    const { baseImage: selectedBaseImage, installCmd } = selectedStack;
    const uniqueId = uuidv4();
    const projectPath = `./projects/${uniqueId}`;

    fs.mkdirSync(projectPath, { recursive: true });

    await git.clone(repoUrl, projectPath, ["--depth", "1"])
      .then(() => console.log(`Repo cloned successfully into ${projectPath}`))
      .catch(err => console.error(`Git clone failed: ${err.message}`));

    let dockerfileContent = `FROM ${selectedBaseImage}\n`;
    dockerfileContent += `WORKDIR /app\n`;
    dockerfileContent += `COPY . .\n`;
    dockerfileContent += `${installCmd}\n`;

    envVariables.forEach(env => {
      dockerfileContent += `ENV ${env.split("=")[0]}=${env.split("=")[1]}\n`;
    });

    if (startupCommand) {
      const cmdArray = startupCommand.split(" ").map(arg => `"${arg}"`).join(", ");
      dockerfileContent += `CMD [${cmdArray}]\n`;
    }

    fs.writeFileSync(path.join(projectPath, "Dockerfile"), dockerfileContent);
    fs.writeFileSync(path.join(projectPath, "metadata.json"), JSON.stringify({ ports }));

    // fs.readdirSync(projectPath).forEach(file => {
    //   if (file !== "Dockerfile" && file !== "metadata.json") {
    //     const filePath = path.join(projectPath, file);
    //     if (fs.lstatSync(filePath).isDirectory()) {
    //       rimraf.sync(filePath); 
    //     } else {
    //       fs.unlinkSync(filePath); 
    //     }
    //   }
    // });
    
    await storeDockerFile("vivek", serviceName, ports, uniqueId);
    res.send({ success: true, id: uniqueId, message: "Dockerfile generated!", content : dockerfileContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error generating Dockerfile" });
  }
});

app.post("/run-container", async (req, res) => {
  try {
    const { id } = req.body;
    const projectPath = `./projects/${id}`;

    if (!fs.existsSync(projectPath)) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const metadata = JSON.parse(fs.readFileSync(`${projectPath}/metadata.json`, "utf8"));
    const internalPort = metadata.ports || 8080;
    const externalPort = Math.floor(Math.random() * (65535 - 1024) + 1024);

    const containerName = `container_${id}`;
    const buildCommand = `docker build -t ${containerName} ${projectPath}`;
    const runCommand = `docker run -d -p ${externalPort}:${internalPort} --name ${containerName} ${containerName}`;

    exec(buildCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return res.status(500).json({ success: false, message: "Error building Docker image" });
      }

      exec(runCommand, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
          return res.status(500).json({ success: false, message: "Error running container" });
        }

        res.json({
          success: true,
          message: "Container started!",
          containerId: stdout.trim(),
          accessUrl: `http://localhost:${externalPort}`,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error running container" });
  }
});

app.post("/get-services", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const services = await getDockerFiles(username);

    res.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, message: "Error fetching services" });
  }
});









app.listen(4000, () => {
  console.log(`App is running on port 4000`);
});