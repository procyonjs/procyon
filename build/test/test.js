"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
ava_1.default('foo', function (t) {
    t.pass();
});
ava_1.default('bar', function (t) {
    t.is('hello', 'hello');
});
