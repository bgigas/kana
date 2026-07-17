const charactersPerPage = 170;

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

$(document).ready(function () {
	$("#btnUpdate").click(updateForm);

	$("input[name=charsystem]").change(updateForm);
	$("input[name=charrow]").change(updateForm);
	$("input[name=numpages]").change(updateForm);

	updateForm();
});

function getSelectedCharacters() {
	const selectedSystem =
		$("input[name=charsystem]:checked").val();

	const selectedRows = $("input[name=charrow]:checked")
		.map(function () {
			return this.value;
		})
		.get();

	let selectedCharacters = [];

	selectedRows.forEach(function (row) {
		selectedCharacters =
			selectedCharacters.concat(
				characterRows[selectedSystem][row]
			);
	});

	return selectedCharacters;
}

/*
 * Creates a shuffled copy of an array.
 * The original array remains unchanged.
 */
function shuffleCharacters(characters) {
	const shuffled = characters.slice();

	for (let i = shuffled.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(
			Math.random() * (i + 1)
		);

		const temporaryCharacter = shuffled[i];

		shuffled[i] = shuffled[randomIndex];
		shuffled[randomIndex] = temporaryCharacter;
	}

	return shuffled;
}

function updateForm() {
	const output = document.getElementById("output");

	const numPages = Math.max(
		1,
		parseInt(
			$("input[name=numpages]").val(),
			10
		) || 1
	);

	const selectedCharacters =
		getSelectedCharacters();

	if (selectedCharacters.length === 0) {
		output.style.height = "auto";

		output.innerHTML =
			"<span class='output-message'>" +
			"Select at least one character line." +
			"</span>";

		return;
	}

	const outputCharacters = [];

	/*
	 * The bag contains one copy of every selected
	 * character in randomized order.
	 */
	let characterBag = [];

	for (
		let i = 0;
		i < charactersPerPage * numPages;
		i++
	) {
		/*
		 * Once the bag is empty, refill it with every
		 * selected character and shuffle it again.
		 */
		if (characterBag.length === 0) {
			characterBag =
				shuffleCharacters(
					selectedCharacters
				);
		}

		/*
		 * Remove and use one character from the bag.
		 */
		const character = characterBag.pop();

		outputCharacters.push(
			"<span class='grid'>" +
			character +
			"<div class='gridsection'></div>" +
			"</span>"
		);
	}

	output.style.height =
		numPages * 100 + "vh";

	output.innerHTML =
		outputCharacters.join(" ");
}
