// Imports
'use strict';
const GameServer = require('./core/GameServer');
const ConsoleService = require('./core/ConsoleService.js');
const Readline = require('readline');

const VERSION = '11.8.5';
let gameServer = new GameServer();
let consoleService = new ConsoleService(gameServer, VERSION);
gameServer.setConsoleService(consoleService);

// Init variables
let showConsole = true;

// start the consoleService
consoleService.start();

// Handle arguments
process.argv.forEach(function (val) {
  if (val == "--noconsole") {
    showConsole = false;
  } else if (val == "--help") {
    console.log("Proper Usage: node index.js");
    console.log("    --noconsole         Disables the console");
    console.log("    --help              Help menu.");
    console.log("");
  }
});

// Add command handler
// todo breaking encapsulation
gameServer.commands = consoleService.commands.list;

// Run Ogar
gameServer.start(VERSION);

// Initialize the server console
if (showConsole) {
  let streamsInterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  setTimeout(consoleService.prompt(streamsInterface), 100);
}
