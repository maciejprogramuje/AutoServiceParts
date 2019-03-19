({
    init: function(component, event, helper) {
        let idsJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(idsJson)) {
            let ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('customSearch--recordIds');
        }
    }
})