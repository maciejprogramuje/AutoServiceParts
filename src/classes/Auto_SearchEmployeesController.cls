public with sharing class Auto_SearchEmployeesController {
    @AuraEnabled
    public static List<EmployeesInDepartments__c> getEmployess(String departmentId) {
        List<EmployeesInDepartments__c> employees = new List<EmployeesInDepartments__c>();
        try {
            employees = [SELECT Id, User__c, User__r.Name, User__r.Username, Department__c, Department__r.Id FROM EmployeesInDepartments__c WHERE Department__r.Id = :departmentId];
        } catch (Exception ex) {
            System.debug('Message after getEmployess' + ex.getMessage());
        }

        return employees;
    }

    @AuraEnabled
    public static List<User> getUsers(Account account) {
        List<User> users = new List<User>();
        users = [
                SELECT Id, Name, Username, Profile.Name
                FROM User
                WHERE Profile.Name LIKE 'Sales' AND Id NOT IN (SELECT User__c FROM EmployeesInDepartments__c WHERE Department__c = :account.Id)
        ];

        return users;
    }

    @AuraEnabled
    public static Boolean insertEmployee(String accountId, String userId) {
        EmployeesInDepartments__c employee = new EmployeesInDepartments__c();
        employee.User__c = userId;
        employee.Department__c = accountId;

        try {
            insert employee;
            return true;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @AuraEnabled
    public static Boolean deleteEmployees(String employeeId) {
        List<EmployeesInDepartments__c> employees = [SELECT Id FROM EmployeesInDepartments__c WHERE Id = :employeeId];
        try {
            delete employees;
            return true;
        } catch (Exception ex) {
            throw ex;
        }
    }
}