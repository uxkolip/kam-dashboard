const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

$(document).ready(function() {
  //console.log('Ready!');

    var modalClosedKey = 'ouibounceModalClosed';

    function isModalClosed() {
        return localStorage.getItem(modalClosedKey) === 'true';
    }

    function setModalClosed() {
        localStorage.setItem(modalClosedKey, 'true');
    }

    function shouldTriggerModal() {
        return !isModalClosed();
    }

    function triggerModal() {
        $('#ouibounceModal').modal('show');
        // You can replace 'show' with any other method depending on your modal library.
    }

    $(document).mouseleave(function() {
        if (shouldTriggerModal()) {
            triggerModal();
            setModalClosed();
        }
    });

    $('#ouibounceModal').on('hidden.bs.modal', function() {
        setModalClosed();
    });

    // Clear modal closed status on page refresh
    $(window).on('beforeunload', function() {
        localStorage.removeItem(modalClosedKey);
    });


});


/*Sliding carousel from https://codepen.io/RaduBratan/pen/GRoryXm */

(function ($) {
  $(function () {
    var slider = $(".slider").flickity({
      imagesLoaded: true,
      percentPosition: false,
      prevNextButtons: false, //true = enable on-screen arrows
      initialIndex: 0,
      pageDots: false, //true = enable on-screen dots
      groupCells: 1,
      selectedAttraction: 0.2,
      friction: 0.8,
      draggable: true //false = disable dragging
    });

    //this enables clicking on cards
    slider.on(
      "staticClick.flickity",
      function (event, pointer, cellElement, cellIndex) {
        if (typeof cellIndex == "number") {
          slider.flickity("selectCell", cellIndex);
        }
      }
    );

    //this resizes the cards and centers the carousel; the latter tends to move a few pixels to the right if .resize() and .reposition() aren't used
    var flkty = slider.data("flickity");
    flkty.selectedElement.classList.add("is-custom-selected");
    flkty.resize();
    flkty.reposition();
    let time = 0;
    function reposition() {
      flkty.reposition();
      if (time++ < 10) {
        requestAnimationFrame(reposition);
      } else {
        $(".flickity-prev-next-button").css("pointer-events", "auto");
      }
    }
    requestAnimationFrame(reposition);

    //this expands the cards when in focus
    flkty.on("settle", () => {
      $(".card").removeClass("is-custom-selected");
      $(".flickity-prev-next-button").css("pointer-events", "none");
      flkty.selectedElement.classList.add("is-custom-selected");

      $("#bookTitle").text(flkty.selectedElement.firstElementChild.attributes['data-book'].value);

      let time = 0;
      function reposition() {
        flkty.reposition();
        if (time++ < 10) {
          requestAnimationFrame(reposition);
        } else {
          $(".flickity-prev-next-button").css("pointer-events", "auto");
        }
      }
            
      requestAnimationFrame(reposition);

    });

    //this reveals the carousel when the user loads / reloads the page
    $(".carousel").addClass("animation-reveal");
    $(".carousel").css("opacity", "1");
    flkty.resize();
    flkty.reposition();
    setTimeout(() => {
      $(".carousel").removeClass("animation-reveal");
      $(".carousel").css("opacity", "1");
      flkty.resize();
      flkty.reposition();
      let time = 0;
      function reposition() {
        flkty.reposition();
        if (time++ < 10) {
          requestAnimationFrame(reposition);
        }
      }
      requestAnimationFrame(reposition);
    }, 300);
  });
})(jQuery);
