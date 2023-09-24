import fs from "fs";
import readline from "readline";
import { parse } from "csv-parse";

/**
 * @see https://nodejs.org/api/readline.html#example-read-file-stream-line-by-line
 */
export async function* processByLine(stream: fs.ReadStream) {
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    yield line;
  }
}
