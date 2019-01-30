({
    handleSearchDepartment: function(component, event, helper) {
        let name = event.getParam("Name");
        let city = event.getParam("City");
        let country = event.getParam("Country");

        console.log("handleSearchDepartment="+name+" "+city+" "+country);

        let search = component.get("c.getAccounts");
        search.setParam("name", name);
        search.setParam("city", city);
        search.setParam("country", country);

        search.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
               console.log("SUCCESS");
               component.set("v.Accounts", response.getReturnValue());

               let searchToMapEvent = $A.get("e.c:Auto_SearchToMapEvent");
               searchToMapEvent.setParam("AccountsToMap", JSON.stringify(response.getReturnValue()));
               searchToMapEvent.fire();
            }
        });
        $A.enqueueAction(search);
    },

    clickShowDetails: function(component, event, helper) {
         let selectedSection = event.currentTarget;
         let index1 = selectedSection.dataset.index;
         let oneAcc = component.get("v.Accounts")[index1];

         let detailsEvent = $A.get("e.c:Auto_DepartmentResultsEvent");

         detailsEvent.setParam("OneAccount", oneAcc);

         detailsEvent.fire();
    }
})