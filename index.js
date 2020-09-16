const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const db = require('./classifier');

// application variables
const PORT = 3000;
app.use(cors());
app.use(async ctx => {
  const {text, orgID } = ctx.request.query;
  if (ctx.path === '/suggest') {
    ctx.body = JSON.stringify({
      idea: 'dummy idea label'
    })
  } else {
    if (!orgID) ctx.throw(400, 'Missing mandatory param "orgID"');
    if (!text) ctx.throw(400, 'Missing mandatory param "text"');

    try {
      const classifier = db.fetch(orgID);
      const label = classifier.getClassifications(text);
      ctx.body = label
    } catch (err) {
      ctx.throw(404, err.message);
    }
  }

});

app.listen(PORT);
console.log(`ready and listening on ${PORT}`);
