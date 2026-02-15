"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWoodrockHeader = generateWoodrockHeader;
const path = require("path");

function generateWoodrockHeader(doc, imageHeight) {
  const imagePath = path.resolve(
    process.cwd(), // project root (where package.json is)
    "woodrock-small-height_banner.png"
  );

  doc.image(imagePath, 50, 20, {
    width: 495,
    height: imageHeight || 90,
  });
}

