#!/usr/bin/env node
/*
 * Bundles index.html + local CSS/JS into single self-contained files:
 *   dist/amtsklar.html          – full document, works offline (double-click to open)
 *   dist/amtsklar.artifact.html – body-only variant for embedding hosts
 * Usage: node tools/build.js
 */
"use strict";
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
let html = read("index.html");

html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, (m, href) => `<style>\n${read(href)}\n</style>`);
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (m, src) => `<script>\n${read(src).replace(/<\/script/gi, "<\\/script")}\n</script>`);

html = html.replace(/<link rel="manifest"[^>]*>\s*/, "").replace(/<link rel="icon"[^>]*>\s*/, "");

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/amtsklar.html"), html);

const artifact = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/gi, "")
  .replace(/<\/?head>\s*/gi, "")
  .replace(/<\/?body>\s*/gi, "")
  .replace(/<meta charset="utf-8">\s*/i, "")
  .replace(/<meta name="viewport"[^>]*>\s*/i, "");
fs.writeFileSync(path.join(root, "dist/amtsklar.artifact.html"), artifact);
console.log("built dist/amtsklar.html (" + Math.round(html.length / 1024) + " KB)");
