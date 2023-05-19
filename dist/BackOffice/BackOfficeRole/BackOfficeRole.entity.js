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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeRole = void 0;
const typeorm_1 = require("typeorm");
const BaseAutoId_1 = require("../../BaseIds/BaseAutoId");
const BackOfficeUser_entity_1 = require("../BackOfficeUser/BackOfficeUser.entity");
let BackOfficeRole = class BackOfficeRole extends BaseAutoId_1.BaseAutoId {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], BackOfficeRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BackOfficeUser_entity_1.BackOfficeUser, (created_by) => created_by, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'create_by' }),
    __metadata("design:type", BackOfficeUser_entity_1.BackOfficeUser)
], BackOfficeRole.prototype, "create_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BackOfficeUser_entity_1.BackOfficeUser, (created_by) => created_by, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", BackOfficeUser_entity_1.BackOfficeUser)
], BackOfficeRole.prototype, "updated_by", void 0);
BackOfficeRole = __decorate([
    (0, typeorm_1.Entity)("back_office_role")
], BackOfficeRole);
exports.BackOfficeRole = BackOfficeRole;
