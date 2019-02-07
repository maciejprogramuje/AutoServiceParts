({
    handleEmployeesFromDepartment: function(component, event, helper) {
        helper.employeesFromDepartment(component, event);
    },

    newEmployee: function(component, event, helper) {
        helper.createEmployee(component, event);
    },

    openModal: function(component, event, helper) {
        helper.openMod(component, event);
    },

    closeModal: function(component, event, helper) {
        component.set("v.IsOpenNewEmployees", false);
        component.set("v.SelectedEmployeeId", null);
    },

    clickNewEmployee: function(component, event, helper) {
        helper.newEmployee(component, event);
    },

    clickSelectOneEmployee: function(component, event, helper) {
        helper.selectOneEmployee(component, event);
    },

    clickRemoveEmployee: function(component, event, helper) {
        helper.removeEmployee(component, event);
    },

    closeDeleteModel: function(component, event, helper) {
        component.set("v.IsOpenDeleteModal", false);
        component.set("v.SelectedEmployeeId", null);
    },

    openDeleteModel: function(component, event, helper) {
        helper.openDeleteMod(component, event);
    },

    setCurrentId: function(component, event, helper) {
        helper.openDeleteMod(component, event);
    },

    handleRefreshAfterToastInfo: function(component, event, helper) {
        helper.refreshAfterToastInfo(component, event);
    },

    handleOneDepartment: function(component, event, helper) {
        let oneAccount = event.getParam("OneAccount");
        component.set("v.OneAccount", oneAccount);
    }
})