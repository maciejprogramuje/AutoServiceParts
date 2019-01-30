({
     handleOneDepartment: function(component, event, helper){
        let oneAccount = event.getParam("OneAccount");

        if(oneAccount.BillingLatitude == null && oneAccount.BillingLongitude == null) {
            console.log("No geolocation data for this department.");

                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error",
                            "message": "No geolocation data for this department.",
                            "type": "error"
                        });
                        toastEvent.fire();
        } else {
            console.log("oooooooooooooooooo");

            component.set("v.OneAccount", oneAccount);
        }
     }
})