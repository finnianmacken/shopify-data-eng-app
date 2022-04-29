import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import styles from './UploadImage.module.css'
import AWS from 'aws-sdk'

const S3_BUCKET ='finn-image-storage';


AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: process.env.REACT_APP_AWS_REGION,
})

const UploadImage = (props) => {
    const fileInput = React.useRef();

    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFile = (event) => {
      let newArr = fileInput.current ? fileInput.current.files : [];
      for (let i = 0; i < newArr.length; i++) {
        uploadFile(newArr[i])}
        props.setRefreshApp(true)
      }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        console.log("FILE:", file)
        console.log("KEY:", file.name)


        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                if(Math.round((evt.loaded / evt.total) * 100) === 100){
                  setUploadSuccess(true)
                  setTimeout(()=>{
                    setProgress(0)
                    setUploadSuccess(false)
                  }, 2000)
                }
            })
            .send((err) => {
                console.log("ERR", err)
            })
    }

    return (
      <div className={styles.positionWrapper}>
        <div className={styles.uploadWrapper}>
            {uploadSuccess && <div style={{marginTop: "20px"}}><Alert severity='success'>File Successfully Uploaded</Alert></div>}
            {!uploadSuccess && <div style={{marginTop: "20px"}}><Alert severity='info'>File Upload Progress is {progress}%</Alert></div>}
            <input type="file" multiple ref={fileInput}/>
            <Button onClick={handleFile} variant='outlined'> Upload to S3</Button>
        </div>
      </div>
    )
}

export default UploadImage;
