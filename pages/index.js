import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [noButtonStyle, setNoButtonStyle] = useState({})
  const yesButtonRef = useRef(null)
  const containerRef = useRef(null)

  const moveNoButton = useCallback(() => {
    if (!yesButtonRef.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const yesRect = yesButtonRef.current.getBoundingClientRect()
    const buttonWidth = 120
    const buttonHeight = 50
    const padding = 20

    let newX, newY
    let attempts = 0
    const maxAttempts = 50

    do {
      newX = Math.random() * (containerRect.width - buttonWidth - padding * 2) + padding
      newY = Math.random() * (containerRect.height - buttonHeight - padding * 2) + padding

      const noRect = {
        left: containerRect.left + newX,
        right: containerRect.left + newX + buttonWidth,
        top: containerRect.top + newY,
        bottom: containerRect.top + newY + buttonHeight,
      }

      const overlaps = !(
        noRect.right < yesRect.left - 20 ||
        noRect.left > yesRect.right + 20 ||
        noRect.bottom < yesRect.top - 20 ||
        noRect.top > yesRect.bottom + 20
      )

      if (!overlaps) break
      attempts++
    } while (attempts < maxAttempts)

    setNoButtonStyle({
      position: 'absolute',
      left: `${newX}px`,
      top: `${newY}px`,
    })
  }, [])

  useEffect(() => {
    if (showSuccess) {
      import('canvas-confetti').then((confetti) => {
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
          confetti.default({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ['#ff6b6b', '#ff8787', '#ffa8a8', '#ffc9c9', '#ffe3e3', '#fff5f5'],
          })
          confetti.default({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ['#ff6b6b', '#ff8787', '#ffa8a8', '#ffc9c9', '#ffe3e3', '#fff5f5'],
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }
        frame()
      })
    }
  }, [showSuccess])

  const handleYesClick = () => {
    setShowSuccess(true)
  }

  const handleReset = () => {
    setShowSuccess(false)
    setNoButtonStyle({})
  }

  const loveNotes = ['My World', 'My Everything', 'Soulmate', 'My Heart', 'Forever Yours', 'My Love']

  return (
    <>
      <Head>
        <title>Happy Valentine&apos;s Day!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Quicksand:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Quicksand', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #ffb6c1 0%, #ff6b81 50%, #e63946 100%);
          overflow-x: hidden;
        }

        .floating-hearts {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .heart {
          position: absolute;
          bottom: -50px;
          font-size: 24px;
          animation: floatUp 6s ease-in infinite;
          opacity: 0.7;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .main-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 40px 30px;
          text-align: center;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .heading {
          font-family: 'Dancing Script', cursive;
          font-size: 3rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }

        .question {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.4rem;
          color: #fff;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .button-container {
          position: relative;
          display: flex;
          justify-content: center;
          gap: 20px;
          min-height: 150px;
          width: 100%;
        }

        .btn {
          padding: 15px 30px;
          font-size: 1.1rem;
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-yes {
          background: linear-gradient(135deg, #4caf50, #45a049);
          color: white;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        .btn-yes:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5);
        }

        .btn-no {
          background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
          touch-action: none;
        }

        .success-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 40px 20px;
          text-align: center;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .success-heading {
          font-family: 'Dancing Script', cursive;
          font-size: 2.2rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          margin-bottom: 30px;
          line-height: 1.4;
        }

        .gif-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .gif-container img {
          max-width: 95%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .reset-link {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .reset-link:hover {
          color: #fff;
          text-decoration: underline;
        }

        .love-note {
          position: fixed;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-family: 'Dancing Script', cursive;
          font-size: 1rem;
          animation: floatNote 8s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes floatNote {
          0%, 100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @media (max-width: 600px) {
          .heading {
            font-size: 2.2rem;
          }

          .question {
            font-size: 1.2rem;
          }

          .success-heading {
            font-size: 1.6rem;
          }

          .glass-card, .success-card {
            padding: 30px 20px;
          }

          .love-note {
            font-size: 0.85rem;
            padding: 8px 12px;
          }
        }
      `}</style>

      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${5 + Math.random() * 4}s`,
              fontSize: `${18 + Math.random() * 20}px`,
            }}
          >
            {['❤️', '💕', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 6)]}
          </span>
        ))}
      </div>

      <div className="main-container" ref={containerRef}>
        {!showSuccess ? (
          <div className="glass-card">
            <h1 className="heading">Happy Valentine&apos;s Day!</h1>
            <p className="question">Hi Baby, Will you be my valentine?</p>
            <div className="button-container">
              <button ref={yesButtonRef} className="btn btn-yes" onClick={handleYesClick}>
                Yes 💖
              </button>
              <button
                className="btn btn-no"
                style={noButtonStyle}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
              >
                No 💔
              </button>
            </div>
          </div>
        ) : (
          <>
            {loveNotes.map((note, i) => (
              <div
                key={i}
                className="love-note"
                style={{
                  [i % 2 === 0 ? 'left' : 'right']: `${5 + Math.random() * 10}%`,
                  top: `${15 + i * 14}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {note}
              </div>
            ))}
            <div className="success-card">
              <h1 className="success-heading">
                A very good decision!
                <br />
                Big hug and love from your&apos;s loving ~Wishuu
              </h1>
              <div className="gif-container">
                <img src="/clapping.gif" alt="Celebration" />
              </div>
              <a className="reset-link" onClick={handleReset}>
                made a mistake, click here to go back
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}
