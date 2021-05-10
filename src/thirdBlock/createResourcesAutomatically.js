import inquirer from 'inquirer'
import chalk from 'chalk'
import aws from 'aws-sdk'
import fs from 'fs-extra'
import { join } from 'path'

import policy from './policy'

export default async function createResourcesAutomatically (
  { project },
  { region }
) {
  const { createLockTable, createKmsKey } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'createLockTable',
      message: 'Would you like us to create a lock table? (recommended)'
    },
    {
      type: 'confirm',
      name: 'createKmsKey',
      message:
        "Would you like to encrypt your infra's state data? (recommended)"
    }
  ])

  const bucketName = `${project}-stackforge-state`

  await new aws.S3().createBucket({ Bucket: bucketName }).promise()
  console.log()
  console.log(chalk.bold(`🍡 S3 bucket "${bucketName}" created`))
  console.log()

  const tableName = `${project}-stackforge-lock`
  if (createLockTable) {
    await new aws.DynamoDB({ region })
      .createTable({
        TableName: tableName,
        AttributeDefinitions: [{ AttributeName: 'LockID', AttributeType: 'S' }],
        KeySchema: [{ AttributeName: 'LockID', KeyType: 'HASH' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 20,
          WriteCapacityUnits: 20
        }
      })
      .promise()

    console.log()
    console.log(chalk.bold('🍡 DynamoDB table created'))
    console.log(chalk.italic('No concurrency issues for you. Horray!'))
    console.log()
  } else {
    console.log()
    console.log(chalk.bold('💨 Skipping DynamoDB table creation'))
    console.log(
      chalk.italic(
        'You should consider using one in the future to prevent concurrency issues'
      )
    )
    console.log()
  }

  let keyId
  if (createKmsKey) {
    const {
      KeyMetadata: { KeyId }
    } = await new aws.KMS({ region }).createKey().promise()

    keyId = KeyId
    console.log()
    console.log(chalk.bold('🍡 KMS key created'))
    console.log(
      chalk.italic('Ahh, I see you take security as seriously as we do')
    )
    console.log()
  } else {
    console.log()
    console.log(chalk.bold('💨 Skipping KMS key creation'))
    console.log()
  }

  const policyName = `${project}_stackforge_policy`
  const {
    Policy: { Arn: policyArn }
  } = await new aws.IAM()
    .createPolicy({
      PolicyName: policyName,
      PolicyDocument: policy(policyName, bucketName, createLockTable && tableName, keyId)
    })
    .promise()
  console.log()
  console.log(chalk.bold(`🍡 IAM policy "${policyName}" created`))
  console.log()

  const userName = `${project}_stackforge_user`
  await new aws.IAM()
    .createUser({
      UserName: userName
    })
    .promise()
  await new aws.IAM()
    .attachUserPolicy({
      UserName: userName,
      PolicyArn: policyArn
    })
    .promise()
  console.log()
  console.log(chalk.bold(`🍡 IAM user "${userName}" created`))
  console.log(
    chalk.italic(
      'This user has minimal permissions to maintain the infrastructure and deploy apps'
    )
  )
  console.log()

  const { AccessKey } = await new aws.IAM()
    .createAccessKey({
      UserName: userName
    })
    .promise()
  fs.writeFileSync(
    join(process.cwd(), 'top_secret_credentials.txt'),
    `AWS_ACCESS_KEY_ID=${AccessKey.AccessKeyId}\nAWS_SECRET_ACCESS_KEY=${AccessKey.SecretAccessKey}`
  )
  console.log()
  console.log(chalk.bold(`🍡 Access key for user "${userName}" created`))
  console.log(chalk.italic("You'll need them in a sec!"))
  console.log()
  console.log('===========================')
  console.log()

  return {
    create_resources_automatically: true,
    state_bucket: bucketName,
    lock_table: createLockTable ? tableName : undefined,
    encryption_key_id: createKmsKey ? keyId : undefined
  }
}
