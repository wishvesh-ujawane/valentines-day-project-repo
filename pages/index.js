import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [noButtonStyle, setNoButtonStyle] = useState({})
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const yesButtonRef = useRef(null)
  const noButtonRef = useRef(null)

  // Countdown timer for Valentine's Day 2026
  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T00:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const diff = valentinesDay - now

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const moveNoButton = useCallback(() => {
    if (!yesButtonRef.current || !noButtonRef.current) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const yesRect = yesButtonRef.current.getBoundingClientRect()
    const noRect = noButtonRef.current.getBoundingClientRect()

    const buttonWidth = noRect.width || 110
    const buttonHeight = noRect.height || 48
    const padding = 15

    let newX, newY
    let attempts = 0
    const maxAttempts = 100

    do {
      // Keep within viewport with padding
      newX = padding + Math.random() * (viewportWidth - buttonWidth - padding * 2)
      newY = padding + Math.random() * (viewportHeight - buttonHeight - padding * 2)

      // Check if it overlaps with Yes button
      const noNewRect = {
        left: newX,
        right: newX + buttonWidth,
        top: newY,
        bottom: newY + buttonHeight,
      }

      const overlaps = !(
        noNewRect.right < yesRect.left - 30 ||
        noNewRect.left > yesRect.right + 30 ||
        noNewRect.bottom < yesRect.top - 30 ||
        noNewRect.top > yesRect.bottom + 30
      )

      if (!overlaps) break
      attempts++
    } while (attempts < maxAttempts)

    setNoButtonStyle({
      position: 'fixed',
      left: `${newX}px`,
      top: `${newY}px`,
      zIndex: 1000,
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

  const loveNotes = ['My Queen', 'Forever', 'My Everything', 'My Heart', 'Soulmate', 'My Love']

  const formatNumber = (num) => String(num).padStart(2, '0')

  return (
    <>
      <Head>
        <title>Happy Valentine&apos;s Day!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Quicksand:wght@300;400;500;600&display=swap"
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

        /* Countdown Timer Styles */
        .countdown-section {
          position: relative;
          z-index: 5;
          padding: 20px 15px 10px;
          text-align: center;
        }

        .countdown-label {
          font-family: 'Dancing Script', cursive;
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 10px 14px;
          min-width: 60px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .countdown-number {
          font-family: 'Quicksand', sans-serif;
          font-weight: 300;
          font-size: 1.8rem;
          color: #fff;
          line-height: 1;
        }

        .countdown-unit {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* Decorative Separator */
        .separator {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px 0 5px;
          position: relative;
          z-index: 5;
        }

        .heartbeat-line {
          width: 80%;
          max-width: 300px;
          height: 40px;
          position: relative;
        }

        .heartbeat-svg {
          width: 100%;
          height: 100%;
          stroke: rgba(255, 255, 255, 0.7);
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sparkle-hearts {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          animation: sparkle 2s ease-in-out infinite;
        }

        .sparkle-heart {
          font-size: 14px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .sparkle-heart:nth-child(odd) {
          animation-delay: 0.3s;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .main-container {
          min-height: calc(100vh - 150px);
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
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 40px 30px;
          text-align: center;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .heading {
          font-family: 'Dancing Script', cursive;
          font-size: 2.8rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }

        .question {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 35px;
          font-weight: 500;
          line-height: 1.5;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 28px;
          font-size: 1rem;
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 110px;
          min-height: 48px;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
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

        .btn-yes:active {
          transform: translateY(0);
        }

        .btn-no {
          background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
          touch-action: none;
        }

        .btn-no-floating {
          position: fixed;
          z-index: 1000;
          transition: none;
        }

        .success-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 35px 20px;
          text-align: center;
          max-width: 550px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .success-heading {
          font-family: 'Dancing Script', cursive;
          font-size: 2rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          margin-bottom: 25px;
          line-height: 1.4;
        }

        .gif-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }

        .gif-container img {
          max-width: 95%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .reset-link {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          display: inline-block;
          padding: 8px;
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

        /* Mobile Responsive Styles */
        @media (max-width: 600px) {
          .countdown-section {
            padding: 15px 10px 8px;
          }

          .countdown-label {
            font-size: 1.2rem;
            margin-bottom: 10px;
          }

          .countdown-item {
            padding: 8px 10px;
            min-width: 52px;
            border-radius: 10px;
          }

          .countdown-number {
            font-size: 1.5rem;
          }

          .countdown-unit {
            font-size: 0.55rem;
          }

          .countdown-timer {
            gap: 6px;
          }

          .heading {
            font-size: 2.2rem;
          }

          .question {
            font-size: 1.15rem;
            margin-bottom: 30px;
          }

          .success-heading {
            font-size: 1.5rem;
          }

          .glass-card, .success-card {
            padding: 30px 20px;
            border-radius: 20px;
          }

          .btn {
            padding: 12px 24px;
            font-size: 0.95rem;
            min-width: 100px;
            min-height: 44px;
          }

          .love-note {
            font-size: 0.8rem;
            padding: 7px 11px;
          }

          .main-container {
            min-height: calc(100vh - 130px);
            padding: 15px;
          }

          .separator {
            padding: 10px 0 5px;
          }

          .heartbeat-line {
            max-width: 250px;
            height: 30px;
          }
        }

        @media (max-width: 380px) {
          .countdown-item {
            padding: 6px 8px;
            min-width: 48px;
          }

          .countdown-number {
            font-size: 1.3rem;
          }

          .countdown-unit {
            font-size: 0.5rem;
          }

          .heading {
            font-size: 1.9rem;
          }

          .question {
            font-size: 1.05rem;
          }

          .btn {
            padding: 11px 20px;
            font-size: 0.9rem;
            min-width: 90px;
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

      {!showSuccess && (
        <>
          {/* Countdown Timer */}
          <div className="countdown-section">
            <div className="countdown-label">Countdown to Valentine&apos;s Day 2026</div>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-number">{formatNumber(countdown.days)}</span>
                <span className="countdown-unit">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{formatNumber(countdown.hours)}</span>
                <span className="countdown-unit">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{formatNumber(countdown.minutes)}</span>
                <span className="countdown-unit">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{formatNumber(countdown.seconds)}</span>
                <span className="countdown-unit">Seconds</span>
              </div>
            </div>
          </div>

          {/* Decorative Separator */}
          <div className="separator">
            <div className="heartbeat-line">
              <svg className="heartbeat-svg" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid meet">
                <path d="M0,20 L70,20 L85,20 L95,5 L105,35 L115,10 L125,30 L135,15 L145,20 L160,20 L230,20 L300,20" />
                <text x="150" y="25" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="16">💕</text>
              </svg>
            </div>
          </div>
        </>
      )}

      <div className="main-container">
        {!showSuccess ? (
          <div className="glass-card">
            <h1 className="heading">Happy Valentine&apos;s Day!</h1>
            <p className="question">Hi Baby, Will you be my valentine?</p>
            <div className="button-container">
              <button ref={yesButtonRef} className="btn btn-yes" onClick={handleYesClick}>
                Yes 💖
              </button>
              {!noButtonStyle.position && (
                <button
                  ref={noButtonRef}
                  className="btn btn-no"
                  onMouseEnter={moveNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    moveNoButton()
                  }}
                >
                  No 💔
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {loveNotes.map((note, i) => (
              <div
                key={i}
                className="love-note"
                style={{
                  [i % 2 === 0 ? 'left' : 'right']: `${5 + Math.random() * 8}%`,
                  top: `${15 + i * 13}%`,
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

      {/* Floating No button when it moves outside card */}
      {noButtonStyle.position && !showSuccess && (
        <button
          ref={noButtonRef}
          className="btn btn-no btn-no-floating"
          style={noButtonStyle}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault()
            moveNoButton()
          }}
        >
          No 💔
        </button>
      )}
    </>
  )
}
