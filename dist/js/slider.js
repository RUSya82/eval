$(document).ready(function(){
    let numSlick = 0;
    let body = $('body');
    let scroll = calcScroll();

    let fade = $('.modal-recomended-fade');
    let popup_fade = $('.popup_fade');
    let modal = $('.modal-recomended');
    let modal_close = $('.modal__close-btn');
    let modal_alone = $('.modal-alone');
    let modal_search_fade = $('.modal-search-fade');
    let modal_thanks = $('.modal-thanks');
    let modal_thanks_fade = $('.modal-thanks__fade');
    let new_ad_modal = $('.new-ad');
    let new_ad_fade = $('.new-ad-fade');
    let request_modal = $('.request__modal');
    let request_fade = $('.request__fade');
    let order_button = $('.order-button');

    function calcScroll(){
        let div = document.createElement('div');
        div.style.width = '500px';
        div.style.height = '500px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    $('.slider__main').each(function () {
        numSlick++;
        $(this).addClass( 'slider-' + numSlick ).slick({
            arrows:true, //стрелки
            dots:false,		//точки
            adaptiveHeight: true,	//высота по самому высокому блоку слайда
            slidesToShow:3,		//количество слайдов за раз
            //slidesToScroll: 1    // количество слайдов прокручиваемых за 1 нажатие(умолч 1)
            autoplay:false,
            speed:800,		//скорость пролистывания слайдов
            prevArrow: "<button class=\"slider__prev slider__arrow\"></button>",
            nextArrow: "<button class=\"slider__next slider__arrow\"></button>",
            //easing: linear,			//анимация
            //infinite: true //бесконечность слайдера (умолчиние true)
            //initialSlide: 0    //номер первого слайда
            autoplaySpeed:3000,   //через сколько будет проручиваться сам
            //pauseOnHover: true
            //pauseOnFocus: true
            //pauseOnDotsHover: true
            draggable: true	,	//можно ли перетаскивать слайдер мышкой ( для ПК)
            swipe: true,			//можно ли перелистывать на смартфонах
            touchTrashHold: 3,      //сколько нужно просвайпить на мобилке, чтобы слайер прокрутился
            touchMove: true,		//можно ли передвигать слайд зажав пальцем по экрану(моб)
            //waitForAnimate: true   //как бы пользователь быстро не кликал по стрелочкам, слайдер будет переключаться с потс. скор
            //centerMode: true,   //главный слайд всегда по центру
            variableWidth: false,    //ширина сама не настраивается
            //rows: 1     //число рядов в одном слайде
            responsive:[
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow:2,
                        // arrows:false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow:1,
                        // arrows:false,
                        //centerMode: true,
                    }
                }
            ]
        });
    })

    /**
     * Функция инициализации слайдеров в модальных окнах с рекомендациями
     */
    function initSliders(){
            $('.modal__slider-big').slick({
                arrows:false, //стрелки
                dots:false,		//точки
                adaptiveHeight: true,	//высота по самому высокому блоку слайда
                slidesToShow:1,		//количество слайдов за раз
                autoplay:false,
                speed:800,		//скорость пролистывания слайдов
                autoplaySpeed:3000,   //через сколько будет проручиваться сам
                draggable: true	,	//можно ли перетаскивать слайдер мышкой ( для ПК)
                variableWidth: false,    //ширина сама не настраивается
                fade: true,
                asNavFor: ".modal__slider-small",
            })
            $('.modal__slider-small').slick({
                arrows:true, //стрелки
                dots:false,		//точки
                adaptiveHeight: true,	//высота по самому высокому блоку слайда
                slidesToShow:6,		//количество слайдов за раз
                autoplay:false,
                speed:800,		//скорость пролистывания слайдов
                prevArrow: "<button class=\"modal__arrow-prev\"></button>",
                nextArrow: "<button class=\"modal__arrow-next\"></button>",
                autoplaySpeed:3000,   //через сколько будет проручиваться сам
                draggable: true	,	//можно ли перетаскивать слайдер мышкой ( для ПК)
                swipe: true,			//можно ли перелистывать на смартфонах
                touchTrashHold: 5,      //сколько нужно просвайпить на мобилке, чтобы слайер прокрутился
                touchMove: true,		//можно ли передвигать слайд зажав пальцем по экрану(моб)
                waitForAnimate: true,   //как бы пользователь быстро не кликал по стрелочкам, слайдер будет переключаться с потс. скор
                variableWidth: false,    //ширина сама не настраивается
                asNavFor: ".modal__slider-big",
                focusOnSelect: true,
                responsive:[
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow:5,

                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow:3,

                        }
                    }
                ]
            });
    }
    function uninitSliders() {
        // console.log('uninit');
        $('.modal__slider-big').slick('unslick');
        $('.modal__slider-small').slick('unslick');
    }
    function closeModal(modalName, popUpName){
        popUpName.hide();
        modalName.hide();
        body.css('margin-right', '0px');
        body.removeClass('hidden');

    }
    function showModal(modal, fade){
        body.css('margin-right', scroll + 'px');
        body.addClass('hidden');
        fade.css('display', 'flex');
        modal.fadeIn();
    }

    /**
     * Функция расчета размера модального окна и размера экрана
     * и расчета css свойства align-items для модалки
     * @param modal
     * @returns {string} flex-start или center
     */
    function getFadeFlex(modal){
        let winH = $(window).height();
        let modalH = modal.height();
        return (modalH > winH) ? 'flex-start' : 'center';
    }
    function bindModal(triggerSelector, modalSelector, fadeSelector, sliders){
        let trigger = $(triggerSelector);
        let modal = $(modalSelector);
        let fade = $(fadeSelector);
        trigger.click(async function (e) {
            e.preventDefault();
            await showModal(modal, fade);
            if(sliders){
                await initSliders();
            }
            fade.css('align-items', getFadeFlex(modal));
            fade.click(function (e) {
                if($(e.target).closest(modal).length === 0){
                    closeModal(modal,fade);
                    if(sliders){
                        uninitSliders();
                    }
                }
                return false;
            });
            return false;
        })
    }

    bindModal('.do-you-want_a', new_ad_modal, new_ad_fade, false);
    bindModal('.order-view__button', modal_thanks, modal_thanks_fade, false);
    bindModal('.result__item', modal_alone, modal_search_fade, true);
    bindModal('.slider_recomended', modal, fade, true);

    order_button.click(function (e) {
        let current_modal = $(e.target).closest('.site-modal');
        let current_fade = current_modal.closest('.popup-fade');
        closeModal(current_modal,current_fade);
        if(current_modal.find('.slick-initialized').length !== 0){
            uninitSliders();
        }
        showModal(request_modal,request_fade);
        request_fade.click(function(e) {
            if($(e.target).closest(request_modal).length === 0){
                closeModal(request_modal,request_fade);
            }
        });
        return false;
    });

    modal_close.click(function (e) {
        let current_modal = $(e.target).closest('.site-modal');
        let current_fade = current_modal.closest('.popup-fade');
        closeModal(current_modal,current_fade);
        if(current_modal.find('.slick-initialized').length !== 0){
            uninitSliders();
        }
        return false;
    });

    // Закрытие по клавише Esc.
    $(document).keydown(function(e) {
        let current_modal = $(".site-modal:visible");
        let current_fade = current_modal.closest('.popup-fade');
        if (e.keyCode === 27) {
            if(current_modal.find('.slick-slider').length !== 0){
                uninitSliders();
            }
            closeModal(current_modal,current_fade);
        }
    });

});
