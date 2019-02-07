({
    handleOneDepartment: function(component, event, helper){
        helper.oneDepartment(component, event);
    },

    navToRecord: function (component, event, helper) {
        helper.toRecord(component, event);
    },

    navigateToShopEdit: function (component, event, helper) {
        helper.toShopEdit(component, event);
    },

    openModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", true);
    },

    closeModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", false);
    },

    deleteContacts: function(component, event, helper) {
        helper.deleteContactsInBase(component, event);
    },

    handleSearchDepartment: function(component, event, helper){
        helper.searchDepartment(component, event);
    }

 })