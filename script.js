:root {
  --accent: #0097a7;
  --overlay-bg: rgba(0,0,0,0.45);
}

html, body {
  height: 100%;
  font-family: Roboto, sans-serif;
  background: #fafafa;
  margin: 0;
}

.hero {
  position: relative;
  height: 72vh;
  min-height: 380px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}

.countdown-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--overlay-bg);
  backdrop-filter: blur(6px);
  color: #fff;
  padding: 18px;
  border-radius: 12px;
  min-width: 280px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}

.countdown-card h1 {
  font-weight: 500;
  margin: 0 0 6px 0;
  font-size: 20px;
}

.countdown-timer {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.countdown-segment {
  min-width: 62px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
}

.countdown-segment .num {
  font-size: 20px;
  font-weight: 600;
}

.countdown-segment .label {
  font-size: 12px;
  opacity: 0.9;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}

main .container {
  margin-top: 22px;
}

footer {
  margin-top: 28px;
  padding: 18px 0;
  text-align: center;
  color: #666;
}

@media (max-width:600px){
  .countdown-card {
    min-width: 220px;
    padding: 12px;
  }
  .countdown-segment {
    min-width: 48px;
    padding: 8px 10px;
  }
  .countdown-card h1 {
    font-size: 16px;
  }
}
