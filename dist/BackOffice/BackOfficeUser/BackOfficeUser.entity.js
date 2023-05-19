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
var BackOfficeUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeUser = void 0;
const typeorm_1 = require("typeorm");
const BaseAutoId_1 = require("../../BaseIds/BaseAutoId");
const BackOfficeRole_entity_1 = require("../BackOfficeRole/BackOfficeRole.entity");
let BackOfficeUser = BackOfficeUser_1 = class BackOfficeUser extends BaseAutoId_1.BaseAutoId {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BackOfficeRole_entity_1.BackOfficeRole, (role) => role, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", BackOfficeRole_entity_1.BackOfficeRole)
], BackOfficeUser.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], BackOfficeUser.prototype, "device_token", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BackOfficeUser_1, (created_by) => created_by, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", BackOfficeUser)
], BackOfficeUser.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BackOfficeUser_1, (updated_by) => updated_by, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    __metadata("design:type", BackOfficeUser)
], BackOfficeUser.prototype, "updated_by", void 0);
BackOfficeUser = BackOfficeUser_1 = __decorate([
    (0, typeorm_1.Entity)("back_office_users")
], BackOfficeUser);
exports.BackOfficeUser = BackOfficeUser;
