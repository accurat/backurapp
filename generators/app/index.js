const path = require('path')
const { existsSync, mkdirSync } = require('fs')
const Generator = require('yeoman-generator')
const {
  PROMPTS,
  databasesLibraries,
  description,
  FILES,
  JS_FILES,
  TS_FILES,
} = require('./constants')
class BackurappGenerator extends Generator {
  prompting() {
    this.log('Non hai di meglio da fare?')
    this.option('dry')

    return this.prompt(PROMPTS).then(props => {
      // I guess this could be done in one line, but this is more readable
      this.typescript = props.typescript
      this.databases = props.databases
      this.orm = props.orm
      this.docker = props.docker
      this.appname = props.appname
    })
  }

  _installDefaults() {
    this.yarnInstall(['lodash', 'express', 'cors', 'cookie-parser', 'dotenv'])
    this.yarnInstall(['jest', 'supertest', 'nodemon', 'ssh-tuna', 'got'], { dev: true })
  }

  _handleTypescript(typescript) {
    if (typescript)
      this.yarnInstall(
        [
          'typescript',
          '@types/node',
          '@types/express',
          '@types/cors',
          '@types/lodash',
          '@types/cookie-parser',
          '@types/dotenv',
          '@types/jest',
          '@types/supertest',
        ],
        { dev: true },
      )
  }

  _handleDatabases(databases, typescript) {
    for (const database of databases) {
      const dbLib = databasesLibraries[database]
      this.yarnInstall(dbLib.js)
      if (typescript) this.yarnInstall(dbLib.ts)
    }
  }

  _handleOrm(orm, typescript) {
    if (orm) this.yarnInstall(['sequelize'])
    if (orm) this.yarnInstall(['sequelize-cli'], { dev: true })
    if (orm && typescript) this.yarnInstall(['@types/sequelize'], { dev: true })
  }

  _logLibs(libs, opts) {
    this.log(`Installing${opts && opts.dev ? '(dev)' : ''}: ${libs.join(', ')}`)
  }

  _installDependencies() {
    const { databases, orm, typescript } = this

    if (this.options.dry) this.yarnInstall = this._logLibs

    this._installDefaults()
    this._handleTypescript(typescript)
    this._handleDatabases(databases, typescript)
    this._handleOrm(orm, typescript)
  }

  _copyFiles() {
    const context = { appname: this.appname, description }
    const langFiles = this.typescript ? TS_FILES : JS_FILES
    const files = [...FILES, ...langFiles].map(f => this.templatePath(f))

    this.fs.copyTpl(
      files,
      this.destinationPath(`${this.appname}/.`),
      context,
      {},
      { globOptions: { dot: true } },
    )

    this.fs.copyTpl(
      this.templatePath('.env.example'),
      this.destinationPath(`${this.appname}/.env`),
      context,
      {},
    )

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.appname}/package.json`),
      context,
      {},
    )

    if (this.docker) {
      this.fs.copyTpl(
        this.templatePath('Dockerfile'),
        this.destinationPath(`${this.appname}/Dockerfile`),
        context,
        {},
      )
    }
  }

  install() {
    const appDir = path.join(process.cwd(), this.appname)
    if (!existsSync(appDir)) mkdirSync(appDir, { recursive: true })
    process.chdir(appDir)

    this._copyFiles()
    this._installDependencies()
  }
}

module.exports = BackurappGenerator
