import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { toast } from '@pheralb/toast'
import TiltCard from './TiltCard'
import Spinner from './Spinner'
import AnimatedImage from './AnimatedImage'

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
          setFiles([])
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

  const handleAddSampleImage = async (imagePath) => {
    try {
      // Obtener la imagen desde la ruta proporcionada
      const response = await fetch(imagePath)
      const blob = await response.blob()

      // Crear un objeto File simulando una subida
      const file = new File([blob], 'sample-image.webp', {
        type: 'image/webp'
      })

      setFiles([file])
    } catch (error) {
      toast.error({
        text: 'Ha ocurrido un error al cargar la imagen de muestra ❌',
        duration: 5000,
        description: 'Por favor, intenta nuevamente.'
      })
      console.log('Error fetching sample image:', error)
    }
  }

  return (
    <div className='py-5 w-full min-h-[560px] flex flex-col items-center justify-center gap-y-2'>
      <FilePond
        className='w-[500px] h-[400px] rounded-3xl border-2 border-dashed'
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
        <TiltCard>
          <button
            onClick={handleBackgroundRemoval}
            className={`px-6 py-3 min-w-[200px] text-xl font-semibold ${
              isProcessing
                ? ' bg-zinc-900/70'
                : ' bg-blue-700/70 hover:bg-blue-900/70 cursor-pointer'
            } saturate-150 rounded-lg transition-color duration-300 ease-in-out`}
            disabled={isProcessing}
          >
            {isProcessing ? <Spinner color='warning' /> : 'Eliminar Fondo'}
          </button>
        </TiltCard>
      )}

      <section
        className={`flex flex-col items-center justify-center gap-y-8 ${
          files.length > 0 ? 'pt-10' : 'pt-25'
        }`}
      >
        <h2 className='text-xl font-semibold'>
          O intenta con una de estas imágenes de muestra:
        </h2>
        <div className='flex items-center justify-center gap-x-4'>
          <AnimatedImage
            src={'./samples/img1.webp'}
            alt='Imagen de muestra 1'
            size={150}
            duration={300}
            onClick={() => handleAddSampleImage('./samples/img1.webp')}
          />

          <AnimatedImage
            src={'./samples/img2.webp'}
            alt='Imagen de muestra 2'
            size={150}
            duration={300}
            onClick={() => handleAddSampleImage('./samples/img2.webp')}
          />

          <AnimatedImage
            src={'./samples/img3.webp'}
            alt='Imagen de muestra 3'
            size={150}
            duration={300}
            onClick={() => handleAddSampleImage('./samples/img3.webp')}
          />

          <AnimatedImage
            src={'./samples/img4.webp'}
            alt='Imagen de muestra 4'
            size={150}
            duration={300}
            onClick={() => handleAddSampleImage('./samples/img4.webp')}
          />
        </div>
      </section>
    </div>
  )
}

export default ImageUpload
