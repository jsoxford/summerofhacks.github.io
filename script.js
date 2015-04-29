


// Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61944527-1', 'auto');
ga('send', 'pageview');


WebFont.load({
  google: {
    families: ['Fredoka One', 'Roboto']
  }
});


// [].forEach.call(document.querySelectorAll('section'), function(section){
//   console.log(section)

//   var bounds = section.getBoundingClientRect();
//   section.style.webkitTransform = 'translateY(' + (bounds.top*-1) + 'px)';
// })


// [].forEach.call(document.querySelectorAll('section'), function(section){
//   section.style.webkitTransform = '';
// })

// [].forEach.call(document.querySelectorAll('section'), function(section, i){
//   console.log(section)

//   var bounds = section.getBoundingClientRect();
//   section.style.webkitTransform = (i == 2) ? 'translateY(' + (bounds.top*-1) + 'px)' : 'translateY(20px)';

//   section.style.opacity  = (i == 2) ? 1: 0;

// })



// [].forEach.call(document.querySelectorAll('section'), function(section, i){
//   console.log(section)

//   var bounds = section.getBoundingClientRect();
//   section.style.webkitTransform = (i == 1) ? 'translateY(' + (bounds.top*-1) + 'px)' : 'translateY(20px)';

//   section.style.opacity  = (i == 1) ? 1: 0;

// })


[].forEach.call(document.querySelectorAll('section'), function(section, i){
  // console.log(section)

  // var bounds = section.getBoundingClientRect();
  // section.style.webkitTransform = (i == 1) ? 'translateY(' + (bounds.top*-1) + 'px)' : 'translateY(20px)';

  section.style.opacity  = (i == 1) ? 1 : 0.2;

});

bean.on(document.documentElement, 'click', 'section h1', function(){
  console.log("DONE")
});



