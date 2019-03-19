public with sharing class Auto_SearchParts {
    @AuraEnabled
    public static List<String> searchForParts(String searchText) {
        String tempSearchText = searchText + '%';
        List<Product2> parts = [SELECT Id FROM Product2 WHERE Name LIKE :tempSearchText];

        List<String> partsIds = new List<String>();
        for(Product2 part : parts) {
            partsIds.add(part.Id);
        }

        return partsIds;
    }
}