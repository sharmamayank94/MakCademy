var navbar = document.querySelector('.navbar');
        var sidebar = document.querySelector('.sidebar');
        var sidebarbutton = document.querySelector('.sidebarbutton');
        window.addEventListener('scroll',()=>{
            if(window.scrollY>='100'){
                sidebar.style.position="fixed";
                sidebar.style.top = "60px";
                navbar.style.backgroundColor = "rgb(60,60,60)";
                
                navbar.style.position = "fixed";
                navbar.style.top = "0px";
                navbar.style.width = "100%";
            }
            else if(window.scrollY<'100'){
                navbar.style="";
                sidebar.style="";
            }
          //  console.log(sidebar.getBoundingClientRect().top);
            
        });
    
    function hidebar(){
        sidebar.classList.add("sidebarhidden");
        sidebarbutton.onclick = showbar;
    }
    function showbar(){
        sidebar.className="sidebar";
        sidebarbutton.onclick = hidebar;
    }
        