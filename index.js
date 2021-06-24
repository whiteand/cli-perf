const path = require("path");
const r = require("benchmark");

async function main({ suiteFilePath }) {
  const funcs = require(path.resolve(process.cwd(), suiteFilePath));
  const suite = new r.Benchmark.Suite();
  for (let [name, func] of Object.entries(funcs)) {
    if (typeof func !== "function") continue;
    suite.add(name, func);
  }
  suite.on("cycle", function (event) {
    console.log(String(event.target));
  });
  const promise = new Promise((resolve) =>
    suite.on("complete", function () {
      console.log("Fastest is " + this.filter("fastest").map("name"));
      resolve();
    })
  );

  suite.run({ async: true });

  await promise;
}

main({
  suiteFilePath: process.argv[2],
});
