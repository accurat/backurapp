const DESCRIPTIONS = [
  'Perfect app, any bug must be frontend related.',
  "It's buggier on the inside!",
  "You ain't gonna need this.",
  'Always uses paranoid',
  'No memory leak if you restart this every 30 minutes.',
]

const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]

const FILES = ['.gitignore', '.prettierignore', '.prettierrc', 'package.json']
const JS_FILES = ['src/app.js', 'src/index.js', 'src/tunnel.js']
const TS_FILES = ['src/app.ts', 'src/index.ts', 'src/tunnel.ts']

const databasesLibraries = {
  postgres: { js: ['pg', 'pg-hstore'], ts: ['@types/pg', '@types/pg-hstore'] },
  sqlite: { js: ['sqlite3'], ts: ['@types/sqlite3'] },
  mongodb: { js: ['mongodb'], ts: ['@types/mongodb'] },
  mysql: { js: ['mysql2'], ts: ['@types/mysql2'] },
  redis: { js: ['redis'], ts: ['@types/redis'] },
}

const PROMPTS = [
  {
    type: 'input',
    name: 'appname',
    message: 'What will the name of this app be?',
    default: 'another-useless-project',
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Of course you will need typescript?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'orm',
    message: 'Do you want to use an orm (sequelize)?',
    default: false,
  },
  {
    type: 'checkbox',
    name: 'databases',
    message: 'Will you be using any database?',
    choices: Object.keys(databasesLibraries),
  },
  {
    type: 'confirm',
    name: 'docker',
    message: 'Do you even want a pregenerated Dockerfile?',
    default: false,
  },
]

module.exports = { PROMPTS, databasesLibraries, FILES, description, JS_FILES, TS_FILES }
