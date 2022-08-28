const express = require("express");
const cors = require("cors");
const pg = require("pg");
// const dotenv = require ("dotenv");

// dotenv.config();
// const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const PORT = process.env.PORT || 3005;

const pool = new pg.Pool({ database: "daily_goals" });

const app = express();
app.use(cors());
app.use(express.json());

// GET USERS
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users").then((result) => {
    res.send(result.rows);
  });
});

// GET GOALS
app.get("goals", (req, res) => {
  pool.query("SELECT * FROM goals").then((result) => {
    res.send(result.rows);
  });
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  res.sendStatus(200);
});

// DELETE GOAL
app.delete("/goals/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM goals WHERE id = $1", [id]);
  res.sendStatus(200);
});

// PATCH USER
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, userName, email } = req.body;
  const result = await pool
    .query(
      `
        UPDATE users
        SET firstName = COALESCE($1, firstName),
        lastName = COALESCE($2, lastName),
        userName = COALESCE($3, userName),
        email = COALESCE($4, email),
        WHERE id = $5
        RETURNING *;
        `,
      [firstName, lastName, userName, email, id]
    )
    .then((data) => {
      res.send(data.rows[0]);
    });
});

// PATCH GOAL
app.patch("/goals/:id", async (req, res) => {
  const { id } = req.params;
  const { goal, steps, notes } = req.body;
  const result = await pool
    .query(
      `
    UPDATE goals
    SET goal = COALESCE($1, goal),
    SET steps = COALESCE($2, steps),
    SET notes = COALESCE($3, notes),
    WHERE id = $4
    RETURNING *;
    `,
      [goal, steps, notes, id]
    )
    .then((data) => {
      res.send(data.rows[0]);
    });
});

// POST USER
app.post("/users", (req, res) => {
  const { firstName, lastName, userName, email } = req.body;
  pool
    .query(
      `INSERT INTO users (firstName, lastName, userName, email) VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, lastName, userName, email]
    )
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// POST GOAL
app.post("/goals", (req, res) => {
  const { goal, steps, notes } = req.body;
  pool
    .query(
      `INSERT INTO goals (goal, steps, notes) VALUES ($1, $2, $3) RETURNING *`,
      [goal, steps, notes]
    )
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
