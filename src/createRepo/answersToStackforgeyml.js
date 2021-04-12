const rebuildObj = obj => (acc, k) => ({
  ...acc,
  [k]: obj[k]
})

const pick = (obj, keys) =>
  Object.keys(obj)
    .filter(k => keys.includes(k))
    .reduce(rebuildObj(obj), {})

const removeFalsy = obj =>
  Object.keys(obj)
    .filter(k => k !== undefined && k !== null && k !== '')
    .reduce(rebuildObj(obj), {})

const webServerApp = ({ project, hosted_zone }) => ({
  server: {
    url: `${project}.${hosted_zone}`,
    port: 3000,
    dockerfile: 'Dockerfile'
  }
})

const bucketCdn = ({ project, hosted_zone }) => ({
  website: {
    url: `${project}.${hosted_zone}`
  }
})

export default function answersToStackforge (answers) {
  const { added_recommended_policies: arp } = answers
  return {
    service: {
      ...removeFalsy(
        pick(answers, [
          'project',
          'provider',
          'region',
          'dns_provider',
          'hosted_zone',
          'state_bucket',
          'lock_table',
          'key_id'
        ])
      ),
      ...(arp !== undefined && arp === false ? { manage_ci_user: false } : {})
    },
    hosts:
      answers.template === 'webserver_app'
        ? webServerApp(answers)
        : bucketCdn(answers)
  }
}
