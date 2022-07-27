const sectionTag =document.querySelector(".client-list") 
const logoContainer = document.querySelector(".logo-grid-container")
const logoRows = document.querySelectorAll(".client-logo-row")

function clamp(input, min, max) {
  return Math.max(min, Math.min(input, max))
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function mapAndClamp(value, low1, high1, low2, high2) {
  return clamp(
	map(value, low1, high1, low2, high2),
	Math.min(low2, high2), 
	Math.max(low2, high2)
  )
}

const fadeAndMoveLogos = function() {
	const scrollY = window.pageYOffset
	
	const sectionY = sectionTag.offsetTop
	const sectionHeight = sectionTag.getBoundingClientRect().height
	
	const containerWidth = logoContainer.offsetWidth
	const containerYPos = logoContainer.getBoundingClientRect().top
	const containerXPos = logoContainer.getBoundingClientRect().left
		
	logoRows.forEach((logoRow, index) => {
		
		const rowWidth = logoRow.getBoundingClientRect().width
		
		// ADD HARDCODED DELAYS TO MIDDLE AND TOP ROWS
		if (index == 1 || index == 2 ) {
			delay = 0.9
		}
		else {
			delay = 1.5
		}
		
		// CHECK WHETHER THE SECTION IS VISIBLE IN THE VIEWPORT
		if (scrollY > (sectionY - sectionHeight) && scrollY < (sectionY + sectionHeight)) {
			
			// MAP THE EXTREMES OF THE SCROLL Y TO RELATIVE X POSITIONS
			movement = mapAndClamp(scrollY, sectionY - window.innerHeight, sectionY + window.innerHeight, 0 - (rowWidth / 4), (rowWidth / 4))
			
			// REVERSE DIRECTION OF  EVERY SECOND ROW
			if (index % 2 === 0) {
				movement = 0 - movement
			}
			
			// MOVE THE ROWS
			logoRow.style.transform = `translateX(${movement * delay}px)`
		}
		
		
		
		// FADE LOGOS DEPENDING ON THEIR PROXIMITY TO THE CENTRE
		const logos = logoRow.querySelectorAll("img")
		
		logos.forEach((logo) => {
			
			const fadeSeverity = 0.7
			
			const logoCenter = logo.getBoundingClientRect().width / 2	
			
			// GET THE POSITION OF THE LOGO RELATIVE TO THE CONTAINER
			logoRelXPos = (logo.getBoundingClientRect().left - containerXPos) - (containerWidth*0.5)
			logoDelta = logoRelXPos + logoCenter
			
			// CONVERT NEGATIVE INTEGERS TO POSITIVE
			if (logoDelta < 0) {
				logoDelta = 0 - logoDelta
			}
			
			targetOpacity = mapAndClamp(logoDelta, 0, containerWidth * fadeSeverity, 1, 0)
			logo.style.opacity = targetOpacity
			
		})
		
	})	
}

document.addEventListener("scroll", function(){
	fadeAndMoveLogos()
})
document.addEventListener("resize", function(){
	fadeAndMoveLogos()
})
