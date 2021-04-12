import inquirer from 'inquirer'
import chalk from 'chalk'

import createResourcesAutomatically from './createResourcesAutomatically'
import inputResourcesManually from './inputResourcesManually'

export default async function thirdBlock (
  firstBlockAnswers,
  secondBlockAnswers
) {
  console.log(
    chalk.bold.green("You're halfway there!"),
    chalk.bold("Let's create the resources now")
  )
  console.log()
  const { createResources } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'createResources',
      message:
        'Would you like us to create the resources for you? (recommended)'
    }
  ])

  const thirdBlockAnswers = createResources
    ? await createResourcesAutomatically(firstBlockAnswers, secondBlockAnswers)
    : await inputResourcesManually(firstBlockAnswers, secondBlockAnswers)

  return thirdBlockAnswers
}
