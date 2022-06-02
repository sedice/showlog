#! /usr/bin/env node

const { showLog } = require("../main");

const dir = "E:/work/device-manager-web";
showLog(...process.argv.slice(2));
