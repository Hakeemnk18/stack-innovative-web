import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: 'linear-gradient(135deg, #040714 0%, #0A0F2C 60%, #0D0528 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0066FF 0%, #7C3AED 100%)',
            }}
          />
          <span style={{ color: 'white', fontSize: 36, fontWeight: 700 }}>Stack Innovative</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: 'white' }}>Web &amp; App Development</span>
          <span
            style={{
              backgroundImage: 'linear-gradient(90deg, #0066FF, #7C3AED, #00D4FF)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Agency in Calicut, Kerala
          </span>
        </div>

        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.55)', fontSize: 28, marginTop: 40 }}>
          React · Next.js · React Native · Full-Stack Solutions
        </div>
      </div>
    ),
    { ...size }
  )
}
