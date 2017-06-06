describe('Unit: Directives', function () {

    var element;
    var scope;

    // get a reference to the module
    beforeEach(module('taskApp'));

    /*
    to test a directive, we need to create an html element that
    we can apply the directive on it. we will need the $compile service
    and the $rootScope to compile it.
     */
    beforeEach(inject(function ($compile, $rootScope) {

        scope = $rootScope;
        element = angular.element('<div nk-alert></div>');

        $compile(element)(scope);
        scope.$apply();
    }));

    it('should bind an alert message of "task added!"', function () {

        scope.$emit('task:added');
        scope.$digest(); // 

        expect(element.html()).toContain('task:added');

    });

    it('should add a class with the event name', function () {

        scope.$emit('task:added');
        scope.$digest();

        expect(element.hasClass('task-added')).toBeTruthy();
    });
});