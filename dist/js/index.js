const popoverTriggerList=document.querySelectorAll('[data-bs-toggle="popover"]'),popoverList=[...popoverTriggerList].map(e=>new bootstrap.Popover(e));$(document).ready(function(){var e="ouibounceModalClosed";function t(){localStorage.setItem(e,"true")}function o(){return!("true"===localStorage.getItem(e))}$(document).mouseleave(function(){o()&&($("#ouibounceModal").modal("show"),t())}),$("#ouibounceModal").on("hidden.bs.modal",function(){t()}),$(window).on("beforeunload",function(){localStorage.removeItem(e)})}),function(e){e(function(){var t=e(".slider").flickity({imagesLoaded:!0,percentPosition:!1,prevNextButtons:!1,initialIndex:0,pageDots:!1,groupCells:1,selectedAttraction:.2,friction:.8,draggable:!0});t.on("staticClick.flickity",function(e,o,i,n){"number"==typeof n&&t.flickity("selectCell",n)});var o=t.data("flickity");o.selectedElement.classList.add("is-custom-selected"),o.resize(),o.reposition();let i=0;requestAnimationFrame(function t(){o.reposition(),i++<10?requestAnimationFrame(t):e(".flickity-prev-next-button").css("pointer-events","auto")}),o.on("settle",()=>{e(".card").removeClass("is-custom-selected"),e(".flickity-prev-next-button").css("pointer-events","none"),o.selectedElement.classList.add("is-custom-selected"),e("#bookTitle").text(o.selectedElement.firstElementChild.attributes["data-book"].value);let t=0;requestAnimationFrame(function i(){o.reposition(),t++<10?requestAnimationFrame(i):e(".flickity-prev-next-button").css("pointer-events","auto")})}),e(".carousel").addClass("animation-reveal"),e(".carousel").css("opacity","1"),o.resize(),o.reposition(),setTimeout(()=>{e(".carousel").removeClass("animation-reveal"),e(".carousel").css("opacity","1"),o.resize(),o.reposition();let t=0;requestAnimationFrame(function e(){o.reposition(),t++<10&&requestAnimationFrame(e)})},300)})}(jQuery);