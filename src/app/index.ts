import express from "express";
import { footerTemplate, htmlTemplate, routeList } from "./templates";
import { ROUTES } from "./routes";

const app = express();

/**
 * These configurations are needed to be receive form data in POST methods
 *
 * @see https://stackoverflow.com/a/12008719/3645851
 * @see https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT /* needed for Heroku deployment */ ?? 3003;

app.get("/", async (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(
    Buffer.from(
      htmlTemplate(/*html*/ `
    <h1>Budget Interpreter</h1>
    <ul>
      ${routeList(ROUTES)}
    </ul>
    ${footerTemplate()}
  `)
    )
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
