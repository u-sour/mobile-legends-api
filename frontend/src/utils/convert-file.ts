const ConvertFile = {
  toBase64: (file: File | Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result?.toString() || '')
      reader.onerror = (error) => reject(error)
    }),
  toBlob: (blob: string) => new Blob([blob], { type: 'plain/text' }),
  fromUrl: (blobUrl: string, fileName: string): Promise<File> =>
    new Promise((resolve) => {
      fetch(blobUrl).then((res) => {
        res.blob().then((blob) => {
          const file = new File([blob], fileName, { type: blob.type })
          resolve(file)
        })
      })
    })
}

export default ConvertFile
