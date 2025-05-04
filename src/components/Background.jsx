import Balatro from './Balatro'

function Background() {
  return (
    <div className='absolute h-full w-full z-[-1]'>
      <Balatro pixelFilter={2000} />
    </div>
  )
}

export default Background
