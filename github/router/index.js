const Router = require("@koa/router");
const authorize = require("./authorize");
const callback = require("./callback");
const starred = require("./starred");
const isAuthorized = require("../middlewares/isAuthorized");

const router = new Router();

router.get("/", (ctx) => ctx.redirect("/starred"));
router.get("/authorize", authorize);
router.get("/callback", callback);
router.get("/starred", isAuthorized, starred);

module.exports = router;
