let hostname = window.location.hostname;
let pathname = window.location.pathname.toLowerCase();
let isJumpToH5 = true;
if (pathname.includes("cxy")) {
  isJumpToH5 = false;
}
if (isJumpToH5) {
  var hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  function isPC() {
    //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  let ispc = isPC();
  if (!ispc) {
    let hostname = window.location.hostname;
    let pathname = window.location.pathname.toLowerCase();
    let mobile = "/h5/#/";
    let newurl = "";
    const queryString = window.location.search.toLowerCase();
    const urlParams = new URLSearchParams(queryString);
    //首页
    // if (pathname === "/") newurl = mobile;

    //科技成果
    if (pathname.includes("technologyachievementsearch"))
      newurl = mobile + "pages/List/achievementList";
    else if (pathname.includes("technologyachievementdetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/achievementDetail?detail=" + id;
    }

    //专家
    else if (pathname.includes("thirdexpertresourcesearch"))
      newurl = mobile + "pages/List/expertList";
    else if (pathname.includes("thirdexpertresourcedetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/expertlistDetail?detail=" + id;
    }

    //专家团队
    else if (pathname.includes("expertteamsearch")) newurl = mobile + "pages/List/teamList";
    else if (pathname.includes("expertteamdetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/teamlistDetail?detail=" + id;
    }

    //院校
    else if (pathname.includes("universityresourcesearch"))
      newurl = mobile + "pages/List/universityList";
    else if (pathname.includes("universityresourcedetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/universityDetail?detail=" + id;
    }

    //需求
    else if (pathname.includes("skillrequirementsearch"))
      newurl = mobile + "pages/List/requirementList";
    else if (pathname.includes("skillrequirementdetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/requirementDetail?detail=" + id;
    }

    //企业
    else if (pathname.includes("enterpriseresourcesearch"))
      newurl = mobile + "pages/List/enterpriseList";
    else if (pathname.includes("enterpriseresourcedetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/enterpriseDetail?detail=" + id;
    }

    //服务
    else if (pathname.includes("technologyservicesearch"))
      newurl = mobile + "pages/List/serviceList";
    else if (pathname.includes("technologyservicedetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/serviceDetail?detail=" + id;
    }

    //活动
    else if (pathname.includes("eventpage")) newurl = mobile + "pages/List/event";
    else if (pathname.includes("eventdetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/eventDetail?detail=" + id;
    }

    //政策匹配
    else if (
      pathname === "policymatch/policymatchindex" ||
      pathname === "policymatch/policymatchindex?level=0"
    )
      newurl = mobile + "pagesE/pages/List/policyMatchingList?detail=null";
    else if (pathname.includes("policymatch/policymatchindex?level=")) {
      let id = urlParams.get("level");
      newurl = mobile + "pagesE/pages/List/policyMatchingList?detail=" + id;
    } else if (pathname.includes("policydetailforall")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/policyDetail?detail=" + id;
    }

    //科洽会
    else if (pathname.includes("conferencesearch")) newurl = mobile + "pages/List/conferenceList";
    else if (pathname.includes("conferencedetail")) {
      let id = urlParams.get("id");
      newurl = mobile + "pagesC/pages/Detail/conferenceDetail?detail=" + id;
    }

    //技术社区
    else if (pathname === "/bar") newurl = mobile + "pages/community/community";
    else if (pathname.includes("bar/s")) {
      let re = /bar\/s-(\d+)/;
      let myArray = pathname.match(re);

      let id = myArray[1];
      newurl = mobile + "pages/List/communityList?detail=" + id;
    } else if (pathname.includes("bar/t")) {
      let re = /bar\/t-(\d+)/;
      let myArray = pathname.match(re);

      let id = myArray[1];
      newurl = mobile + "pagesC/pages/Detail/communityDetails?detail=" + id;
    }

    //联盟
    else if (pathname.includes("alliance")) newurl = mobile + "pages/Technology/technology";
    //对接
    // else if (pathname.includes("abutment")) newurl = mobile + "pages/abutment-new/abutment-new";
    //频道页
    //视频新闻
    else if (pathname === "/cms/f-77") newurl = mobile + "pages/List/videoList?detail=77";
    else if (pathname === "/cms/f-81") newurl = mobile + "pages/List/technologyList?detail=81";
    else if (pathname === "/cms/f-98") newurl = mobile + "pages/List/videoList?detail=98";
    else if (pathname === "/cms/f-83") newurl = mobile + "pages/List/videoList?detail=83";
    else if (pathname === "/cms/f-1") newurl = mobile + "pagesD/pages/moreList/moreList?detail=1";
    else if (pathname === "/cms/f-11") newurl = mobile + "pagesD/pages/moreList/moreList?detail=11";
    else if (pathname === "/cms/f-12") newurl = mobile + "pagesD/pages/moreList/moreList?detail=12";
    else if (pathname.includes("cms/c-")) {
      let re = /cms\/c-(\d+)/;
      let myArray = pathname.match(re);
      let id = myArray[1];
      newurl = mobile + "pagesC/pages/Detail/newsDetail?detail=" + id;
    } else {
      newurl = mobile;
    }
    window.location.href = newurl;
  }
}
