// async Image wrapper
export const asyncImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

// async FileReader wrapper
export const asyncFileReader = file =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = e => resolve(e.target.result)
    fileReader.onerror = reject
    fileReader.readAsDataURL(file)
  })
