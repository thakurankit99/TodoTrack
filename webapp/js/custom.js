CONFIG = {
    // Title of the tab and logo
    "TITLE": "TodoTrack",

    // Disable the authentication button
    // Authentication page can still be accessed at https://plik.tld/#/login if enabled
    "DISABLE_AUTH_BUTTON": false
}

// Modern UI Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover effects to buttons
    addButtonEffects();
    
    // Enhance task checkboxes
    enhanceCheckboxes();
    
    // Add animations to task items
    animateTaskItems();
    
    // Fix drop zone behavior
    fixDropZone();
});

// Add subtle effects to buttons
function addButtonEffects() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('btn')) {
            e.target.style.transition = 'all 0.2s ease';
        }
    });
}

// Enhance checkbox interactions
function enhanceCheckboxes() {
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('todo-checkbox')) {
            var todoItem = e.target.closest('.todo-item');
            if (todoItem) {
                const label = todoItem.querySelector('span');
                if (e.target.checked) {
                    label.classList.add('todo-completed');
                } else {
                    label.classList.remove('todo-completed');
                }
            }
        }
    });
}

// Add smooth animations to task items
function animateTaskItems() {
    const items = document.querySelectorAll('.todo-item');
    items.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
}

// Fix drop zone behavior for modern browsers
function fixDropZone() {
    const dropZones = document.querySelectorAll('#drop-zone, #drop-zone-download');
    dropZones.forEach(zone => {
        if (zone) {
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
            });
        }
    });
}