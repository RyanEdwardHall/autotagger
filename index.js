const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const db = require('./classifier');

// application variables
const PORT = 3000;

app.use(bodyParser());

app.use(async ctx => {
  const {text, orgID } = ctx.request.body;

  try {
    const classifier = db.fetch(orgID);
    const label = classifier.getClassifications(text);
    ctx.body = label
  } catch (err) {
    ctx.throw(404, err.message);
  }
});

app.listen(PORT);
console.log(`ready and listening on ${PORT}`);
