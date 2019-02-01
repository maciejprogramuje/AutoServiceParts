({
    handleSearchDepartment: function(component, event, helper) {
        helper.searchDepartment(component, event);
    },

    clickShowDetails: function(component, event, helper) {
        helper.showDetails(component, event);
    },

    handleDeleteDepartment: function(component, event, helper) {
        helper.deleteDepartment(component, event);
    },

    toastInfo: function(component, event, helper) {
        helper.infoInToast(component, event);
    }
})