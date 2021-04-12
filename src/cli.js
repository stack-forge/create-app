import onboarding from './onboarding'
import firstBlock from './firstBlock'
import secondBlock from './secondBlock'
import thirdBlock from './thirdBlock'
import createRepo from './createRepo'
import offboarding from './offboarding'

async function flow () {
  // First block
  const firstBlockAnswers = await firstBlock()

  // Second block
  const secondBlockAnswers = await secondBlock(firstBlockAnswers)

  // Third block
  const thirdBlockAnswers = await thirdBlock(firstBlockAnswers, secondBlockAnswers)

  return {
    ...firstBlockAnswers,
    ...secondBlockAnswers,
    ...thirdBlockAnswers
  }
}

export async function cli () {
  // Onboarding
  await onboarding()
  const answers = await flow()
  await createRepo(answers)
  // Offboarding
  await offboarding(answers)
}
