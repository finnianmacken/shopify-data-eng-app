import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import styles from './UploadImage.module.css'
import AWS from 'aws-sdk'

const S3_BUCKET ='finn-image-storage';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: "AKIAZ4ZCMW6WEUTNSN5J",
    secretAccessKey: "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"
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
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
                if (err) console.log(err)
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
