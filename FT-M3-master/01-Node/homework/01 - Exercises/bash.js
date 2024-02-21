const process = require("process");
const { Z_ASCII } = require("zlib");
const commands = require("./commands/index.js");

function print(output) {
  if (Array.isArray(output)) {
    output = output.join(" ");
  }
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

function bash() {
  process.stdout.write("prompt > ");

  process.stdin.on("data", data => {
    const input = data.toString().trim();
    const args = input.split(" ");
    const cmd = args.shift();

    if (commands[cmd]) {
      commands[cmd](print, args);
    } else {
      print(`command not found: ${cmd}`);
    }
  });
}

bash();
module.exports = {
  print,
  bash,
};
