import React, { useState } from "react";

const DockerCompose = () => {
    const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    version: "",
    services: [
      {
        serviceName: "",
        image: "",
        buildContext: "",
        dockerfile: "",
        containerName: "",
        command: "",
        workingDir: "",
        volumes: "",
        ports: "",
        environment: "",
        restartPolicy: "",
        dependsOn: "",
        healthCheck: "",
        healthCheckInterval: "",
        healthCheckTimeout: "",
        healthCheckRetries: "",
      },
    ],
    networks: "",
    volumes: "",
    logging: "",
    secrets: "",
    extraHosts: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        if (index !== undefined) {
        const updatedServices = [...formData.services];
        const { name, value } = e.target;
    
        // Type assertion here
        updatedServices[index][name as keyof typeof updatedServices[0]] = value;
        setFormData({ ...formData, services: updatedServices });
        } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
  

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        {
          serviceName: "",
          image: "",
          buildContext: "",
          dockerfile: "",
          containerName: "",
          command: "",
          workingDir: "",
          volumes: "",
          ports: "",
          environment: "",
          restartPolicy: "",
          dependsOn: "",
          healthCheck: "",
          healthCheckInterval: "",
          healthCheckTimeout: "",
          healthCheckRetries: "",
        },
      ],
    });
  };

   async function handleSubmit (e: React.FormEvent) {
      e.preventDefault();
      console.log("Dockerfile Config:", formData);
      const response : any = await fetch ("", {
  
      })
      const data = await response.data;
      setContent (data);
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full max-w-md rounded-lg bg-transparent p-6 pl-8 pr-8 shadow-lg backdrop-blur-md border border-border">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Docker Compose Configuration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Version */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Version</label>
            <input
              type="text"
              name="version"
              placeholder="e.g., 3.8"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Services Section */}
          {formData.services.map((service, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Service {index + 1}</h3>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Service Name</label>
                <input
                  type="text"
                  name="serviceName"
                  value={service.serviceName}
                  placeholder="e.g., backend"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>

              {/* Image or Build */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Image</label>
                <input
                  type="text"
                  name="image"
                  value={service.image}
                  placeholder="e.g., nginx:latest"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
                <label className="mb-1 block text-sm font-medium text-gray-200">OR Build Context</label>
                <input
                  type="text"
                  name="buildContext"
                  value={service.buildContext}
                  placeholder="e.g., ./backend"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
                <label className="mb-1 block text-sm font-medium text-gray-200">Dockerfile</label>
                <input
                  type="text"
                  name="dockerfile"
                  value={service.dockerfile}
                  placeholder="e.g., Dockerfile"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              {/* Other fields */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Container Name</label>
                <input
                  type="text"
                  name="containerName"
                  value={service.containerName}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Command</label>
                <input
                  type="text"
                  name="command"
                  value={service.command}
                  placeholder="e.g., npm start"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Working Directory</label>
                <input
                  type="text"
                  name="workingDir"
                  value={service.workingDir}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Volumes</label>
                <input
                  type="text"
                  name="volumes"
                  value={service.volumes}
                  placeholder="e.g., ./app:/usr/src/app"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Ports</label>
                <input
                  type="text"
                  name="ports"
                  value={service.ports}
                  placeholder="e.g., 8080:80"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Environment Variables</label>
                <input
                  type="text"
                  name="environment"
                  value={service.environment}
                  placeholder="e.g., NODE_ENV=production"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Restart Policy</label>
                <input
                  type="text"
                  name="restartPolicy"
                  value={service.restartPolicy}
                  placeholder="e.g., always"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Depends On</label>
                <input
                  type="text"
                  name="dependsOn"
                  value={service.dependsOn}
                  placeholder="e.g., backend, database"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              {/* Health Check */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-200">Health Check Command</label>
                <input
                  type="text"
                  name="healthCheck"
                  value={service.healthCheck}
                  placeholder="e.g., CMD curl -f http://localhost"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleChange(e, index)}
                />
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-200">Interval</label>
                    <input
                      type="text"
                      name="healthCheckInterval"
                      value={service.healthCheckInterval}
                      placeholder="e.g., 30s"
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-200">Timeout</label>
                    <input
                      type="text"
                      name="healthCheckTimeout"
                      value={service.healthCheckTimeout}
                      placeholder="e.g., 5s"
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-200">Retries</label>
                    <input
                      type="text"
                      name="healthCheckRetries"
                      value={service.healthCheckRetries}
                      placeholder="e.g., 3"
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Service Button */}
          <button
            type="button"
            onClick={addService}
            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            Add Another Service
          </button>

          {/* Networks, Volumes, Logging, Secrets, and Extra Hosts */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Networks</label>
            <input
              type="text"
              name="networks"
              value={formData.networks}
              placeholder="e.g., my-network"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Volumes</label>
            <input
              type="text"
              name="volumes"
              value={formData.volumes}
              placeholder="e.g., db_data"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Logging Driver</label>
            <input
              type="text"
              name="logging"
              value={formData.logging}
              placeholder="e.g., json-file"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Secrets</label>
            <input
              type="text"
              name="secrets"
              value={formData.secrets}
              placeholder="e.g., API keys"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">Extra Hosts</label>
            <input
              type="text"
              name="extraHosts"
              value={formData.extraHosts}
              placeholder="e.g., host.docker.internal:host-gateway"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Generate Docker Compose File
          </button>
        </form>
      </div>
    </div>
  );
};

export default DockerCompose;
