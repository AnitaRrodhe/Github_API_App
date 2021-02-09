module.exports = async (ctx) => {

  const starred = await ctx.state.githubApi.getStarred();

  await ctx.render('starred', { starred });
  
};

