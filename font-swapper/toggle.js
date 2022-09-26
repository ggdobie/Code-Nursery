const fontToggleArea = document.querySelector(".container")
const fontTextArea = document.querySelector(".text-area")

fontToggleArea.addEventListener("mousedown", function() {    
	fontTextArea.classList.add("default-font")
	fontTextArea.classList.remove("custom-font")
})

fontToggleArea.addEventListener("mouseup", function() {    
	fontTextArea.classList.remove("default-font")
	fontTextArea.classList.add("custom-font")
})