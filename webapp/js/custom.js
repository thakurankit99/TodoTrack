CONFIG = {
    // Title of the tab and logo
    "TITLE": "TodoTrack",

    // Disable the authentication button
    // Authentication page can still be accessed at https://plik.tld/#/login if enabled
    "DISABLE_AUTH_BUTTON": false
}

// Modern UI Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Sticky Wall UI
    initStickWallUI();
    
    // Add subtle hover effects to buttons
    addButtonEffects();
    
    // Enhance task checkboxes
    enhanceCheckboxes();
    
    // Add animations to task items
    animateTaskItems();
    
    // Fix drop zone behavior
    fixDropZone();
});

// Initialize the Sticky Wall UI
function initStickWallUI() {
    // We need to wait for the Angular app to be ready
    setTimeout(function() {
        setupFileAttachmentIntegration();
        setupNoteActionHandlers();
        setupStickyWallMobileResponsiveness();
    }, 1000);
}

// Setup integration between sticky notes and file attachments
function setupFileAttachmentIntegration() {
    // Paperclip icon click handler for attaching files to notes
    $(document).on('click', '.attachment-trigger', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // Open the file attachment modal
        $('#file-attachment-modal').modal('show');
        
        // Store the parent note for reference
        window.currentNoteElement = $(this).closest('.sticky-note');
    });
    
    // Setup the file upload area in the modal to trigger Plik functionality
    $(document).on('click', '#note-file-upload', function() {
        // Show the original Plik interface
        $('#file-attachment-modal').modal('hide');
        
        // Show the Plik interface
        $('#original-plik-interface').show();
        
        // We'll need to trigger a click on the Plik upload button or file selection
        setTimeout(function() {
            // Try to find and trigger the file selection
            var fileInput = document.querySelector('#drop-zone input[type="file"]') || 
                           document.querySelector('input[type="file"]');
            
            if (fileInput) {
                fileInput.click();
            } else {
                // Show the drop zone prominently
                var dropZone = document.querySelector('#drop-zone');
                if (dropZone) {
                    dropZone.style.display = 'flex';
                    dropZone.scrollIntoView({behavior: 'smooth'});
                    alert('Please drag and drop files here or click to select files');
                }
            }
        }, 500);
    });
    
    // Setup the add note button
    $(document).on('click', '#add-note-button', function() {
        $('#note-modal').modal('show');
    });
    
    // Setup save note button
    $(document).on('click', '#note-modal .btn-primary', function() {
        var title = $('#note-title').val() || 'Untitled Note';
        var content = $('#note-content').val() || '';
        var color = $('.color-option.selected').attr('class').split(' ')[1];
        
        // Create new note
        var newNote = $('<div class="sticky-note ' + color + '">' +
                        '<h3>' + title + '</h3>' +
                        '<p>' + content.replace(/\n/g, '<br>') + '</p>' +
                        '<div class="note-actions">' +
                        '<span class="note-action"><i class="fa fa-pencil"></i></span>' +
                        '<span class="note-action attachment-trigger"><i class="fa fa-paperclip"></i></span>' +
                        '<span class="note-action"><i class="fa fa-trash"></i></span>' +
                        '</div>' +
                        '</div>');
        
        // Add to sticky wall before the add button
        $('#add-note-button').before(newNote);
        
        // Add fade-in animation
        newNote.css('opacity', 0);
        setTimeout(function() {
            newNote.css({
                'opacity': 1,
                'transform': 'translateY(0)'
            });
        }, 10);
        
        // Close modal and reset form
        $('#note-modal').modal('hide');
        $('#note-title').val('');
        $('#note-content').val('');
    });
}

// Setup action handlers for notes (edit, delete)
function setupNoteActionHandlers() {
    // Edit note handler
    $(document).on('click', '.note-action .fa-pencil', function(e) {
        e.stopPropagation();
        
        var note = $(this).closest('.sticky-note');
        var title = note.find('h3').text();
        var content = note.find('p').html().replace(/<br>/g, '\n');
        var colorClass = '';
        
        // Determine the color class
        ['yellow', 'blue', 'pink', 'orange', 'green', 'purple'].forEach(function(color) {
            if (note.hasClass(color)) {
                colorClass = color;
            }
        });
        
        // Fill the modal with note data
        $('#note-title').val(title);
        $('#note-content').val(content);
        
        // Set the color
        $('.color-option').removeClass('selected');
        $('.color-option.' + colorClass).addClass('selected');
        
        // Store reference to the note being edited
        window.editingNoteElement = note;
        
        // Change modal title and button text
        $('#noteModalLabel').text('Edit Note');
        $('#note-modal .btn-primary').text('Update Note');
        
        // Show the modal
        $('#note-modal').modal('show');
    });
    
    // Delete note handler
    $(document).on('click', '.note-action .fa-trash', function(e) {
        e.stopPropagation();
        
        if (confirm('Are you sure you want to delete this note?')) {
            var note = $(this).closest('.sticky-note');
            
            // Fade out animation
            note.css({
                'opacity': 0,
                'transform': 'translateY(20px)'
            });
            
            // Remove after animation
            setTimeout(function() {
                note.remove();
            }, 300);
        }
    });
    
    // Handle click on a note to view details
    $(document).on('click', '.sticky-note', function(e) {
        // Only trigger if clicking on the note itself, not on action buttons
        if (!$(e.target).closest('.note-actions').length) {
            var note = $(this);
            var title = note.find('h3').text();
            var content = note.find('p').html();
            
            // Here we could show a read-only view of the note with its attachments
            // For now, just trigger the edit mode
            note.find('.note-action .fa-pencil').trigger('click');
        }
    });
}

// Setup mobile responsiveness for the sticky wall
function setupStickyWallMobileResponsiveness() {
    // Mobile menu toggle
    $(document).on('click', '.mobile-menu-toggle', function() {
        $('.sidebar').toggleClass('open');
    });
    
    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($('.sidebar').hasClass('open') && 
            !$(e.target).closest('.sidebar').length && 
            !$(e.target).closest('.mobile-menu-toggle').length) {
            $('.sidebar').removeClass('open');
        }
    });
}

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
    
    // Animate sticky notes too
    const notes = document.querySelectorAll('.sticky-note');
    notes.forEach((note, index) => {
        note.style.opacity = 0;
        note.style.transform = 'translateY(10px)';
        note.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            note.style.opacity = 1;
            note.style.transform = 'translateY(0)';
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