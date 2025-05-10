// Task Service
angular.module('tasks', []).factory('$tasks', function () {
    var tasks = {};
    
    // Initialize tasks from localStorage or use defaults
    var initTasks = function() {
        var storedTasks = localStorage.getItem('todotrack_tasks');
        if (storedTasks) {
            return JSON.parse(storedTasks);
        } else {
            // Default tasks
            return [
                { id: 1, title: "Prepare meeting slides", completed: false, project: "Marketing" },
                { id: 2, title: "Review documentation", completed: true, project: "Development" },
                { id: 3, title: "Submit client brief", completed: false, project: "Design" },
                { id: 4, title: "Create weekly report", completed: false, project: "Marketing" },
                { id: 5, title: "Update team roadmap", completed: false, project: "Development" }
            ];
        }
    };
    
    // Save tasks to localStorage
    var saveTasks = function(taskList) {
        localStorage.setItem('todotrack_tasks', JSON.stringify(taskList));
    };
    
    // Get all tasks
    tasks.all = function() {
        return initTasks();
    };
    
    // Get tasks by project
    tasks.byProject = function(project) {
        if (project === "All Projects") {
            return tasks.all();
        }
        return tasks.all().filter(function(task) {
            return task.project === project;
        });
    };
    
    // Get available projects
    tasks.getProjects = function() {
        var projects = ["All Projects"];
        tasks.all().forEach(function(task) {
            if (task.project && projects.indexOf(task.project) === -1) {
                projects.push(task.project);
            }
        });
        return projects;
    };
    
    // Add a new task
    tasks.add = function(title, project) {
        var taskList = tasks.all();
        var newId = 1;
        
        // Find the highest ID
        taskList.forEach(function(task) {
            if (task.id >= newId) {
                newId = task.id + 1;
            }
        });
        
        // Create new task
        var newTask = {
            id: newId,
            title: title,
            completed: false,
            project: project || "General"
        };
        
        // Add to list and save
        taskList.push(newTask);
        saveTasks(taskList);
        
        return newTask;
    };
    
    // Toggle task completion
    tasks.toggleCompletion = function(taskId) {
        var taskList = tasks.all();
        var updated = false;
        
        taskList = taskList.map(function(task) {
            if (task.id === taskId) {
                task.completed = !task.completed;
                updated = true;
            }
            return task;
        });
        
        if (updated) {
            saveTasks(taskList);
        }
        
        return taskList;
    };
    
    // Delete a task
    tasks.remove = function(taskId) {
        var taskList = tasks.all();
        var filteredList = taskList.filter(function(task) {
            return task.id !== taskId;
        });
        
        saveTasks(filteredList);
        return filteredList;
    };
    
    // Update task project
    tasks.updateProject = function(taskId, project) {
        var taskList = tasks.all();
        var updated = false;
        
        taskList = taskList.map(function(task) {
            if (task.id === taskId) {
                task.project = project;
                updated = true;
            }
            return task;
        });
        
        if (updated) {
            saveTasks(taskList);
        }
        
        return taskList;
    };
    
    return tasks;
}); 