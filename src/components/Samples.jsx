import AnimatedImage from './AnimatedImage'

const images = [
  './samples/img1.webp',
  './samples/img2.webp',
  './samples/img3.webp',
  './samples/img4.webp'
]

function Samples({ handleAddSampleImage }) {
  return (
    <div className='flex items-center justify-center gap-x-4'>
      {images.map((image, index) => (
        <AnimatedImage
          key={index}
          src={image}
          alt={`Imagen de muestra ${index + 1}`}
          size={150}
          duration={300}
          onClick={() => handleAddSampleImage(image)}
        />
      ))}
    </div>
  )
}

export default Samples
