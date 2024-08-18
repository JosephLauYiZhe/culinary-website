$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll', function () {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 60) {
            $('header .header-2').addClass('header-active');
        } else {
            $('header .header-2').removeClass('header-active');
        }

        $('section').each(function () {

            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('.controls .buttons').click(function () {

        $(this).addClass('button-active').siblings().removeClass('button-active');

        let filter = $(this).attr('data-filter');
        if (filter == 'all') {
            $('.Malaysia .image').show(400);
        } else {
            $('.Malaysia .image').not('.' + filter).hide(200);
            $('.Malaysia .image').filter('.' + filter).show(400);
        }

    });

});

document.querySelector("#search-icon").onclick = () => {
    document.querySelector("#search-form").classList.toggle("active");
}

document.querySelector("#close").onclick = () => {
    document.querySelector("#search-form").classList.remove("active");
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');

    // Check if user is logged in
    if (sessionStorage.getItem('IsLoggedIn') === 'true') {
        // Retrieve the username from session storage
        const username = sessionStorage.getItem('username') || 'User';

        // Update the login link text to welcome the user
        loginLink.textContent = `Welcome, ${username}`;

        // Optionally, redirect or change the href to a user-specific page
        loginLink.href = '#'; // You can set this to a profile page or a logout link
    } else {
        // If not logged in, ensure the link points to login.html
        loginLink.href = 'login.html';
    }
});
