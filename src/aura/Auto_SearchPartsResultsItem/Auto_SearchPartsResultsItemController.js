({
    init: function(component, event, helper) {
        console.log("searchForPartsDetails");

        let recordId = component.get('v.recordId');
        let action = component.get('c.searchForPartsDetails');

        action.setParam("recordId", recordId);
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.partPrice", result);
            }
        });
        $A.enqueueAction(action);
    }
})