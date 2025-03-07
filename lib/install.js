"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installReviewDog = exports.installLint = void 0;
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const path_1 = __importDefault(require("path"));
const releases = 'https://github.com/errata-ai/vale/releases/download';
const last = 'https://github.com/errata-ai/vale/releases/latest/';
function installLint(version) {
    return __awaiter(this, void 0, void 0, function* () {
        core.info(`Installing Vale version '${version}' ...`);
        if (version === 'latest') {
            const response = yield (0, node_fetch_1.default)(last);
            const vs = response.url;
            const parts = vs.split(`/`);
            version = parts[parts.length - 1].substring(1);
        }
        const url = releases + `/v${version}/vale_${version}_Linux_64-bit.tar.gz`;
        const archivePath = yield tc.downloadTool(url);
        let extractedDir = '';
        const args = ['xz'];
        if (process.platform.toString() != 'darwin') {
            args.push('--overwrite');
        }
        extractedDir = yield tc.extractTar(archivePath, process.env.HOME, args);
        const lintPath = path_1.default.join(extractedDir, `vale`);
        core.info(`Installed version '${version}' into '${lintPath}'.`);
        return lintPath;
    });
}
exports.installLint = installLint;
function installReviewDog(version) {
    return __awaiter(this, void 0, void 0, function* () {
        core.info(`Installing ReviewDog version '${version}' ...`);
        const url = `https://github.com/reviewdog/reviewdog/releases/download/v${version}/reviewdog_${version}_Linux_x86_64.tar.gz`;
        const archivePath = yield tc.downloadTool(url);
        let extractedDir = '';
        const args = ['xz'];
        if (process.platform.toString() != 'darwin') {
            args.push('--overwrite');
        }
        extractedDir = yield tc.extractTar(archivePath, process.env.HOME, args);
        const reviewdogPath = path_1.default.join(extractedDir, `reviewdog`);
        core.info(`Installed version '${version}' into '${reviewdogPath}'.`);
        return reviewdogPath;
    });
}
exports.installReviewDog = installReviewDog;
