//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});

//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// Слайдер отзывов
const reviewsSlider = new Swiper('.js-reviews-slider',
{
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	navigation: {
		nextEl: '.js-reviews-slider-next',
		prevEl: '.js-reviews-slider-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
	},
});

// Слайдер видео
const videoSlider = new Swiper('.js-video-slider',
{
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	navigation: {
		nextEl: '.js-video-slider-next',
		prevEl: '.js-video-slider-prev',
	},
	breakpoints: {
		992: {
			slidesPerView: 4,
		},
		768: {
			slidesPerView: 3,
		},
	},
});

// Слайдер галереи
const gallerySlider = new Swiper('.js-gallery-slider',
{
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	navigation: {
		nextEl: '.js-gallery-slider-next',
		prevEl: '.js-gallery-slider-prev',
	},
	breakpoints: {
		992: {
			slidesPerView: 4,
		},
		768: {
			slidesPerView: 3,
		},
	},
});

// Слайдер преимуществ
const advantSlider = new Swiper('.js-advant-slider',
{
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	navigation: {
		nextEl: '.js-advant-slider-next',
		prevEl: '.js-advant-slider-prev',
	},
});

// Переключение полей соц. сетей
document.querySelectorAll('.js-select-social-btn').forEach(function(elem){
	elem.addEventListener('click', function(){
		toggleFields(elem);
	})

	function toggleFields(elem) {
		let nameField = elem.getAttribute('data-name');
		let parent = elem.closest('.js-select-social');

		parent.querySelectorAll('.js-select-social-btn').forEach(function(item){
			item.classList.remove('active');
		});

		elem.classList.add('active');

		parent.querySelectorAll('.js-select-social-field').forEach(function(item){
			item.classList.remove('active');
		});

		parent.querySelector('.js-select-social-field[data-name="'+nameField+'"]').classList.add('active');
	}
});

//Открыть мобильное меню
if(document.querySelector('.js-btn-open-menu')){
	document.querySelector('.js-btn-open-menu').addEventListener('click', function(){
		document.querySelector('.js-header-menu').classList.add('open');
	})
}

//Закрыть мобильное меню
if(document.querySelector('.js-btn-close-menu')){
	document.querySelector('.js-btn-close-menu').addEventListener('click', function(){
		document.querySelector('.js-header-menu').classList.remove('open');
	})
}

// Плавный переход к ссылке
if (document.querySelector('.js-link-move')) {
	document.querySelectorAll(".js-link-move").forEach(function(btn){
		btn.onclick = function(event){
			event.preventDefault();
			const id = btn.getAttribute('href');

			if (document.querySelector('#'+id)) {
				document.querySelector('#'+id).scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	});
}

//Открытие попапов при клике по крестикам на картинке
if (document.querySelector('.js-img-complect-btn')) {
	document.querySelectorAll('.js-img-complect-btn').forEach(function(btn){
		btn.onclick = function(event){
			event.preventDefault();

			let itemImg = btn.closest('.js-img-complect-item');
			let popupImg = itemImg.querySelector('.js-img-complect-popup');

			document.querySelectorAll('.js-img-complect-popup').forEach(function(popup){
				popup.classList.remove('active');
			});

			popupImg.classList.add('active');
		}
	});
}

// Обработчик отправки формы
document.querySelectorAll('.js-form-site').forEach(function(form){
	form.addEventListener('submit', function(e) {
		e.preventDefault(); // Предотвращаем стандартную отправку

		const textInputs = form.querySelectorAll('input[type="text"]');
		const hasTextData = Array.from(textInputs).some(input => 
			input.value.trim() !== ''
		);

		console.log('Есть данные в текстовых полях:', hasTextData);

		if (!hasTextData) {
			console.log('Блокируем отправку - нет данных');
			// alert('Заполните текстовые поля!');
			return; // Прерываем выполнение
		}else{
			// Создаем FormData из формы
			const formData = new FormData(this);
			
			// Отправляем данные на сервер
			fetch('send_email.php', {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					// 1. Очищаем форму
					this.reset();
					
					// 2. Закрываем текущее окно Fancybox (если форма в нем)
					Fancybox.close();
					
					// 3. Показываем окно успеха через Fancybox
					setTimeout(() => {
						Fancybox.show(
							[{ src: "#msg-success", type: "inline" }],
							{
								dragToClose: false,
								closeButton: true,
								// mainClass: "fancybox-success",
							}
						);
					}, 300);
					
				} else {
					alert('Ошибка: ' + data.message);
				}
			})
			.catch(error => {
				console.error('Error:', error);
				alert('Произошла ошибка при отправке формы');
			});
		}
	});
});

// Стрелка наверх
if (document.querySelector('.js-move-up')) {
	const scrollToTopBtn = document.querySelector('.js-move-up');

	// Функция для показа/скрытия кнопки
	function toggleScrollButton() {
		if (window.pageYOffset > 300) {
			scrollToTopBtn.classList.add('visible');
		} else {
			scrollToTopBtn.classList.remove('visible');
		}
	}
	
	// Функция для прокрутки наверх
	function scrollToTop() {
		window.scrollTo({
		top: 0,
		behavior: 'smooth'
		});
	}
	
	// Слушаем событие прокрутки
	window.addEventListener('scroll', toggleScrollButton);
	
	// Добавляем обработчик клика
	scrollToTopBtn.addEventListener('click', scrollToTop);
}
