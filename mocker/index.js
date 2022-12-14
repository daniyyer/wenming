const pages = require("./sitemap");
const path = require("path");
const china = require("./china");
const jiangsu = require("./jiangsu.json");

class RightResponse {
  constructor(data) {
    this.code = 200;
    this.data = data;
  }
}

class ErrorResponse {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

let addFriendCount = 0;

let friendList = [
  {
    profile: {
      avatar:
        "http://files.jlzx.jspc.org.cn/Uploads/Avatars/avatar_default.jpg?lq=637545714079231349",
      nick: "ceaexpertltt",
      userID: "2537078085263",
    },
  },
  {
    profile: {
      avatar:
        "http://files.jlzx.jspc.org.cn/Uploads/Avatars/avatar_default.jpg?lq=637545714079231349",
      nick: "vegeta1234",
      userID: "2344570543825",
    },
  },
];
const proxy = {
  // Priority processing.
  // apiMocker(app, path, option)
  // This is the option parameter setting for apiMocker
  _proxy: {
    proxy: {
      // Turn a path string such as `/user/:name` into a regular expression.
      // https://www.npmjs.com/package/path-to-regexp
      "/repos/(.*)": "https://api.github.com/",
      "/:owner/:repo/raw/:ref/(.*)": "http://127.0.0.1:2018",
      "/api/repos/(.*)": "http://127.0.0.1:3721/",
    },
    // rewrite target's url path. Object-keys will be used as RegExp to match paths.
    // https://github.com/jaywcjlove/mocker-api/issues/62
    pathRewrite: {
      "^/api/repos/": "/repos/",
    },
    changeHost: true,
    // modify the http-proxy options
    httpProxy: {
      options: {
        ignorePath: true,
      },
      listeners: {
        proxyReq: function (proxyReq, req, res, options) {
          // console.log("proxyReq");
        },
      },
    },
  },
  // =====================
  // The default GET request.
  // https://github.com/jaywcjlove/mocker-api/pull/63
  "/api/user": {
    id: 1,
    username: "kenny",
    sex: 6,
  },
  "/api/pages": new RightResponse(pages),
  "/api/china": new RightResponse(china),

  "GET /api/user": {
    id: 1,
    username: "kenny",
    sex: 6,
  },
  "GET /api/user/list": [
    {
      id: 1,
      username: "kenny",
      sex: 6,
    },
    {
      id: 2,
      username: "kenny",
      sex: 6,
    },
  ],
  "GET /api/publishAchievement/list": {
    code: 0,
    total: 15,
    data: {
      result: [
        {
          fileId: 1111,
          fileName: "ken",
          fileSize: 6,
        },
        {
          fileId: 22222222,
          fileName: "kenny",
          fileSize: 6,
        },
        {
          fileId: 333,
          fileName: "lalla",
          fileSize: 3,
        },
      ],
    },
  },
  "GET /api/:owner/:repo/raw/:ref/(.*)": (req, res) => {
    const { owner, repo, ref } = req.params;
    // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
    // owner => admin
    // repo => webpack-mock-api
    // ref => master
    // req.params[0] => add/ddd.md
    return res.json({
      id: 1,
      owner,
      repo,
      ref,
      path: req.params[0],
    });
  },
  "POST /api/login/account": (req, res) => {
    const { password, username } = req.body;
    if (password === "888888" && username === "admin") {
      return res.json({
        status: "ok",
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: "kenny",
          sex: 6,
        },
      });
    } else {
      return res.status(403).json({
        status: "error",
        code: 403,
      });
    }
  },
  "DELETE /api/user/:id": (req, res) => {
    // console.log("---->", req.body);
    // console.log("---->", req.params.id);
    res.send({ status: "ok", message: "???????????????" });
  },
  "POST /api/user/nickname": (req, res) => {
    res.send({ code: 0, status: 200, message: "???????????????" });
    // res.send({ msg: "???????????????" });
  },
  "POST /api/user/password": (req, res) => {
    if (req.body.oldpassword == "1") {
      res.send({ code: 0, status: 200, msg: "???????????????" });
    } else {
      res.send({ code: 2, status: 400, msg: "??????????????????" });
    }
  },
  "POST /api/user/phone/change/check": (req, res) => {
    res.send({ code: 0, status: 200, message: "???????????????" });
  },
  "POST /api/user/phone/code": (req, res) => {
    res.send({ code: 0, status: 200, message: "??????????????????" });
  },
  "POST /api/user/phone/valid": (req, res) => {
    res.send({ code: 0, status: 200, message: "???????????????" });
  },
  "POST /api/user/email": (req, res) => {
    res.send({ code: 0, status: 200, message: "???????????????" });
  },

