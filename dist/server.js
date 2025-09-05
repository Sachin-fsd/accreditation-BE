"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
}
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app_1.default.listen(PORT, () => console.log('Server listening on', PORT));
})
    .catch(err => {
    console.error('Mongo connection failed', err);
    process.exit(1);
});
