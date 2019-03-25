'use strict';

angular.module('issueStatementProcessor', ['ngFileUpload']).
    component('issueStatementProcessor', {
        templateUrl: './app/issue-statement-processor/issue-processor.html',
        controller: issueProcessorController
    });

function issueProcessorController($rootScope, $scope, $window) {
    var customers = new Array();
    $scope.issue = {
        count: ''
    };

    // File uploaded by the user is defined here.
    $scope.selectFile = function (file) {
        $scope.selectedFile = file;
    };

    // Here the csv file is parsed and stored in an array to shown as the table content.
    $scope.processingIssueStatement = function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($scope.selectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\r\n");
                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].split(",");
                        if (cells.length > 1 && i > 0) {
                            var customer = {};
                            customer.firstName = cells[0];
                            customer.surName = cells[1];
                            customer.issueCount = cells[2];
                            customer.dateOfBirth = cells[3];
                            customers.push(customer);
                            $scope.$apply(function () {
                                $scope.Customers = customers;
                                $scope.IsVisible = true;
                            });
                        }
                    }
                }
                reader.readAsText($scope.selectedFile);
            }
        } else {
            $window.alert("Please upload a valid CSV file.");
        }
    }

    // Filter enabled for the user to get specific data based on issue count.
    $scope.filteringOnIssueCount = function () {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("tblCustomers");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}





