({
    clickSearch: function(component, event, helper) {
        let name = component.get("v.Name");
        let country = component.get("v.Country");
        let city = component.get("v.City");

        let searchEvent = $A.get("e.c:Auto_SearchEvnt");
        searchEvent.setParam("Name", name);
        searchEvent.setParam("Country", country);
        searchEvent.setParam("City", city);
        searchEvent.setParam("ClearFields", true);

        searchEvent.fire();
    },

    clickClear: function(component, event, helper) {
            let name = component.set('v.Name', '');
            let city = component.set('v.City', '');
            let country = component.set('v.Country', '');
            let searchEvent = $A.get("e.c:Auto_SearchEvnt");
                   searchEvent.setParam("Name", name);
                   searchEvent.setParam("City", city);
                   searchEvent.setParam("Country", country);
                   searchEvent.setParam("ClearFields", false);
                   searchEvent.fire();
    },

    clickNewAccount: function(component, event, helper) {
        /*let createContact = $A.get("e.force:createRecord");
        createContact.setParams({
            "entityApiName": "Account"
        });
        createContact.fire();*/

        var windowHash = window.location.hash;
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Account",
            "defaultFieldValues": {
                 'Name' : component.get('v.accName')
             },
             "panelOnDestroyCallback": function(event){
                  window.location.hash = windowHash;
              }
        });
        createRecordEvent.fire();
    }
})