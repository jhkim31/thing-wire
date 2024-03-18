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
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Organization_1 = __importDefault(require("./Organization"));
const UserOrg_1 = __importDefault(require("./UserOrg"));
const Role_1 = __importDefault(require("./Role"));
const UserRole_1 = __importDefault(require("./UserRole"));
const ConfigFile_1 = __importDefault(require("./ConfigFile"));
let User = class User extends sequelize_typescript_1.Model {
    static createHash(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPw = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashPw;
        });
    }
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(password, this.password);
            return yield bcrypt_1.default.compare(password, this.password);
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "isSA", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ConfigFile_1.default),
    __metadata("design:type", ConfigFile_1.default)
], User.prototype, "modifiedFiles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Organization_1.default),
    __metadata("design:type", Array)
], User.prototype, "ownedOrgs", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Organization_1.default, () => UserOrg_1.default),
    __metadata("design:type", Array)
], User.prototype, "orgs", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Role_1.default, () => UserRole_1.default),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "createHash", null);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users" })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map