const fullScreenModalOpen = '[data-open]';
const fullScreenModalClosed = '[data-closed]';
const isVisible = 'is-visible';


//Opening and closing full modal.
const openModal = document.querySelectorAll(fullScreenModalOpen);
const closeModal = document.querySelectorAll(fullScreenModalClosed);



//Enter Full site Modal 
for( const elm of openModal ){
    elm.addEventListener('click', function(){
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
};


//Exit Full Site Modal
for( const elm of closeModal ){
    elm.addEventListener('click', function(){
        this.parentElement.parentElement.classList.remove(isVisible);
    })
};


