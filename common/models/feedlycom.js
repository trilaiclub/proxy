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

      Feedlycom.listAllFeedPipes = function (data, cb) {

            var optionAllFeeds= {
                  url: feedly + '/' + "categories",
                  headers: {
                        'Authorization': config.feedlycom.client.secret
                  }
            };

            request(optionAllFeeds, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   var info = JSON.parse(body);
                   responseAllFeeds = info;
                } else {
                   responseAllFeeds = error;
                }

                cb(null, responseAllFeeds);
            });
            responseAllFeeds = "";
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

            request(optionAllBoards, function (error, response, body) {

               if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  responseAllBoards = info;
               } else {
                 responseAllBoards = error;
               }

               cb(null, responseAllBoards);
            });

            responseAllBoards = "";
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

            request(optionSearchInFeed, function (error, response, body) {

                if (!error && response.statusCode == 200) {
                   var info = JSON.parse(body);
                   responseSearchInFeed = info;
                } else {
                   responseSearchInFeed = error;
                }
                cb(null, response);
            });

            responseSearchInFeed = "";
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

            request(optionSearchInBoard, function (error, response, body) {

               if (!error && response.statusCode == 200) {
                   var info = JSON.parse(body);
                   responseSearchInBoard = info;
               } else {
                  responseSearchInBoard = error;
               }

               cb(null, response);
            });

            responseSearchInBoard = "";

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
