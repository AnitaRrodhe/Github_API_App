const { default: axios } = require("axios");

class GithubApi {

  #accessToken

  constructor(accessToken) {
    this.#accessToken = accessToken;
  }

  async getStarred() {
    const response = await axios.get("https://api.github.com/user/starred", {
      responseType: "json",
      headers: {
        Authorization: `token ${this.#accessToken}`,
      },
    });
    return response.data;
  }

  async getUser() {
    const response = await axios.get("https://api.github.com/user", {
      responseType: "json",
      headers: {
        Authorization: `token ${this.#accessToken}`,
      },
    });
    return response.data;
  }
}

module.exports = GithubApi;
