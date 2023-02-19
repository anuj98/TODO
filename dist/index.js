"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3001;
app.get('/api/gettasklist', (req, res) => {
    fs_1.default.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(jsonString);
    });
});
app.put('/api/addtask', (req, res) => {
    fs_1.default.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        if (req.body) {
            const result = JSON.parse(jsonString);
            result.push(req.body);
            const newData = JSON.stringify(result);
            fs_1.default.writeFile("./data.json", newData, (err) => {
                if (err) {
                    console.log("File write failed:", err);
                    fs_1.default.writeFile("./data.json", jsonString, err => console.log(""));
                    res.send(jsonString);
                }
            });
            res.send(newData);
        }
        else {
            res.send(jsonString);
        }
    });
});
app.delete("/api/deletetask", (req, res) => {
    fs_1.default.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        if (req.query) {
            const result = JSON.parse(jsonString);
            const index = result.findIndex(item => item.id === parseInt(req.query.id));
            if (index > -1) {
                result.splice(index, 1);
                const newData = JSON.stringify(result);
                fs_1.default.writeFile("./data.json", newData, (err) => {
                    if (err) {
                        console.log("File write failed:", err);
                        fs_1.default.writeFile("./data.json", jsonString, err => console.log(""));
                        res.send(jsonString);
                    }
                });
                res.send(newData);
                return;
            }
        }
        res.send(jsonString);
    });
});
app.post('/api/updatetask', (req, res) => {
    fs_1.default.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        if (req.body) {
            const result = JSON.parse(jsonString);
            const index = result.findIndex(item => item.id === req.body.id);
            if (index > -1) {
                result[index] = req.body;
                console.log(result);
                const newData = JSON.stringify(result);
                fs_1.default.writeFile("./data.json", newData, (err) => {
                    if (err) {
                        console.log("File write failed:", err);
                        fs_1.default.writeFile("./data.json", jsonString, err => console.log(""));
                        res.send(jsonString);
                    }
                });
                res.send(newData);
                return;
            }
        }
        else {
            res.send(jsonString);
        }
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
