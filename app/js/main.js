$('.owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    items:1
    
});
(function () {
  'use strict';
  var application = document.getElementById('application');
  var form = document.getElementById('form');
  document.addEventListener('click', main )
  function main  () {
      var t = event.target;
           if (t === application)  {
               form.classList.toggle('show')
           } else if ( t.classList.contains('close')){
            t.parentNode.classList.remove('show')
           } else{
            return
           };
  }
  
document.addEventListener('mousemove', tooltipShow);

var yDef, xDef, x, y, t, showTooltip ;


var time = setInterval( function  () {
    if (t.hasAttribute('data-tooltip') &&
         yDef === y &&  
         xDef === x && 
         !showTooltip ) {
        var  tooltipE = document.createElement('div');
         tooltipE.className = 'tooltip';
        tooltipE.innerHTML = t.getAttribute('data-tooltip');
        document.body.appendChild(tooltipE);
        showTooltip = tooltipE;
        tooltipE.style.top = y + 20 +  'px';
        tooltipE.style.left = x +  20 + 'px';
    };
    yDef = y;
    xDef = x;
}, 500);

function tooltipShow (event) {
          t = event.target;
          y = event.pageY;
          x = event.pageX;
};

document.addEventListener('mouseout', tooltipHide);
function tooltipHide (event) {
    if (showTooltip) {
        document.body.removeChild(showTooltip);
        showTooltip = false;
    } else{
        return
    };
}


  
 
})();
