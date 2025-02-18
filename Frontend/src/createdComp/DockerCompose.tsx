import React, { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  service_name: string;
  ports: string;
  unique_id: string;
}

interface SelectedService {
  folderId: string;
  port: number;
  env: string[];
  depends_on?: string[];
}

interface PredefinedServiceConfig {
  image: string;
  port: number;
  env: string[];
}

const predefinedServices = [
  { name: "MongoDB", image: "mongo", port: 27017 },
  { name: "MySQL", image: "mysql", port: 3306 },
];

const DockerCompose: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Record<string, SelectedService>>({});
  const [selectedPredefined, setSelectedPredefined] = useState<Record<string, PredefinedServiceConfig>>({});

  useEffect(() => {
    axios.post("http://localhost:4000/get-services", { username: "vivek" }).then((response) => {
      if (response.data.success) {
        setAvailableServices(response.data.services);
      }
    });
  }, []);

  const handleServiceSelection = (service: Service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service.service_name]: {
        folderId: service.unique_id,
        port: Number(service.ports),
        env: [],
        depends_on: [],
      },
    }));
  };

  const handlePredefinedSelection = (serviceName: string) => {
    const service = predefinedServices.find((s) => s.name === serviceName);
    if (!service) return;
    setSelectedPredefined((prev) => ({
      ...prev,
      [serviceName]: { image: service.image, port: service.port, env: [] },
    }));
  };

  const handleDependsOnChange = (serviceName: string, dependency: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        depends_on: [...(prev[serviceName].depends_on || []), dependency],
      },
    }));
  };

  const handleEnvChange = (serviceName: string, index: number, value: string, isPredefined: boolean) => {
    if (isPredefined) {
      setSelectedPredefined((prev) => {
        const updatedEnvs = [...prev[serviceName].env];
        updatedEnvs[index] = value;
        return { ...prev, [serviceName]: { ...prev[serviceName], env: updatedEnvs } };
      });
    } else {
      setSelectedServices((prev) => {
        const updatedEnvs = [...prev[serviceName].env];
        updatedEnvs[index] = value;
        return { ...prev, [serviceName]: { ...prev[serviceName], env: updatedEnvs } };
      });
    }
  };

  const addEnvVariable = (serviceName: string, isPredefined: boolean) => {
    if (isPredefined) {
      setSelectedPredefined((prev) => ({
        ...prev,
        [serviceName]: { ...prev[serviceName], env: [...prev[serviceName].env, ""] },
      }));
    } else {
      setSelectedServices((prev) => ({
        ...prev,
        [serviceName]: { ...prev[serviceName], env: [...prev[serviceName].env, ""] },
      }));
    }
  };

  const handleSubmit = async () => {
    const services = { ...selectedServices, ...selectedPredefined };
    console.log({ project_name: projectName, services });

    // await axios.post("http://localhost:4000/create-compose", { project_name: projectName, services });
  };

  return (
    <div className="container p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Docker Compose File</h2>

      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter project name"
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Select Your Services</h3>
      {availableServices.map((service) => (
        <div key={service.unique_id} className="flex items-center space-x-4 mb-2">
          <input type="checkbox" onChange={() => handleServiceSelection(service)} />
          <label>{service.service_name} (Port: {service.ports})</label>
        </div>
      ))}

      {Object.keys(selectedServices).map((serviceName) => (
        <div key={serviceName} className="mb-4">
          <h4 className="font-semibold">{serviceName} Environment Variables:</h4>
          {selectedServices[serviceName].env.map((env, index) => (
            <input
              key={index}
              type="text"
              value={env}
              onChange={(e) => handleEnvChange(serviceName, index, e.target.value, false)}
              className="p-2 border rounded w-full mb-2"
              placeholder="KEY=VALUE"
            />
          ))}
          <button onClick={() => addEnvVariable(serviceName, false)} className="text-blue-500">+ Add Variable</button>

          <h4 className="font-semibold mt-2">Depends On:</h4>
          <select
            onChange={(e) => handleDependsOnChange(serviceName, e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a dependency</option>
            {[
              ...Object.keys(selectedServices),
              ...Object.keys(selectedPredefined),
            ].map((s) =>
              s !== serviceName ? <option key={s} value={s}>{s}</option> : null
            )}
          </select>
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-4 mb-2">Add Predefined Services</h3>
      <select className="w-full p-2 border rounded" onChange={(e) => handlePredefinedSelection(e.target.value)}>
        <option value="">Select a service</option>
        {predefinedServices.map((service) => (
          <option key={service.name} value={service.name}>{service.name}</option>
        ))}
      </select>

      <div className="mt-4">
        {Object.keys(selectedPredefined).map((serviceName) => (
          <div key={serviceName} className="mb-4">
            <h4 className="font-semibold">{serviceName} Environment Variables:</h4>
            {selectedPredefined[serviceName].env.map((env, index) => (
              <input
                key={index}
                type="text"
                value={env}
                onChange={(e) => handleEnvChange(serviceName, index, e.target.value, true)}
                className="p-2 border rounded w-full mb-2"
                placeholder="KEY=VALUE"
              />
            ))}
            <button onClick={() => addEnvVariable(serviceName, true)} className="text-blue-500">+ Add Variable</button>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Generate Docker Compose</button>
    </div>
  );
};

export default DockerCompose;
