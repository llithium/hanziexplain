const getAPIURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_API_URL ??
    "http://localhost:3333/";

  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};
export default getAPIURL;
