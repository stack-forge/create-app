export default function policy (bucketName, tableName, keyId) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: '',
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: `arn:aws:s3:::${bucketName}`
      },
      {
        Sid: '',
        Effect: 'Allow',
        Action: ['s3:PutObject*', 's3:GetObject*'],
        Resource: `arn:aws:s3:::${bucketName}/*`
      },
      {
        Sid: '',
        Effect: 'Allow',
        Action: 'iam:*',
        Resource: 'arn:aws:iam::*:user/stackforge_*'
      },
      {
        Sid: '',
        Effect: 'Allow',
        Action: [
          'iam:ListPolicyVersions',
          'iam:GetPolicyVersion',
          'iam:GetPolicy',
          'iam:DeletePolicyVersion',
          'iam:CreatePolicyVersion'
        ],
        Resource: 'arn:aws:iam::*:policy/stackforge_*'
      },
      {
        Sid: '',
        Effect: 'Deny',
        Action: [
          'savingsplans:*',
          'cur:*',
          'ce:*',
          'aws-portal:*',
          'account:*'
        ],
        Resource: '*'
      },
      ...(tableName
        ? [
            {
              Sid: '',
              Effect: 'Allow',
              Action: [
                'dynamodb:PutItem',
                'dynamodb:GetItem',
                'dynamodb:DeleteItem'
              ],
              Resource: `arn:aws:dynamodb:*:*:table/${tableName}`
            }
          ]
        : []),
      ...(keyId
        ? [
            {
              Sid: '',
              Effect: 'Allow',
              Action: [
                'kms:Decrypt',
                'kms:Describe*',
                'kms:Encrypt',
                'kms:GenerateDataKey*',
                'kms:Get*',
                'kms:ImportKeyMaterial',
                'kms:List*',
                'kms:Put*',
                'kms:ReEncrypt*'
              ],
              Resource: `arn:aws:kms:*:*:key/${keyId}`
            }
          ]
        : [])
    ]
  })
}
