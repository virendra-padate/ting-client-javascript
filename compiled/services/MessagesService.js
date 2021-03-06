(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash", "whatwg-fetch", "../models/MessageTypes", "../adapters/MessageAdapter", "../adapters/ReadReceiptAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = require("lodash");
    require("whatwg-fetch");
    var MessageTypes_1 = require("../models/MessageTypes");
    var MessageAdapter_1 = require("../adapters/MessageAdapter");
    var ReadReceiptAdapter_1 = require("../adapters/ReadReceiptAdapter");
    var DEFAULT_PAGE_SIZE = 100;
    var MessagesService = (function () {
        function MessagesService() {
        }
        MessagesService.fetchMessagesForTopicSinceMessage = function (session, topic, message) {
            var url = session.serviceBaseURL + "/messages?topic=" + encodeURIComponent(topic.name) + "&sinceMessageId=" + encodeURIComponent(message.messageId) + "&pageSize=" + encodeURIComponent(DEFAULT_PAGE_SIZE.toString());
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                }
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return lodash_1.map(response, function (datum) {
                    return MessageAdapter_1.MessageAdapter.fromServerResponse(datum);
                });
            });
        };
        MessagesService.fetchMessagesForTopicTillMessage = function (session, topic, message) {
            var url = session.serviceBaseURL + "/messages?topic=" + encodeURIComponent(topic.name) + "&tillMessageId=" + encodeURIComponent(message.messageId) + "&pageSize=" + encodeURIComponent(DEFAULT_PAGE_SIZE.toString());
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                }
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return lodash_1.map(response, function (datum) {
                    return MessageAdapter_1.MessageAdapter.fromServerResponse(datum);
                });
            });
        };
        MessagesService.publishMessage = function (session, topicName, messageBody, messageType) {
            if (messageType === void 0) { messageType = MessageTypes_1.MessageTypes.TEXT; }
            var url = session.serviceBaseURL + "/messages/publish";
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                },
                body: JSON.stringify({
                    topic: {
                        name: topicName,
                        createIfNotExist: true
                    },
                    message: {
                        type: messageType,
                        body: messageBody
                    }
                })
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return MessageAdapter_1.MessageAdapter.fromServerResponse(response);
            });
        };
        MessagesService.publishFile = function (session, topicName, file) {
            var url = session.serviceBaseURL + "/files";
            var formData = new FormData();
            formData.append('topicName', topicName);
            formData.append('createTopicIfNotExist', 'true');
            formData.append('file', file);
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + session.token
                },
                body: formData
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return MessageAdapter_1.MessageAdapter.fromServerResponse(response);
            });
        };
        MessagesService.markAMessageAsRead = function (session, message) {
            var url = session.serviceBaseURL + "/messages/" + message.messageId + "/read";
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                }
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return ReadReceiptAdapter_1.ReadReceiptAdapter.fromServerResponse(response);
            });
        };
        MessagesService.markMessagesSinceAMessageAsRead = function (session, sinceMessage) {
            var url = session.serviceBaseURL + "/messages/since/" + sinceMessage.messageId + "/read";
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                }
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return lodash_1.map(response, function (datum) {
                    return ReadReceiptAdapter_1.ReadReceiptAdapter.fromServerResponse(datum);
                });
            });
        };
        MessagesService.markMessagesTillAMessageAsRead = function (session, tillMessage) {
            var url = session.serviceBaseURL + "/messages/till/" + tillMessage.messageId + "/read";
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + session.token
                }
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var error = new Error(response.statusText);
                    throw error;
                }
            })
                .then(function (response) {
                return lodash_1.map(response, function (datum) {
                    return ReadReceiptAdapter_1.ReadReceiptAdapter.fromServerResponse(datum);
                });
            });
        };
        return MessagesService;
    }());
    exports.MessagesService = MessagesService;
});
//# sourceMappingURL=MessagesService.js.map