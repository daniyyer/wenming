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
    res.send({ status: "ok", message: "删除成功！" });
  },
  "POST /api/user/nickname": (req, res) => {
    res.send({ code: 0, status: 200, message: "修改成功！" });
    // res.send({ msg: "修改成功！" });
  },
  "POST /api/user/password": (req, res) => {
    if (req.body.oldpassword == "1") {
      res.send({ code: 0, status: 200, msg: "修改成功！" });
    } else {
      res.send({ code: 2, status: 400, msg: "旧密码错误！" });
    }
  },
  "POST /api/user/phone/change/check": (req, res) => {
    res.send({ code: 0, status: 200, message: "密码正确！" });
  },
  "POST /api/user/phone/code": (req, res) => {
    res.send({ code: 0, status: 200, message: "短信已发送！" });
  },
  "POST /api/user/phone/valid": (req, res) => {
    res.send({ code: 0, status: 200, message: "验证成功！" });
  },
  "POST /api/user/email": (req, res) => {
    res.send({ code: 0, status: 200, message: "修改成功！" });
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
      { 姓名: "姓名", 手机号码: "手机号码" },
      { 姓名: "张三", 手机号码: "13196613617" },
      { 姓名: "李四", 手机号码: "12345672343" },
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
            info: "图片说明",
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
            info: "图片说明",
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
          // {text: "中国科学院半导体研究所", value: 1},
          // {text: "中国科学院计算技术研究所", value: 2},
          { name: "中国科学院半导体研究所", id: 1 },
          { name: "中国科学院计算技术研究所", id: 2 },
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
          // {text: "昆山高新区科技局", value: 1},
          // {text: "太仓市科技局", value: 2},
          { name: "昆山高新区科技局", id: 1 },
          { name: "太仓市科技局", id: 2 },
        ],
      },
    });
  },
  "GET /api/getchildareas": (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.json([
        { name: "北京北京北京" + id, id: 1 },
        { name: "上海上海上海上海" + id, id: 2 },
        { name: "江苏省江苏省江苏省江苏省" + id, id: 320000 },
      ]);
    }
    if (id === "320000") {
      return res.json([{ name: "苏州市", id: "320500" }]);
    }
    if (id === "320500") {
      return res.json([{ name: "吴中区", id: "320506" }]);
    }

    if (id === "1" || id === "2") {
      return res.json([
        { name: "北京市北京市北京市" + id, id: "3" },
        { name: "上海市上海市上海市上海市" + id, id: "4" },
      ]);
    } else if (id === "3") {
      return res.json([
        { name: "朝阳区朝阳区朝阳区" + id, id: "5" },
        { name: "静安区静安区静安区静安区" + id, id: "6" },
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
      // dialog: "错误",
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
      res.send("请选择下一级地区");
    }
  },
  "GET /api/testRemote": (req, res) => {
    const { testRemote, testRemote2, CompleteCompanyType } = req.query;
    if (testRemote === "test" || CompleteCompanyType == 1 || testRemote2 == "t") {
      res.send(true);
    } else {
      res.send("请输入test");
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
      item.title = pageIndex + "-" + i + "资源名称很长很长很长很长很长很长很长很长";
      item.url = "http://localhost:9000/homepage.html";
      item.publishTime = new Date();
      item.state = "已发布";

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
      item.title = pageIndex + "-" + i + "专家名字";
      item.school = "专家院校";
      item.url = "http://localhost:9000/homepage.html";
      item.publishTime = new Date();

      item.state = "已发布";

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
        rolename = "专家";
        break;
      case "Enterprise":
        rolename = "企业名字很长企业名字很长企业名字很长企业名字很长企业名字很长企业名字很长";
        break;
      case "ThirdParty":
        rolename = "第三方机构名字很长很长很长很长";
        break;
      case "University":
        rolename = "院校名字很长很长很长很长";
        break;
      case "Institution":
        rolename = "科技局名字很长很长很长";
        break;
      case "Common":
        rolename = "普通用户";
        break;
      case "SuperAdministrator":
        rolename = "超级管理员";
        break;
      default:
        "专家";
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

      item.state = "已发布";

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
      item.username = "用户名";
      item.nickname = pageIndex + "-" + i + "昵称可以很长试试看吧很长很长很长很长很长很长很长很长";
      item.rolename = "角色名称";
      item.role = "企业";
      item.signUpTime = "Date(1600994851000)";
      item.password = pageIndex + "-" + i + "jilianonline";
      item.email = "xjd@gmail.com";
      item.mobile = "12312312312";
      item.following = "20";
      item.follower = "32";
      item.activeTime = new Date();
      item.lastActiveIp = "192.168.1.131";
      item.isMember = "是";
      item.isfreeze = true;
      item.case = Math.random() > 0.5 ? "1" : "2";
      item.image = "/assets2/images/1.e407fb0c.png";
      item.array = [
        { test: "222", test2: 2 },
        { test: "单位", test2: 4 },
      ];
      item.operations = [
        {
          opName: "解冻",
          // classNama: "op-unfreeze",
          dataUrl: "/api/unfreeze?id=" + item.id,
        },
        {
          opName: "冻结",
          // classNama: "op-freeze",
          dataUrl: "/api/freeze?id=" + item.id,
          relevantForm: "freezeForm",
        },
        {
          opName: "重置密码",
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
      item.time = "2020年3月16日 10:18";
      item.content = "通知内容：<a href='#'>123</a>";

      item.operations = [
        {
          opName: "我知道了",
          // classNama: "op-unfreeze",
          dataUrl: "/api/freeze?id=" + item.id,
        },
        {
          opName: "删除",
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
      item.name = "用户名";
      item.title = "副教授";
      item.direction = "物联网、智慧城市";
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
        Name: "李领治",
        Duties: "副教授",
        Direction: "物联网、智慧城市",
      },
    });
  },
  "GET /api/teammateMember2": (req, res) => {
    res.send(
      '        <form id="teamMateForm" data-title="添加骨干成员" method="post" action="/api/teammateMember">\n' +
        '          <div class="form-group row required">\n' +
        '            <label for="Name" class="col-sm-3 col-form-label">姓名</label>\n' +
        '            <div class="col-sm-9">\n' +
        '              <input class="form-control" id="date" type="date" type="text" required />\n' +
        "            </div>\n" +
        "          </div>\n" +
        '          <div class="form-group row required">\n' +
        '            <label for="Duties" class="col-sm-3 col-form-label">职务/职称</label>\n' +
        '            <div class="col-sm-9">\n' +
        '              <input class="form-control" id="Duties" name="Duties" type="text" required />\n' +
        "            </div>\n" +
        "          </div>\n" +
        '          <div class="form-group row required">\n' +
        '            <label for="Direction" class="col-sm-3 col-form-label">研究方向</label>\n' +
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
        '            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
        '            <button type="submit" class="btn btn-primary">提交</button>\n' +
        "          </div>\n" +
        '<div data-plugin="detailView">\n' +
        '                          <div class="detail-trigger inbk">\n' +
        "                           详情" +
        "                          </div>\n" +
        '                          <div class="detail-content-wrap dn bg-white">\n' +
        '                            <table class="table detail-content mb-0 table-sm">\n' +
        "                              <tr>\n" +
        "                                <td>对接内容</td>\n" +
        "                                <td>科技成果xxxx</td>\n" +
        "                              </tr>\n" +
        "                              <tr>\n" +
        "                                <td>对接内容</td>\n" +
        "                                <td>科技成果xxxx</td>\n" +
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
      item.SubjectTitle = "学科名称";
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
        SubjectTitle: "学科名称",
        SubjectNature: 1,
        IndustryField: 71,
        PlatformNature: 1502,
        IsDoctorGrant: true,
        Platform: "平台内容",
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
      item.title = "基于网络编码的ICN中高效安全内容缓存及分发关键技术研究";
      item.plan = "国家自然科学基金";
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
        Title: "基于网络编码的ICN中高效安全内容缓存及分发关键技术研究",
        Plan: "国家自然科学基金",
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
      item.name = "基于网络编码的ICN中高效安全内容缓存及分发关键技术研究";
      item.prize = "国家自然科学基金";
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
        Title: "基于网络编码的ICN中高效安全内容缓存及分发关键技术研究",
        Plan: "国家自然科学基金",
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
      dialog: "新密码是123456",
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
          label: "苏交科集团股份有限公司",
          number: 1234,
        },
        {
          index: 2,
          userid: 61339,
          username: "SIZ",
          label: "苏州井上中鼎办公机械制品有限公司",
          number: 1234,
        },
        {
          index: 3,
          userid: 11521,
          username: "徐剑戎",
          label: "苏州科之易信息技术有限公司",
          number: 1234,
        },
        {
          index: 4,
          userid: 14432,
          username: "盛世华安",
          label: "苏州盛世华安智能科技有限公司",
          number: 1234,
        },
        {
          userid: 16565,
          username: "szdltc",
          label: "苏州鼎利涂层有限公司",
          number: 1234,
        },
        {
          userid: 16787,
          username: "sljtfz",
          label: "苏拉（金坛）纺织机械有限公司",
          number: 1234,
        },
        {
          userid: 16910,
          username: "苏州晋翌",
          label: "苏州晋翌生物医学仪器有限公司",
          number: 1234,
        },
        {
          userid: 16945,
          username: "lxxhnxyhz",
          label: "苏州克莱明新材料有限公司",
          number: 1234,
        },
        {
          userid: 15786,
          username: "锘网科技",
          label: "苏州诺网电子科技有限公司",
          number: 1234,
        },
        {
          userid: 15788,
          username: "苏州天霖",
          label: "苏州天霖电子科技有限公司",
          number: 1234,
        },
        {
          userid: 16764,
          username: "敬业医化",
          label: "苏州敬业医药化工有限公司",
          number: 1234,
        },
        {
          userid: 15784,
          username: "elcom2013",
          label: "苏州奥科姆自动化科技有限公司",
          number: 1234,
        },
        {
          userid: 16126,
          username: "环保产业园",
          label: "苏州国家环保高新技术产业园发展有限公司",
          number: 1234,
        },
        {
          userid: 15604,
          username: "hiaiozyg",
          label: "苏州健华信息技术服务有限公司",
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
    //   msg: "格式不正确",
    // });
  },
  "POST /api/postSuccess": (req, res) => {
    res.send({
      code: 0,
      status: 200,
      flag: true,
      msg: "提交成功",
      // dialog: "对话",
    });
  },
  "POST /api/postFail": (req, res) => {
    res.send({
      msg: "操作失败",
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
      '蒋海淘</span>发布<span class="text-blue-3">「需求」</span\n' +
      "                >联轴器挠性原件受热性联轴器挠性原件受热性联轴器挠性原件受热性，膨胀与易损坏</a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
      "              >\n" +
      '              <span class="no-wrap">05/16 10:25</span>\n' +
      "            </li>" +
      '<li class="d-flex justify-content-between">\n' +
      '              <a class="ellipsis text-white font-size-16 mr-4" href=""\n' +
      '                ><span class="text-blue-3">' +
      Math.random() +
      '蒋海淘</span>发布<span class="text-blue-3">「资源」</span\n' +
      "                >联轴器挠性原件受热性联 </a\n" +
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
                  <span class="d-inline-block vertical-middle w-200 ellipsis">江甜杏</span>
                </td>
                <td>
                  <span class="no-wrap">用户角色：专家</span>
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
                  <span class="d-inline-block vertical-middle w-200 ellipsis">江甜杏</span>
                </td>
                <td>
                  <span class="no-wrap">用户角色：专家</span>
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
                  <span class="d-inline-block vertical-middle w-200 ellipsis">江甜杏</span>
                </td>
                <td>
                  <span class="no-wrap">用户角色：专家</span>
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
                  <span class="d-inline-block vertical-middle w-200 ellipsis">江甜杏</span>
                </td>
                <td>
                  <span class="no-wrap">用户角色：专家</span>
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
                  <span class="d-inline-block vertical-middle w-200 ellipsis">江甜杏</span>
                </td>
                <td>
                  <span class="no-wrap">用户角色：专家</span>
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
      { name: "南京市", value: 3806 * Math.random(), year: 100, month: 10, yoy: 10, mom: 1 },
      { name: "无锡市", value: 1800 * Math.random(), year: 100, month: 10, yoy: 10, mom: 1 },
      { name: "徐州市", value: 1000 * Math.random(), year: 200, month: 20, yoy: 20, mom: 2 },
      { name: "常州市", value: 1500 * Math.random(), year: 300, month: 30, yoy: 30, mom: 3 },
      { name: "苏州市", value: 3000 * Math.random(), year: 400, month: 40, yoy: 40, mom: 4 },
      { name: "南通市", value: 2000 * Math.random(), year: 500, month: 50, yoy: 50, mom: 5 },
      { name: "连云港市", value: 1100 * Math.random(), year: 600, month: 60, yoy: 60, mom: 6 },
      { name: "淮安市", value: 800, year: 700, month: 70, yoy: 70, mom: 7 },
      { name: "盐城市", value: 700, year: 800, month: 80, yoy: 80, mom: 8 },
      { name: "扬州市", value: 2600, year: 900, month: 90, yoy: 90, mom: 9 },
      { name: "镇江市", value: 2400, year: 1000, month: 100, yoy: 100, mom: 10 },
      { name: "泰州市", value: 2200, year: 1100, month: 110, yoy: 110, mom: 11 },
      { name: "宿迁市", value: 900, year: 1200, month: 120, yoy: 120, mom: 12 },
    ];

    res.send(data);
  },
  "GET /channel/UserPartJson": (req, res) => {
    let chart = [
      ["用户构成", "2019-11", "2019-12", "2020-01", "2020-02", "2020-03", "2020-04"],
      ["普通用户", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["专家", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["企业", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["第三方", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
      ["高校", 15.2, 17.1, 19.2, 12.4, 13.9, 19.1],
      ["科技局", 35.2, 37.1, 39.2, 32.4, 33.9, 59.1],
    ];

    res.send({ data: chart });
  },
  "GET /ChannelAbutment/ResourcePartJson": (req, res) => {
    let chart = [
      { value: 3105 * Math.random(), name: "专家" },
      { value: 2340 * Math.random(), name: "团队" },
      { value: 1350 * Math.random(), name: "院校" },
      { value: 25410 * Math.random(), name: "企业" },
      { value: 33505 * Math.random(), name: "成果" },
      { value: 5412 * Math.random(), name: "服务" },
      { value: 15480 * Math.random(), name: "需求" },
    ];

    res.send({ data: chart });
  },

  "GET /channel/AbutmentPartJson": (req, res) => {
    let chart = [
      ["amount", "city"],
      [582 * Math.random(), "徐州市"],
      [782 * Math.random(), "无锡市"],
      [410 * Math.random(), "南通市"],
      [127 * Math.random(), "连云港市"],
      [201 * Math.random(), "淮安市"],
      [791 * Math.random(), "常州市"],
      [918 * Math.random(), "苏州市"],
      [1018 * Math.random(), "南京市"],
      [201 * Math.random(), "盐城市"],
      [641 * Math.random(), "扬州市"],
      [325 * Math.random(), "镇江市"],
      [415 * Math.random(), "泰州市"],
      [70 * Math.random(), "宿迁市"],
    ];

    res.send({ data: chart });
  },
  "GET /channel/AbutmentPartJsonScreen": (req, res) => {
    let chart = [
      ["amount", "city"],
      [582 * Math.random(), "徐州市"],
      [782 * Math.random(), "无锡市"],
      [410 * Math.random(), "南通市"],
      [127 * Math.random(), "连云港市"],
      [201 * Math.random(), "淮安市"],
      [791 * Math.random(), "常州市"],
      [918 * Math.random(), "苏州市"],
      [1018 * Math.random(), "南京市"],
      [201 * Math.random(), "盐城市"],
      [641 * Math.random(), "扬州市"],
      [325 * Math.random(), "镇江市"],
      [415 * Math.random(), "泰州市"],
      [70 * Math.random(), "宿迁市"],
    ];

    res.send({ data: chart });
  },
  "GET /api/policyMatch": (req, res) => {
    res.send({
      returnCode: "2000",
      data: {
        basic: {
          name: "苏州趣链科技有限公司",
          creditCode: "91320506MA2126R198",
          registerCapital: "300",
          establishDate: "2019-11-03",
          applicableAreaProvince: "320000",
          applicableAreaProvinceStr: "江苏省",
          applicableAreaCity: "320500",
          applicableAreaCityStr: "苏州市",
          applicableAreaRegion: "320506",
          applicableAreaRegionStr: "吴中区",
          servics: ["servics_rs_2", "servics_rs_3"],
          enType: "en_type_1",
          enterpriseTypeList: ["enterprise_type_1", "enterprise_type_2"],
          enterpriseAptitudeFormat: ["enterprise_aptitude_1", "enterprise_aptitude_2"],
          enterpriseAptitudeList: [
            {
              code: "enterprise_aptitude_1",
              codeStr: "“百千万”工程重点企业",
              date: "2020-11-02",
              level: "1",
            },
            {
              code: "enterprise_aptitude_2",
              codeStr: "100强企业",
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
              codeStr: "工业设计中心",
              level: "2",
              levelStr: "省级",
              date: "2020-09-09",
            },
            {
              code: "technology_ability_1",
              codeStr: "工程技术研究中心",
              level: "1",
              levelStr: "国家级",
              date: "2020-11-11",
            },

            {
              code: "technology_ability_2",
              codeStr: "工程实验室",
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
                data-title="江苏高校协同创新中心可转化成果项目江苏高校协同创"
                data-imgurl="../../assets2/images/bg2.bdc27183.jpg"
                data-url="../../duijie.html"
                data-publish="辛长青律师"
              >
                <div class="avatar-middle mr-3">
                   <img class="cover-img" src="../../assets2/images/bg2.bdc27183.jpg" alt="">
                </div>
                <div class="flex-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="text-gray">
                      江苏高校协同创新中心可转化成果项目江苏高校协同创
                    </h5>
                  </div>
                  <div>
                    <span class="tag-red mr-2">技术转移</span>
                  </div>

                  <div class="text-light-gray mr-2">
                    <span>
                      发布人:辛长青律师
                    </span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <nav><ul class="pagination">
<li class="disabled">
<a href="javascript:" aria-label="Previous"><span aria-hidden="true">«</span></a>
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
<a href="/api/getMapList?pageIndex=2">»</a>
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
                data-title="江苏高校协同创新中心可转化成果项目江苏高校协同创"
                data-imgurl="../../assets2/images/bg2.bdc27183.jpg"
                data-url="../../duijie.html"
                data-publish="辛长青律师"
              >
                <div class="avatar-middle mr-3">
                   <img class="cover-img" src="../../assets2/images/bg2.bdc27183.jpg" alt="">
                </div>
                <div class="flex-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="text-gray">
                      江苏高校协同创新中心可转化成果项目江苏高校协同创
                    </h5>
                  </div>
                  <div>
                    <span class="tag-red mr-2">技术转移</span>
                  </div>

                  <div class="text-light-gray mr-2">
                    <span>
                      发布人:辛长青律师
                    </span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <nav><ul class="pagination">
<li class="disabled">
<a href="javascript:" aria-label="Previous"><span aria-hidden="true">«</span></a>
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
<a href="/api/getMapList?pageIndex=2">»</a>
</li></ul>
</nav>
      `);
  },
  // 在线会议mock接口
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
    res.send({ flag: true, attendanceId: 1105, meetingId: 417, msg: "加入房间成功" });
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
      //     {userID: "2537078085263", nickName: "ceaexpertltt", msg: "你好，能加您为好友吗？"},
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
            Content: "测试",
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
        "https://jlzx.jspc.org.cn/channel/downloadexportfile?path=085d4875-79b7-437b-b479-38c8c602f19d.xls\u0026filename=高校专家账号信息.xls",
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
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          hasChildren: false,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          hasChildren: false,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
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
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
    });
  },
  "GET /api/zhanban": (req, res) => {
    res.send(
      '<div id="zhanban" class="zhanbanResList" data-title="展板资源">\n' +
        "                    <ol>\n" +
        '                        <li><a href="#" target="_blank">资源详情</a></li>\n' +
        '                        <li><a href="#" target="_blank">资源详情资源详情资源详情资源详情资源详情资源详情资源详情</a></li>\n' +
        "                    </ol>\n" +
        "                </div>",
    );
  },
};
module.exports = proxy;
