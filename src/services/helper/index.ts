import { MD5 } from "crypto-js";
import cookie from "services/cookie";

function calculateMD5Sign({
  method,
  body,
  url,
}: {
  method: string;
  url: string;
  body: string;
}): string {
  const dataString: string = `${method.toUpperCase()}${url}${JSON.stringify(
    body
  )}${cookie.get("secret")}`;

  switch (method) {
    case "get":
    case "delete":
      return MD5(method.toUpperCase() + url + cookie.get("secret")).toString();
    case "post":
    case "patch":
      return MD5(dataString).toString();
    default:
      return "";
  }

  // const dataString: string = `${method.toUpperCase()}+${url}+${body}+${userSecret}`;
  // const md5Hash: string = MD5(dataString).toString();
  // return md5Hash;
}

export default calculateMD5Sign;
