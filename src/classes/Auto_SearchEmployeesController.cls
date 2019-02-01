public with sharing class Auto_SearchEmployeesController {
    @AuraEnabled
    public static List<EmployeesInDepartments__c> getEmployees(String departmentId) {
        List<EmployeesInDepartments__c> employeesInDepartments = [SELECT Id, User__c, Department__r.Id FROM EmployeesInDepartments__c WHERE Department__r.Id = :departmentId];

        return employeesInDepartments;
    }

    @AuraEnabled
    public static List<User> getUsers() {
        List<User> users = [SELECT Id, Name FROM User];

        System.debug('users >> ' + users);

        return users;
    }

    @AuraEnabled
    public static EmployeesInDepartments__c addNewEmployee(String departmentId, String userId) {
        EmployeesInDepartments__c employee = new EmployeesInDepartments__c();
        employee.User__c = userId;
        employee.Department__c = departmentId;

        upsert employee;

        return employee;
    }
}