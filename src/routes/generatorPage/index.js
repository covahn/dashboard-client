import React, { useEffect, useRef } from 'react'
import Two from 'two.js'

import { asyncImage } from 'utils/async'

import png_overlay from 'static/imgs/overlay.png'
import png_img from 'static/imgs/img.png'
import { cover } from 'intrinsic-scale'

function Generator() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(async () => {
    const ctx = canvasRef.current.getContext('2d')

    canvasRef.current.width = 400
    canvasRef.current.height = 400

    let { width, height, x, y } = cover(400, 400, 1080, 1080)

    console.log(width, height, x, y)

    // const bgImage = await asyncImage(png_img)

    ctx.drawImage(await asyncImage(png_img), 0, 0, 1080, 1080, 0, 0, 400, 400)
    ctx.drawImage(
      await asyncImage(png_overlay),
      0,
      0,
      1080,
      1080,
      0,
      0,
      400,
      400
    )

    ctx.font = '30px DM Sans'
    ctx.fillStyle = '#fff'
    ctx.fillText('Hello and welcome to hell 🇪🇺', 20, 60)
  }, [])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Generator
