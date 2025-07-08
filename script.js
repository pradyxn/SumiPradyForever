// Click counters for each page
const clickCounts = {}
const maxClicks = 11

// Initialize click counts
for (let i = 1; i <= 17; i++) {
  clickCounts[i] = 0
}

// Page navigation
function goToPage(pageNumber) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.remove("active"))

  // Show target page
  const targetPage = document.getElementById(`page-${pageNumber}`)
  if (targetPage) {
    targetPage.classList.add("active")

    // Add click event listener to gift box if not already added
    const giftBox = document.getElementById(`gift-box-${pageNumber}`)
    if (giftBox && pageNumber > 0) {
      giftBox.onclick = () => handleGiftBoxClick(pageNumber)
    }

    // Add floating hearts to final page
    if (pageNumber === 17) {
      createFloatingHearts()
    }
  }
}

// Handle gift box clicks
function handleGiftBoxClick(pageNumber) {
  clickCounts[pageNumber]++

  // Update counter display
  const counter = document.getElementById(`counter-${pageNumber}`)
  counter.textContent = `Clicks: ${clickCounts[pageNumber]}/11`

  // Add click animation
  const giftBox = document.getElementById(`gift-box-${pageNumber}`)
  giftBox.style.transform = "scale(0.95)"
  setTimeout(() => {
    giftBox.style.transform = "scale(1.1)"
    setTimeout(() => {
      giftBox.style.transform = "scale(1)"
    }, 100)
  }, 100)

  // Create heart burst effect
  createHeartBurst(giftBox)

  // Check if max clicks reached
  if (clickCounts[pageNumber] >= maxClicks) {
    revealLetter(pageNumber)
  }
}

// Create heart burst effect on click
function createHeartBurst(element) {
  const hearts = ["💗", "💕", "💖", "💝"]
  const rect = element.getBoundingClientRect()

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div")
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
    heart.style.position = "fixed"
    heart.style.left = rect.left + rect.width / 2 + "px"
    heart.style.top = rect.top + rect.height / 2 + "px"
    heart.style.fontSize = "1.5rem"
    heart.style.pointerEvents = "none"
    heart.style.zIndex = "1000"
    heart.style.animation = `heartFloat${i} 1s ease-out forwards`

    document.body.appendChild(heart)

    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 1000)
  }

  // Add CSS animations dynamically
  if (!document.getElementById("heart-animations")) {
    const style = document.createElement("style")
    style.id = "heart-animations"
    style.textContent = `
            @keyframes heartFloat0 {
                to { transform: translate(-30px, -50px); opacity: 0; }
            }
            @keyframes heartFloat1 {
                to { transform: translate(30px, -50px); opacity: 0; }
            }
            @keyframes heartFloat2 {
                to { transform: translate(-50px, -30px); opacity: 0; }
            }
            @keyframes heartFloat3 {
                to { transform: translate(50px, -30px); opacity: 0; }
            }
            @keyframes heartFloat4 {
                to { transform: translate(0px, -70px); opacity: 0; }
            }
        `
    document.head.appendChild(style)
  }
}

// Reveal letter after 11 clicks
function revealLetter(pageNumber) {
  const giftContainer = document.getElementById(`gift-container-${pageNumber}`)
  const letter = document.getElementById(`letter-${pageNumber}`)

  // Hide gift box and counter with fade out
  giftContainer.style.transition = "opacity 0.5s ease-out"
  giftContainer.style.opacity = "0"

  setTimeout(() => {
    giftContainer.style.display = "none"
    letter.style.display = "block"

    // Create confetti effect
    createConfetti()

    // Play success sound (if audio is available)
    playSuccessSound()
  }, 500)
}

// Create confetti effect
function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container")
  const colors = ["#ff1493", "#ff69b4", "#ffb3d9", "#b3d9ff", "#ccf2ff"]

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = Math.random() * 100 + "vw"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.animationDelay = Math.random() * 2 + "s"
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s"

    confettiContainer.appendChild(confetti)

    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti)
      }
    }, 4000)
  }
}

// Create floating hearts for final page
function createFloatingHearts() {
  const heartsContainer = document.querySelector(".floating-hearts")
  if (!heartsContainer) return

  // Clear existing hearts
  heartsContainer.innerHTML = ""

  // Create multiple floating hearts
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div")
    heart.textContent = "💗"
    heart.style.position = "absolute"
    heart.style.fontSize = Math.random() * 20 + 20 + "px"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.animationDelay = Math.random() * 6 + "s"
    heart.style.animationDuration = Math.random() * 4 + 4 + "s"
    heart.style.animation = "floatHeart 8s ease-in-out infinite"
    heart.style.opacity = Math.random() * 0.5 + 0.3

    heartsContainer.appendChild(heart)
  }
}

