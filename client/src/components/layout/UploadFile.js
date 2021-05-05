import axios from 'axios';
import React, { useState } from 'react';

const UploadFile = ({playerId, column}) => {

  const [file,setFile] = useState('');
  const [fileName,setFileName] = useState('noFile');
  const [uploadedFile, setUploadedFile] = useState({});

  console.log(playerId);

  const fileSelectedHandler = e =>{
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name)
  }; 
   
  const fileUploadHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file)
    
    try {
      let res = await axios.post(`/sayfan/users/player/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({fileName, filePath});


      res = await axios.patch(`/sayfan/users/player/upload?filename=${uploadedFile.fileName}&column=${column}&idNumber=${playerId}`)   


    } catch (err){
      if (err.response.status === 500) {
        console.log('Server problem')
      } else{
        console.log(err.response.data.msg)
      }
    }
  };

  return (
    <div>
      <form onSubmit={fileUploadHandler}>
        <label>Uplaod File:{fileName}</label>
        <input type="file" onChange={fileSelectedHandler}/>
        <input type="submit" value="Upload"/>
      </form>
    </div>
  )
}

export default UploadFile
