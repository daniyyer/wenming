// the semi-colon before function invocation is a safety net against concatenated
// scripts and/

//

(function (root, window, document, factory, undefined) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
      root.checkboxGroup = factory(window, document);
      return root.checkboxGroup;
    });
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS.
    module.exports = factory(window, document);
  } else {
    // Browser globals.
    window.checkboxGroup = factory(window, document);
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
  const pluginName = "checkboxGroup";
  // const defaults = {
  //   level: 3,
  //   api: "/api/getchildareas",
  // };
  //
  // // The actual plugin constructor
  // function Plugin(element, options) {
  //   this.element = element;
  //
  //   // jQuery has an extend method which merges the contents of two or
  //   // more objects, storing the result in the first object. The first object
  //   // is generally empty as we don't want to alter the default options for
  //   // future instances of the plugin
  //   this.settings = $.extend({}, defaults, options);
  //   this._defaults = defaults;
  //   this._name = pluginName;
  //   this.init();
  // }
  //
  // // Avoid Plugin.prototype conflicts
  // $.extend(Plugin.prototype, {
  //   init: function () {
  //     // Place initialization logic here
  //     // You already have access to the DOM element and
  //     // the options via the instance, e.g. this.element
  //     // and this.settings
  //     // you can add more functions like the one below and
  //     // call them like the example below
  //     this.linkageSelect();
  //   },
  //   linkageSelect: function () {
  //     // container
  //     const self = this;
  //     const $container = $(self.element);
  //
  //     $container.on("change", function (event) {
  //       let $selectItems = $container.find(".linkageSelectItem");
  //       let $thisSelectItem = $(this).closest(".linkageSelectItem");
  //
  //       $thisSelectItem.nextAll().remove();
  //       let val = $(this).val();
  //       let selectIndex = $selectItems.index($thisSelectItem);
  //       if (selectIndex < self.settings.level - 1 && val) {
  //         $.ajax({ url: self.settings.api, data: { id: val } })
  //           .done(function (data) {
  //             let $newSelectItem = $thisSelectItem.clone();
  //             $newSelectItem.find("select").empty();
  //             for (let i = 0; i < data.result.length; i = i + 1) {
  //               let $option = $(
  //                 `<option value=${data.result[i].value}>${data.result[i].text}</option>`,
  //               );
  //               $newSelectItem.find("select").append($option);
  //             }
  //             $thisSelectItem.after($newSelectItem);
  //           })
  //           .fail(function () {
  //             new LightTip().error("网络错误");
  //           });
  //       }
  //     });
  //   },
  // });
  //
  // // A really lightweight plugin wrapper around the constructor,
  // // preventing against multiple instantiations
  //
  // // $.fn[pluginName] = function (options) {
  // //   return this.each(function () {
  // //     if (!$.data(this, "plugin_" + pluginName)) {
  // //       $.data(this, "plugin_" + pluginName, new Plugin(this, options));
  // //     }
  // //   });
  // // };
  // function selectChange(event) {
  //   const level = $(this).data("level") || 3;
  //   const api = $(this).data("api");
  //   const paramStr = $(this).data("paramStr");
  //   const $container = $(this);
  //   let $selectItems = $container.find(".linkageSelectItem");
  //   let $thisSelectItem = $(event.target).closest(".linkageSelectItem");
  //   $thisSelectItem.nextAll().remove();
  //   let val = $(event.target).val();
  //   let selectIndex = $selectItems.index($thisSelectItem);
  //   if (selectIndex < level - 1 && val) {
  //     $.ajax({ url: api, data: { [paramStr]: val } })
  //       .done(function (data) {
  //         let $newSelectItem = $thisSelectItem.clone();
  //         $newSelectItem.find("select").empty();
  //         for (let i = 0; i < data.result.length; i = i + 1) {
  //           let $option = $(
  //             `<option value=${data.result[i].value}>${data.result[i].text}</option>`,
  //           );
  //           $newSelectItem.find("select").append($option);
  //         }
  //         $thisSelectItem.after($newSelectItem);
  //       })
  //       .fail(function () {
  //         new LightTip().error("网络错误");
  //       });
  //   }
  // }

  // $(document).on("change", '[data-plugin="checkboxGroup"]', selectChange);

  // Select CLASS DEFINITION
  // ====================

  var checkboxGroup = function (element, options) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
    this.options = options;
    // this.init(element,options);
    let $form = $(element).closest("form");
    let $hiddenInput = $form.find(`input[name=${this.options.name}]`);

    if (!$hiddenInput.length) {
      let $input = $(`<input hidden name=${this.options.name}>`);
      this.element.prepend($input);
    } else {
      this.init(element, options);
    }
  };
  checkboxGroup.DEFAULTS = {
    api: "",
    paramStr: "id",
  };
  checkboxGroup.prototype.init = function (element, options) {
    if (!element) {
      element = this.element;
    }
    console.log(this.options.name);
    const $checkbox = $(element).find(":checkbox");
    let num = Number($(`input[name=${this.options.name}]`).val());
    let byteStringPart = num.toString(2);
    //补全
    let byteString = byteStringPart.padStart($checkbox.length, "0");
    let checkValueArray = byteString
      .split("")
      .reverse()
      .map((x) => Boolean(Number(x)));
    for (let i = 0; i < checkValueArray.length; i++) {
      let checkVal = checkValueArray[i];
      $checkbox.eq(i).prop("checked", checkVal);
    }
  };
  checkboxGroup.prototype.setInput = function (e) {
    const $container = this.element;
    const $checkbox = this.element.find(":checkbox");
    let val = 0;
    $checkbox.each(function (i, item) {
      let itemValue = $(item).prop("checked") ? 1 : 0;

      val = val + itemValue * Math.pow(2, i);
    });

    let $form = $container.closest("form");
    let $hiddenInput = $form.find(`input[name=${this.options.name}]`);
    $hiddenInput.val(val);
    $hiddenInput[0].dispatchEvent(new Event("input"));
    if ($hiddenInput[0].type === "hidden") {
      $hiddenInput[0].dispatchEvent(new Event("change"));
    }
  };

  // Select PLUGIN DEFINITION
  // =====================

  function Plugin(option, e) {
    return this.each(function () {
      const $this = $(this);

      let data = $this.data("dd.check");
      const options = $.extend(
        {},
        checkboxGroup.DEFAULTS,
        $this.data(),
        typeof option == "object" && option,
      );
      if (!data) $this.data("dd.check", (data = new checkboxGroup(this, options)));
      if (typeof option == "string") data[option](e);
    });
  }

  var old = $.fn[pluginName];

  $.fn[pluginName] = Plugin;
  $.fn[pluginName].Constructor = checkboxGroup;

  // Select NO CONFLICT
  // ===============

  $.fn[pluginName].noConflict = function () {
    $.fn[pluginName] = old;
    return this;
  };

  // Select DATA-API
  // ============

  let changeHandler = function (e) {
    e.preventDefault();
    Plugin.call($(this), "setInput", e);
  };

  $(document).on("change.dd.check.group", '[data-plugin="checkboxGroup"]', changeHandler);
});
