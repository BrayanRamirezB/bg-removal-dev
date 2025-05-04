const Spinner = ({
  label,
  variant = 'default',
  size = 'md',
  color = 'default',
  textColor = 'default'
}) => {
  const variants = {
    default: 'backdrop-blur-sm shadow-lg',
    light: ''
  }

  const sizes = {
    xs: 'size-4',
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-12'
  }

  const firstCircleColors = {
    default: 'border-zinc-500',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const secondCircleColors = {
    default: 'border-zinc-400',
    primary: 'border-blue-300',
    secondary: 'border-indigo-300',
    success: 'border-green-300',
    warning: 'border-yellow-300',
    danger: 'border-red-300'
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
    danger: 'text-red-800 dark:text-red-500'
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      <div className='relative'>
        <div
          className={`relative rounded-full ${variants[variant]} ${sizes[size]}`}
        >
          <div
            className={`absolute w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent ${firstCircleColors[color]} animate-spin`}
          ></div>
          <div
            className={`absolute w-full h-full rounded-full border-4 border-t-transparent border-b-transparent border-l-transparent ${secondCircleColors[color]} animate-spin`}
          ></div>
        </div>
      </div>
      {label && (
        <span className={`text-sm ${textColors[textColor]}`}>{label}</span>
      )}
    </div>
  )
}

export default Spinner
