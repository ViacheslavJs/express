// Различия в синтаксисе при импортировании модулей, пакетов - вызывает ошибки в консоли.
//const express = require('express'); // TODO or - удалить! строку "type": "module", в файле package.json
/*
//
import express from 'express'; // TODO or - добавить! строку "type": "module", в файле package.json
import fs from 'fs';
//import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
//app.use(cors());


// если сообщение не в data.js:
//app.get('/api', (req, res) => {
  ////res.send('Working!'); // http://localhost:5000/
  //res.json({
    ////success: true,
    //message: "Hello server!"
  //});
//});

// если сообщение в data.js:
app.get('/api', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK`)
});
//
*/

/*
// TODO - CommonJS:
// если data.json рядом с server.js
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3001; // Изменено на 3001

app.use(express.json());

app.get('/message', async (req, res) => {
  try {
    const data = await fs.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

/*
// если data.json лежит в data
const express = require('express');
const { readFile } = require('fs/promises');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

const dataFolderPath = path.resolve(__dirname, 'data');
const filePath = path.resolve(dataFolderPath, 'data.json');

app.get('/api', async (req, res) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

// TODO - ES6:
/*
// если data.json рядом с server.js
import express from 'express';
import { readFile } from 'fs/promises';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api', async (req, res) => {
  try {
    const data = await readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

/*
// если data.json лежит в data
import express from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

const dataFolderPath = path.join(__dirname, 'data');
const filePath = path.join(dataFolderPath, 'data.json');

app.get('/api', async (req, res) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
// В ECMAScript 6 (ES6) модулях, __dirname может не поддерживаться стандартным образом
// используем нативные Node.js методы, такие как import.meta.url в комбинации с path.dirname() 
*/


// если data.json лежит в data
import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public')); // or
//app.use(express.static(path.join(process.cwd(), 'public'))); // or

app.get('/api', async (req, res) => {
  try {
    const dataFolderPath = path.join(process.cwd(), 'data');
    const filePath = path.join(dataFolderPath, 'data.json');
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
//


/*
// CommonJS:
const express = require('express');
//const { readFile } = require('fs').promises; // or
const { readFile } = require('fs/promises');   // or
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public')); // or
//app.use(express.static(path.join(__dirname, 'public'))); // or

app.get('/api', async (req, res) => {
  try {
    const dataFolderPath = path.join(__dirname, 'data');
    const filePath = path.join(dataFolderPath, 'data.json');
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
//
*/

//////////////////////////////////////////////////////////////////
// TODO
import { writeFile } from 'fs/promises';
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json()); // middleware для разбора JSON-запросов

// TODO - GET
app.get('/api/rest/products', async (req, res) => {

  try {
    const contents = await readFile(path.join(process.cwd(), 'views', 'admin.html'), 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(contents);
  } catch (err) {
    res.status(500).send(err);
  }
  
});

// TODO - GET
app.get('/api/rest/products/data', async (req, res) => {

  try {
    const data = await readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch data' });
  }
  
});

// TODO - DELETE
app.delete('/api/rest/products/:productName', async (req, res) => {

  try {
    const productName = decodeURIComponent(req.params.productName);
    const dataPath = path.join(process.cwd(), 'data', 'data.json');
    const data = await readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data);

    // Находим индекс игрока по имени
    const productIndex = jsonData.findIndex((product) => product.name === productName);

    if (productIndex !== -1) {
      // Удаляем игрока из массива данных
      jsonData.splice(productIndex, 1);

      // Перезаписываем обновленные данные в файл
      await writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf8');
      res.status(204).send();      
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete data' });
  }
    
});

// TODO - POST
app.post('/api/rest/products', async (req, res) => {
  const newProduct = req.body;
  
  try {
    const data = await readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);

    // Добавляем нового игрока в массив данных
    jsonData.push(newProduct);

    // Запись обновленных данных обратно в файл
    await writeFile(path.join(process.cwd(), 'data', 'data.json'), JSON.stringify(jsonData, null, 2), 'utf8');

    res.status(201).json(newProduct); // Успешное добавление
  } catch (err) {
    res.status(500).json({ error: "Unable to add product" });
  }
    
});


