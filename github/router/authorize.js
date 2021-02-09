module.exports = (ctx) => {
  const authorizeUrl = ctx.githubAuth.getAuthorizeUrl();
  ctx.redirect(authorizeUrl);
};
