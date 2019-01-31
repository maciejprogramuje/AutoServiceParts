({
    handleOneDepartment: function(component, event, helper){
        let oneAccount = event.getParam("OneAccount");
        if(oneAccount.BillingLatitude == null && oneAccount.BillingLongitude == null) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "message": "No geolocation data for this department.",
                "type": "error"
            });
            toastEvent.fire();
        }
        component.set("v.OneAccount", oneAccount);
        component.set("v.AccountId", oneAccount.Id);
    },

    navToRecord : function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.AccountId")
        });
        navEvt.fire();
    },

    navigateToShopEdit : function (component) {
        let navigateEvt = $A.get("e.force:editRecord");
        navigateEvt.setParams({
            "recordId": component.get("v.AccountId")
        });
        navigateEvt.fire();
    },

    openModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", true);
    },

    closeModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", false);
    },

    deleteContacts: function(component, event, helper) {
        let accountsToDelete = component.get("v.AccountId");
        let toastEvent = $A.get('e.force:showToast');
        let deleteAction = component.get('c.deleteAccount');

        deleteAction.setParams({
            accountId: accountsToDelete
        });

        deleteAction.setCallback(this, function(response) {
              let state = response.getState();
              if(state === 'SUCCESS') {
                  let dataMap = response.getReturnValue();
                  if(dataMap.status=='success') {
                      toastEvent.setParams({
                          'title': 'Success!',
                          'type': 'success',
                          'mode': 'dismissable',
                          'message': dataMap.message
                      });
                      toastEvent.fire();
                  } else if(dataMap.status=='error') {
                      toastEvent.setParams({
                          'title': 'Error!',
                          'type': 'error',
                          'mode': 'dismissable',
                          'message': dataMap.message
                      });
                      toastEvent.fire();
                  }
              } else {
                  alert('Error in getting data');
              }
        });

        $A.enqueueAction(deleteAction);

        component.set("v.isOpenConfirmDialog", false);
        component.set("v.OneAccount", {});
        component.set("v.AccountId", '');

        let searchEvent = $A.get("e.c:Auto_DepartmentDeleteEvent");
        searchEvent.fire();
    },

    handleSearchDepartment: function(component, event, helper){
        let clearFields = event.getParam("ClearFields");
        if(!clearFields){
            component.set("v.OneAccount", {});
            component.set("v.AccountId", '');
        }
    }
 })