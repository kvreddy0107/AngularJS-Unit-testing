describe('unit: TaskController', function () {

    var ctrl;
    var scope;

    // get a reference to the module
    beforeEach(module('taskApp'));

    /*
    use the $controller service to get a reference to the TaskController.
    inject the $rootScope to create a new scope that we can use in our controller.
    create a dummy task that we can use to test.
     */
    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl = $controller('TaskController', {$scope: scope});

        this.task = "task for testing";

        // every time the scope calls the $emit method, we will know (line 51, 57)
        spyOn(scope, '$emit');

    }));

    it('should init an empty array of tasks', function () {

        expect(scope.tasks).toBeDefined();
        expect(scope.tasks.length).toEqual(0);
    });

    it('should add a new task to the tasks array', function () {

        scope.addTask(this.task);

        expect(scope.tasks.length).toEqual(1);
        expect(scope.tasks.indexOf(this.task)).toBeGreaterThan(-1);
    });

    it('should remove task to the tasks array', function () {

        scope.addTask(this.task);
        expect(scope.tasks.indexOf(this.task)).toBeGreaterThan(-1);

        scope.removeTask(this.task);
        expect(scope.tasks.length).toEqual(0);
        expect(scope.tasks.indexOf(this.task)).toEqual(-1);
    });

    it('should emit an event when task added', function () {

        scope.addTask(this.task);
        expect(scope.$emit).toHaveBeenCalledWith('task:added', 'task just added!');
    });

    it('should emit an event when task removed', function () {

        scope.removeTask(this.task);
        expect(scope.$emit).toHaveBeenCalledWith('task:removed');
    });

});