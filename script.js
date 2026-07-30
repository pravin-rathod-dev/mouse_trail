document.addEventListener("DOMContentLoaded",() => {
    const container = document.querySelector(".items")
    let imageIndex = 1;
    let animationTimeout = null;

    function addnewItem(x , y) {
        const newItem = document.createElement("div");
        newItem.className = "item";
        newItem.style.left = `${x - 75}px`;
        newItem.style.top = `${y - 100}px`;

        const img = document.createElement("img");
        img.src = `./assets/trail(${imageIndex}).jpg`;
        newItem.appendChild(img)
        imageIndex = (imageIndex % 13) + 1;

        container.appendChild(newItem);
        manageItemLimit();

        function manageItemLimit() {
            while (container.children.length > 10){
                container.removeChild(container.firstChild)
            }
        }
    }

  function startAnimation() {
        const newItems = document.querySelectorAll(".item:not(.falling)");
        if (newItems.length === 0) return;
        newItems.forEach(item => item.classList.add("falling"));
        gsap.to(newItems, {
            y: 1000,
            scale: 0.5,
            opacity: 0,
            duration: 1.2, 
            stagger: 0.05,
            onComplete: function(){
                this.targets().forEach((item)=>{
                    if (item.parentNode) {
                        item.parentNode.removeChild(item);
                    }
                });
            },
        });
    }

    container.addEventListener("mousemove",(event)=>{
        clearTimeout(animationTimeout);
        addnewItem(event.pageX, event.pageY);

        animationTimeout = setTimeout(startAnimation,300)
    })

})