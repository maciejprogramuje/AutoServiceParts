({
    handleSearchPart : function(component, event, helper) {
        let searchText = component.get('v.searchPart');
        let action = component.get('c.searchForParts');

        action.setParams({searchText: searchText});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let ids = response.getReturnValue();
                sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));

                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/parts-search-results'});
                navEvt.fire();
            }
        });
        $A.enqueueAction(action);
    }
})