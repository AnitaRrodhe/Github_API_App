const PgClient = require("./PgClient");
const GithubAuth = require("./GithubAuth");

module.exports = async () => {

  const pgClient = new PgClient({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'db',
    password: process.env.PGPASSWORD || 'password',
    port: process.env.PGPORT || 5432,
  });
  // await pgClient.connect();

  const githubAuth = new GithubAuth({
    clientId: process.env.GITHUB_CLIENT_ID || "7cfa519ee84fc207a3db",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "df80aaff7cc82d421300d85597db854643124f40",
  });

  return {
    pgClient,
    githubAuth,
  };
};
