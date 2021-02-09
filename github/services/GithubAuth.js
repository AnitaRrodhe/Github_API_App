const querystring = require("querystring");
const { default: axios } = require("axios");

class GithubAuth {

  #clientId
  #clientSecret

  constructor({ clientId, clientSecret }) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
  }

  getAuthorizeUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${this.#clientId}`;
  }

  async getAccessToken(code) {
    const response = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: this.#clientId,
      client_secret: this.#clientSecret,
      code,
    }, {
      responseType: "json",
    });
    
    const data = querystring.parse(response.data);
    if (data.error) {
      throw Object.assign(new Error(response.data.error_description), {
        code: data.error,
        uri: data.error_uri,
      });
    }

    return data.access_token;
  }
}

module.exports = GithubAuth;
