# Minecraft Bot

A simple Minecraft bot that automatically joins a server.

## Configuration

- **Server IP:** themc.mcsh.io
- **Port:** 12802
- **Username:** Gaming92hfskjdf
- **Password:** None (not required)

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

## Deployment on Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the `Procfile`
3. The bot will start automatically with `npm start`
4. Check logs in the Railway dashboard

## Features

- ✓ Auto-connects to the server
- ✓ Logs chat messages
- ✓ Handles disconnections
- ✓ Graceful shutdown support
- ✓ Keep-alive mechanism

## Version

Adjust the Minecraft version in `bot.js` if needed based on your server version.
