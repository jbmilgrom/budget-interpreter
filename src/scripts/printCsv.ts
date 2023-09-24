import { createReadStream } from "fs";
import { parse } from "csv-parse";
import minimist from "minimist";

const { file, range } = minimist(process.argv.slice(2));

if (!file) {
  throw new Error("Specify a --file parameter to continue.");
}

const [first, last] = range ? range.split("-").map((n: string) => parseInt(n)) : [0, Infinity];

console.log(`Range: (${first}, ${last})\n`);

(async () => {
  const fileStream = createReadStream(file).pipe(parse({ columns: true }));

  let i = 0;
  for await (const line of fileStream) {
    if (i > last) {
      return;
    }
    if (i < first) {
      continue;
    }
    console.log("line", line);
    i++;
  }
})();
