const GithubApi = require("../services/GithubApi");

module.exports = async (ctx) => {
  const code = ctx.request.query.code;
  if (!code) {
    return ctx.redirect("/authorize");
  }
  try {
    const accessToken = await ctx.githubAuth.getAccessToken(code);
    ctx.state.githubApi = new GithubApi(accessToken);
    ctx.session.accessToken = accessToken;
    
    const user = await ctx.state.githubApi.getUser();
    ctx.session.userId = user.id;
    
    const starred = await ctx.state.githubApi.getStarred();
    

    ctx.redirect("/starred");
  } catch (err) {
    ctx.redirect(err.uri);
  }
};
