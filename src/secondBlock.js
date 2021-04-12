import inquirer from 'inquirer'
import isValidDomain from 'is-valid-domain'

import regions from './regions'

export default async function secondBlock ({ provider }) {
  const dnsProviders = ['aws']
  const secondBlockAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'region',
      message: 'Please choose your region',
      choices: regions[provider],
      default: regions[provider][0]
    },
    {
      type: 'list',
      name: 'dns_provider',
      message: 'Please choose your DNS provider',
      choices: dnsProviders,
      default: dnsProviders[0]
    },
    {
      type: 'input',
      name: 'hosted_zone',
      message: 'Enter the root domain of your app (e.g. example.com)',
      validate: s => isValidDomain(s, { subdomain: false }) || 'Invalid domain'
    }
  ])

  return secondBlockAnswers
}
