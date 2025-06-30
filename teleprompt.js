window.addEventListener("load", ()=>{
	const fontSizeSlider = document.getElementById('fontSizeSlider');
	const fontSizeValue = document.getElementById('fontSizeValue');
	const prompter = document.getElementById('prompter');
	fontSizeSlider.addEventListener('input', () => {
		const size = fontSizeSlider.value;
		fontSizeValue.textContent = size;
		prompter.style.fontSize = size + 'px';
	});

	const script = document.getElementById('scriptInput');
	const content = document.getElementById('content');
	script.addEventListener("change", ()=>{
		content.innerHTML = `<p>${script.value.replace(/\n/g, '<br>')}</p>`;
	})

	const startButton = document.getElementById("btn-start");
	startButton.addEventListener("click", startTeleprompter);
});

function startTeleprompter() {
	const contentDiv = document.getElementById('content');
	const prompter = document.getElementById('prompter');
	const duration = parseFloat(document.getElementById('duration').value) * 1000;
	const script = document.getElementById('scriptInput');
	let startTime = null;

	if (!script || isNaN(duration) || duration <= 0) {
		alert("Please enter a script and a valid duration.");
		return;
	}

	prompter.scrollIntoView({ behavior: "smooth" });

	let animationFrameId = null;
	setTimeout(() => {
		const scrollDistance = contentDiv.offsetHeight - prompter.offsetHeight;

		if (scrollDistance <= 0) return;

		const scrollSpeed = scrollDistance / duration;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const scrollTop = Math.min(scrollSpeed * elapsed, scrollDistance);
			contentDiv.style.top = `-${scrollTop}px`;

			if (scrollTop < scrollDistance) {
				animationFrameId = requestAnimationFrame(step);
			}
		}

		animationFrameId = requestAnimationFrame(step);
	}, 100);
}
