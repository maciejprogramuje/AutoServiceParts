({
    handleSearchDepartment: function(component, event, helper) {
        let name = event.getParam("Name");
        let city = event.getParam("City");
        let country = event.getParam("Country");
        let clearFields = event.getParam("ClearFields");

        component.set("v.Name", name);
        component.set("v.City", city);
        component.set("v.Country", country);

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
         let index = parseInt(selectedSection.dataset.index);

         let oneAcc = component.get("v.Accounts")[index];

         let i = 0;
         let allAcc = component.get("v.Accounts");
         allAcc.forEach(function (acc) {
             if(i != index) {
                 document.getElementById(i).classList.remove("changeMe");
             } else {
                 document.getElementById(i).classList.add("changeMe");
             }

             ++i;
         })

         component.set("v.SelectedAccount",index);

         let detailsEvent = $A.get("e.c:Auto_DepartmentResultsEvent");

         detailsEvent.setParam("OneAccount", oneAcc);

         detailsEvent.fire();
    },

    handleDeleteDepartment: function(component, event, helper) {
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

                  let searchToMapEvent = $A.get("e.c:Auto_SearchToMapEvent");
                  searchToMapEvent.setParam("AccountsToMap", JSON.stringify(response.getReturnValue()));
                  searchToMapEvent.fire();
              } else {
                  console.log("handleDeleteDepartment Failed with state: " + state);
              }
         });
         $A.enqueueAction(action);
    },

    toastInfo: function(component, event, helper) {
        var toastMessageParams = event.getParams();
        var message = toastMessageParams.message;
        if (message.includes('was saved')) {
            let name = component.get("v.Name");
            let city = component.get("v.City");
            let country = component.get("v.Country");

            let search = component.get("c.getAccounts");

            search.setParam("name", name);
            search.setParam("city", city);
            search.setParam("country", country);

            search.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS") {
                   component.set("v.Accounts", response.getReturnValue());

                   let selectedAccount = component.get("v.SelectedAccount");
                   let accountToSend = component.get("v.Accounts")[selectedAccount];

                              let searchToMapEvent = $A.get("e.c:Auto_DepartmentEdit");
                                                   console.log('searchToMapEvent'+ searchToMapEvent);

                              searchToMapEvent.setParam("OneAccount", accountToSend);

                              searchToMapEvent.fire();
                }
            });
            $A.enqueueAction(search);
        }
    }
})