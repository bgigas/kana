const CHARACTERS_PER_PAGE = 180;

const characterRows = {
	romaji: {
		a: ["a", "i", "u", "e", "o"],
		k: ["ka", "ki", "ku", "ke", "ko"],
		s: ["sa", "shi", "su", "se", "so"],
		t: ["ta", "chi", "tsu", "te", "to"],
		n: ["na", "ni", "nu", "ne", "no"],
		h: ["ha", "hi", "fu", "he", "ho"],
		m: ["ma", "mi", "mu", "me", "mo"],
		y: ["ya", "yu", "yo"],
		r: ["ra", "ri", "ru", "re", "ro"],
		w: ["wa", "wo", "n"]
	},
	hiragana: {
		a: ["あ", "い", "う", "え", "お"],
		k: ["か", "き", "く", "け", "こ"],
		s: ["さ", "し", "す", "せ", "そ"],
		t: ["た", "ち", "つ", "て", "と"],
		n: ["な", "に", "ぬ", "ね", "の"],
		h: ["は", "ひ", "ふ", "へ", "ほ"],
		m: ["ま", "み", "む", "め", "も"],
		y: ["や", "ゆ", "よ"],
		r: ["ら", "り", "る", "れ", "ろ"],
		w: ["わ", "を", "ん"]
	},
	katakana: {
		a: ["ア", "イ", "ウ", "エ", "オ"],
		k: ["カ", "キ", "ク", "ケ", "コ"],
		s: ["サ", "シ", "ス", "セ", "ソ"],
		t: ["タ", "チ", "ツ", "テ", "ト"],
		n: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
		h: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
		m: ["マ", "ミ", "ム", "メ", "モ"],
		y: ["ヤ", "ユ", "ヨ"],
		r: ["ラ", "リ", "ル", "レ", "ロ"],
		w: ["ワ", "ヲ", "ン"]
	}
};

const output = document.querySelector("#output");
const updateButton = document.querySelector("#update-button");
const printButton = document.querySelector("#print-button");
const pageCountInput = document.querySelector('input[name="page-count"]');
const systemInputs = document.querySelectorAll('input[name="character-system"]');
const rowInputs = document.querySelectorAll('input[name="character-row"]');

function getSelectedSystem() {
	return document.querySelector('input[name="character-system"]:checked').value;
}

function getSelectedRows() {
	return Array.from(
		document.querySelectorAll('input[name="character-row"]:checked'),
		input => input.value
	);
}

function getSelectedCharacters() {
	const system = getSelectedSystem();
	const rows = getSelectedRows();
	return rows.flatMap(row => characterRows[system][row] ?? []);
}

function getPageCount() {
	const requestedPages = Number.parseInt(pageCountInput.value, 10);
	if (!Number.isFinite(requestedPages)) return 1;
	return Math.min(30, Math.max(1, requestedPages));
}

function randomCharacter(characters) {
	const randomIndex = Math.floor(Math.random() * characters.length);
	return characters[randomIndex];
}

function createPracticePage(characters) {
	const page = document.createElement("section");
	page.className = "practice-page";
	page.setAttribute("aria-label", "Printable character practice page");

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < CHARACTERS_PER_PAGE; i += 1) {
		const cell = document.createElement("span");
		cell.className = "grid";
		cell.textContent = randomCharacter(characters);
		fragment.appendChild(cell);
	}

	page.appendChild(fragment);
	return page;
}

function showMessage(message) {
	output.replaceChildren();
	const paragraph = document.createElement("p");
	paragraph.className = "message";
	paragraph.textContent = message;
	output.appendChild(paragraph);
}

function updateForm() {
	const characters = getSelectedCharacters();
	const pageCount = getPageCount();
	pageCountInput.value = String(pageCount);

	if (characters.length === 0) {
		showMessage("Select at least one character line.");
		return;
	}

	const pages = document.createDocumentFragment();
	for (let pageNumber = 0; pageNumber < pageCount; pageNumber += 1) {
		pages.appendChild(createPracticePage(characters));
	}
	output.replaceChildren(pages);
}

updateButton.addEventListener("click", updateForm);
printButton.addEventListener("click", () => window.print());
systemInputs.forEach(input => input.addEventListener("change", updateForm));
rowInputs.forEach(input => input.addEventListener("change", updateForm));
pageCountInput.addEventListener("change", updateForm);

updateForm();
