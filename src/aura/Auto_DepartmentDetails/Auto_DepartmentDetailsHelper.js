({
     showHide: function(component) {
         var editForm = component.find("editForm");
         $A.util.toggleClass(editForm, "slds-hide");

         var viewForm = component.find("viewForm");
         $A.util.toggleClass(viewForm, "slds-hide");
     },

     oneDepartment: function(component, event) {
         let oneAccount = event.getParam("OneAccount");

         if(oneAccount.BillingLatitude == null && oneAccount.BillingLongitude == null) {
             var toastEvent = $A.get("e.force:showToast");
             toastEvent.setParams({
                 "title": $A.get("$Label.c.Auto_Error"),
                 "message": $A.get("$Label.c.Auto_No_Geolocation_Data"),
                 "type": "warning"
             });
             toastEvent.fire();
         }
         component.set("v.OneAccount", oneAccount);
         component.set("v.AccountId", oneAccount.Id);
     },

     toRecord: function(component, event) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.AccountId")
        });
        navEvt.fire();
     },

     toShopEdit: function(component, event) {
        let navigateEvt = $A.get("e.force:editRecord");
        navigateEvt.setParams({
            "recordId": component.get("v.OneAccount.Id")
        });
        navigateEvt.fire();
     },

     deleteContactsInBase: function(component, event) {
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
                        'title': $A.get("$Label.c.Auto_Success"),
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();
                } else if(dataMap.status=='error') {
                    toastEvent.setParams({
                        'title': $A.get("$Label.c.Auto_Error"),
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

     searchDepartment: function(component, event) {
        let clearFields = event.getParam("ClearFields");
        if(!clearFields){
            component.set("v.OneAccount", {});
            component.set("v.AccountId", '');
        }
     },

})