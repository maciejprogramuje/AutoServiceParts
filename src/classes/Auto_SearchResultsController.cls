public with sharing class Auto_SearchResultsController {
    @AuraEnabled
    public static List<Account> getAccounts(String name, String city, String country) {
        String query = 'SELECT Id, Name, BillingCity, BillingCountry, BillingLatitude, BillingLongitude FROM Account';
        return Database.query(query);
    }
}