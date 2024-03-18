"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Group_1 = __importDefault(require("./Group"));
const GroupDevice_1 = __importDefault(require("./GroupDevice"));
const Organization_1 = __importDefault(require("./Organization"));
const OrgDevice_1 = __importDefault(require("./OrgDevice"));
const ConfigFile_1 = __importDefault(require("./ConfigFile"));
/**
 * * id : 장치의 id
 * * name : 장치의 이름
 * * type : 장치의 타입
 *      * 1 : 환경센서
 *      * 2 :
 * * comment : 장치 주석 (ThingWire에서 수정)
 */
let Device = class Device extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Device.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Device.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Device.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ConfigFile_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Device.prototype, "configFileId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ConfigFile_1.default),
    __metadata("design:type", ConfigFile_1.default)
], Device.prototype, "configFile", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Group_1.default, () => GroupDevice_1.default),
    __metadata("design:type", Array)
], Device.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Organization_1.default, () => OrgDevice_1.default),
    __metadata("design:type", Array)
], Device.prototype, "organizations", void 0);
Device = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "devices" })
], Device);
exports.default = Device;
//# sourceMappingURL=Device.js.map