const minInput = $("input[name=min-input]");
const secInput = $("input[name=sec-input]");
const enterBtn = $(".enter-button");
const clock = $(".countdown");
const minutes = $(".minutes");
const seconds = $(".seconds");
const plus = $(".plus");
const minus = $(".minus");
const start = $(".start");
const message = $(".message");
const wrapper = $(".bomb-wrapper");
const buttons = $(".buttons");

let min = 0;
let sec = 0;

//добавляем ноль перед однозначным числом
const checkLength = (value) =>{
	if (value.length < 1) {
		return '00';
	}
	else if (value.length < 2) {
		return 0 + value;
	}
	return value;
}

const updateText = () =>{
	minutes.text(checkLength(String(min)));
	seconds.text(checkLength(String(sec)));
}
updateText();

const countDown = () =>{
	let total = min + sec;
	const timeinterval = setTimeout(countDown, 1000);
	if (total <= 0) {
		clearTimeout(timeinterval);
		clock.css('display', 'none');
		buttons.css('display', 'none');
		wrapper.css('background-image', 'url(./img/explosion.png)');
		message.html('<p>BOOM!</p>');
		return;
	}
	if (sec > 0) {
		sec--;
	}
	else {
		sec = 59;
		min--;
	}
	updateText();
}

plus.click(function() {
	if(sec == 59) {
		min++;
		sec = 0;
	}
	else {
		sec++;
	}
	updateText();
});

minus.click(function() {
	if (sec > 0) {
		sec--;
	}
	else if (min > 0) {
		min--;
		sec = 59;
	}
	updateText();
});

start.click(function() {
	countDown();
});

//переносим введенные пользователем числа из формы при нажатии enter
function handleEnterBtn(event) {
    min = minInput.val();
    sec = secInput.val();
    updateText();
    event.preventDefault();
}

enterBtn.click(handleEnterBtn);