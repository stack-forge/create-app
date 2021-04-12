import chalk from 'chalk'
import inquirer from 'inquirer'

export default async function preFormText () {
  console.log()
  console.log(chalk.bold.green('Hi there 👋'))
  console.log()
  console.log(
    chalk.bold('We need'),
    chalk.bold.green('some cloud resources'),
    chalk.bold('to maintain your infrastructure')
  )
  console.log()
  console.log(
    chalk.bold.green('We can create them for you'),
    chalk.bold('if you have your'),
    chalk.bold.green('cloud credentials in your machine'),
    chalk.bold("(don't worry, they're safe!)")
  )
  console.log()
  console.log(
    chalk.bold("ℹ️  If you'd like"),
    chalk.bold.green('us to create the resources'),
    chalk.bold("but don't have"),
    chalk.bold.green('cloud credentials in your machine,'),
    chalk.bold("here's how to install them: http://localhost:3000")
  )
  console.log()
  console.log(
    chalk.bold("ℹ️  If you'd like to"),
    chalk.bold.green('understand more about it or create them yourself,'),
    chalk.bold("here's a quick read: http://localhost:3000")
  )
  console.log()
  const { start } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'start',
      message: 'Ready to get started?'
    }
  ])
  console.log()
  if (!start) {
    console.log(chalk.bold('Ok, see you soon!'))
    process.exit(0)
  }
}
