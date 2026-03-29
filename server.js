const express = require('express')
const { db, matches, commentry } = require('./db/db')
const { eq } = require('drizzle-orm')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello from express server')
})

app.get('/matches', async (req, res) => {
  try {
    const result = await db.select().from(matches)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch matches' })
  }
})

app.post('/matches', async (req, res) => {
  try {
    const payload = req.body
    const [created] = await db
      .insert(matches)
      .values(payload)
      .returning()

    res.status(201).json(created)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create match' })
  }
})

app.get('/commentary/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params
    const result = await db
      .select()
      .from(commentry)
      .where(eq(commentry.matchId, Number(matchId)))
      .orderBy(commentry.sequence)

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch commentary' })
  }
})

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`)
})
