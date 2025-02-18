const mysql =  require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',      
  user: 'root',         
  password: 'vivek@987',   
  database: 'containify' 
});

 async function storeDockerFile(username, serviceName, ports, uniqueId) {
  try {
    console.log("Username:", username);
    console.log("Unique ID:", uniqueId);
    console.log("Service Name:", serviceName);
    console.log("Ports:", ports);

    const query = `
      INSERT INTO dockerfiles (username, service_name, ports, unique_id)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [username, serviceName, ports, uniqueId]);

    console.log("Dockerfile data stored successfully:", result.insertId);
  } catch (error) {
    console.error("Error storing Dockerfile data:", error);
  }
}

async function getDockerFiles(username) {
  try {
    const query = `
      SELECT service_name, ports, unique_id, created_at 
      FROM dockerfiles 
      WHERE username = ?
      ORDER BY created_at DESC
    `;

    const [rows] = await db.execute(query, [username]);
    return rows; 
  } catch (e) {
    console.error("Error fetching Dockerfiles:", e);
    return [];
  }
}


module.exports = {storeDockerFile, getDockerFiles}