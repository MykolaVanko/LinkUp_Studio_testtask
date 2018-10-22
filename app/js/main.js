let feedbackContainer = $('.feedback-slider-container');

function swipeRight() {
    let curent = $('.feedback-slider-container').find('.feedback_absolute');
    if (curent.next().length > 0) {
        curent.toggleClass('feedback_absolute transform');
        curent.next().toggleClass('feedback_absolute transform');
        curent.prev().toggleClass('feedback-container hidden transform');
        curent.next().next().toggleClass('feedback-container hidden transform');
        if (!curent.index(0)) {
            feedbackContainer.removeClass('flex-end')
        }
    }
}

function swipeLeft() {
    let curent = $('.feedback-slider-container').find('.feedback_absolute');
    if (curent.prev().length > 0) {
        curent.toggleClass('feedback_absolute transform');
        curent.next().toggleClass('feedback-container hidden transform');
        curent.prev().toggleClass('feedback_absolute transform');
        curent.prev().prev().toggleClass('feedback-container hidden transform');
        if (curent.index(0)) {
            feedbackContainer.addClass('flex-end')
        }
    }
}

////swipe events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    xDown = getTouches(evt)[0].clientX;
    yDown = getTouches(evt)[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

//choose image
$('#img').change(function () {
    $('.leave-feedback-photo img').remove();
    var input = $(this)[0];
    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.srcElement.result);
                console.log(e.target.result);
                $('.leave-feedback-photo').append('<img src="' + e.target.result + '"/>');
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            console.log('Error1');
        }
    } else {
        console.log('Error2');
    }
});

//cancel feedback
function clearFeedback() {
    $('.leave-feedback-photo img').remove();
    $('.feedback-name-position').val('');
    $('.leave-feedback-text textarea').val('')
}

//add feedback
$('.add-feeedback').on('click', function () {
    let img = $('.leave-feedback-photo img').attr('src');
    let name = $('#name').val();
    let email = $('#email').val();
    let feedback = $('#new_feedback').val();
    if (name === '' || email === '' || feedback === '') {
        return false
    } else if (/^[A-Za-z\s]+$/.test(name) && /\S+@\S+\.\S+/.test(email)) {
        let feedbackDescription = $('<div class="feedback-text"></div>')
            .append('<p>' + feedback + '</p>');
        let userName = $('<div class="feedback-user_name"></div>')
            .append('<p>' + name + '</p>')
            .append('<p>' + email + '</p>');

        let userImage = $('<div class="feedback-photo"></div>')
            .append('<div class="img_container"><img src="' + img + '"></div>');

        let newFeedback = $('<div class="hidden"></div>')
            .append(userImage)
            .append(feedbackDescription)
            .append(userName);
        $('.feedback-slider-container').append(newFeedback);
        clearFeedback()
    }
});
