import AWS from 'aws-sdk';

it('queries all images from the database', () => {

  AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
                      region: process.env.REACT_APP_AWS_REGION });

  const s3 = new AWS.S3();

  const params = {
   Bucket: 'finn-image-storage',
   Delimiter: ''
  }

  s3.listObjectsV2(params, (err, data) => {
      expect(data.Contents).toBeInstanceOf(Array)
    })
})
