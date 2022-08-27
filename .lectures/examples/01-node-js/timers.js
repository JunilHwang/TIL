const {
  setTimeout,
  setImmediate,
  setInterval,
  scheduler,
} = require('timers/promises');

setImmediate().then(() => console.log('setImmediate'));

setTimeout(1000).then(() => console.log('setTimeout'));

scheduler.wait(100).then(() => console.log('scheduler.wait'));

scheduler.yield().then(() => console.log('scheduler.yield'));

async function main() {
  const interval = 100;
  for await (const startTime of setInterval(interval, Date.now())) {
    const now = Date.now();
    console.log(now);
    if ((now - startTime) > 1000)
      break;
  }
  console.log(Date.now());
}

main();