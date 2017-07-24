System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var SavingsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            SavingsService = (function () {
                function SavingsService(_http) {
                    this._http = _http;
                    this._url = "http://jsonplaceholder.typicode.com/users";
                }
                SavingsService.prototype.getUsers = function () {
                    return this._http.get(this._url)
                        .map(function (res) { return res.json(); });
                };
                SavingsService.prototype.getUser = function (userId) {
                    return this._http.get(this.getUserUrl(userId))
                        .map(function (res) { return res.json(); });
                };
                SavingsService.prototype.addUser = function (user) {
                    return this._http.post(this._url, JSON.stringify(user))
                        .map(function (res) { return res.json(); });
                };
                SavingsService.prototype.updateUser = function (user) {
                    return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
                        .map(function (res) { return res.json(); });
                };
                SavingsService.prototype.deleteUser = function (userId) {
                    return this._http.delete(this.getUserUrl(userId))
                        .map(function (res) { return res.json(); });
                };
                SavingsService.prototype.getUserUrl = function (userId) {
                    return this._url + "/" + userId;
                };
                SavingsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SavingsService);
                return SavingsService;
            }());
            exports_1("SavingsService", SavingsService);
        }
    }
});
//# sourceMappingURL=savings.service.js.map