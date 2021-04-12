import fs from 'fs-extra'
import { join } from 'path'
import yaml from 'js-yaml'
import execa from 'execa'

import answersToStackforge from './answersToStackforgeyml'

export default async function createRepo (answers) {
  const sourceDir = join(__dirname, '..', '..', 'templates', 'webserver_app')
  const targetDir = join(process.cwd(), answers.project)
  fs.copySync(sourceDir, targetDir)

  const stackforge = answersToStackforge(answers)
  fs.writeFileSync(join(targetDir, 'stackforge.yml'), yaml.dump(stackforge))

  await execa('git', ['init', '-q'], {
    cwd: targetDir
  })
  await execa('git', ['add', '-A'], {
    cwd: targetDir
  })
  await execa('git', ['commit', '-q', '-m', 'First commit!'], {
    cwd: targetDir
  })
}
