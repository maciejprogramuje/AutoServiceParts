public with sharing class Auto_SearchResultsController {
    @AuraEnabled
    public static List<Account> getAccounts(String name, String city, String country) {
        String query = '';
        String baseQuery = 'SELECT Id, OwnerId, ParentId, AccountNumber, Site, Type, Industry, AnnualRevenue, ' +
                'Name, BillingLatitude, BillingLongitude, BillingCity, BillingCountry, BillingStreet, BillingState, BillingPostalCode, ' +
                'Rating, Phone, Fax, Website, TickerSymbol, Ownership, NumberOfEmployees, Sic FROM Account';

        if (String.isNotBlank(name)) {
            query = baseQuery + ' WHERE Name LIKE \'' + name + '%\'' + addToWhereIfNotBlank('BillingCity', city) + addToWhereIfNotBlank('BillingCountry', country);
        } else if (String.isNotBlank(city)) {
            query = baseQuery + ' WHERE BillingCity LIKE \'' + city + '%\'' + addToWhereIfNotBlank('BillingCountry', country);
        } else if (String.isNotBlank(country)) {
            query = baseQuery + ' WHERE BillingCountry LIKE \'' + country + '%\'';
        }

        List<Account> accounts = Database.query(query);

        return accounts;
    }

    private static String addToWhereIfNotBlank(String fieldName, String checkedField) {
        if (String.isNotBlank(checkedField)) {
            return ' AND ' + fieldName + ' LIKE \'' + checkedField + '%\'';
        } else {
            return ' ';
        }
    }

    @AuraEnabled
    public static Account updateAccount(Account account) {
        try{
            upsert account;
        } catch (Exception e) {
            System.debug(e.getMessage());
        }
        return account;
    }

    @AuraEnabled
    public static Map<String, String> deleteAccount(String accountId) {
        List<Account> accountToDelete = [SELECT Id FROM Account WHERE Id = :accountId];
        Map<String, String> resultMap = new Map<String, String>();
        try {
            delete accountToDelete;
            resultMap.put('status', 'success');
            resultMap.put('message', 'Contacts Deleted Successfully');
        } catch (Exception e) {
            resultMap.put('status', 'error');
            resultMap.put('message', e.getMessage());
        }
        return resultMap;
    }
}