
(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    if(!document.querySelector('.pb-nav-backdrop')){
      var b=document.createElement('div'); b.className='pb-nav-backdrop'; document.body.appendChild(b);
      b.addEventListener('click', closeNav);
    }
    function openNav(){
      document.body.classList.add('pb-nav-open','dt-mobile-menu-open');
      document.querySelectorAll('.mobile-nav-container, .mobile-menu, .menu-container, .dt-header-menu, .dt-primary-nav').forEach(function(el){
        el.classList.add('is-open','nav-is-visible','show');
      });
      document.querySelectorAll('.menu-trigger').forEach(function(t){ t.classList.add('nav-is-visible','active'); });
      document.querySelectorAll('.mobile-nav-container .overlay, .sub-menu-overlay').forEach(function(o){ o.style.display='block'; o.classList.add('is-open'); });
    }
    function closeNav(){
      document.body.classList.remove('pb-nav-open','dt-mobile-menu-open');
      document.querySelectorAll('.mobile-nav-container, .mobile-menu, .menu-container, .dt-header-menu, .dt-primary-nav').forEach(function(el){
        el.classList.remove('is-open','nav-is-visible','show');
      });
      document.querySelectorAll('.menu-trigger').forEach(function(t){ t.classList.remove('nav-is-visible','active'); });
      document.querySelectorAll('.mobile-nav-container .overlay, .sub-menu-overlay').forEach(function(o){ o.style.display=''; o.classList.remove('is-open'); });
    }
    document.querySelectorAll('.mobile-nav-container').forEach(function(box){
      var mobileMenu=box.querySelector('.mobile-menu');
      var desktop=document.querySelector('.dt-primary-nav');
      if(mobileMenu && desktop && !mobileMenu.querySelector('li.menu-item')){
        mobileMenu.innerHTML='<ul class="dt-primary-nav mobile-clone">'+desktop.innerHTML+'</ul>';
      }
    });
    document.addEventListener('click', function(e){
      var trigger=e.target.closest('.menu-trigger, .elementor-menu-toggle, .close-nav');
      if(!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      if(trigger.classList.contains('close-nav') || document.body.classList.contains('pb-nav-open')) closeNav();
      else openNav();
    }, true);
    document.querySelectorAll('.dt-primary-nav a, .mobile-menu a, .elementor-nav-menu a').forEach(function(a){
      a.addEventListener('click', function(){ if(window.innerWidth<=1024) closeNav(); });
    });
    try{
      var els=document.querySelectorAll('.elementor-invisible');
      if(els.length && 'IntersectionObserver' in window){
        var io=new IntersectionObserver(function(entries){
          entries.forEach(function(en){
            if(!en.isIntersecting) return;
            var el=en.target;
            el.classList.remove('elementor-invisible');
            var settings=el.getAttribute('data-settings')||'';
            var m=settings.match(/"(_)?animation"\s*:\s*"([^"]+)"/);
            var name=m?m[2]:'fadeInUp';
            var d=settings.match(/"(_)?animation_delay"\s*:\s*(\d+)/);
            el.style.animationDelay=(d?d[2]:0)+'ms';
            el.classList.add('animated', name);
            io.unobserve(el);
          });
        },{threshold:0.1, rootMargin:'0px 0px -5% 0px'});
        els.forEach(function(el){ io.observe(el); });
      }
    }catch(err){}
  });
})();
