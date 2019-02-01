({
    handleEmployeesFromDepartment: function(component, event, handler) {
        console.log("start handleEmployeesFromDepartment");


        let action = component.get("c.getEmployees");
        action.setParam("departmentId", component.get("v.OneAccount.Id"));

        action.setCallback(this, function(response) {
             let state = response.getState();
             if (state === "SUCCESS") {
                 component.set("v.Employees", response.getReturnValue());
             } else {
                 console.log("handleEmployeesFromDepartment Failed with state: " + state);
             }
        });
        $A.enqueueAction(action);
    },

    newEmployee: function(component, event, handler) {
        let action = component.get("c.addNewEmployee");
        action.setParam("departmentId", component.get("v.OneAccount.Id"));
        action.setParam("userId", "aaaa");

        action.setCallback(this, function(response) {
             let state = response.getState();
             if (state === "SUCCESS") {


             } else {
                 console.log("newEmployee Failed with state: " + state);
             }
        });
        $A.enqueueAction(action);

        let action2 = component.get("c.getEmployees");
        action2.setParam("departmentId", component.get("v.OneAccount.Id"));

        action2.setCallback(this, function(response) {
             let state = response.getState();
             if (state === "SUCCESS") {
                 component.set("v.Employees", response.getReturnValue());
             } else {
                 console.log("handleEmployeesFromDepartment Failed with state: " + state);
             }
        });
        $A.enqueueAction(action2);
    },

    openModal: function(component, event, helper) {
        let action3 = component.get("c.getUsers");

                action3.setCallback(this, function(response) {
                     let state = response.getState();
                     if (state === "SUCCESS") {
                         component.set("v.Users", response.getReturnValue());
                     } else {
                         console.log("handleEmployeesFromDepartment Failed with state: " + state);
                     }
                });
                $A.enqueueAction(action3);



        component.set("v.IsOpenNewEmployees", true);
    },

    closeModal: function(component, event, helper) {
        component.set("v.IsOpenNewEmployees", false);
    }
})