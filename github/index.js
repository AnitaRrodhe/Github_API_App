const Koa = require("koa");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const router = require("./router");
const getServices = require("./services");

const render = views(__dirname + '/views', { extension: 'pug' });

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

async function main() {
  const app = new Koa();

  app.use(bodyParser());
  app.use(session({
    key: "koa.sess",
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: null,
  }, app));
  app.use(render);

  const services = await getServices();
  app.context = Object.assign(app.context, services);

  app.use(router.routes()).use(router.allowedMethods());
  
  app.listen(port, host);

  console.log(`started webserver at: ${host}:${port}`);
}

main().catch(console.error);
