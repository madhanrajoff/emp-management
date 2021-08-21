
class HttpHelper {
  static Link() {
    let http = process.env.REACT_APP_HTTP_LINK,
      https = process.env.REACT_APP_HTTPS_LINK;
    return https ? https : http;
  }
}

export default HttpHelper;
