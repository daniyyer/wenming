import request from "../js/request";

export function fetchPages() {
  return request({
    url: "/api/pages",
    method: "get",
  });
}
