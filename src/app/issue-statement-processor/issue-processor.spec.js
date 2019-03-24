describe('issue-processor-test', function () {

    beforeEach(function () {module('issueStatementProcessor', ['ngFileUpload']) });

    describe('issueProcessorController', function () {
        var $scope;
        var ctrl;

        beforeEach(inject(function ($controller, $rootScope, $window) {
            $scope = $rootScope.$new();
            ctrl = $controller('issueProcessorController', { $scope: $scope });
        }));


        it('process the file given and parse it as expected', function () {
            expect(this.customers).toBeDefined;
            $scope.selectFile("assets/utility.csv");
            expect($scope.selectedFile).toBe("assets/utility.csv");
            $scope.processingIssueStatement();
            var customer = ["Theo", "Jansen", 5, "1978-01-02T00:00:00"];
            expect($scope.customers).toBe(customer);
        });
    });
});