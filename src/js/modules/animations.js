export function toggleBurgerMenu() {
	const btn = document.querySelector('.header__nav_btn');
	btn.addEventListener('click', () => {
		btn.classList.toggle('open');
	})
}