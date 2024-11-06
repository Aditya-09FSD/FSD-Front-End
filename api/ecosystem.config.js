module.exports = {
  apps: [
    {
      name: 'socket_server',
      script: 'socket_server.js',
      cwd: './octalol_api/sockets/main_servers',
      out: '../cli_logs/socket.log',
      err: '../cli_logs/socket.err.log',
      autorestart: true,
    },
    {
      name: 'chart_server',
      script: 'chart_api_socket_server.js',
      cwd: './octalol_api/sockets/main_servers',
      out: '../cli_logs/chart.log',
      err: '../cli_logs/chart.err.log',
      autorestart: true,
    },
    {
      name: 'forex_getter',
      script: 'finhubgetterf.js',
      cwd: './octalol_api/sockets/live_runners',
      out: '../cli_logs/fgetter.log',
      err: '../cli_logs/fgetter.err.log',
      autorestart: true,
    },
    {
      name: 'ohcl',
      script: 'live_converter.js',
      cwd: './octalol_api/sockets/live_runners',
      out: '../cli_logs/ohcl.log',
      err: '../cli_logs/ohcl.err.log',
      autorestart: true,
    },
  ],
};
