import React, {useState, useEffect} from 'react';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import styles from './ViewImage.module.css'
const AWS = require('aws-sdk/global');
AWS.config.update({ accessKeyId: 'AKIAZ4ZCMW6WEUTNSN5J',
                    secretAccessKey: '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',
                    region: 'us-east-1' });

const s3 = new AWS.S3();

const params = {
 Bucket: 'finn-image-storage',
 Delimiter: '',
};

//  s3.listObjectsV2(params, (err, data) => {
//  if (err) throw err;
//  console.log(data.Contents);
// })

function ViewImage(props){
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
   s3.listObjectsV2(params, (err, data) => {
     if (err) {
       console.log(err, err.stack);
     } else {
       setListFiles(data.Contents);
       console.log(data.Contents);
     }
     props.setRefreshApp(false)
   });
 }, [props.refreshApp]);


  return(
    <div className={styles.positionWrapper}>
    <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={200}>
      {listFiles &&
       listFiles.map((item, index) => (
        <ImageListItem key={index}>
          <img
            src={`https://finn-image-storage.s3.amazonaws.com/${item.Key}`}
            alt={item.Key}
            loading="lazy"
          />
        </ImageListItem>
        ))}
    </ImageList>
  </div>)
}

export default ViewImage

  //
  // {listFiles &&
  //  listFiles.map((name))}
