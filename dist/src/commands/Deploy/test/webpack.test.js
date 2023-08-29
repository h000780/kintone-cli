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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const commander_1 = require("commander");
const jsonfile_1 = require("jsonfile");
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const deployCommand_1 = __importDefault(require("../deployCommand"));
const initializeTestProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplate)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.authCommandImplement)(commander_1.program, process);
    return currentDir;
});
(0, globals_1.describe)('Deploy command', () => {
    (0, globals_1.describe)('Webpack', () => {
        (0, globals_1.test)('Should be assigned as "webpack" when the content is "webpack"', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield initializeTestProject();
            const webpackDir = `${currentDir}/webpack.config.js`;
            const mainProgram = (0, deployCommand_1.default)(commander_1.program);
            process.argv = constant_1.OPTIONS_DEPLOY;
            (0, jsonfile_1.writeFileSync)(webpackDir, constant_1.WEBPACK_CONTENT);
            yield mainProgram.parseAsync(process.argv);
            const config = (0, jsonfile_1.readFileSync)(webpackDir);
            (0, globals_1.expect)(config).toBe(constant_1.WEBPACK_CONTENT);
        }));
    });
});
//# sourceMappingURL=webpack.test.js.map