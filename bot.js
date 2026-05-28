const mineflayer = require('mineflayer');

// Bot configuration
const botOptions = {
  host: 'themc.mcsh.io',
  port: 12802,
  username: 'Gaming92hfskjdf',
  version: '1.20'  // Adjust version as needed for the server
};

// Create the bot
const bot = mineflayer.createBot(botOptions);

// Event: Bot spawned in the world
bot.on('spawn', () => {
  console.log('✓ Bot spawned successfully!');
  console.log(`Bot username: ${bot.username}`);
  console.log(`Bot is at coordinates: X=${bot.entity.position.x}, Y=${bot.entity.position.y}, Z=${bot.entity.position.z}`);
});

// Event: Chat message received
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  console.log(`[${username}]: ${message}`);
});

// Event: Bot dies
bot.on('death', () => {
  console.log('Bot died! Respawning...');
});

// Event: Error handling
bot.on('error', (err) => {
  console.error('Error:', err);
});

// Event: End (disconnected)
bot.on('end', () => {
  console.log('Bot disconnected from server');
});

// Event: Login (successful connection)
bot.on('login', () => {
  console.log('✓ Successfully logged in!');
});

// Keep the bot alive
setInterval(() => {
  if (bot.entity) {
    // Basic keep-alive: look around occasionally
    const rotation = Math.random() * Math.PI * 2;
    bot.look(rotation, 0);
  }
}, 30000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down bot gracefully...');
  bot.quit();
  process.exit(0);
});
