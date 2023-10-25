import { toast } from 'vue3-toastify'
import compressorAsync from './compressor-async'
const compressor = async (file: File | Blob, compressQuality = 0.8, prefixFileSize = 1) => {
  const convertSize = parseInt(`${prefixFileSize}000000`)
  try {
    const result = await compressorAsync(file, {
      quality: compressQuality,
      convertSize: convertSize
    })
    //convert from Blob to File
    // return (file = new File([file], result.name, { type: result.type }))
    return result
  } catch (error: any) {
    return toast.error(error.message)
  }
}

export default compressor
