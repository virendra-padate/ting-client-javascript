(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "moment", "lodash", "../models/ReadReceipt"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = require("moment");
    var lodash_1 = require("lodash");
    var ReadReceipt_1 = require("../models/ReadReceipt");
    var ReadReceiptAdapter = (function () {
        function ReadReceiptAdapter() {
        }
        ReadReceiptAdapter.fromServerResponse = function (readReceiptData) {
            var readReceipt = new ReadReceipt_1.ReadReceipt(lodash_1.extend({}, readReceiptData, {
                readOn: readReceiptData.readOn ? moment.utc(readReceiptData.readOn) : null,
            }));
            return readReceipt;
        };
        return ReadReceiptAdapter;
    }());
    exports.ReadReceiptAdapter = ReadReceiptAdapter;
});
//# sourceMappingURL=ReadReceiptAdapter.js.map