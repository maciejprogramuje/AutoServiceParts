({
    clickSearch: function(component, event, helper) {
        let name = component.get("v.Name");
        let country = component.get("v.Country");
        let city = component.get("v.City");

        let searchEvent = $A.get("e.c:Auto_SearchEvnt");
        searchEvent.setParam("Name", name);
        searchEvent.setParam("Country", country);
        searchEvent.setParam("City", city);

        searchEvent.fire();
    },
    clickClear: function(component, event, helper) {

    },
    clickNew: function(component, event, helper) {

    }
})