const AnimatedImage = ({
  src,
  alt = 'Imagen animada',
  size = 400,
  duration = 500,
  onClick
}) => {
  return (
    <div className='overflow-hidden'>
      <button
        className='w-full h-full rounded-xl overflow-hidden p-0 border-none bg-transparent cursor-pointer'
        onClick={onClick}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <img
          src={src}
          alt={alt}
          className='w-full h-full rounded-xl object-cover grayscale scale-100 transition-all hover:grayscale-0 hover:scale-95'
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transitionDuration: `${duration}ms`
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.clipPath =
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.clipPath =
              'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)')
          }
        />
      </button>
    </div>
  )
}

export default AnimatedImage
