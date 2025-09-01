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