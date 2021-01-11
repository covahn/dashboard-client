import { cover } from 'intrinsic-scale'
import { asyncImage } from './async'
import Compressor from 'compressorjs'

// async wrapper for compressorjs
export const asyncImageCompressor = (
  file,
  config = { quality: 0.3, maxHeight: 1000, maxWidth: 1000 }
) =>
  new Promise(
    (resolve, reject) =>
      new Compressor(file, {
        ...config,
        success: result => resolve(result),
        error: err => reject(err),
      })
  )

// old image rescaler
export const asyncImageToData = async (base64, w, h) => {
  const image = await asyncImage(base64)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // resize canvas to given resolution
  canvas.width = w
  canvas.height = h

  // calculate
  const { width, height, x, y } = cover(w, h, image.width, image.height)

  ctx.drawImage(image, x, y, width, height)

  return canvas.toDataURL()
}
