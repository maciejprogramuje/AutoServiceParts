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

     navToRecord : function(component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
           "recordId": component.get("v.AccountId")
        });
        navEvt.fire();
     },

     editRecord : function(component, event, helper) {
        helper.showHide(component);
     },

     handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The property's info has been updated.",
            "type": "success"
        });
        toastEvent.fire();

        var recUpdate = $A.get("e.c:RecordUpdated");
        recUpdate.fire();
        helper.showHide(component);
     },

     handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
     },

     handleSave: function(component, event, helper) {
        var updateAccount = component.get("c.updateAccount");
        updateAccount.setParams({
            "account" : component.get("v.OneAccount")
        });

        updateAccount.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title" : "Success",
                    "message" : "Account's details has been updated.",
                    "type": "success"
                });

                $A.get("e.force:closeQuickAction").fire();
                resultsToast.fire();

                $A.get("e.force:refreshView").fire();
           } else if (state === "ERROR"){
               console.log('Problem updating call, response state '+state);
           } else {
               console.log('Unknown problem: '+state);
           }
        });

        helper.showHide(component);
        $A.enqueueAction(updateAccount);
     },

     deleteContacts: function(component, event, helper) {
        let accountsToDelete = component.get("v.AccountId");
        let toastEvent = $A.get('e.force:showToast');
        let deleteAction = component.get('c.deleteAccount');

        // setting the params to be passed to apex controller
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
                        'title': 'Error',
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
     },

     openModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", true);
     },

     closeModel: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", false);
     }
})