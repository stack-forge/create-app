import inquirer from 'inquirer'
import chalk from 'chalk'

export default async function offboarding ({
  project,
  create_resources_automatically
}) {
  console.log(
    chalk.bold.green("You're almost done!"),
    chalk.bold('You just need to add the'),
    chalk.bold.green("user's credentials"),
    chalk.bold('to your CI environment')
  )
  console.log()
  console.log(
    chalk.bold.green("ℹ️  Here's a quick guide"),
    chalk.bold('in case you need help: http://localhost:3000')
  )
  console.log()

  if (create_resources_automatically) {
    console.log(
      chalk.bold('We have created a file named'),
      chalk.bold.green('top_secret_credentials.txt'),
      chalk.bold('in your current folder with'),
      chalk.bold.green("the user's credentials."),
      chalk.bold('Grab them there!')
    )
    console.log()
  }

  await inquirer.prompt([
    {
      type: 'confirm',
      name: 'yes_no',
      message: "Choose any to proceed after you've added the credentials?"
    }
  ])

  console.log()
  console.log("===========================")
  console.log()
  console.log(chalk.bold.green("🎉 You're done!"))
  console.log()
  console.log(
    chalk.bold('You can find the bootstrapped source code at'),
    chalk.bold.green(`${project}.`),
    chalk.bold('Hit'),
    chalk.bold.green('git push'),
    chalk.bold(`to see the app live in production!`)
  )
  console.log()

  if (create_resources_automatically) {
    console.log(
      chalk.bold("ℹ️  Ah, don't forget to"),
      chalk.bold.green('delete the file!')
    )
    console.log()
  }
}
