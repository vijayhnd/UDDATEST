webpackJsonp([14],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Rest = /** @class */ (function () {
    function Rest(http) {
        this.http = http;
        // BASE_URL = "http://192.168.0.104:8089"; //Local URL
        this.BASE_URL = "https://sk-web.excelsiortechnologies.com"; //Live URL
        //Authentication
        this.API_LOGIN = this.BASE_URL + '/api/Admin/EmailLogin';
        this.API_FORGOT_PASSWORD = this.BASE_URL + '/api/Admin/ForgotPassword';
        this.API_RESET_PASSWORD = this.BASE_URL + '/api/Admin/ResetPassword';
        this.API_CHANGE_PASSWORD = this.BASE_URL + '/api/Admin/ChangePassword';
        //Dashboard
        this.API_DASHBOARD = this.BASE_URL + '/api/Admin/GetDashboard';
        //client
        this.API_GET_MY_CLIENTS = this.BASE_URL + '/api/Admin/GetMyClients';
        this.API_GET_SERVICE_LIST = this.BASE_URL + '/api/Admin/GetServicesList';
        this.API_GET_PACKAGE_LIST = this.BASE_URL + '/api/Admin/GetPackagesList';
        this.API_GET_MANAGER_LIST = this.BASE_URL + '/api/Admin/GetManagerList';
        this.API_ADD_CLIENT = this.BASE_URL + '/api/Admin/ClientsRegister';
        this.API_GET_FOLLOW_UP = this.BASE_URL + '/api/Admin/GetMyFollowUp';
        this.API_GET_STATE_LIST = this.BASE_URL + '/api/Admin/GetStateList';
        //Chat API
        this.API_GET_MY_CHAT = this.BASE_URL + '/api/Admin/GetMessageDetails';
        this.API_SEND_MESSAGE = this.BASE_URL + '/api/Admin/PostMessage';
        console.log('Hello Rest Provider');
    }
    //Login API Call
    Rest.prototype.Login = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_LOGIN, data).subscribe(function (res) {
                console.log("Response Login ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error Login ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    // ForgotPassword API Call
    Rest.prototype.ForgotPassword = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_FORGOT_PASSWORD, data).subscribe(function (res) {
                console.log("Response ForgotPassword ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error ForgotPassword ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.ResetPassword = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_RESET_PASSWORD, data, { headers: headers }).subscribe(function (res) {
                console.log("Response ResetPassword ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error ResetPassword ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.ChangePassword = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_CHANGE_PASSWORD, data, { headers: headers }).subscribe(function (res) {
                console.log("Response ChangePassword ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error ChangePassword ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetDashboard = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_DASHBOARD, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetDashboard ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetDashboard ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetMyClients = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_MY_CLIENTS, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetMyClients ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetMyClients ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetPackage = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_PACKAGE_LIST, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetPackage ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetPackage ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetService = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_SERVICE_LIST, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetService ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetService ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetManager = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_MANAGER_LIST, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetManager ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetManager ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetMyFollowup = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_FOLLOW_UP, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetMyFollowup ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetMyFollowup ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.AddClient = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_ADD_CLIENT, data, { headers: headers }).subscribe(function (res) {
                console.log("Response AddClient ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error AddClient ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetStateList = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_GET_STATE_LIST, { headers: headers }).subscribe(function (res) {
                console.log("Response GetState ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetState ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.GetAdminChat = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_GET_MY_CHAT, data, { headers: headers }).subscribe(function (res) {
                console.log("Response GetAdminChat ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error GetAdminChat ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest.prototype.PostMessage = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'HashToken': this.HashToken
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.API_SEND_MESSAGE, data, { headers: headers }).subscribe(function (res) {
                console.log("Response PostMessage ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("Error PostMessage ", JSON.stringify(err));
                reject(err);
            });
        });
    };
    Rest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], Rest);
    return Rest;
}());

//# sourceMappingURL=Rest.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/all-client/all-client.module": [
		278,
		13
	],
	"../pages/all-lead/all-lead.module": [
		279,
		12
	],
	"../pages/chat-list/chat-list.module": [
		285,
		11
	],
	"../pages/chat/chat.module": [
		281,
		10
	],
	"../pages/client-details/client-details.module": [
		280,
		9
	],
	"../pages/dashboard/dashboard.module": [
		282,
		8
	],
	"../pages/follow-up-details/follow-up-details.module": [
		283,
		7
	],
	"../pages/follow-up/follow-up.module": [
		284,
		6
	],
	"../pages/forgot/forgot.module": [
		286,
		5
	],
	"../pages/help-support/help-support.module": [
		287,
		4
	],
	"../pages/lead-details/lead-details.module": [
		288,
		3
	],
	"../pages/login/login.module": [
		289,
		2
	],
	"../pages/otp/otp.module": [
		291,
		1
	],
	"../pages/reset-password/reset-password.module": [
		290,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_Rest__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase_authentication__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_base64__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_all_client_all_client__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_all_client_all_client__["b" /* PopoverOptionsClient */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/all-client/all-client.module#AllClientPageModule', name: 'AllClientPage', segment: 'all-client', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/all-lead/all-lead.module#AllLeadPageModule', name: 'AllLeadPage', segment: 'all-lead', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client-details/client-details.module#ClientDetailsPageModule', name: 'ClientDetailsPage', segment: 'client-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/follow-up-details/follow-up-details.module#FollowUpDetailsPageModule', name: 'FollowUpDetailsPage', segment: 'follow-up-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/follow-up/follow-up.module#FollowUpPageModule', name: 'FollowUpPage', segment: 'follow-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-list/chat-list.module#ChatListPageModule', name: 'ChatListPage', segment: 'chat-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot/forgot.module#ForgotPageModule', name: 'ForgotPage', segment: 'forgot', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/help-support/help-support.module#HelpSupportPageModule', name: 'HelpSupportPage', segment: 'help-support', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lead-details/lead-details.module#LeadDetailsPageModule', name: 'LeadDetailsPage', segment: 'lead-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/otp/otp.module#OtpPageModule', name: 'OtpPage', segment: 'otp', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_all_client_all_client__["b" /* PopoverOptionsClient */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__providers_Rest__["a" /* Rest */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_base64__["a" /* Base64 */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase_authentication__["a" /* FirebaseAuthentication */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Rest__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menu, RestProvider, event) {
        var _this = this;
        this.RestProvider = RestProvider;
        this.event = event;
        // rootPage: any = 'DashboardPage';
        this.rootPage = 'LoginPage';
        //rootPage: any = 'LoginPage';
        this.pages = [];
        this.pages.push({
            id: '1',
            title: 'Dashboard',
            component: 'DashboardPage',
            menu_image: '../assets/Svg_Icons/dash.svg'
        });
        this.pages.push({
            id: '2',
            title: 'My Clients',
            component: 'AllClientPage',
            menu_image: '../assets/Svg_Icons/profile.svg'
        });
        this.pages.push({
            id: '3',
            title: 'Lead Management',
            component: 'AllLeadPage',
            menu_image: '../assets/Svg_Icons/treatment_service.svg'
        });
        this.pages.push({
            id: '4',
            title: 'My Follow Ups',
            component: 'FollowUpPage',
            menu_image: '../assets/Svg_Icons/help_support.svg'
        });
        this.pages.push({
            id: '5',
            title: 'Notifications',
            component: '',
            menu_image: '../assets/Svg_Icons/notification.svg'
        });
        this.pages.push({
            id: '6',
            title: 'Quick Chat',
            component: 'ChatListPage',
            menu_image: '../assets/Svg_Icons/chat.svg'
        });
        event.subscribe('admin:details', function () {
            _this.adminDetails();
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.checklogin = localStorage.getItem('AdminLoginStatus');
        if (this.checklogin == 'True') {
            this.rootPage = 'DashboardPage';
            console.log('AdminLoginStatus : ' + localStorage.getItem('AdminLoginStatus'));
            console.log('AdminId : ' + localStorage.getItem('AdminId'));
            console.log('AdminEmail : ' + localStorage.getItem('AdminEmail'));
            console.log('AdminFirstName : ' + localStorage.getItem('AdminFirstName'));
            console.log('AdminLastName : ' + localStorage.getItem('AdminLastName'));
            console.log('AdminImage : ' + localStorage.getItem('AdminImage'));
            console.log('HashToken : ' + localStorage.getItem('HashToken'));
        }
        else {
            this.rootPage = 'LoginPage';
            // this.rootPage = 'DemoPage';
        }
    }
    MyApp.prototype.adminDetails = function () {
        this.RestProvider.HashToken = localStorage.getItem('HashToken');
        this.RestProvider.AdminId = localStorage.getItem('AdminId');
        this.RestProvider.AdminEmail = localStorage.getItem('AdminEmail');
        this.RestProvider.AdminFirstName = localStorage.getItem('AdminFirstName');
        this.RestProvider.AdminLastName = localStorage.getItem('AdminLastName');
        this.RestProvider.AdminImage = localStorage.getItem('AdminImage');
        this.RestProvider.FullName = localStorage.getItem('AdminFullName');
        this.RestProvider.UserTypeId = localStorage.getItem('UserTypeId');
        this.RestProvider.UserType = localStorage.getItem('UserType');
    };
    MyApp.prototype.openPage = function (pages) {
        this.nav.push(pages.component);
    };
    MyApp.prototype.logout = function () {
        localStorage.setItem('AdminLoginStatus', 'False');
        localStorage.clear();
        this.nav.setRoot('LoginPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/kushalpatel/Desktop/Autobell App/autobell_Admin/src/app/app.html"*/'<ion-menu side="left" [content]="content" persistent="true">\n    <ion-content style="background-color: #2D2D2E">\n        <button ion-button menuClose style="margin: 30px 10px 15px 10px; box-shadow: none;background-color: transparent">\n            <ion-icon name="custom-closeIcon"\n                style="color: white;font-size: 20px;"></ion-icon>\n        </button>\n        <div>\n            <ion-row>\n                <ion-col col-6 *ngFor="let data of pages;let i =index;" menuClose (click)="openPage(data)" style="text-align: center;margin-bottom: 15px;">\n                    <img src="{{data.menu_image}}" style="height: 35px;width:auto" />\n                    <ion-label style="color:white;font-size: 14px;margin:13px 0 13px 0;">{{data.title}}</ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col style="text-align: center;" (click)="logout()">\n                    <img src="../assets/Svg_Icons/logout.svg" style="height: 35px;width:auto"  />\n                    <ion-label style="color:white;font-size: 14px;margin:13px 0 13px 0;">Log Out</ion-label>\n                </ion-col>\n            </ion-row>\n        </div>\n\n    </ion-content>\n</ion-menu>\n<ion-nav id="nav" #content [root]="rootPage" ></ion-nav>\n'/*ion-inline-end:"/Users/kushalpatel/Desktop/Autobell App/autobell_Admin/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_Rest__["a" /* Rest */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllClientPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PopoverOptionsClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Rest__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AllClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AllClientPage = /** @class */ (function () {
    function AllClientPage(navCtrl, navParams, menuCtrl, platform, event, alertCtrl, toastCtrl, loadingCtrl, RestProvider, popover) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.event = event;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.RestProvider = RestProvider;
        this.popover = popover;
        this.client = 'myclient';
        this.serachShow = false;
        this.addClientVisible = false;
        this.MyClientsRecord = [];
        this.AllManager = [];
        this.firstname = '';
        this.Middlename = '';
        this.Lastname = '';
        this.StateList = [];
        this.CityList = [];
        this.treatment = "";
        this.selectedTreatment = "";
        this.selectedTreatmentData = [];
        this.selected_treatment_data = [];
        this.Reference = "";
        this.event.publish('admin:details');
        this.menuCtrl.enable(true);
        this.callGetMyClientsAPI();
        this.callGetManagerAPI();
        this.callGetStateAPI();
        this.GetTreatment();
    }
    AllClientPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AllClientPage');
    };
    AllClientPage.prototype.searchenable = function () {
        this.serachShow = true;
    };
    AllClientPage.prototype.searchdisable = function () {
        this.serachShow = false;
    };
    AllClientPage.prototype.addClientEnable = function () {
        this.addClientVisible = true;
    };
    AllClientPage.prototype.addClientDisable = function () {
        this.addClientVisible = false;
    };
    AllClientPage.prototype.callGetMyClientsAPI = function () {
        var _this = this;
        this.presentLoadingText();
        this.Input = {
            "EmployeeId": this.RestProvider.AdminId,
        };
        console.log("callGetMyClientsAPI" + JSON.stringify(this.Input));
        this.RestProvider.GetMyClients(this.Input).then(function (data) {
            _this.Result = data;
            _this.Status = _this.Result.Status;
            if (_this.Status == "True") {
                _this.loader.dismiss();
                _this.MyClientsRecord = _this.Result.MyClientsRecord;
            }
            else {
                _this.loader.dismiss();
                _this.ToastMsg = _this.Result.StatusMessage;
                _this.presentToast();
            }
        }, function (error) {
            _this.loader.dismiss();
            _this.ToastMsg = "Something went Wrong, Please check Your Internet Connection or Try again later";
            _this.presentToast();
        });
    };
    AllClientPage.prototype.callGetManagerAPI = function () {
        var _this = this;
        this.Input = {
            "EmployeeId": this.RestProvider.AdminId,
        };
        console.log("callGetManagerAPI" + JSON.stringify(this.Input));
        this.RestProvider.GetManager(this.Input).then(function (data) {
            _this.Result = data;
            _this.Status = _this.Result.Status;
            if (_this.Status == "True") {
                _this.AllManager = _this.Result.ManagerRecord;
            }
            else {
                _this.ToastMsg = _this.Result.StatusMessage;
                _this.presentToast();
            }
        }, function (error) {
            _this.ToastMsg = "Something went Wrong, Please check Your Internet Connection or Try again later";
            _this.presentToast();
        });
    };
    AllClientPage.prototype.callGetStateAPI = function () {
        var _this = this;
        this.RestProvider.GetStateList().then(function (data) {
            _this.Result = data;
            _this.Status = _this.Result.Status;
            if (_this.Status == "True") {
                _this.StateList = _this.Result.StateList;
            }
            else {
                _this.ToastMsg = _this.Result.StatusMessage;
                _this.presentToast();
            }
        }, function (error) {
            _this.ToastMsg = "Something went Wrong, Please check Your Internet Connection or Try again later";
            _this.presentToast();
        });
    };
    AllClientPage.prototype.GetTreatment = function () {
        var _this = this;
        this.Input = {
            "EmployeeId": this.RestProvider.AdminId,
        };
        console.log("GetTreatment " + JSON.stringify(this.Input));
        this.RestProvider.GetService(this.Input).then(function (data) {
            _this.Result = data;
            _this.Status = _this.Result.Status;
            if (_this.Status == "True") {
                _this.treatment = _this.Result.ServiceRecord;
            }
            else {
                _this.ToastMsg = _this.Result.StatusMessage;
                _this.presentToast();
            }
        }, function (error) {
            _this.ToastMsg = "Something went Wrong, Please check Your Internet Connection or Try again later";
            _this.presentToast();
        });
    };
    AllClientPage.prototype.addClient = function () {
        var Firstname = this.firstname.trim();
        var Middlename = this.Middlename.trim();
        var Lastname = this.Lastname.trim();
        var Reference = this.Reference.trim();
        var strongRegex = new RegExp("^[0-9]{10}");
        var emailRegEx = /[0-9a-zA-Z._]+[@]{1}[0-9a-zA-Z]+[.][0-9a-zA-Z]{2,4}/;
        for (var i = 0; i < this.treatment.length; i++) {
            if (this.treatment[i].selected == true) {
                this.selected_treatment_data.push(this.treatment[i].ServiceId);
            }
        }
        if (this.SelectTitle == null || this.SelectTitle == undefined) {
            this.ToastMsg = "Please Select Title";
            this.presentToast();
        }
        else if (this.firstname == null || this.firstname == undefined || this.firstname == '' || Firstname == '') {
            this.ToastMsg = "Please Enter FirstName";
            this.presentToast();
        }
        else if (this.Middlename == null || this.Middlename == undefined || this.Middlename == '' || Middlename == '') {
            this.ToastMsg = "Please Enter MiddleName";
            this.presentToast();
        }
        else if (this.Lastname == null || this.Lastname == undefined || this.Lastname == '' || Lastname == '') {
            this.ToastMsg = "Please Enter LastName";
            this.presentToast();
        }
        else if (this.BirthDate == null || this.BirthDate == undefined) {
            this.ToastMsg = "Please Enter Birth Date";
            this.presentToast();
        }
        else if (this.SelectMarriageStatus == null || this.SelectMarriageStatus == undefined) {
            this.ToastMsg = "Please Select Marital Status";
            this.presentToast();
        }
        else if (this.AnniversaryDate == null || this.AnniversaryDate == undefined) {
            this.ToastMsg = "Please Enter Anniversary Date";
            this.presentToast();
        }
        else if (!strongRegex.test(this.contact_no) || this.contact_no.length != 10) {
            this.ToastMsg = "Please Enter Valid Contact Number";
            this.presentToast();
        }
        else if (this.SelectGender == null || this.SelectGender == undefined) {
            this.ToastMsg = "Please Select Gender";
            this.presentToast();
        }
        else if (!emailRegEx.test(this.EmailId)) {
            this.ToastMsg = "Please Select Valid Email Id";
            this.presentToast();
        }
        else if (this.AssignManager == null || this.AssignManager == undefined) {
            this.ToastMsg = "Please Select Assign Manager";
            this.presentToast();
        }
        else if (this.SelectState == null || this.SelectState == undefined) {
            this.ToastMsg = "Please Select State";
            this.presentToast();
        }
        else if (this.SelectCity == null || this.SelectCity == undefined) {
            this.ToastMsg = "Please Select City";
            this.presentToast();
        }
        else if (Reference == '') {
            this.ToastMsg = "Please Enter Valid Reference";
            this.presentToast();
        }
        else {
            this.callAddClientAPI();
        }
    };
    AllClientPage.prototype.callAddClientAPI = function () {
        // this.presentLoadingText();
        this.selected_treatment_data = ["5d80bf874c82ef17f49a4a0b", "5d8203c94c82f117d89a044b", "5d820bfb4c82ef243ced92c0", "5d80bf874c82ef17f49a4a0b", "5d8203c94c82f117d89a044b", "5d820bfb4c82ef243ced92c0"];
        var str = this.selected_treatment_data.toString();
        console.log('selected_treatment_data ' + str);
        this.Input = {
            "Title": this.SelectTitle,
            "FirstName": this.firstname,
            "MiddleName": this.Middlename,
            "LastName": this.Lastname,
            "Gender": this.SelectGender,
            "MarriageStatus": this.SelectMarriageStatus,
            "ManagerId": this.AssignManager,
            "StateId": this.SelectState,
            "CityId": this.SelectCity,
            "Reference": this.Reference,
            "ContactNo": this.contact_no,
            "Email": this.EmailId,
            "ClientLogo": "ClientLogo",
            "AnniversaryDate": this.AnniversaryDate,
            "DateOfBirth": this.BirthDate,
            "ServicesIds": "5d80bf874c82ef17f49a4a0b,5d8203c94c82f117d89a044b",
        };
        console.log("callAddClientAPI " + JSON.stringify(this.Input));
        // this.RestProvider.AddClient(this.Input).then(data => {
        //
        //   this.Result = data;
        //   this.Status = this.Result.Status;
        //
        //   if (this.Status == "True") {
        //     this.loader.dismiss();
        //     this.MyClientsRecord = this.Result.MyClientsRecord;
        //
        //   } else {
        //     this.loader.dismiss();
        //     this.ToastMsg = this.Result.StatusMessage;
        //     this.presentToast();
        //   }
        // }, (error) => {
        //   this.loader.dismiss();
        //   this.ToastMsg = "Something went Wrong, Please check Your Internet Connection or Try again later";
        //   this.presentToast();
        // });
    };
    AllClientPage.prototype.gotoClientDetails = function (val) {
        this.navCtrl.push('ClientDetailsPage');
    };
    AllClientPage.prototype.treamentClick = function (data) {
        for (var i = 0; i < this.treatment.length; i++) {
            if (this.treatment[i].ServiceId == data.ServiceId) {
                this.treatment[i].selected = !this.treatment[i].selected;
            }
        }
    };
    AllClientPage.prototype.presentLoadingText = function () {
        this.loader = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Loading Please Wait...'
        });
        this.loader.present();
    };
    AllClientPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: this.ToastMsg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    AllClientPage.prototype.OnSelectState = function (data) {
        this.CityList = data;
        for (var i = 0; i < this.StateList.length; i++) {
            if (data == this.StateList[i].StateId) {
                this.CityList = this.StateList[i].CityList;
            }
        }
    };
    AllClientPage.prototype.openPopoverOption = function (event, data) {
        var popover = this.popover.create(PopoverOptionsClient, { 'clientData': data }, { cssClass: ' custom-popover ', enableBackdropDismiss: true });
        popover.present({ ev: event });
    };
    AllClientPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-all-client',template:/*ion-inline-start:"/Users/kushalpatel/Desktop/Autobell App/autobell_Admin/src/pages/all-client/all-client.html"*/'<script src="all-client.ts"></script>\n<ion-header>\n  <ion-navbar color="button_black">\n    <ion-buttons left *ngIf="serachShow == false">\n      <button ion-button menuToggle icon-only>\n        <ion-icon name="custom-menuicon" color="white" style="font-size: 1.9em !important"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title color="white" *ngIf="serachShow == false"> My Clients</ion-title>\n    <ion-buttons right *ngIf="serachShow == false">\n      <button ion-button icon-only (click)="searchenable()">\n        <ion-icon name="search" color="white" style="font-size: 1.9em !important"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-row no-padding no-margin *ngIf="serachShow == true">\n      <ion-col col-11 no-padding no-margin>\n        <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n      </ion-col>\n      <ion-col col-1 no-padding no-margin style="align-self: center" (click)="searchdisable()">\n        <button ion-button clear style="display: contents;">\n          <ion-icon name="close" color="white" style="font-size: 1.9em !important"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="app_bg">\n\n\n      <ion-card *ngIf="addClientVisible == false" style="background-color: white; border-radius: 25px;">\n        <div *ngFor="let data of MyClientsRecord;let i =index" >\n<!--          (click)="gotoClientDetails(data)"-->\n          <ion-row >\n            <ion-col col-1 class="col-center">\n              <ion-label text-center>{{i+1}}.</ion-label>\n            </ion-col>\n            <ion-col col-10  (click)="gotoClientDetails(data)">\n              <ion-label style="font-size: 15px;">{{data.ClientName}}</ion-label>\n            </ion-col>\n            <ion-col col-1 style="align-self: center;">\n              <ion-icon name="more" style="font-size: 18px;" (click)="openPopoverOption($event,data)"></ion-icon>\n<!--              <img src="../../assets/Svg_Icons/right_arrow.svg" class="right_arrow_icon"/>-->\n            </ion-col>\n          </ion-row>\n          <div class="bottom_border"></div>\n        </div>\n      </ion-card>\n\n\n\n\n\n\n\n\n      <div *ngIf="addClientVisible == true"\n           style="background-color: white;border-radius: 10px;margin: 10px;padding: 10px">\n\n        <button ion-button small color="button_black" icon-start clear style="padding: 0 0;"\n                (click)="addClientDisable()">\n          <ion-icon name=\'custom-backIcon\'></ion-icon>\n          Back\n        </button>\n\n\n\n        <div class="above_div">\n          <ion-row no-margin no-padding>\n            <ion-col col-3 no-padding no-margin class="devide_col">\n              <ion-item>\n                <ion-select [(ngModel)]="SelectTitle" placeholder="Title">\n                  <ion-option value="MR.">Mr.</ion-option>\n                  <ion-option value="MRS.">Mrs.</ion-option>\n                  <ion-option value="MS.">Ms.</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-9 no-padding no-margin>\n              <ion-item no-margin no-padding>\n                <ion-input type="text" placeholder="First Name" [(ngModel)]="firstname" style=" margin: 0;padding: 0;"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n\n          <ion-row no-margin no-padding>\n            <ion-col col-6 no-padding no-margin class="devide_col">\n              <ion-item no-margin no-padding>\n                <ion-input type="text" placeholder="Middle Name" [(ngModel)]="Middlename" style=" margin: 0;padding: 0;"></ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-col col-6 no-padding no-margin>\n              <ion-item no-margin no-padding>\n                <ion-input type="text" placeholder="Last Name" [(ngModel)]="Lastname" style=" margin: 0;padding: 0;"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n\n          <ion-row no-margin no-padding>\n            <ion-col col-6 no-padding no-margin class="devide_col">\n              <ion-item>\n                <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="DD MMM YYYY" placeholder="Birth Date"\n                              [(ngModel)]="BirthDate" style="padding: 0"></ion-datetime>\n              </ion-item>\n            </ion-col>\n            <ion-col col-6 no-padding no-margin>\n              <ion-item>\n                <ion-select [(ngModel)]="SelectMarriageStatus" placeholder="Marital Status">\n                  <ion-option value="Single">Single</ion-option>\n                  <ion-option value="Married">Married</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n\n          <ion-row no-margin no-padding>\n            <ion-col col-12 no-padding no-margin class="devide_col">\n              <ion-item>\n                <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="DD MMM YYYY" placeholder="Anniversary Date"\n                              [(ngModel)]="AnniversaryDate" style="padding: 0"></ion-datetime>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n\n          <ion-row no-margin no-padding>\n            <ion-col col-6 no-padding no-margin class="devide_col">\n              <ion-item no-margin no-padding>\n                <ion-input type="tel" placeholder="Contact Number" minlength="10" maxlength="10" [(ngModel)]="contact_no" style=" margin: 0;padding: 0;"></ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-col col-6 no-padding no-margin>\n              <ion-item>\n                <ion-select [(ngModel)]="SelectGender" placeholder="Gender">\n                  <ion-option value="M">Male</ion-option>\n                  <ion-option value="F">Female</ion-option>\n                </ion-select>\n              </ion-item>\n\n            </ion-col>\n          </ion-row>\n\n\n          <ion-item no-margin no-padding>\n            <ion-input type="text" placeholder="Email Id" [(ngModel)]="EmailId" style=" margin: 0;padding: 0;"></ion-input>\n          </ion-item>\n\n          <ion-item no-margin no-padding>\n            <ion-select [(ngModel)]="AssignManager" placeholder="Assign Manager">\n              <ion-option *ngFor="let data of AllManager" value="{{data.ManagerId}}">{{data.ManagerName}}</ion-option>\n            </ion-select>\n          </ion-item>\n\n        </div>\n\n\n        <ion-label class="Service_Text">Intrested In</ion-label>\n\n        <div style="overflow-y:hidden; margin-top: 10px;padding-left:5px" no-padding="">\n          <ion-row no-margin no-padding style="width:max-content;">\n            <ion-col no-padding col-auto *ngFor="let data of treatment" style="text-align: center;padding-right: 10px">\n              <div [ngClass]="data.selected == true ? \'rounded_treatment_item_1_selected \' : \'rounded_treatment_item_1\'"\n                   (click)="treamentClick(data)">\n                <!--<img src="{{data.treatment_image}}" style="height: 40px">-->\n                <img src="{{data.ServiceImage}}" style="font-size: 30px;padding: 20px"/>\n                <ion-label no-margin text-center style="font-size: 10px" text-wrap>{{data.ServiceName}}</ion-label>\n              </div>\n            </ion-col>\n          </ion-row>\n        </div>\n\n\n        <div class="above_div" style="margin-bottom: 15px; margin-top: 15px;">\n          <ion-row no-margin no-padding >\n            <ion-col col-6 no-padding no-margin class="devide_col">\n              <ion-item>\n                <ion-select #state [(ngModel)]="SelectState" placeholder="State" (ionChange)="OnSelectState(state.value)" >\n                  <ion-option *ngFor="let data of StateList" value="{{data.StateId}}">{{data.StateName}}</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-6 no-padding no-margin>\n              <ion-item>\n                <ion-select [(ngModel)]="SelectCity" placeholder="City">\n                  <ion-option *ngFor="let item of CityList" value="{{item.CityId}}">{{item.CityName}}</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-item no-margin no-padding>\n            <ion-input type="text" placeholder="Reference" [(ngModel)]="Reference" style=" margin: 0;padding: 0;"></ion-input>\n          </ion-item>\n        </div>\n\n        <div style="width:70%;margin: auto;" text-center>\n          <button ion-button full (click)="addClient()">Add Client</button>\n        </div>\n      </div>\n\n\n\n<!--  <ion-fab *ngIf="addClientVisible == false && client == \'myclient\'" right bottom (click)="addClientEnable()">-->\n<!--    <button ion-fab color="primary">-->\n<!--      <ion-icon name="add"></ion-icon>-->\n<!--    </button>-->\n<!--  </ion-fab>-->\n</ion-content>\n'/*ion-inline-end:"/Users/kushalpatel/Desktop/Autobell App/autobell_Admin/src/pages/all-client/all-client.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__providers_Rest__["a" /* Rest */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_Rest__["a" /* Rest */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */]) === "function" && _k || Object])
    ], AllClientPage);
    return AllClientPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//------------------------------------------------------ Add client Popover --------------------------------------------------------
var PopoverOptionsClient = /** @class */ (function () {
    function PopoverOptionsClient(navParams, viewCtrl, RestProvider) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.RestProvider = RestProvider;
        this.ClientData = this.navParams.get('clientData');
        console.log('ClientData ' + JSON.stringify(this.ClientData));
    }
    PopoverOptionsClient.prototype.ngOnInit = function () {
    };
    PopoverOptionsClient.prototype.closeView = function () {
        this.viewCtrl.dismiss();
    };
    PopoverOptionsClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-all-client',
            template: "\n  <div class=\"popover_client_op\" >\n    <ion-label>HEllo</ion-label>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_Rest__["a" /* Rest */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_Rest__["a" /* Rest */]) === "function" && _c || Object])
    ], PopoverOptionsClient);
    return PopoverOptionsClient;
    var _a, _b, _c;
}());

//# sourceMappingURL=all-client.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map