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
const User_1 = __importDefault(require("./User"));
const Permission_1 = __importDefault(require("./Permission"));
const Group_1 = __importDefault(require("./Group"));
const Role_1 = __importDefault(require("./Role"));
const UserOrg_1 = __importDefault(require("./UserOrg"));
const Device_1 = __importDefault(require("./Device"));
const OrgDevice_1 = __importDefault(require("./OrgDevice"));
let Organization = class Organization extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Organization.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default),
    __metadata("design:type", User_1.default)
], Organization.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Permission_1.default),
    __metadata("design:type", Array)
], Organization.prototype, "permissions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Group_1.default, { onDelete: "CASCADE", hooks: true }),
    __metadata("design:type", Array)
], Organization.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Role_1.default),
    __metadata("design:type", Array)
], Organization.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => UserOrg_1.default),
    __metadata("design:type", Array)
], Organization.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Device_1.default, () => OrgDevice_1.default),
    __metadata("design:type", Array)
], Organization.prototype, "devices", void 0);
Organization = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "organizations" })
], Organization);
exports.default = Organization;
//# sourceMappingURL=Organization.js.map