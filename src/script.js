// fonts!
WebFont.load({
  google: {
    families: ['Fredoka One', 'Roboto']
  }
});


// Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61944527-1', 'auto');
ga('send', 'pageview');





(function(YES){

  if(!YES) {
    // .. awwww, booo
    document.getElementsByTagName('html')[0].className = 'nope';
    return;
  }


  var current, html = document.documentElement;

  bean.on(document.documentElement, 'click', 'section h2', function(event){
    event.preventDefault();

    // remove the active element
    var active = document.querySelector('.active');
    if(active) active.classList.remove('active');


    var h2 = event.currentTarget;

    if(h2 === current) {
      // toggle off

      html.classList.remove('has-content');
      current = null;

    } else {
      // toggle on

      html.classList.add('has-content');
      h2.parentElement.classList.add('active');
      current = h2;

    }
    
  });

  bean.on(logo, 'click', function(event){
    // remove the active element
    var active = document.querySelector('.active');
    if(active) active.classList.remove('active');

    html.classList.remove('has-content');
    current = null;
  });


})(
  document.querySelector &&
  document.documentElement &&
  document.documentElement.classList
);
