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
const Organization_1 = __importDefault(require("./Organization"));
const Device_1 = __importDefault(require("./Device"));
const GroupDevice_1 = __importDefault(require("./GroupDevice"));
const ConfigFile_1 = __importDefault(require("./ConfigFile"));
let Group = class Group extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Group.prototype, "isConfigGroup", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => ConfigFile_1.default),
    __metadata("design:type", ConfigFile_1.default)
], Group.prototype, "configFile", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Organization_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Group.prototype, "orgId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Organization_1.default),
    __metadata("design:type", Organization_1.default)
], Group.prototype, "org", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Device_1.default, () => GroupDevice_1.default),
    __metadata("design:type", Array)
], Group.prototype, "devices", void 0);
Group = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "groups" })
], Group);
exports.default = Group;
//# sourceMappingURL=Group.js.map