const REGISTER = "/register"
const URL = "/url"
const FILE = "/file"
const ANALYZE = "/analyse"

export class Get {
  static ANALYZE_HISTORY = ANALYZE;
  static ANALYZE = [ANALYZE, "/"].join("");
}

export class Post {
  static REGISTER_FILE = [REGISTER, FILE].join("")
  static REGISTER_URL = [REGISTER, URL].join("")
}
