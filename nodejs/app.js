const http = require("http");

const options = {
  hostname: "python-container",
  port: 8000,
  path: "/usage",
  method: "GET",
};

http
  .request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      data = JSON.parse(data);
      const cpuPercent = data.cpu_percent;
      const memPercent = data.mem_percent;

      const html = `
        <html>
          <head>
            <title>System Usage</title>
          </head>
          <body>
            <h1>System Usage</h1>
            <p>CPU usage: ${cpuPercent}%</p>
            <p>Memory usage: ${memPercent}%</p>
          </body>
        </html>
      `;

      console.log(html);
    });
  })
  .end();
