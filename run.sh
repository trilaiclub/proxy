#! /bin/sh

forever start --verbose --append --uid "recoproxy" --watch --watchDirectory ./server server/server.js --spinSleepTime 1000ms
