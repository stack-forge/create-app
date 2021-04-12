const s3BucketRegex = /(?=^.{3,63}$)(?!^(\d+\.)+\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)/

export const isValidProject = s =>
  /^[a-z][\w\d-]{1,23}$/.test(s) && s3BucketRegex.test(s)
    ? true
    : 'Invalid project name: characters, numbers and - allowed (no double dashes or end in dash)'

export const isValidS3Bucket = s =>
  s3BucketRegex.test(s) ? true : 'Invalid S3 bucket'

export const isValidDynamoTable = s => /^[.a-zA-Z0-9_-]{3,255}$/.test(s)

export const isValidUuid = s =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s
  )
    ? true
    : 'Invalid key id'
