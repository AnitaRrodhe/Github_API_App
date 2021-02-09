const GithubApi = require("../services/GithubApi");

module.exports = async (ctx, next) => {
  if (!ctx.session.accessToken) {
    const authorizeUrl = ctx.githubAuth.getAuthorizeUrl();
    ctx.redirect(authorizeUrl);
    return;
  }
  ctx.state.githubApi = new GithubApi(ctx.session.accessToken);
  await next();
}
