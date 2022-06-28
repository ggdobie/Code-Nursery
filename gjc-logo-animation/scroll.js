const logo = document.getElementById("svg-logo")
const bg = document.getElementById("bg")
const bannerText = document.querySelector(".banner p")

// const bg = document.getElementsByClassName("bg")

// console.log(bannerText)

const logoElements = []



logo.addEventListener("load",function(){

	// get the inner DOM of the svg
	const svgDoc = logo.contentDocument
	
	// get the inner elements by id and add them to the global array
	logoElements.push(svgDoc.getElementById("Glasgow"))
	logoElements.push(svgDoc.getElementById("Juggling"))
	logoElements.push(svgDoc.getElementById("Club"))
	
	addScrollBehaviour()
	
})


function addScrollBehaviour(){

	let element = null

	for(element in logoElements){
		logoElements[element].style.transformOrigin = '50% 50%'
	}	
	
	document.addEventListener("scroll", function(){
		
		const fullRotation = 360
		let elementIndex = 0
		
		// calculate the amount scrolled as a decimal from 0 to 1
		const scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
		
		for(element in logoElements){		
			elementIndex += 1
			
			// rotate each element by a multiple of 360 × the scroll position
			logoElements[element].style.transform = 'rotate(' + (scrollPosition * (0 - fullRotation) * elementIndex) + 'deg)';
		}

		bg.style.transform = 'rotate(' + (scrollPosition * 40) + 'deg) translate(-50%, -50%)';
		bannerText.style.transform = 'translate(' + (0-(scrollPosition * 65)) + '%)';

		
	})
}
