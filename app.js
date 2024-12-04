
const uploadBtn = document.getElementById('uploadBtn')
const fInput = document.getElementById('fileInput')
const pBar = document.getElementById('prgBar')
const clearBtn = document.getElementById('clearBtn')


uploadBtn.addEventListener('click', ()=>{
 const userFile = fInput.files[0]
 if (!userFile) {
    alert('Please select a file!');
    return;
}
const payload = new FormData();
payload.append('user-img', userFile);
 const req = new XMLHttpRequest();
 req.open('POST', 'https://httpbin.org/post');

 req.upload.addEventListener('progress',(e)=>{
    const percentComplete = (e.loaded / e.total)*100;
    pBar.setAttribute('value', percentComplete);
    pBar.nextElementSibling.innerText = Math.round(percentComplete)+'%';

 })
 req.addEventListener('load', ()=>{
    if (req.status === 200) {
        console.log('Upload complete:', req.response);
        alert('File uploaded successfully!');
    } else {
        console.error('Upload failed:', req.statusText);
        alert('File upload failed. Please try again.');
    }
})
req.send(payload)
})
clearBtn.addEventListener('click', ()=>{
    fInput.value = "";
    pBar.value = 0; 
    progressLabel.innerText = '0%'; 

})
