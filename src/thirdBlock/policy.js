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
        Action: [
          "iam:AttachUserPolicy",
          "iam:ListAttachedUserPolicies",
          "iam:DetachUserPolicy",
          "iam:GetUser",
          "iam:GetUserPolicy",
          "iam:ListUserPolicies",
          "iam:ListUserTags",
          "iam:ListUsers"
        ],
        Resource: 'arn:aws:iam::*:user/*'
      },
      {
        Sid: '',
        Effect: 'Allow',
        Action: [
          "iam:CreatePolicy",
          "iam:CreatePolicyVersion",
          "iam:DeletePolicy",
          "iam:DeletePolicyVersion",
          "iam:GetPolicy",
          "iam:GetPolicyVersion",
          "iam:ListPolicies",
          "iam:ListPolicyVersions"
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
