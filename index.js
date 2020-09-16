const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const db = require('./classifier');

const app = new Koa();

// application variables
const PORT = 3000;
app.use(cors());
app.use(bodyParser());
app.use(async ctx => {
  if (ctx.path !== '/suggest') ctx.throw(404);

  const { text } = ctx.request.body;
  if (!text) ctx.throw(400, 'Missing mandatory param "text"');

  try {
    const classifier = db.fetch('orgID1234');
    const results = classifier.getClassifications(text);
    ctx.body = JSON.stringify(results);
  } catch (err) {
    ctx.throw(500, err.message);
  }
});

app.listen(PORT);
console.log(`ready and listening on ${PORT}`);
