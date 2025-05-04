import { useRef, useEffect, useCallback } from 'react'

const TiltCard = ({
  children,
  maxRotation = 3,
  perspective = 300,
  scaleOnHover = 1.02
}) => {
  const cardRef = useRef(null)
  const rafId = useRef(null)
  const dimensions = useRef({ width: 0, height: 0 })

  const updateDimensions = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      dimensions.current = {
        width: rect.width,
        height: rect.height
      }
    }
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [updateDimensions])

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return

      if (rafId.current) cancelAnimationFrame(rafId.current)

      rafId.current = requestAnimationFrame(() => {
        const { width, height } = dimensions.current
        const centerX = width / 2
        const centerY = height / 2

        const x = e.clientX - e.target.getBoundingClientRect().left
        const y = e.clientY - e.target.getBoundingClientRect().top

        const rotateY = ((x - centerX) / centerX) * maxRotation
        const rotateX = -((y - centerY) / centerY) * maxRotation

        cardRef.current.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})
      `
      })
    },
    [maxRotation, scaleOnHover]
  )

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    cardRef.current.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
  }, [])

  return (
    <div style={{ perspective }} className=''>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className='transition-transform duration-300 ease-out'
      >
        {children}
      </div>
    </div>
  )
}

export default TiltCard
