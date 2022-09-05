import { fetchPages } from "api/article";

$.getJSON("../pagelist/pagelist.json", function (json) {
  console.log(json);
});

$.getJSON("../pagelist/pagelist.json", function (json) {
  let $channelList = $("#channel-list");
  let channelO = json;
  for (let key in channelO) {
    let $col = $('<div class="col-4"></div>');
    $channelList.append($col);
    let $head = $("<h2></h2>").append(channelO[key].name);
    $col.append($head);

    let pageList = channelO[key].list;
    let pageListLen = pageList.length;
    if (pageListLen) {
      let $ul = $('<ul class="list-group"></ul>');
      for (let i = 0; i < pageList.length; i++) {
        let $li = $(
          `<a href="${pageList[i].url}" class="list-group-item list-group-item-action d-flex justify-content-between" target="_blank">${pageList[i].name} <span class="badge bg-light text-dark ">${pageList[i].key}</span></a>`,
        );
        $ul.append($li);
      }
      $col.append($ul);
    }
  }
});
