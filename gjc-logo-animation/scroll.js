const logo = document.getElementById("svg-logo")

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
			logoElements[element].style.transform = 'rotate(' + (scrollPosition * (1 - fullRotation) * elementIndex) + 'deg)';
		}
	})
}
