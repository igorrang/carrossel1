const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDraginStart = false,isDraggin = false, prevPageX, prevScrollLeft,positionDiff;



const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        if (icon.id == "left") {
            carousel.scrollLeft -= firstImgWidth;
        } else {
            carousel.scrollLeft += firstImgWidth;
        }
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () =>{
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
    
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDiffernce = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
       if(positionDiff > firstImgWidth / 3){
        carousel.scrollLeft += valDiffernce;
       }else{
            carousel.scrollLeft -= positionDiff
       }
   
}

}
const dragStart = (e) => {
    isDraginStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    showHideIcons();
}

const draggin = (e) => {
    if (!isDraginStart) return;
    e.preventDefault();
    isDraggin = true, 
    carousel.classList.add("draggin");
     positionDiff =( e.pageX ||e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDraginStart = false;
    carousel.classList.remove("draggin");
    
    if(!isDraggin )return;
    isDraggin = false;
    autoSlide();

}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", draggin);
carousel.addEventListener("touchmove", draggin);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave",dragStop)
carousel.addEventListener("touchend",dragStop)