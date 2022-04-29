import AWS from 'aws-sdk';

it('adds an image to the database', () => {
  // Uploads an image to the S3 bucket and checks for 200 error

  const S3_BUCKET ='finn-image-storage';

  AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  })

  const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET},
      region: process.env.REACT_APP_AWS_REGION,
  })

  const params = {
      ACL: 'public-read',
      Body: 'HELLO SIR!',
      Bucket: S3_BUCKET,
      Key: "Test Object"
  };

  myBucket.putObject(params)
      .send((err, data) => {
          expect(err).toBeNull()
      })
})
