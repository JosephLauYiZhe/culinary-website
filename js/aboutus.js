document.getElementById('read-more-btn').addEventListener('click', function () {
    var hiddenParagraphs = document.querySelectorAll('.about-text .hide');
    var button = document.getElementById('read-more-btn');

    if (hiddenParagraphs[0].style.display === 'none') {
        hiddenParagraphs.forEach(function (paragraph) {
            paragraph.style.display = 'block';
        });
        button.textContent = 'Read Less';
    } else {
        hiddenParagraphs.forEach(function (paragraph) {
            paragraph.style.display = 'none';
        });
        button.textContent = 'Read More';
    }
});