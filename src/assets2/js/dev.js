import { fetchPages } from "api/article";
import free from "images/coreui/free.svg";

console.log("development");
fetchPages().then((response) => {
  let $channelList = $("#channel-list");
  let channelO = response.data;
  let $toggleBtn = $(`<button class="btn btn-primary  c-class-toggler " type="button" data-target="#menu-list-sidebar" data-class="c-sidebar-lg-show"  id="toggleMenuList">
        <svg class="c-icon c-icon-lg">
            <use xlink:href=${free}#cil-menu></use>
        </svg>
    </button>`);
  $("body").append($toggleBtn);

  let $pageMenuWrapper = $(`<div class="c-sidebar c-sidebar-dark c-sidebar-fixed" id="menu-list-sidebar">
<h1>menu</h1>
    <ul class="c-sidebar-nav page-menu-list">
    </ul>
</div>`);

  $("body").append($pageMenuWrapper);

  let $pageMenuList = $pageMenuWrapper.find(".page-menu-list");

  for (let key in channelO) {
    // let $col = $(`<div class="col-4"></div>`);
    // $channelList.append($col);
    // let $head = $("<h2></h2>").append(channelO[key].name);
    // $col.append($head);

    // let pageList = channelO[key].list;
    // let pageListLen = pageList.length;
    // if (pageListLen) {
    //   let $ul = $('<ul class="list-group"></ul>');
    //   for (let i = 0; i < pageList.length; i++) {
    //     let $li = $(
    //       `<a href="${pageList[i].url}" class="list-group-item list-group-item-action d-flex justify-content-between">${pageList[i].name} <span class="badge bg-light text-dark ">${pageList[i].key}</span></a>`,
    //     );
    //     $ul.append($li);
    //   }
    //   $col.append($ul);
    // }

    let $channelWrapper = $(`<li class="c-sidebar-nav-title">${channelO[key].name}</li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown c-show channel-list">
            <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
                 ${key}
            </a>
        </li>`);
    $pageMenuList.append($channelWrapper);
    let $channelList = $channelWrapper.eq(2);

    let pageList = channelO[key].list;
    let pageListLen = pageList.length;
    if (pageListLen) {
      let $ul = $('<ul class="c-sidebar-nav-dropdown-items"></ul>');
      for (let i = 0; i < pageListLen; i++) {
        let $li = $(
          `<li class="c-sidebar-nav-item"><a class="c-sidebar-nav-link" href="${pageList[i].url}"><span class="c-sidebar-nav-icon"></span> ${pageList[i].name} <span class="badge bg-dark text-white ">${pageList[i].key}.html</span></a></li>`,
        );
        $ul.append($li);
      }

      $channelList.append($ul);
    }
  }
});
