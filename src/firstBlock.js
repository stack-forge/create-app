import inquirer from 'inquirer'
import nameGenerator from 'project-name-generator'
import chalk from 'chalk'

import { isValidProject } from './validators'

export default async function firstBlock() {
  const cloudProviders = ['aws']
  const firstBlockAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'project',
      message: 'Enter a name for your new project',
      default: nameGenerator().dashed,
      validate: isValidProject
    },
    {
      type: 'list',
      name: 'provider',
      message: 'Please choose your cloud provider',
      choices: cloudProviders,
      default: cloudProviders[0]
    },
    {
      type: 'list',
      name: 'template',
      message: `Please choose your template (${chalk.italic('Read more about hosts here: http://localhost:3000')})`,
      choices: [
        'webserver_app (Cheap but not scalable)',
        'bucket_cdn (Perfect for static websites)'
      ]
    }
  ])

  return {
    ...firstBlockAnswers,
    template: firstBlockAnswers.template.replace(/^([a-z_]+)\s.*$/i, '$1')
  }
}