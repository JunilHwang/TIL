const Worker = class {
  run() { console.log('working') }
  print() { this.run() }
}

// Overriding
const HardWorker = class extends Worker {
  run() { console.log('HardWorking') }
}

const worker = new HardWorker()
console.log(worker instanceof Worker) // true. 대체가능성
worker.print() // HardWorker의 print. 내적일관성

console.log(worker.__proto__ === HardWorker.prototype); // true
console.log(HardWorker.prototype.__proto__ === Worker.prototype); // true
console.log(Worker.prototype.__proto__ === Object.prototype); // true

console.log(worker.__proto__ === HardWorker.prototype); // true
console.log(worker.__proto__.__proto__ === Worker.prototype); // true
console.log(worker.__proto__.__proto__.__proto__ === Object.prototype); // true
