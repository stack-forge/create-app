import inquirer from 'inquirer'
import chalk from 'chalk'

import { isValidS3Bucket, isValidDynamoTable, isValidUuid } from '../validators'

export default async function inputResourcesManually () {
  const thirdBlockAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'state_bucket',
      message: 'Enter the S3 bucket name',
      validate: isValidS3Bucket
    },
    {
      type: 'input',
      name: 'lock_table',
      message: `Enter the DynamoDB lock table name ${chalk.italic(
        '(recommended but optional)'
      )}`,
      validate: s => !s || isValidDynamoTable(s)
    },
    {
      type: 'input',
      name: 'key_id',
      message: `Enter the KMS key id ${chalk.italic(
        '(recommended but optional)'
      )}`,
      validate: s => !s || isValidUuid(s)
    },
    {
      type: 'confirm',
      name: 'added_recommended_policies',
      message: `Did you add the recommended policies to the user?\n${chalk.italic(
        "No worries if you didn't, just make sure to set `manage_ci_user: false` on stackforge.yaml\n(or just answer no and we'll do it for you!)"
      )}`
    }
  ])

  console.log()
  console.log("===========================")
  console.log()

  return thirdBlockAnswers
}
