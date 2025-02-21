var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as publishRepository from "../repositories/publishRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as optionRepository from "../repositories/optionRepository.js";
import * as localizationRepository from "../repositories/localizationRepository.js";
import * as errorsType from "../utils/errorUtils.js";
import * as userLocalRepository from "../repositories/userLocalizationRepository.js";
export function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var publish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getPublishWithUserData()
                    // if(publish.length==0)throw errorsType.failNotFound("Publishes doesn't exist");
                    //  const loclizationOfPublish= await localizationRepository.getOne(publish.localizationId)
                ];
                case 1:
                    publish = _a.sent();
                    // if(publish.length==0)throw errorsType.failNotFound("Publishes doesn't exist");
                    //  const loclizationOfPublish= await localizationRepository.getOne(publish.localizationId)
                    return [2 /*return*/, publish];
            }
        });
    });
}
export function getOne(id) {
    return __awaiter(this, void 0, void 0, function () {
        var publish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isNaN(id))
                        throw errorsType.failNotFound('Id must be a number');
                    return [4 /*yield*/, publishRepository.getOne(id)];
                case 1:
                    publish = _a.sent();
                    if (!publish)
                        throw errorsType.failNotFound("Publish doesn't exist");
                    return [2 /*return*/, publish];
            }
        });
    });
}
export function insert(publish) {
    return __awaiter(this, void 0, void 0, function () {
        var userIdExist, optionIdExist, localizationExist, formatLocalization, localizationName, local, publishFormatted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findById(publish.userId)];
                case 1:
                    userIdExist = _a.sent();
                    if (!userIdExist)
                        throw errorsType.failNotFound("User doesnt exist");
                    return [4 /*yield*/, optionRepository.getOne(publish.optionId)];
                case 2:
                    optionIdExist = _a.sent();
                    if (!optionIdExist)
                        throw errorsType.failNotFound("Option doesnt exist");
                    return [4 /*yield*/, localizationRepository.getByName(publish.localizationName)];
                case 3:
                    localizationExist = _a.sent();
                    formatLocalization = {
                        name: publish.localizationName,
                        latitude: publish.localizationLat,
                        longitude: publish.localizationLong
                    };
                    if (!!localizationExist) return [3 /*break*/, 5];
                    return [4 /*yield*/, localizationRepository.insert(formatLocalization)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, localizationRepository.getByName(publish.localizationName)];
                case 6:
                    localizationName = _a.sent();
                    local = {
                        userId: publish.userId,
                        localizationId: localizationName.id
                    };
                    return [4 /*yield*/, userLocalRepository.insert(local)];
                case 7:
                    _a.sent();
                    publishFormatted = {
                        coment: publish.coment,
                        urlImage: publish.urlImage,
                        rateNote: publish.rateNote,
                        localizationId: localizationName.id,
                        userId: publish.userId,
                        optionId: publish.optionId
                    };
                    return [4 /*yield*/, publishRepository.insert(publishFormatted)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function toUpdate(id, publish) {
    return __awaiter(this, void 0, void 0, function () {
        var publishExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getOne(id)];
                case 1:
                    publishExist = _a.sent();
                    if (!publishExist)
                        throw errorsType.failNotFound("Not found publish");
                    return [4 /*yield*/, publishRepository.toUpdate(id, publish)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function toDelete(id) {
    return __awaiter(this, void 0, void 0, function () {
        var publishExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isNaN(id))
                        throw errorsType.failNotFound('Id must be a number');
                    return [4 /*yield*/, publishRepository.getOne(id)];
                case 1:
                    publishExist = _a.sent();
                    if (!publishExist)
                        throw errorsType.failNotFound("Not found publish");
                    return [4 /*yield*/, publishRepository.toDelete(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getPublishesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var publish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getPublishesByUserId(userId)];
                case 1:
                    publish = _a.sent();
                    if (!publish)
                        throw errorsType.failNotFound("User dont have publish");
                    return [2 /*return*/, publish];
            }
        });
    });
}
export function getPublishesByOption(optionId) {
    return __awaiter(this, void 0, void 0, function () {
        var publish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getPublishesByOption(optionId)];
                case 1:
                    publish = _a.sent();
                    if (!publish)
                        throw errorsType.failNotFound("Not found publish");
                    return [2 /*return*/, publish];
            }
        });
    });
}
export function getPublishFromUserByOption(userId, optionId) {
    return __awaiter(this, void 0, void 0, function () {
        var publish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getPublishFromUserByOption(userId, optionId)];
                case 1:
                    publish = _a.sent();
                    if (!publish)
                        throw errorsType.failNotFound("Not found publish");
                    return [2 /*return*/, publish];
            }
        });
    });
}
export function toUpdateRate(id, rateNote) {
    return __awaiter(this, void 0, void 0, function () {
        var publishExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getOne(id)];
                case 1:
                    publishExist = _a.sent();
                    if (!publishExist)
                        throw errorsType.failNotFound("Not found publish");
                    return [4 /*yield*/, publishRepository.toUpdateRate(id, rateNote)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function toUpdateComent(id, coment) {
    return __awaiter(this, void 0, void 0, function () {
        var publishExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publishRepository.getOne(id)];
                case 1:
                    publishExist = _a.sent();
                    if (!publishExist)
                        throw errorsType.failNotFound("Not found publish");
                    return [4 /*yield*/, publishRepository.toUpdateComent(id, coment)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function filterPublishByRate(id, rateNote) {
    return __awaiter(this, void 0, void 0, function () {
        var user, rates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw errorsType.failNotFound("User dont exist");
                    return [4 /*yield*/, publishRepository.filterPublishByRate(id, rateNote)];
                case 2:
                    rates = _a.sent();
                    return [2 /*return*/, rates];
            }
        });
    });
}
