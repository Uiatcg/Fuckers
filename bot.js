const mineflayer = require('mineflayer');

// Bot configuration
const botOptions = {
  host: 'themc.mcsh.io',
  port: 12802,
  username: 'Gaming92hfskjdf',
  version: false,  // Auto-detect server version
  hideErrors: false
};

let bot;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const reconnectDelay = 5000; // 5 seconds

function createBot() {
  console.log(`[${new Date().toISOString()}] Attempting to connect... (Attempt ${reconnectAttempts + 1}/${maxReconnectAttempts})`);
  
  bot = mineflayer.createBot(botOptions);

  // Event: Bot spawned in the world
  bot.on('spawn', () => {
    reconnectAttempts = 0;
    console.log(`[${new Date().toISOString()}] ✓ Bot spawned successfully!`);
    console.log(`Bot username: ${bot.username}`);
    console.log(`Bot is at coordinates: X=${Math.round(bot.entity.position.x)}, Y=${Math.round(bot.entity.position.y)}, Z=${Math.round(bot.entity.position.z)}`);
  });

  // Event: Chat message received
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  // Event: Bot dies
  bot.on('death', () => {
    console.log(`[${new Date().toISOString()}] Bot died! Respawning...`);
  });

  // Event: Error handling
  bot.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
  });

  // Event: End (disconnected)
  bot.on('end', (reason) => {
    console.log(`[${new Date().toISOString()}] Bot disconnected: ${reason}`);
    
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      console.log(`[${new Date().toISOString()}] Reconnecting in ${reconnectDelay / 1000} seconds...`);
      setTimeout(createBot, reconnectDelay);
    } else {
      console.error(`[${new Date().toISOString()}] Max reconnection attempts reached. Stopping bot.`);
      process.exit(1);
    }
  });

  // Event: Login (successful connection)
  bot.on('login', () => {
    console.log(`[${new Date().toISOString()}] ✓ Successfully logged in!`);
  });

  // Keep the bot alive
  setInterval(() => {
    if (bot && bot.entity) {
      // Basic keep-alive: rotate view
      const rotation = Math.random() * Math.PI * 2;
      bot.look(rotation, 0);
    }
  }, 30000);
}

// Start the bot
createBot();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(`\n[${new Date().toISOString()}] Shutting down bot gracefully...`);
  if (bot) {
    bot.quit();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n[${new Date().toISOString()}] SIGTERM received, shutting down...`);
  if (bot) {
    bot.quit();
  }
  process.exit(0);
});
