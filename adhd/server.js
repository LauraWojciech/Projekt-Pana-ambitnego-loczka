import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Konfiguracja połączenia z bazą danych
const db = await open({
      filename: 'db/database.db',
      driver: sqlite3.Database
    });

// Obsługa routingu - strona główna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//--------------------------WIDGETS---------------------------------------------------
// Endpoint do pobierania widżetów
app.get('/widgets', async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM widgets");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint do dodawania widżetów
app.post('/widgets', async (req, res) => {
    const { title, content, type, quantity } = req.body;
    try {
        const result = await db.run("INSERT INTO widgets (title, content, type, quantity) VALUES (?, ?, ?, ?)",
            title, content, type, quantity
        );
        res.json({ id: result.lastID, title, content, type, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint do aktualizacji wody/tabletek
app.put('/widgets', async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const result = await db.run("UPDATE widgets SET quantity=:quantity WHERE id=:id",
            {':id': id, ':quantity': quantity}
        );
        res.json({ id: id, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint do usuwania widgeta
app.delete('/widgets', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.run("DELETE FROM widgets WHERE id=:id",
            {':id': id}
        );
        res.json({ id: id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//--------------------------USERS---------------------------------------------------
// Endpoint do pobierania użytkowników
app.get('/users', async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM users");
        if(rows.length===0){
            const insertResult = await db.run("INSERT INTO users (name, phone, email) VALUES (?, ?, ?)",
                'Jan Kowalski', '000-000-000', 'test@test'
            );
            res.json(insertResult);
        }else {
            res.json(rows);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint do aktualizacji użytkownika
app.put('/users', async (req, res) => {
    const { id, name, phone, email } = req.body;
    try {
        const result = await db.run("UPDATE users SET name=:name, phone=:phone, email=:email  WHERE id=:id",
            {':id': id, ':name': name, ':phone' : phone, ':email' : email}
        );
        res.json({ id, name, phone, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//--------------------------TODO_LIST---------------------------------------------------
// Endpoint do pobierania listy todo
app.get('/todo', async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM todo");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint do dodawania elementu todo
app.post('/todo', async (req, res) => {
    const { text } = req.body;
    try {
        const result = await db.run("INSERT INTO todo (text) VALUES (?)",
            text
        );
        res.json({ id: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint do aktualizacji elementu todo
app.put('/todo', async (req, res) => {
    const { id, checked } = req.body;
    try {
        const result = await db.run("UPDATE todo SET checked=:checked WHERE id=:id",
            {':id': id, ':checked': checked}
        );
        res.json({ id: id, checked: checked });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint do usuwania elementu todo
app.delete('/todo', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.run("DELETE FROM todo WHERE id=:id",
            {':id': id}
        );
        res.json({ id: id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
