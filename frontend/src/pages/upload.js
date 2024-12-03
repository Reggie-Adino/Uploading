import React, {useState} from 'react'

const Upload = () => {

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file)
    // setSelectedFile(file)
  }

  // const previewFile = (file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     console.log(reader.result)
  //     setPreviewSource(reader.result)
  // }

  const previewFile = (file) => {
    const reader = new FileReader();
  
    reader.onloadend = () => {
      console.log(reader.result);  // Log once file is read
      setPreviewSource(reader.result);  // Set the preview source for rendering
    };
  
    reader.readAsDataURL(file);  // Start reading the file
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    console.log('submitting')
    if(!previewSource) return
    uploadImage(previewSource)
  }
  

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    
    try {
      await fetch('api/upload', {
        method:"POST",
        body: JSON.stringify({ data: base64EncodedImage }), 
        headers:{'Content-type':'application/json'}
      })
    } catch (error) {
      
    }
  }

  return (
    
    <div>
      <h1>Upload</h1>
      <form action="" onSubmit={handleSubmitFile} className='form' >
        <input type="file" name="image" onChange={ handleFileInputChange} value={fileInputState} className='form-input'/>

        <button className="btn">Submit</button>
      </form>

      {previewSource&& (<img src={previewSource} alt="chosen" style={{height:'300px'}}/>) }
    </div>
  )
}

export default Upload