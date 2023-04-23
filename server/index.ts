import express, { Express, Request, Response } from 'express';
import fs from "fs";
import bodyparser from "body-parser";


const app: Express = express();
app.use(bodyparser.urlencoded({
  extended: true,
}));
app.use(bodyparser.json());

const port = process.env.PORT || 3001;

interface ITaskDetail {
  id: number;
  title: string;
  date: Date;
  isFavorite: boolean;
  isCompleted: boolean;
}

app.get('/api/gettasklist', (req: Request, res: Response) => {
  fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.send(jsonString);
  });
});

app.put('/api/addtask', (req: Request, res: Response) => {
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      if (req.body) {
        const result = JSON.parse(jsonString);
        result.push(req.body);
        const newData = JSON.stringify(result);
        fs.writeFile("./data.json", newData, (err) => {
          if (err) {
            console.log("File write failed:", err);
            fs.writeFile("./data.json", jsonString, err => console.log(""))
            res.send(jsonString);
          }
        });
        res.send(newData);
      }
      else {
        res.send(jsonString);
      }
    })
});

app.delete("/api/deletetask", (req: Request, res: Response) => {
  fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    if (req.query) {
      const result: ITaskDetail[] = JSON.parse(jsonString);
      const index = result.findIndex(item => item.id === parseInt(req.query.id as string));
      if (index > -1) {
        result.splice(index, 1);
        const newData = JSON.stringify(result);
        fs.writeFile("./data.json", newData, (err) => {
          if (err) {
            console.log("File write failed:", err);
            fs.writeFile("./data.json", jsonString, err => console.log(""))
            res.send(jsonString);
          }
        });
        res.send(newData);
        return;
      }
    }
    res.send(jsonString);
  })
})

app.post('/api/updatetask', (req: Request, res: Response) => {
  fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    if (req.body) {
      const result: ITaskDetail[] = JSON.parse(jsonString);
      const index = result.findIndex(item => item.id === req.body.id);
      if (index > -1) {
        result[index] = req.body;
        console.log(result);
        const newData = JSON.stringify(result);
        fs.writeFile("./data.json", newData, (err) => {
          if (err) {
            console.log("File write failed:", err);
            fs.writeFile("./data.json", jsonString, err => console.log(""))
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
  })
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});