// Play success sound (placeholder - you can add actual audio files)
function playSuccessSound() {
  // Create audio context for a simple success tone
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (e) {
    // Audio not supported or blocked
    console.log("Audio not available")
  }
}

// Add button click effects
document.addEventListener("DOMContentLoaded", () => {
  // Add heart burst effect to all buttons
  const buttons = document.querySelectorAll(".magical-button, .nav-button")
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      createButtonHeartBurst(e.target)
    })
  })
})

// Create heart burst for buttons
function createButtonHeartBurst(button) {
  const rect = button.getBoundingClientRect()
  const hearts = ["💗", "💕", "💖", "💝", "💘"]

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div")
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
    heart.style.position = "fixed"
    heart.style.left = rect.left + rect.width / 2 + "px"
    heart.style.top = rect.top + rect.height / 2 + "px"
    heart.style.fontSize = "1.2rem"
    heart.style.pointerEvents = "none"
    heart.style.zIndex = "1001"
    heart.style.color = "#ff1493"

    const angle = (i / 8) * Math.PI * 2
    const distance = 50
    const endX = Math.cos(angle) * distance
    const endY = Math.sin(angle) * distance

    heart.style.animation = `buttonHeart${i} 0.8s ease-out forwards`

    // Add dynamic keyframes
    const keyframes = `
            @keyframes buttonHeart${i} {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                50% { transform: translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1); opacity: 1; }
                100% { transform: translate(calc(-50% + ${endX * 1.5}px), calc(-50% + ${endY * 1.5}px)) scale(0); opacity: 0; }
            }
        `

    if (!document.getElementById(`button-heart-${i}`)) {
      const style = document.createElement("style")
      style.id = `button-heart-${i}`
      style.textContent = keyframes
      document.head.appendChild(style)
    }

    document.body.appendChild(heart)

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 800)
  }
}

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  // Show the intro page by default
  goToPage(0)

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    const currentPage = document.querySelector(".page.active")
    if (!currentPage) return

    const currentPageNumber = Number.parseInt(currentPage.id.split("-")[1])

    if (e.key === "ArrowLeft" && currentPageNumber > 0) {
      goToPage(currentPageNumber - 1)
    } else if (e.key === "ArrowRight" && currentPageNumber < 17) {
      goToPage(currentPageNumber + 1)
    }
  })
})

// Cursor Heart Trail
let mouseX = 0
let mouseY = 0
let heartTrailTimeout

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  // Throttle heart creation to avoid too many hearts
  clearTimeout(heartTrailTimeout)
  heartTrailTimeout = setTimeout(() => {
    createCursorHeart(mouseX, mouseY)
  }, 50)
})

// Create heart at cursor position
function createCursorHeart(x, y) {
  const hearts = ["💗", "💕", "💖", "💝", "💘", "❤️"]
  const heart = document.createElement("div")

  heart.className = "cursor-heart"
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
  heart.style.left = x - 10 + "px"
  heart.style.top = y - 10 + "px"

  // Add slight random offset for more natural look
  const randomX = (Math.random() - 0.5) * 20
  const randomY = (Math.random() - 0.5) * 20
  heart.style.transform = `translate(${randomX}px, ${randomY}px)`

  document.body.appendChild(heart)

  // Remove heart after animation completes
  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart)
    }
  }, 1500)
}

// Enhanced cursor trail for special pages
function createEnhancedCursorTrail(x, y) {
  // Create multiple hearts for more dramatic effect on special pages
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createCursorHeart(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30)
    }, i * 100)
  }
}

// Add enhanced trail on final page
document.addEventListener("mousemove", (e) => {
  const currentPage = document.querySelector(".page.active")
  if (currentPage && currentPage.id === "page-17") {
    // More hearts on the final page!
    if (Math.random() < 0.3) {
      // 30% chance for extra hearts
      createEnhancedCursorTrail(e.clientX, e.clientY)
    }
  }
})

// Add cursor trail to buttons for extra magic
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".magical-button, .nav-button")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
      const rect = e.target.getBoundingClientRect()
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createCursorHeart(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width,
            rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height,
          )
        }, i * 50)
      }
    })
  })
})
