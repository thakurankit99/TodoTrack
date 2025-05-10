// TodoTrack Custom Configuration

// Rename app to TodoTrack
var app = angular.module('PlikApp', ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'angularMoment', 'btford.markdown']);

// Application Configuration
app.run(['$rootScope', function($rootScope) {
    // Set application title
    $rootScope.title = 'TodoTrack';
    
    // Set application description
    $rootScope.description = 'Simple and effective task management';
    
    // Custom application settings
    $rootScope.appSettings = {
        theme: 'modern',
        defaultTTL: '7d', // Default task expiration (1 week)
        defaultProject: 'General',
        priorityLevels: ['Low', 'Medium', 'High']
    };
}]);

// Custom Filters
app.filter('taskStatus', function() {
    return function(status) {
        switch(status) {
            case 'removed':
                return 'Completed';
            case 'uploaded':
                return 'Active';
            case 'uploading':
                return 'In Progress';
            default:
                return status;
        }
    };
});

// Custom Directives
app.directive('taskItem', function() {
    return {
        restrict: 'E',
        template: '<div class="task-item">' +
                  '  <div class="task-checkbox">' +
                  '    <input type="checkbox" ng-model="task.completed">' +
                  '  </div>' +
                  '  <div class="task-content">' +
                  '    <div class="task-title" ng-class="{completed: task.completed}">{{task.title}}</div>' +
                  '    <div class="task-meta">{{task.dueDate}} • {{task.project}}</div>' +
                  '  </div>' +
                  '</div>',
        scope: {
            task: '='
        }
    };
});

// Intercept API responses to modify terminology
app.factory('todoTrackInterceptor', ['$q', function($q) {
    return {
        response: function(response) {
            // Change file sharing terms to todo list terms
            if (response.data && typeof response.data === 'object') {
                // Replace "file" references with "task" when appropriate
                if (response.data.message && typeof response.data.message === 'string') {
                    response.data.message = response.data.message
                        .replace(/file deleted/gi, 'task completed')
                        .replace(/upload deleted/gi, 'task list cleared')
                        .replace(/files? uploaded/gi, 'task created');
                }
            }
            return response;
        }
    };
}]);

// Register the interceptor
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('todoTrackInterceptor');
}]);

// Original Plik configuration overrides - this is still needed
CONFIG = {
    // Application title - displayed in header and tab
    "TITLE": "TodoTrack",
    
    // Application description
    "SUBTITLE": "Task Management Made Simple",
    
    // Default file/task expiration
    "DEFAULT_TTL": "7d",
    
    // Disable download logs (since we're a task app)
    "SHOW_UPLOAD_STATS": false,
    
    // Use our modern theme
    "DEFAULT_SKIN": "modern",
    
    // Hide the authentication button in the main interface
    "DISABLE_AUTH_BUTTON": true,
    
    // Task attachment settings
    "USER_MAX_FILE_SIZE": "50mb",
    "UPLOAD_MAX_SIZE": "100mb",
    "UPLOAD_MAX_FILES": 10
}