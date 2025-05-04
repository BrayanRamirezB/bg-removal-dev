import Background from './components/Background'
import ImageIcon from './icons/ImageIcon'
import ImageUpload from './components/ImageUpload'

function App() {
  return (
    <div className='relative min-h-screen w-full'>
      <Background />
      <div className='flex flex-col items-center justify-center mx-auto max-w-5xl'>
        <h1 className='text-4xl font-bold text-center pt-20 pb-5 flex items-center gap-x-4 text-neutral-50'>
          <span className='flex items-center justify-center'>
            <ImageIcon className='size-10' />
          </span>
          BG Removal
        </h1>

        <ImageUpload />
      </div>
    </div>
  )
}

export default App
