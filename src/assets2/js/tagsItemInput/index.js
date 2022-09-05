// the semi-colon before function invocation is a safety net against concatenated
// scripts and/

//

(function (root, window, document, factory, undefined) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
      root.tagsItemInput = factory(window, document);
      return root.tagsItemInput;
    });
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS.
    module.exports = factory(window, document);
  } else {
    // Browser globals.
    window.tagsItemInput = factory(window, document);
  }
})(this, window, document, function (window, document) {
  "use strict";

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variables rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  const pluginName = "tagsItemInput";

  // Select CLASS DEFINITION
  // ====================

  var tagsItemInput = function (element, options) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
    this.options = options;
    this.init(element, options);
  };
  tagsItemInput.DEFAULTS = {
    maxNumber: null,
    maxChars: null,
  };
  tagsItemInput.prototype.init = function (element, options) {
    if (!element) {
      element = this.element;
    }
    //hiddenInput
    let $hiddenInput = $(element).find("input:hidden");
    let tagsStr = $hiddenInput.val();
    let tagsList = tagsStr.length ? tagsStr.split(";") : [];
    // console.log(tagsList);
    let $container = $(element);
    // let $parent = $(element).parent();
    // if (!$container.length) {
    //   $container = $(`<div class="tagItemInput-wrapper" id="${this.options.target}"></div>`);
    //   $container.append($(element));
    //   $parent.append($container);
    // }

    //alert
    let $alert = $(element).siblings(".alert");
    if (!$alert.length) {
      if (this.options.maxNumber || this.options.maxChars) {
        let $alert = $(`<div class="alert alert-info" role="alert"></div>`);
        let tipsText = "";
        if (this.options.maxNumber) {
          tipsText = `最多输入${this.options.maxNumber}个关键词`;
        }
        if (this.options.maxChars) {
          tipsText = tipsText.concat(`,每个关键词不超过${this.options.maxChars}个字`);
        }
        $alert.text(tipsText);
        $container.after($alert);
      }
    }

    //生成tag标签和输入input
    let $tagsInputForm = $container.find(".form-inline");
    let source = $container.data("source");
    if (!$tagsInputForm.length) {
      $tagsInputForm = $(`<div class="form-inline mb-1"></div>`);
      if (source !== "other") {
        let $tagsInputGroup = $(
          `<input type="text" class="form-control mr-1 mb-1 tagInput"/><button type="button"  class="btn btn-light add mb-1">+</button>`,
        );
        $tagsInputForm.append($tagsInputGroup);
      }

      $container.prepend($tagsInputForm);
    }
    let $tagsLastSpan;
    $tagsInputForm.find(".tagItem-group").remove();
    for (let j = 0, tagText; (tagText = tagsList[j]); j++) {
      let $tagspan = $(
        `<div class="tagItem-group mr-1 mb-1"><span class="tagItem  tagItem-info">${tagText}</span><span  class="tagItem  tagItem-info  action remove">x</span></div>`,
      );
      if (!$tagsLastSpan) {
        $tagsInputForm.prepend($tagspan);
      } else {
        $tagspan.insertAfter($tagsLastSpan);
      }
      $tagsLastSpan = $tagspan;
    }
  };
  tagsItemInput.prototype.setInput = function (e, method, addValue, tagEle) {
    let self = tagEle ? tagEle : this;
    const $container = self.element ? self.element : tagEle.element;
    let $hiddenInput = $container.find("input:hidden");

    let tagsList = $hiddenInput.length && $hiddenInput.val() ? $hiddenInput.val().split(";") : [];
    if ((e && e.target.matches(".remove")) || method === "remove") {
      let $selectItems = $container.find(".tagItem-group");
      let $thisSelectItem = $(e.target).closest(".tagItem-group");
      let selectIndex = $selectItems.index($thisSelectItem);
      tagsList.splice(selectIndex, 1);
      $thisSelectItem.remove();
    }
    if ((e && e.target.matches(".add")) || method === "add") {
      let $tagsInputForm = $container.find(".form-inline");
      let tagText;
      let $tagInput;
      if (!addValue) {
        $tagInput = $container.find(".tagInput");
        tagText = $tagInput.val();
      } else {
        tagText = addValue;
      }
      let $tipEle = $tagInput ? $tagInput : $container;

      if (tagText) {
        tagText = tagText.trim();
        //检测关键词个数和字符串长度；相同的则不再添加
        if (self.options.maxNumber && tagsList.length === self.options.maxNumber) {
          new ErrorTip($tipEle[0], "添加个数已达上限");
          return;
        }
        if (self.options.maxChars && tagText.length > self.options.maxChars) {
          new ErrorTip($tipEle[0], "字符串长度超过限制");
          return;
        }
        if (tagsList.includes(tagText)) {
          new ErrorTip($tipEle[0], "已添加过相同的内容");
          return;
        }
        let $lastTagItem = $container.find(".tagItem-group").last();
        let $tagspan = $(
          `<div class="tagItem-group mr-1 mb-1"><span class="tagItem  tagItem-info">${tagText}</span><span  class="tagItem  tagItem-info  action remove">x</span></div>`,
        );
        if ($lastTagItem.length) {
          $tagspan.insertAfter($lastTagItem);
        } else {
          $tagsInputForm.prepend($tagspan);
        }
        tagsList.push(tagText);
        $container.find(".tagInput").val("");
      }
    }
    if ($hiddenInput.length) {
      $hiddenInput.val(tagsList.join(";"));
    }
  };
  tagsItemInput.prototype.add = function (addValue) {
    let tagEle = this;
    tagsItemInput.prototype.setInput(undefined, "add", addValue, tagEle);
  };

  // Select PLUGIN DEFINITION
  // =====================

  function Plugin(option, e) {
    return this.each(function () {
      const $this = $(this);

      let data = $this.data("dd.tags");
      const options = $.extend(
        {},
        tagsItemInput.DEFAULTS,
        $this.data(),
        typeof option == "object" && option,
      );
      if (!data) $this.data("dd.tags", (data = new tagsItemInput(this, options)));
      if (typeof option == "string") data[option](e);
    });
  }

  let old = $.fn[pluginName];

  $.fn[pluginName] = Plugin;
  $.fn[pluginName].Constructor = tagsItemInput;

  // Select NO CONFLICT
  // ===============

  $.fn[pluginName].noConflict = function () {
    $.fn[pluginName] = old;
    return this;
  };

  // Select DATA-API
  // ============

  let clickHandler = function (e) {
    e.preventDefault();
    Plugin.call($(this), "setInput", e);
  };

  $(document).on("click.dd.tags.input", "[data-plugin='tagsItemInput']", clickHandler);
});
