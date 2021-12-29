// console confirmation that scripts and jQuery work
console.log(
  `scripts made it and jQuery is type: %c${typeof $}`,
  `
    background-color: #000;
    border: 1px solid #FF00FF;
    border-radius: 3px;
    color: ${typeof $ !== 'function' ? '#FF0000' : '#00FF00'};
    padding: 0 3px;
  `
)

const fileDropperLabel = $('.file-dropper-label')

const handleFiles = async (e) => {
  e.preventDefault()

  if (e.type === 'drop') {

    const fileOrFiles = e.originalEvent.dataTransfer.files
    const formData = new FormData()

    if (!fileOrFiles.length) {
      alert('you need to upload files !')
    } else if (fileOrFiles.length > 1) {
      const keys = Object.keys(fileOrFiles)
      keys.forEach(key => {
        formData.append('file', fileOrFiles[key])
      })
      for(var pair of formData.entries()) {
        console.log(pair[1])
      }
    } else {
      formData.append('file', fileOrFiles)
      for(var pair of formData.entries()) {
        console.log(pair[1])
      }
    }

    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: formData,
    }
    const json = await fetch('http://127.0.0.1:3001/rename', options)
    const response = await json.json()

  }

}

// check for File API support
if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log('All the File APIs are supported')
} else {
  alert('The File APIs are not fully supported in this browser.')
}

fileDropperLabel.on("dragover", handleFiles)

fileDropperLabel.on("dragenter", handleFiles)

// handle file drop
fileDropperLabel.on("drop", handleFiles)