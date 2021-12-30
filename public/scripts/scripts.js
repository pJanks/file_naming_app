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

const formData = new FormData()
let fileOrFiles = []

const fileDropper = $('.file-dropper')
const fileDropperForm = $('.file-dropper-form')
const fileDropperLabel = $('.file-dropper-label')

const handleFileDrop = async (e) => {
  e.preventDefault()

  if (e.type === 'drop') {
    fileOrFiles = e.originalEvent.dataTransfer.files
    if (fileOrFiles.length > 1) {
      const keys = Object.keys(fileOrFiles)
      keys.forEach(key => {
        formData.append('files', fileOrFiles[key])
      })
    } else {
      formData.append('file', fileOrFiles[0])
    }
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const newName = $('.new-name-input').val().replace(/\s+/g, '_')
  const directory = $('.directory-input').val()
  
  if (fileDropper.prop('files').length === 1) {

    formData.append('files', fileDropper.prop('files')[0])

    const options = {
      method: 'POST',
      body: formData,
    }

    const response = await fetch(`http://127.0.0.1:3001/rename_one/${newName}/${directory}`, options)

  } else if (fileDropper.prop('files').length > 1) {

    const keys = Object.keys(fileDropper.prop('files'))
    keys.forEach(key => {
      formData.append('files', fileDropper.prop('files')[key])
    })

    const options = {
      method: 'POST',
      body: formData,
    }

    const response = await fetch(`http://127.0.0.1:3001/rename_multiple/${newName}/${directory}`, options)

  } else if (fileOrFiles.length === 1) {

    const keys = Object.keys(fileOrFiles)
    keys.forEach(key => {
      formData.append('files', fileOrFiles[key])
    })

    const options = {
      method: 'POST',
      body: formData,
    }

    const response = await fetch(`http://127.0.0.1:3001/rename_one/${newName}/${directory}`, options)

  } else if (fileOrFiles.length > 1) {

    const keys = Object.keys(fileOrFiles)
    keys.forEach(key => {
      formData.append('files', fileOrFiles[key])
    })

    const options = {
      method: 'POST',
      body: formData,
    }

    const response = await fetch(`http://127.0.0.1:3001/rename_multiple/${newName}/${directory}`, options)

  } else {
    alert('something isn\'t right . . . make sure you selected files . . .')
  }
}

const handleEnterButtonPress = (e) => {
  if (e.key.toLowerCase() === 'enter') {
    fileDropperLabel.click()
  }
}

// check for File API support
if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log('All the File APIs are supported')
} else {
  alert('The File APIs are not fully supported in this browser.')
}

fileDropperLabel.on('dragover', handleFileDrop)
fileDropperLabel.on('dragenter', handleFileDrop)
fileDropperLabel.on('drop', handleFileDrop)
fileDropperLabel.on('keypress', handleEnterButtonPress)
fileDropperForm.on('submit', handleSubmit)