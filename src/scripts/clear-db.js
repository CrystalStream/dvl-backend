const connection = require('./db')
const inquirer = require('inquirer')
const chalk = require('chalk')

console.log(chalk.red('SE NECESITA CONFIRMACION ANTES DE CONTINUAR \n'))
inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: `Estas seguro que quieres ejecutar este comando? Se van a ${chalk.red('BORRAR')} todos los datos`
    }
  ])
  .then(async (answers) => {
    if (answers.continue) {
      const dbProxy = await connection
      const deleted = await dbProxy.connection.db.dropDatabase()
      if (deleted) {
        console.log(`${chalk.green('SE BORRO EXISTOSAMENTE LA BASE DE DATOS')}`)
        process.exit(0)
      }
      process.exit(1)
    }

    console.log(`${chalk.red('Hay un error en el script')}`)
    process.exit(1)
  });