module.exports = {
  apps: [
    {
      name: "Rucksa PM2",
      script: "server.js",
      error_file: "/dev/stdout",
      out_file: "/dev/stdout",
      merge_logs: true,
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      restart_delay: 5000,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
