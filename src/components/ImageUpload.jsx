import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { toast } from '@pheralb/toast'

// Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType)

function ImageUpload() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBackgroundRemoval = () => {
    if (files.length > 0) {
      const file = files[0].file
      const worker = new Worker(
        new URL('../workers/backgroundRemovalWorker.js', import.meta.url),
        { type: 'module' }
      )

      setIsProcessing(true)

      worker.onmessage = (event) => {
        const { success, result, error } = event.data
        if (success) {
          const processedImageUrl = URL.createObjectURL(result)

          const link = document.createElement('a')
          link.href = processedImageUrl
          link.download = 'processed-image.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          toast.success({
            text: 'Fondo eliminado con éxito ✅',
            duration: 5000,
            description: 'La imagen procesada se ha descargado automáticamente.'
          })
          setFiles([]) // Limpiar el archivo después de procesar
        } else {
          console.error('Background removal failed:', error)
          toast.error({
            text: 'Ha ocurrido un error al eliminar el fondo ❌',
            duration: 5000,
            description: 'Por favor, intenta nuevamente.'
          })
        }
        setIsProcessing(false)
        worker.terminate()
      }

      worker.postMessage({ file })
    }
  }

  return (
    <div className='py-10 w-full flex flex-col items-center justify-center'>
      <FilePond
        className='w-[450px] h-[400px] rounded-3xl border-2 border-dashed'
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        name='images'
        labelIdle='Arrastra o <span class="filepond--label-action cursor-pointer">selecciona</span> una imágen'
        acceptedFileTypes={['image/*']}
        fileValidateTypeLabelExpectedTypes='Solo se permiten imágenes'
      />
      {files.length > 0 && (
        <button
          onClick={handleBackgroundRemoval}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Remove Background'}
        </button>
      )}
    </div>
  )
}

export default ImageUpload
