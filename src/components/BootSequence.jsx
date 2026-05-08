import { useEffect, useState } from 'react'

const lines = [
  '> Inicializando protocolo...',
  '> Buscando jugadores...',
  '> Detectando actividad alienígena...',
  '> Amenaza detectada.',
]

export default function BootSequence({ onFinish }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (lineIndex >= lines.length) {

      // espera final
      setTimeout(() => {
        setFadeOut(true)

        // termina fade
        setTimeout(() => {
          onFinish()
        }, 1200)

      }, 1200)

      return
    }

    const currentLine = lines[lineIndex]

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(
          currentLine.slice(0, charIndex + 1)
        )

        setCharIndex(charIndex + 1)
      }, 35)

      return () => clearTimeout(timeout)
    }

    const nextLineTimeout = setTimeout(() => {
      setVisibleLines(prev => [...prev, currentLine])

      setCurrentText('')
      setCharIndex(0)
      setLineIndex(prev => prev + 1)
    }, 500)

    return () => clearTimeout(nextLineTimeout)

  }, [charIndex, lineIndex, onFinish])

  return (
    <div
      className={`boot-screen ${
        fadeOut ? 'boot-fade-out' : ''
      }`}
    >

      <div className="boot-overlay"></div>

      <div className="boot-content">

        <div className="boot-title mb-5">
          GANTZ SYSTEM
        </div>

        {visibleLines.map((line, index) => (
          <div
            key={index}
            className="boot-line"
          >
            {line}
          </div>
        ))}

        {lineIndex < lines.length && (
          <div className="boot-line">
            {currentText}
            <span className="cursor">█</span>
          </div>
        )}

      </div>
    </div>
  )
}