  "POST /api/upload": (req, res) => {
    let fileInfo = req.files.file[0];
    let files = [];
    let thumbnail = "";
    if (/image/.test(fileInfo.mimetype)) thumbnail = path.join("/uploads", fileInfo.filename);
    let file = {
      thumbnailUrl: thumbnail,
      name: fileInfo.filename,
      url: path.join("/uploads", fileInfo.filename),
      deleteType: "DELETE",
      type: fileInfo.mimetype,
      id: parseInt(Math.random().toFixed(6) * 100000),
      deleteUrl: "/api/delete/",
      size: fileInfo.size,
    };
    files.push(file);
    let data = {
      fileName: thumbnail,
      path: thumbnail,
    };
    jsonString = [
      { ??????: "??????", ????????????: "????????????" },
      { ??????: "??????", ????????????: "13196613617" },
      { ??????: "??????", ????????????: "12345672343" },
    ];

    res.send({
      code: 0,
      status: 200,
      files: files,
      data: data,
      jsonString: jsonString,
      path: "testpath.xls",
    });
  },
  "GET /api/initupload": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        result: [
          {
            thumbnailUrl: "\\uploads\\cat.jpg",
            name: "file-1598410415753.jpeg",
            info: "????????????",
            url: "\\uploads\\cat.jpg",
            deleteType: "DELETE",
            type: "image/jpeg",
            deleteUrl: "/api/delete/",
            size: 2781377,
            id: parseInt(Math.random().toFixed(6) * 100000),
          },
          {
            thumbnailUrl: "\\uploads\\Koala.jpg",
            name: "file-1598410415753.jpeg",
            info: "????????????",
            url: "\\uploads\\Koala.jpg",
            deleteType: "DELETE",
            type: "image/jpeg",
            deleteUrl: "/api/delete/",
            size: 2781377,
            id: parseInt(Math.random().toFixed(6) * 100000),
          },
        ],
      },
    });
  },
  "DELETE /api/delete/": (req, res) => {
    res.send({ code: 0, status: 200 });
  },
  "POST /api/getUniversity": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        result: [
          // {text: "?????????????????????????????????", value: 1},
          // {text: "????????????????????????????????????", value: 2},
          { name: "?????????????????????????????????", id: 1 },
          { name: "????????????????????????????????????", id: 2 },
        ],
      },
    });
  },
  "POST /api/getInstitution": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        result: [
          // {text: "????????????????????????", value: 1},
          // {text: "??????????????????", value: 2},
          { name: "????????????????????????", id: 1 },
          { name: "??????????????????", id: 2 },
        ],
      },
    });
  },
  "GET /api/getchildareas": (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.json([
        { name: "??????????????????" + id, id: 1 },
        { name: "????????????????????????" + id, id: 2 },
        { name: "????????????????????????????????????" + id, id: 320000 },
      ]);
    }
    if (id === "320000") {
      return res.json([{ name: "?????????", id: "320500" }]);
    }
    if (id === "320500") {
      return res.json([{ name: "?????????", id: "320506" }]);
    }

    if (id === "1" || id === "2") {
      return res.json([
        { name: "???????????????????????????" + id, id: "3" },
        { name: "????????????????????????????????????" + id, id: "4" },
      ]);
    } else if (id === "3") {
      return res.json([
        { name: "???????????????????????????" + id, id: "5" },
        { name: "????????????????????????????????????" + id, id: "6" },
      ]);
    } else {
      return res.json([]);
    }
  },
  "POST /api/roleApply": (req, res) => {
    // res.send({
    //   code: 0,
    //   status: 200,
    // });
    res.send({
      code: null,
      // dialog: "??????",
      // redirectUrl:"http://www.baidu.com"
      msg: "123",
    });
  },
  "GET /api/roleApply": (req, res) => {
    res.send({
      code: 0,
      status: 200,
    });
  },
  "GET /api/checkarea": (req, res) => {
    const { areaCode } = req.query;
    if (areaCode === "5" || areaCode === "6") {
      res.send(true);
    } else {
      res.send("????????????????????????");
    }
  },
  "GET /api/testRemote": (req, res) => {
    const { testRemote, testRemote2, CompleteCompanyType } = req.query;
    if (testRemote === "test" || CompleteCompanyType == 1 || testRemote2 == "t") {
      res.send(true);
    } else {
      res.send("?????????test");
    }
  },
  "GET /api/tableListAchievement": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 25;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.title = pageIndex + "-" + i + "????????????????????????????????????????????????????????????";
      item.url = "http://localhost:9000/homepage.html";
      item.publishTime = new Date();
      item.state = "?????????";

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/tableListExpert": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 10;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.title = pageIndex + "-" + i + "????????????";
      item.school = "????????????";
      item.url = "http://localhost:9000/homepage.html";
      item.publishTime = new Date();

      item.state = "?????????";

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },

  "GET /api/roleList": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;
    let query_rolename = req.query.RoleName;
    let rolename = "";

    switch (query_rolename) {
      case "Expert":
        rolename = "??????";
        break;
      case "Enterprise":
        rolename = "????????????????????????????????????????????????????????????????????????????????????????????????????????????";
        break;
      case "ThirdParty":
        rolename = "?????????????????????????????????????????????";
        break;
      case "University":
        rolename = "????????????????????????????????????";
        break;
      case "Institution":
        rolename = "?????????????????????????????????";
        break;
      case "Common":
        rolename = "????????????";
        break;
      case "SuperAdministrator":
        rolename = "???????????????";
        break;
      default:
        "??????";
    }

    let total = 25;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.title = rolename;
      item.tel = "13013793966";
      item.username = "username";
      item.rolename = pageIndex + "-" + i + rolename;
      if (query_rolename === "SuperAdministrator") item.rolename = "";

      item.state = "?????????";

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },

  "GET /api/accountManage": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;
    let RoleName = req.query.RoleName;

    let total = 300;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.username = "?????????";
      item.nickname = pageIndex + "-" + i + "??????????????????????????????????????????????????????????????????????????????";
      item.rolename = "????????????";
      item.role = "??????";
      item.signUpTime = "Date(1600994851000)";
      item.password = pageIndex + "-" + i + "jilianonline";
      item.email = "xjd@gmail.com";
      item.mobile = "12312312312";
      item.following = "20";
      item.follower = "32";
      item.activeTime = new Date();
      item.lastActiveIp = "192.168.1.131";
      item.isMember = "???";
      item.isfreeze = true;
      item.case = Math.random() > 0.5 ? "1" : "2";
      item.image = "/assets2/images/1.e407fb0c.png";
      item.array = [
        { test: "222", test2: 2 },
        { test: "??????", test2: 4 },
      ];
      item.operations = [
        {
          opName: "??????",
          // classNama: "op-unfreeze",
          dataUrl: "/api/unfreeze?id=" + item.id,
        },
        {
          opName: "??????",
          // classNama: "op-freeze",
          dataUrl: "/api/freeze?id=" + item.id,
          relevantForm: "freezeForm",
        },
        {
          opName: "????????????",
          // classNama: "op-reset",
          dataUrl: "/api/reset?id=" + item.id,
        },
      ];
      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    if (RoleName === "Common") {
      return res.status(500).json({
        status: "error",
        code: 403,
      });
    } else {
      res.send({
        code: 0,
        status: 200,
        data: {
          result: currentResult,
          total: total,
        },
      });
    }
  },
  "GET /api/accountManage2": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        result: [],
        total: 0,
      },
    });
  },
  "GET /api/notification": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 30;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.time = "2020???3???16??? 10:18";
      item.content = "???????????????<a href='#'>123</a>";

      item.operations = [
        {
          opName: "????????????",
          // classNama: "op-unfreeze",
          dataUrl: "/api/freeze?id=" + item.id,
        },
        {
          opName: "??????",
          // classNama: "op-unfreeze",
          dataUrl: "/api/freeze?id=" + item.id,
        },
      ];
      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/GetUserCompletedStatus": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        completedStatus: true,
      },
    });
  },
  "GET /api/teammate": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 2;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      // item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.id = 7643 + i;
      item.name = "?????????";
      item.title = "?????????";
      item.direction = "????????????????????????";
      item.edit = {
        // classNama: "op-freeze",
        dataUrl: "/api/teammateMember2?id=" + item.id,
        dataEditUrl: "/api/teammateMember?id=" + item.id,
        relevantForm: "teamMateForm",
      };
      item.delete = {
        dataUrl: "/api/deleteTeammateMember?id=" + item.id,
      };

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/teammateMember": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        Name: "?????????",
        Duties: "?????????",
        Direction: "????????????????????????",
      },
    });
  },
  "GET /api/teammateMember2": (req, res) => {
    res.send(
      '        <form id="teamMateForm" data-title="??????????????????" method="post" action="/api/teammateMember">\n' +
        '          <div class="form-group row required">\n' +
        '            <label for="Name" class="col-sm-3 col-form-label">??????</label>\n' +
        '            <div class="col-sm-9">\n' +
        '              <input class="form-control" id="date" type="date" type="text" required />\n' +
        "            </div>\n" +
        "          </div>\n" +
        '          <div class="form-group row required">\n' +
        '            <label for="Duties" class="col-sm-3 col-form-label">??????/??????</label>\n' +
        '            <div class="col-sm-9">\n' +
        '              <input class="form-control" id="Duties" name="Duties" type="text" required />\n' +
        "            </div>\n" +
        "          </div>\n" +
        '          <div class="form-group row required">\n' +
        '            <label for="Direction" class="col-sm-3 col-form-label">????????????</label>\n' +
        '            <div class="col-sm-9">\n' +
        '              <div class="ui-textarea-x">\n' +
        "                <textarea\n" +
        '                  id="Direction"\n' +
        '                  name="Direction"\n' +
        '                  maxlength="1000"\n' +
        '                  rows="5"\n' +
        "                  required\n" +
        "                ></textarea>\n" +
        '                <div class="ui-textarea"></div>\n' +
        "              </div>\n" +
        "            </div>\n" +
        "          </div>\n" +
        '          <div class="form-group text-right">\n' +
        '            <button type="button" class="btn btn-secondary" data-dismiss="modal">??????</button>\n' +
        '            <button type="submit" class="btn btn-primary">??????</button>\n' +
        "          </div>\n" +
        '<div data-plugin="detailView">\n' +
        '                          <div class="detail-trigger inbk">\n' +
        "                           ??????" +
        "                          </div>\n" +
        '                          <div class="detail-content-wrap dn bg-white">\n' +
        '                            <table class="table detail-content mb-0 table-sm">\n' +
        "                              <tr>\n" +
        "                                <td>????????????</td>\n" +
        "                                <td>????????????xxxx</td>\n" +
        "                              </tr>\n" +
        "                              <tr>\n" +
        "                                <td>????????????</td>\n" +
        "                                <td>????????????xxxx</td>\n" +
        "                              </tr>\n" +
        "                            </table>\n" +
        "                          </div>\n" +
        "                        </div>" +
        " <script > " +
        "console.log(1);" +
        "$(\"[data-plugin='detailView']\").each(function (index, element) {\n" +
        "console.log(1);" +
        '    let eleTrigger = $(element).find(".detail-trigger")[0];\n' +
        '    let eleTarget = $(element).find(".detail-content")[0];\n' +
        "    $(eleTrigger).popover({\n" +
        "      content: eleTarget,\n" +
        '      // placement: "top",\n' +
        "      html: true,\n" +
        "    });\n" +
        "  });" +
        "</script> " +
        "        </form>\n",
    );
  },
  "POST /api/teammateMember": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      data: {
        id: 7643,
      },
    });
  },
  "POST /api/deleteTeammateMember": (req, res) => {
    let id = req.query.id;
    res.send({
      code: 0,
      status: 200,
      flag: true,
      data: {
        opType: "delete",
        Ids: [7643],
      },
    });
  },

  "GET /api/applicationsubject": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 3;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.SubjectTitle = "????????????";
      item.SubjectNature = 1;
      item.IndustryField = 71;
      item.PlatformNature = 1502;
      item.IsDoctorGrant = true;
      item.testid = 640 + i;
      item.edit = {
        // classNama: "op-freeze",
        dataUrl:
          "http://192.168.1.134:8041/abutmentExtend/GetApplicationSubjectById?id=" + item.testid,
        relevantForm: "applicationsubjectForm",
      };
      item.delete = {
        dataUrl: "/api/deleteApplicationsubjectItem?id=" + item.id,
      };

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/applicationsubjectItem": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        SubjectTitle: "????????????",
        SubjectNature: 1,
        IndustryField: 71,
        PlatformNature: 1502,
        IsDoctorGrant: true,
        Platform: "????????????",
      },
    });
  },
  "POST /api/applicationsubjectItem": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/deleteApplicationsubjectItem": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },

  "GET /api/issueList": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 2;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.title = "?????????????????????ICN??????????????????????????????????????????????????????";
      item.plan = "????????????????????????";
      item.edit = {
        // classNama: "op-freeze",
        dataUrl: "/api/issue?id=" + item.id,
        relevantForm: "issueForm",
      };
      item.delete = {
        dataUrl: "/api/deleteIssue?id=" + item.id,
      };

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/issue": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        Title: "?????????????????????ICN??????????????????????????????????????????????????????",
        Plan: "????????????????????????",
      },
    });
  },
  "POST /api/issue": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/deleteIssue": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },

  "GET /api/achievementList": (req, res) => {
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;

    let total = 2;
    let result = [];
    for (let i = 0; i < total; i++) {
      let item = {};
      item.id = parseInt(Math.random().toFixed(6) * 100000);
      item.name = "?????????????????????ICN??????????????????????????????????????????????????????";
      item.prize = "????????????????????????";
      item.edit = {
        // classNama: "op-freeze",
        dataUrl: "/api/achievement?id=" + item.id,
        relevantForm: "achievementForm",
      };
      item.delete = {
        dataUrl: "/api/deleteAchievement?id=" + item.id,
      };

      result.push(item);
    }
    let currentResult = result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    res.send({
      code: 0,
      status: 200,
      data: {
        result: currentResult,
        total: total,
      },
    });
  },
  "GET /api/achievement": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      data: {
        Title: "?????????????????????ICN??????????????????????????????????????????????????????",
        Plan: "????????????????????????",
      },
    });
  },
  "POST /api/achievement": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/deleteAchievement": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/unfreeze": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/freeze": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/reset": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      dialog: "????????????123456",
    });
  },
  "POST /api/addlab": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      id: 12345,
    });
  },
  "POST /api/editlab": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "POST /api/deletelab": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
    });
  },
  "GET /api/autocomplete": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      result: [
        {
          index: 1,
          userid: 8842,
          username: "jsti",
          label: "?????????????????????????????????",
          number: 1234,
        },
        {
          index: 2,
          userid: 61339,
          username: "SIZ",
          label: "????????????????????????????????????????????????",
          number: 1234,
        },
        {
          index: 3,
          userid: 11521,
          username: "?????????",
          label: "???????????????????????????????????????",
          number: 1234,
        },
        {
          index: 4,
          userid: 14432,
          username: "????????????",
          label: "??????????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 16565,
          username: "szdltc",
          label: "??????????????????????????????",
          number: 1234,
        },
        {
          userid: 16787,
          username: "sljtfz",
          label: "??????????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 16910,
          username: "????????????",
          label: "??????????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 16945,
          username: "lxxhnxyhz",
          label: "????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 15786,
          username: "????????????",
          label: "????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 15788,
          username: "????????????",
          label: "????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 16764,
          username: "????????????",
          label: "????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 15784,
          username: "elcom2013",
          label: "??????????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 16126,
          username: "???????????????",
          label: "?????????????????????????????????????????????????????????",
          number: 1234,
        },
        {
          userid: 15604,
          username: "hiaiozyg",
          label: "??????????????????????????????????????????",
          number: 1234,
        },
      ],
    });
  },
  "POST /api/Manage/CreateUCode": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      msg: "NBG002",
    });
    // res.send({
    //   code: 0,
    //   status: 200,
    //   flag: false,
    //   msg: "???????????????",
    // });
  },
  "POST /api/postSuccess": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      msg: "????????????",
      // dialog: "??????",
    });
  },
  "POST /api/postFail": (req, res) => {
    res.send({
      msg: "????????????",
    });
  },
  "GET /Channel/JiangSuCity": (req, res) => {
    let jiangsu = require("./jiangsu.json");

    res.send(jiangsu);
  },
  "GET /Meeting/Unit": (req, res) => {
    let units = require("./members.json");

    res.send(units);
  },
  "GET /api/panel1": (req, res) => {
    let data = {
      usernumber: Math.trunc(20000 * Math.random()),
      year: Math.trunc(20000 * Math.random()),
      month: 2516842,
      rate1: "20%",
      rate2: "20.5%",
    };

    res.send({ data: data });
  },
  "GET /api/panel2": (req, res) => {
    let list =
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >???????????????????????????????????????????????????????????????????????????????????????????????????????????????</a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '?????????</span>??????<span class="text-blue-3">????????????</span\n' +
      "                >????????????????????????????????? </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>";

    res.send({ data: list });
  },
  "GET /api/panel4": (req, res) => {
    let trs = `<tr>
                <td><img
                          class="d-inline-block vertical-middle w-24 h-24"
                          src="images/logo-main.png"
                          alt=""
                  />
                  <span class="d-inline-block vertical-middle w-200 ellipsis">?????????</span>
                </td>
                <td>
                  <span class="no-wrap">?????????????????????</span>
                </td>
                <td>
                  <span class="no-wrap">05/16 10:25</span>
                </td>
              </tr>
              <tr>
                <td><img
                          class="d-inline-block vertical-middle w-24 h-24"
                          src="images/logo-main.png"
                          alt=""
                  />
                  <span class="d-inline-block vertical-middle w-200 ellipsis">?????????</span>
                </td>
                <td>
                  <span class="no-wrap">?????????????????????</span>
                </td>
                <td>
                  <span class="no-wrap">05/16 10:25</span>
                </td>
              </tr>
              <tr>
                <td><img
                          class="d-inline-block vertical-middle w-24 h-24"
                          src="images/logo-main.png"
                          alt=""
                  />
                  <span class="d-inline-block vertical-middle w-200 ellipsis">?????????</span>
                </td>
                <td>
                  <span class="no-wrap">?????????????????????</span>
                </td>
                <td>
                  <span class="no-wrap">05/16 10:25</span>
                </td>
              </tr>
              <tr>
                <td><img
                          class="d-inline-block vertical-middle w-24 h-24"
                          src="images/logo-main.png"
                          alt=""
                  />
                  <span class="d-inline-block vertical-middle w-200 ellipsis">?????????</span>
                </td>
                <td>
                  <span class="no-wrap">?????????????????????</span>
                </td>
                <td>
                  <span class="no-wrap">05/16 10:25</span>
                </td>
              </tr>
              <tr>
                <td><img
                          class="d-inline-block vertical-middle w-24 h-24"
                          src="images/logo-main.png"
                          alt=""
                  />
                  <span class="d-inline-block vertical-middle w-200 ellipsis">?????????</span>
                </td>
                <td>
                  <span class="no-wrap">?????????????????????</span>
                </td>
                <td>
                  <span class="no-wrap">05/16 10:25</span>
                </td>
              </tr>
`;

    res.send({ data: trs });
  },
  "GET /api/panel3": (req, res) => {
    let data = {
      resnumber: Math.trunc(20000 * Math.random()),
      time: "08/06 09:45",
      year: "1234",
      month: "244",
      yoy: "20.3%",
      mom: "10.4%",
    };

    res.send({ data: data });
  },
  "GET /api/panel5": (req, res) => {
    let data = [
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
      {
        sum: Math.trunc(1000 * Math.random()),
        month: 12,
      },
    ];

    res.send({ data: data });
  },
  "GET /api/panel7": (req, res) => {
    let data = {
      sum: Math.trunc(20000 * Math.random()),
      add: Math.trunc(20000 * Math.random()),
    };

    res.send({ data: data });
  },
  "GET /ChannelAbutment/GetResourceCountByCityScreen": (req, res) => {
    let data = [
      { name: "?????????", value: 3806 * Math.random(), year: 100, month: 10, yoy: 10, mom: 1 },
      { name: "?????????", value: 1800 * Math.random(), year: 100, month: 10, yoy: 10, mom: 1 },
      { name: "?????????", value: 1000 * Math.random(), year: 200, month: 20, yoy: 20, mom: 2 },
      { name: "?????????", value: 1500 * Math.random(), year: 300, month: 30, yoy: 30, mom: 3 },
      { name: "?????????", value: 3000 * Math.random(), year: 400, month: 40, yoy: 40, mom: 4 },
      { name: "?????????", value: 2000 * Math.random(), year: 500, month: 50, yoy: 50, mom: 5 },
      { name: "????????????", value: 1100 * Math.random(), year: 600, month: 60, yoy: 60, mom: 6 },
      { name: "?????????", value: 800, year: 700, month: 70, yoy: 70, mom: 7 },
      { name: "?????????", value: 700, year: 800, month: 80, yoy: 80, mom: 8 },
      { name: "?????????", value: 2600, year: 900, month: 90, yoy: 90, mom: 9 },
      { name: "?????????", value: 2400, year: 1000, month: 100, yoy: 100, mom: 10 },
      { name: "?????????", value: 2200, year: 1100, month: 110, yoy: 110, mom: 11 },
      { name: "?????????", value: 900, year: 1200, month: 120, yoy: 120, mom: 12 },
    ];

    res.send(data);
  },
  "GET /channel/UserPartJson": (req, res) => {
    let chart = [
      ["????????????", "2019-11", "2019-12", "2020-01", "2020-02", "2020-03", "2020-04"],
      ["????????????", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["??????", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["??????", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["?????????", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
      ["??????", 15.2, 17.1, 19.2, 12.4, 13.9, 19.1],
      ["?????????", 35.2, 37.1, 39.2, 32.4, 33.9, 59.1],
    ];

    res.send({ data: chart });
  },
  "GET /ChannelAbutment/ResourcePartJson": (req, res) => {
    let chart = [
      { value: 3105 * Math.random(), name: "??????" },
      { value: 2340 * Math.random(), name: "??????" },
      { value: 1350 * Math.random(), name: "??????" },
      { value: 25410 * Math.random(), name: "??????" },
      { value: 33505 * Math.random(), name: "??????" },
      { value: 5412 * Math.random(), name: "??????" },
      { value: 15480 * Math.random(), name: "??????" },
    ];

    res.send({ data: chart });
  },

  "GET /channel/AbutmentPartJson": (req, res) => {
    let chart = [
      ["amount", "city"],
      [582 * Math.random(), "?????????"],
      [782 * Math.random(), "?????????"],
      [410 * Math.random(), "?????????"],
      [127 * Math.random(), "????????????"],
      [201 * Math.random(), "?????????"],
      [791 * Math.random(), "?????????"],
      [918 * Math.random(), "?????????"],
      [1018 * Math.random(), "?????????"],
      [201 * Math.random(), "?????????"],
      [641 * Math.random(), "?????????"],
      [325 * Math.random(), "?????????"],
      [415 * Math.random(), "?????????"],
      [70 * Math.random(), "?????????"],
    ];

    res.send({ data: chart });
  },
  "GET /channel/AbutmentPartJsonScreen": (req, res) => {
    let chart = [
      ["amount", "city"],
      [582 * Math.random(), "?????????"],
      [782 * Math.random(), "?????????"],
      [410 * Math.random(), "?????????"],
      [127 * Math.random(), "????????????"],
      [201 * Math.random(), "?????????"],
      [791 * Math.random(), "?????????"],
      [918 * Math.random(), "?????????"],
      [1018 * Math.random(), "?????????"],
      [201 * Math.random(), "?????????"],
      [641 * Math.random(), "?????????"],
      [325 * Math.random(), "?????????"],
      [415 * Math.random(), "?????????"],
      [70 * Math.random(), "?????????"],
    ];

    res.send({ data: chart });
  },
  "GET /api/policyMatch": (req, res) => {
    res.send({
      returnCode: "2000",
      data: {
        basic: {
          name: "??????????????????????????????",
          creditCode: "91320506MA2126R198",
          registerCapital: "300",
          establishDate: "2019-11-03",
          applicableAreaProvince: "320000",
          applicableAreaProvinceStr: "?????????",
          applicableAreaCity: "320500",
          applicableAreaCityStr: "?????????",
          applicableAreaRegion: "320506",
          applicableAreaRegionStr: "?????????",
          servics: ["servics_rs_2", "servics_rs_3"],
          enType: "en_type_1",
          enterpriseTypeList: ["enterprise_type_1", "enterprise_type_2"],
          enterpriseAptitudeFormat: ["enterprise_aptitude_1", "enterprise_aptitude_2"],
          enterpriseAptitudeList: [
            {
              code: "enterprise_aptitude_1",
              codeStr: "?????????????????????????????????",
              date: "2020-11-02",
              level: "1",
            },
            {
              code: "enterprise_aptitude_2",
              codeStr: "100?????????",
              date: "2020-11-02",
              level: "2",
            },
          ],
          technologyAbilityFormat: [
            "technology_ability_1",
            "technology_ability_2",
            "technology_ability_3",
          ],
          technologyAbilityList: [
            {
              code: "technology_ability_3",
              codeStr: "??????????????????",
              level: "2",
              levelStr: "??????",
              date: "2020-09-09",
            },
            {
              code: "technology_ability_1",
              codeStr: "????????????????????????",
              level: "1",
              levelStr: "?????????",
              date: "2020-11-11",
            },

            {
              code: "technology_ability_2",
              codeStr: "???????????????",
              level: "",
              levelStr: "",
              date: "",
            },
          ],
        },
        personnel: {
          employeeAmount: 0,
          overCollegeAmount: 0,
          overBachelorAmount: 0,
          overMasterAmount: 0,
          overDoctorAmount: 0,
          leadingTalentAmount: 0,
        },
        managementList: [
          {
            totalAsset: 20.1,
            netProfit: 0.0,
            tax: 0.0,
            mainBusinessIncome: 0.0,
            developInput: 0.0,
            year: "2020",
            operatingIncome: 0.0,
          },
          {
            totalAsset: 0.0,
            netProfit: 0.0,
            tax: 0.0,
            mainBusinessIncome: 0.0,
            developInput: 0.0,
            year: "2019",
            operatingIncome: 0.0,
          },
          {
            totalAsset: 0.0,
            netProfit: 0.0,
            tax: 0.0,
            mainBusinessIncome: 0.0,
            developInput: 0.0,
            year: "2018",
            operatingIncome: 0.0,
          },
        ],
        intellectual: { patentCount: 0, trademarkCount: 0, softwareCount: 0, propertyAmount: 2 },
        project: {
          hasProject: null,
          projectTotalInvestAmount: 0.0,
          projectOpreateDate: null,
          projectState: null,
          projectStateStr: null,
        },
        carrier: {
          hasCarrier: null,
          incubatorDisposableArea: 0.0,
          incubatorCompanyAmount: 0,
          incubatorGraduatedCompanyAmount: 0,
        },
      },
    });
  },
  "POST /api/getMapList": (req, res) => {
    res.send(`
      <div class="borderBox p-3 mb-3">
            <ul>

              <li
                class="border-bottom-no-last py-3 d-flex cursor-pointer map-item"
                data-lng="113.864691"
                data-lat="22.942327"
                data-title="????????????????????????????????????????????????????????????????????????"
                data-imgurl="../../assets2/images/bg2.bdc27183.jpg"
                data-url="../../duijie.html"
                data-publish="???????????????"
              >
                <div class="avatar-middle mr-3">
                   <img class="cover-img" src="../../assets2/images/bg2.bdc27183.jpg" alt="">
                </div>
                <div class="flex-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="text-gray">
                      ????????????????????????????????????????????????????????????????????????
                    </h5>
                  </div>
                  <div>
                    <span class="tag-red mr-2">????????????</span>
                  </div>

                  <div class="text-light-gray mr-2">
                    <span>
                      ?????????:???????????????
                    </span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <nav><ul class="pagination">
<li class="disabled">
<a href="javascript:" aria-label="Previous"><span aria-hidden="true">??</span></a>
</li>
<li class="active">
<a href="javascript:void(0)" role="button"><span>1</span></a>
</li>
<li>
<a href="/api/getMapList?pageIndex=2">2</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=3">3</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=4">4</a>
</li>

</li>
<li>
<a href="javascript:void(0)"><span>...</span></a>
</li>
<li>
<a href="/api/getMapList?pageIndex=1182">1182</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=1183">1183</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=2">??</a>
</li></ul>
</nav>
      `);
  },
  "GET /api/getMapList": (req, res) => {
    res.send(`
      <div class="borderBox p-3 mb-3">
            <ul>

              <li
                class="border-bottom-no-last py-3 d-flex cursor-pointer map-item"
                data-lng="113.864691"
                data-lat="22.942327"
                data-title="????????????????????????????????????????????????????????????????????????"
                data-imgurl="../../assets2/images/bg2.bdc27183.jpg"
                data-url="../../duijie.html"
                data-publish="???????????????"
              >
                <div class="avatar-middle mr-3">
                   <img class="cover-img" src="../../assets2/images/bg2.bdc27183.jpg" alt="">
                </div>
                <div class="flex-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="text-gray">
                      ????????????????????????????????????????????????????????????????????????
                    </h5>
                  </div>
                  <div>
                    <span class="tag-red mr-2">????????????</span>
                  </div>

                  <div class="text-light-gray mr-2">
                    <span>
                      ?????????:???????????????
                    </span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <nav><ul class="pagination">
<li class="disabled">
<a href="javascript:" aria-label="Previous"><span aria-hidden="true">??</span></a>
</li>
<li class="active">
<a href="javascript:void(0)" role="button"><span>1</span></a>
</li>
<li>
<a href="/api/getMapList?pageIndex=2">2</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=3">3</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=4">4</a>
</li>

</li>
<li>
<a href="javascript:void(0)"><span>...</span></a>
</li>
<li>
<a href="/api/getMapList?pageIndex=1182">1182</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=1183">1183</a>
</li>
<li>
<a href="/api/getMapList?pageIndex=2">??</a>
</li></ul>
</nav>
      `);
  },
  // ????????????mock??????
  "POST /AddMeeting": (req, res) => {
    res.send({ flag: true, attendanceId: 1104, meetingId: 417 });
  },
  "POST /LeaveMeeting": (req, res) => {
    res.send({ flag: true });
  },
  "POST /SetShareAuth": (req, res) => {
    res.send({ flag: true });
  },
  "POST /StartMCUMixTranscodeSync": (req, res) => {
    res.send({ flag: true });
  },
  "POST /StopMCUMixTranscodeRequest": (req, res) => {
    res.send({ flag: true });
  },
  "POST /IsNeedPwd": (req, res) => {
    let IsNeedPwd = false;
    const { RoomId } = req.body;
    console.log(req);
    if (RoomId === "7550") {
      IsNeedPwd = true;
    }
    res.send({ IsNeedPwd: IsNeedPwd });
  },
  "POST /IsExistAndContinue": (req, res) => {
    let IsExistAndContinue = false;
    const { RoomId } = req.body;
    if (RoomId === "7550" || RoomId === "7551") {
      IsExistAndContinue = true;
    }
    res.send({ IsExistAndContinue: IsExistAndContinue });
  },
  "POST /JoinMeeting": (req, res) => {
    res.send({ flag: true, attendanceId: 1105, meetingId: 417, msg: "??????????????????" });
  },
  "POST /GetIsHost": (req, res) => {
    let { Id } = req.body;
    let isHost = false;
    console.log(Id);
    if (Id === "1105") {
      isHost = true;
    }
    res.send({ isHost: isHost });
  },
  "GET /GetIsOnline": (req, res) => {
    res.send({ ret: 0 });
  },
  "POST /GetUserName": (req, res) => {
    let { UserId } = req.body;
    let username = "";
    if (UserId === "1577151549672") {
      username = "expertltt";
    }
    if (UserId === "2831679913651") {
      username = "dan";
    }
    res.send({ flag: true, username: username });
  },
  "POST /GetRandomOnlyRoomId": (req, res) => {
    res.send({ flag: true, roomId: 920668427 });
  },
  "POST /GetMeetingByRoomId": (req, res) => {
    res.send({ flag: true, isStartVideo: 0, isForbidSound: 1 });
  },
  "POST /GetTLSSig": (req, res) => {
    let sig = {
      sig:
        "eJwtzM0KgkAUBeB3me2E3KtznRRat3CIQItoZznKxTLxryh690xdnu8czkckJnYG24hQuA6I1ZQ5s1XHOU*MpDUSkgp87S6DNivTuuZMhKgAFAFCMDf2VXNjRyciFwBm7fj*Nx*1R57yF225GP8H*zx21zIyiVG9vO1lvEul4RMV7*0hWFMcVbK-PM4oYSO*P9Y1MXI_",
      sdkappid: 1400450109,
      flag: true,
    };
    const { UserId } = req.body;
    if (UserId === "2831679913651") {
      sig = {
        sig:
          "eJwtzEsLgkAUBeD-MuuQO45XZ4RWSk*zh1a2jJzkYpaYSBj99yxdnu8czpvFQWQ0umIuMw1go3*mVN9rulLPUnDbUYoLG-kweKb5uSwpZS63ACwEDqpv9KukSneOiCYA9FpT8TObOw4qqcTwQln3P0sueu*Jtg2PgfRyn4rQXGS709bf4DxaNcFk*lgebom1zsbs8wXSYjG6",
        sdkappid: 1400450109,
        flag: true,
      };
    }
    if (UserId === "share_2831679913651") {
      sig = {
        sig:
          "eJwtzc0KgkAUBeB3mXXInXF*UmgTTEkFEdqiVWhzzaEsdUSK6N0zdXm*c*B8SLKLvQ4bEhLmAZkN2Rp8tDa3A7sibfDM5j6VKgioLwWdZs7c0qqyhoSUA3ABFIKxwVdlG*xdCMEAYNTWln*TVCkpGJ*2zl77l1hxneR1mV14XR8x6TIavWGzcjrCg2b7JT-d1xBvn4VekO8PdM80Fg__",
        sdkappid: 1400450109,
        flag: true,
      };
    }
    if (UserId === "share_1577151549672") {
      sig = {
        sig:
          "eJwtzd0KgkAQBeB32euQWXF2U*iioIJIqFSqq7B2tSlaxZ8yonfP1Mv5zuHMh4XrwHrqgnnMtoCNupuUNhUl1HF5jQt94iglR46OK6Q91Ep1j-OcFPO4A*AgcHD7RDc5Fbp1RLQBoNeKHn8TXEqBQshhhdL2S5RM99Fxad71SjWpvw0yc053B5j5C1W4801Wjyk0l*b2ggn7-gCQ0jVx",
        sdkappid: 1400450109,
        flag: true,
      };
    }
    res.send(sig);
  },
  "POST /IsAllowShare": (req, res) => {
    res.send({ flag: true });
  },

  //im
  "GET /TecentIMAPI/InfoForLogin": (req, res) => {
    let userId = req.query.UserId;
    let sig = "";
    if (userId === "2831679913651") {
      sig =
        "eJwtzEELgkAQBeD-sueoWdcZXaFDUaRgEtihjsWuMUi2qFkU-fcsPb7vPd5b7NN82tlaRMKbgpj8MxtbtVzwwKGSFGgtFaEcB40pT86xEZH0AVSAUtPQ2Kfj2vaOiB4ADNry9WfkkwY-IDW*8KX-N7kuZuEKs6qKzwkeXw*o03uSLA-l5hZ2WbOOF03qNO22c-H5AtA1MbI_";
    }
    if (userId === "2537078085263") {
      sig =
        "eJwtzEsLgkAUBeD-MttCro87D8FNLUJpYRSB7gJn7JaWqKkV-fcsXZ7vHM6bHbZ7q9M185ljAVv*M2X61pKhidEVICRIdLg7D5rseqoqyphvewCuQFvxqdFDRbUeHREdAJi0pfJn3OMKPAVyfqF8-De7osdnue4WamhDfo7jsL7kqkii9BgJc5erTfNIX5onfcA*X*owMrs_";
    }
    res.send({
      flag: true,
      message: null,
      url: null,
      result: {
        currentUserId: userId,
        sig: sig,
        sdkId: 1400375196,
      },
    });
  },
  "POST /TecentIMAPI/getFriendList": (req, res) => {
    // res.send(friendList);
    res.send({
      code: 200,
      msg: "",
      content: {
        UserData: [
          {
            To_Account: "1580601647450",
            userName: "ludy",
            avater: "00158/06016/47450/637406863569654359_1580601647450",
          },
          { To_Account: "2344570543825", userName: "vegeta1234", avater: "avatar_default" },
          { To_Account: "2831679913651", userName: "dan", avater: "avatar_default" },
        ],
        FriendNum: 3,
        ErrorCode: 0,
        ErrorInfo: "",
      },
      total: 0,
    });
  },
  "POST /TecentIMAPI/AddFriend": (req, res) => {
    res.send({ code: 200, msg: "", content: null });
  },
  "POST /addFriendApprove": (req, res) => {
    res.send({ flag: true });
  },
  "POST /TecentIMAPI/deleteFriend": (req, res) => {
    let { userId } = req.body;
    let i = 0;
    for (i; i < friendList.length; i++) {
      if (friendList[i].profile.userID === userId) {
        break;
      }
    }
    friendList.splice(i, 1);
    res.send({
      code: 200,
      msg: "",
      content: {
        ResultItem: [{ To_Account: "2735158684044", ResultCode: 0, ResultInfo: "OK" }],
        ResultInfo: null,
        ActionStatus: "OK",
        ErrorCode: 0,
      },
      total: 0,
    });
  },
  "POST /TecentIMAPI/checkAddFriendRequest": (req, res) => {
    addFriendCount++;
    console.log(addFriendCount);
    if (addFriendCount < 11) {
      // res.send({
      //   flag: true,
      //   type: 1,
      //   userList: [
      //     {userID: "2537078085263", nickName: "ceaexpertltt", msg: "?????????????????????????????????"},
      //   ],
      // });
      res.send({
        code: 200,
        msg: "",
        content: [
          {
            Id: 1,
            SenderUserId: 2537078085263,
            SenderUserIdNickName: "ceaexpertltt",
            Content: "??????",
            DateCreated: "/Date(1618469308000)/",
            Status: 0,
          },
        ],
        total: 0,
      });
    } else {
      res.send({ flag: false });
    }
  },
  "POST /TecentIMAPI/addFriendResponse": (req, res) => {
    res.send({ flag: true });
  },
  "POST /api/export": (req, res) => {
    res.send({
      flag: true,
      url:
        "https://jlzx.jspc.org.cn/channel/downloadexportfile?path=085d4875-79b7-437b-b479-38c8c602f19d.xls\u0026filename=????????????????????????.xls",
    });
  },
  "GET /api/treedatalist": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      data: [
        {
          id: 1,
          date: "2016-05-02",
          name: "?????????",
          address: "?????????????????????????????? 1518 ???",
          hasChildren: false,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "?????????",
          address: "?????????????????????????????? 1517 ???",
          hasChildren: false,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "?????????",
          address: "?????????????????????????????? 1519 ???",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "?????????",
          address: "?????????????????????????????? 1516 ???",
        },
      ],
    });
  },
  "GET /api/treedataload": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      data: [
        {
          id: 31,
          date: "2016-05-01",
          name: "?????????",
          address: "?????????????????????????????? 1519 ???",
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "?????????",
          address: "?????????????????????????????? 1519 ???",
        },
      ],
    });
  },
  "GET /api/zhanban": (req, res) => {
    res.send(
      '<div id="zhanban" class="zhanbanResList" data-title="????????????">\n' +
        "                    <ol>\n" +
        '                        <li><a href="#" target="_blank">????????????</a></li>\n' +
        '                        <li><a href="#" target="_blank">????????????????????????????????????????????????????????????????????????????????????</a></li>\n' +
        "                    </ol>\n" +
        "                </div>",
    );
  },
};
module.exports = proxy;
