import axios from "axios";
import React, { useContext, useState } from "react";
import { ContentContext } from "../context/contentContext";

interface FormData {
  repoUrl : string;
  baseImage: string;
  // workDir: string;
  // dependencies: string;
  updatePackage: string;
  // copyFiles: string;
  envVariables: string[];
  ports: string;
  startupCommand: string;
}

const DockerForm = () => {
  const context = useContext(ContentContext);
  
  if (!context) {
    throw new Error("Component must be used within a ContentProvider");
  }

  const { setContent } = context;

  const [formData, setFormData] = useState<FormData>({
    repoUrl : "",
    baseImage: "",
    // workDir: "",
    // dependencies: "",
    updatePackage: "",
    // copyFiles: "",
    envVariables: [],
    ports: "",
    startupCommand: ""
  });
  

  const [env, setEnv] = useState<string[]>([]);
  const [currEnv, setCurrEnv] = useState("");
  // const [content, setContentData] = useState ("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnv = () => {
    setEnv([...env, currEnv]);
    setFormData({ ...formData, envVariables: env });
  };

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault();
    // console.log("Dockerfile Config:", formData);
    
    // const result = await axios.get("http://localhost:3000/get-text");
    // const data = await result.data;
    // console.log(data);
    // setContent(data);

    const result = await axios.post("http://localhost:4000/generate-dockerfile", {
      repoUrl: formData.repoUrl,
      baseImage: formData.baseImage,
      envVariables: formData.envVariables, 
      ports: formData.ports,
      startupCommand: formData.startupCommand
    });

    const data = await result.data;
    console.log(data);
    setContent(data.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full max-w-md rounded-lg bg-transparent p-6 pl-8 pr-8 shadow-lg backdrop-blur-md border border-border">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Dockerfile Configuration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Repository URL</label>
            <input type="text" name="repoUrl" placeholder="e.g., https://github.com" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Base Image</label>
            <input type="text" name="baseImage" placeholder="e.g., node:18, python:3.9" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div>

          {/* <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Working Directory</label>
            <input type="text" name="workDir" placeholder="e.g., /app" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div> */}

          {/* <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Dependencies Installation</label>
            <textarea name="dependencies" placeholder="e.g., npm install" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required></textarea>
          </div> */}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Update Package Manager</label>
            <input type="text" name="updatePackage" placeholder="e.g., apt-get update, apk add" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div>

          {/* <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Copying Files</label>
            <input name="copyFiles" placeholder="e.g., COPY . /app, ADD url /destination" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required></input>
          </div> */}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Environment Variables</label>
            <div className="flex gap-2">
              <input type="text" name="envVariables" placeholder="e.g., ENV NODE_ENV=production"   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrEnv(e.target.value)}  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
              <button className="text-white border p-2" onClick={handleEnv}>Add</button>
            </div>
          </div>
          <div>
            {
                env.map((variable: string, idx: number) => (
                  <p className="text-white" key={idx}>{variable}</p>
                ))                  
            }
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Ports</label>
            <input type="text" name="ports" placeholder="e.g., 5000" className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Startup Command</label>
            <input type="text" name="startupCommand" placeholder={`e.g., CMD ["node", "server.js"]`} className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" onChange={handleChange} required />
          </div>

          <button type="submit" className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">Generate Dockerfile</button>
        </form>
      </div>
    </div>
  );
};

export default DockerForm;
