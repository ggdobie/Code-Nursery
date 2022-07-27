const container = document.querySelector(".client-list")
const rows = document.querySelectorAll(".client-logo-row")
const bodyTag = document.querySelector("body")

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

const fadeLogos = function() {
	const containerWidth = container.offsetWidth
	const containerMidPoint = containerWidth / 2
	const containerYPos = container.getBoundingClientRect().top
	const containerXPos = container.getBoundingClientRect().left
	
	rows.forEach((logoRow) => {
		
		const logos = logoRow.querySelectorAll("img")
		logos.forEach((logo) => {
			logoVertCenter = logo.getBoundingClientRect().width / 2	
			logoRelXPos = (logo.getBoundingClientRect().left - containerXPos) - (containerWidth*0.5)
			
			logoDelta = logoRelXPos + logoVertCenter
			
			if(logoDelta < 0) {
				logoDelta = 0 - logoDelta
			}
			
			targetOpacity = mapAndClamp(logoDelta, 0, containerWidth, 1, 0)
			logo.style.opacity = targetOpacity
		})
		
	})	
}

const moveLogos = function() {
	const yPositionTop = window.pageYOffset
	const containerWidth = container.offsetWidth
	const containerXPos = container.getBoundingClientRect().left
	
	const totalHeight = bodyTag.getBoundingClientRect().height - window.innerHeight
	
	movement = mapAndClamp(yPositionTop, 0, totalHeight, 0 - (window.innerWidth), (window.innerWidth / 2))
	
	console.log(movement)
	
	rows.forEach((logoRow, index) => {
		offset = (index + 1) * 0.2
		offset = 0 - offset
		logoRow.style.transform = `translateX(${movement * offset}px)`
		
		// if (index == 0 || index == 3){
		// 	offset = -0.3
		// }
		// else if (index == 1 || index == 2) {
		// 	offset = -0.4
		// }
		
		logoRow.style.transform = `translateX(${(movement * offset)}px)`
	})
	
}

document.addEventListener("scroll", function(){
	moveLogos()
	fadeLogos()
})
document.addEventListener("resize", function(){
	moveLogos()
	fadeLogos()
})

moveLogos()
fadeLogos()
