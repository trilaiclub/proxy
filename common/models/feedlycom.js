'use strict';

//Config
var configJson = process.cwd() + '/' + "config.json";
var config = require(configJson);
var request = require('request');

module.exports = function (Feedlycom) {

      var feedly = config.feedlycom.client.url;
      var responseAllFeeds = "";
      var responseAllBoards = "";
      var responseSearchInFeed = "";
      var responseSearchInBoard = "";
      //List all categories    

      function callback1(error, response, body) {
            responseAllFeeds = "";
            if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  responseAllFeeds = info;
            }
      }
      function callback2(error, response, body) {
            responseAllBoards = "";
            if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  responseAllBoards = info;
            }
      }
      function callback3(error, response, body) {
            responseSearchInFeed = "";
            if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  responseSearchInFeed = info;
            }
      }
      function callback4(error, response, body) {
            responseSearchInBoard = "";
            if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  responseSearchInBoard = info;
            }
      }

      Feedlycom.listAllFeedPipes = function (data, cb) {
            var optionAllFeeds= {
                  url: feedly + '/' + "categories",
                  headers: {
                        'Authorization': config.feedlycom.client.secret
                  }
            };

            request(optionAllFeeds, callback1);
            var response = responseAllFeeds;
            responseAllFeeds = "";
            cb(null, response);
      }

      Feedlycom.remoteMethod('listAllFeedPipes', {
            http: { path: '/listAllFeedPipes', verb: 'get' },
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object', 'http': { source: 'res' } }
      });

      //List all boards

      Feedlycom.listAllBoardPipes = function (data, cb) {
            var optionAllBoards = {
                  url: feedly + '/' + "search/feeds?query=" + data + "",
                  headers: {
                        'Authorization': config.feedlycom.client.secret
                  }
            };

            request(optionAllBoards, callback2);
            var response = responseAllBoards;
            responseAllBoards = "";
            cb(null, response);
      }

      Feedlycom.remoteMethod('listAllBoardPipes', {
            http: { path: '/listAllBoardPipes', verb: 'get' },
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object', 'http': { source: 'res' } }
      });


      //Search in category feed

      Feedlycom.searchInFeedPipe = function (streamId, query, fields, cb) {
            var optionSearchInFeed = {
                  url: feedly + '/' + "search/contents?streamId=" + streamId + "&query=" + query + "&fields=" + fields + "",
                  headers: {
                        'Authorization': config.feedlycom.client.secret
                  }
            };

            request(optionSearchInFeed, callback3);
            var response = responseSearchInFeed;
            responseSearchInFeed = "";
            cb(null, response);
      }

      Feedlycom.remoteMethod('searchInFeedPipe', {
            http: { path: '/searchInFeedPipe', verb: 'get' },
            accepts: [
                  { arg: 'streamId', type: 'string' },
                  { arg: 'query', type: 'string' },
                  { arg: 'fields', type: 'string' }
            ],
            returns: { arg: 'response', type: 'object', 'http': { source: 'object' } }
      });



      //Search in board feed

      Feedlycom.searchInBoardPipe = function (streamId, query, fields, cb) {

            var optionSearchInBoard = {
                  url: feedly + '/' + "search/contents?streamId=" + streamId + "&query=" + query + "&fields=" + fields + "",
                  headers: {
                        'Authorization': config.feedlycom.client.secret
                  }
            };

            request(optionSearchInBoard, callback4);
            var response = responseSearchInBoard;
            responseSearchInBoard = "";
            cb(null, response);
      }

      Feedlycom.remoteMethod('searchInBoardPipe', {
            http: { path: '/searchInBoardPipe', verb: 'get' },
            accepts: [
                  { arg: 'streamId', type: 'string' },
                  { arg: 'query', type: 'string' },
                  { arg: 'fields', type: 'string' }
            ],
            returns: { arg: 'response', type: 'object', 'http': { source: 'object' } }
      });
};
