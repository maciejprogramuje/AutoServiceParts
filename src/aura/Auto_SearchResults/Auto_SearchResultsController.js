({
    handleSearchDepartment: function(component, event, helper) {
        let name = event.getParam("Name");
        let city = event.getParam("City");
        let country = event.getParam("Country");
        let clearFields = event.getParam("ClearFields");

       /* setTimeout(function(){
            component.find("name-input").getElement().focus();
        }, 100);*/

        if(!clearFields){
            component.set("v.Accounts", Array());
        } else {
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
        }
    },

    clickShowDetails: function(component, event, helper) {
         let selectedSection = event.currentTarget;
         let index1 = selectedSection.dataset.index;

         console.log("index1 >> "+index1);

         let oneAcc = component.get("v.Accounts")[index1];

         let detailsEvent = $A.get("e.c:Auto_DepartmentResultsEvent");

         detailsEvent.setParam("OneAccount", oneAcc);

         detailsEvent.fire();
    },

    handleDeleteDepartment: function(component, event, helper) {
            console.log('start even handleDeleteDepartment');
             let name = component.get("v.Name");
             let city = component.get("v.City");
             let country = component.get("v.Country");

         let action = component.get("c.getAccounts");
         action.setParam("name", name);
         action.setParam("city", city);
         action.setParam("country", country);

         action.setCallback(this, function(response) {
              let state = response.getState();
              if (state === "SUCCESS") {
                  console.log("SUCCESS");
                  component.set("v.Accounts", response.getReturnValue());

                  let searchToMapEvent = $A.get("e.c:AutoParts_SearchToMapEvent");
                  searchToMapEvent.setParam("AccountsToMap", JSON.stringify(response.getReturnValue()));
                  searchToMapEvent.fire();
              }
              else {
                  console.log("Failed with state: " + state);
              }
         });
         $A.enqueueAction(action);
                 console.log('cancel');
    }
})