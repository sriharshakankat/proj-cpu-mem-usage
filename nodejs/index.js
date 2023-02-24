const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  // Read data.json file
  fs.readFile('./data/data.json', (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('<h1>Internal Server Error</h1>');
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Generate the HTML content
    const html = `
      <html>
        <head>
          <title>System Metrics</title>
          <meta http-equiv="refresh" content="5">
        </head>
        <body>
          <h1>System Metrics</h1>
          <ul>
            <li>CPU Usage: ${jsonData.cpu_usage}%</li>
            <li>RAM Usage: ${jsonData.ram_usage.percent}%</li>
          </ul>
        </body>
      </html>
    `;

    res.end(html);
  });
});

server.listen(8090, () => {
  console.log('Server running at http://localhost:8090');
});

