({
    handleEmployeesFromDepartment: function(component, event, handler) {
        let action = component.get("c.getEmployess");
        action.setParam("departmentId", component.get("v.OneAccount.Id"));
        action.setCallback(this, function(response) {
             let state = response.getState();
             if (state === "SUCCESS") {
                 component.set("v.Employees", response.getReturnValue());
             } else {
                 component.set("v.Employees", Array());
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
        console.log('start load users');
        let oneAccount = component.get("v.OneAccount");

        let action3 = component.get("c.getUsers");
        action3.setParam("account", oneAccount);

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
    },

    clickNewEmployee: function(component, event, helper) {
        if(component.get("v.SelectedEmployeeId") != null){
            console.log('clickNewEmployee');
            let toastEvent = $A.get('e.force:showToast');
            let selectedUserId = component.get("v.SelectedEmployeeId");
            console.log('SelectedEmployeeId' + selectedUserId);
            console.log('OneAccount.Id' + component.get("v.OneAccount.Id"));

            let actionAdd = component.get("c.insertEmployee");
            actionAdd.setParam("accountId", component.get("v.OneAccount.Id"));
            actionAdd.setParam("userId", selectedUserId);

            actionAdd.setCallback(this, function(response) {
                 let state = response.getState();
                 if (state === "SUCCESS") {
                         toastEvent.setParams({
                                               'title': 'Success!',
                                               'type': 'success',
                                               'mode': 'dismissable',
                                               'message': 'Employee was saved'
                         });
                         toastEvent.fire();
                         component.set("v.SelectedEmployeeId", null);
                 } else {
                     console.log("newEmployee Failed with state: " + state);
                 }
            });
            $A.enqueueAction(actionAdd);
            component.set("v.IsOpenNewEmployees", false);
        }
    },
    clickSelectOneEmployee: function(component, event, helper) {
            let selectedSection = event.currentTarget;
            let index1 = selectedSection.dataset.id;

            let allAcc = component.get("v.Users");
            allAcc.forEach(function (acc) {

                if(acc.Id != index1) {
                    document.getElementById(acc.Id).classList.remove("changeMeModal");
                } else {
                    document.getElementById(acc.Id).classList.add("changeMeModal");
                }
            })
            console.log('index1');

            component.set("v.SelectedEmployeeId", index1);
                        console.log('index1'+ index1);
            let selectedUserId = component.get("v.SelectedEmployeeId");
            console.log('SelectedEmployeeId >> ' + selectedUserId);
    },

    clickRemoveEmployee: function(component, event, helper) {
        let toastEvent = $A.get('e.force:showToast');
        let selectedUserId = component.get("v.SelectedEmployeeId");
        let actionRemove = component.get("c.deleteEmployees");
            actionRemove.setParam("employeeId", selectedUserId);
            actionRemove.setCallback(this, function(response) {
                 let state = response.getState();
                 if (state === "SUCCESS") {
                      toastEvent.setParams({
                                 'title': 'Success!',
                                 'type': 'success',
                                 'mode': 'dismissable',
                                 'message': 'Employee was deleted'
                            });
                            toastEvent.fire();
                 } else {
                     console.log("newEmployee Failed with state: " + state);
                 }
            });
            $A.enqueueAction(actionRemove);
        component.set("v.IsOpenDeleteModal", false);
        console.log('remove');
    },

    closeDeleteModel: function(component, event, helper) {
        component.set("v.IsOpenDeleteModal", false);
    },

    openDeleteModel: function(component, event, helper) {
        component.set("v.IsOpenDeleteModal", true);

         let selectedSection = event.currentTarget;
                let index1 = selectedSection.dataset.id;
                                    console.log('index1 remove ' + index1);

                     let allAcc = component.get("v.Employees");
                     allAcc.forEach(function (acc) {

                         console.log('acc.Id : ' + acc.Id);
                         console.log('index1 : ' + index1);

                         if(acc.Id != index1) {
                             document.getElementById(acc.Id).classList.remove("changeMeModal");
                         } else {
                             document.getElementById(acc.Id).classList.add("changeMeModal");
                         }
         })
         component.set("v.SelectedEmployeeId", index1);
    },

    setCurrentId: function(component, event, helper) {
    let selectedSection = event.currentTarget;
         let index1 = selectedSection.dataset.id;
                             console.log('index1 remove ' + index1);

              let allAcc = component.get("v.Employees");
              allAcc.forEach(function (acc) {
                  if(acc.Id != index1) {
                      document.getElementById(acc.Id).classList.remove("changeMeModal");
                  } else {
                      document.getElementById(acc.Id).classList.add("changeMeModal");
                  }
         })
         component.set("v.SelectedEmployeeId", index1);
    },
    handleRefreshAfterToastInfo: function(component, event, helper) {
             let toastMessageParams = event.getParams();
             let message = toastMessageParams.message;
             if (message.includes('Employee')) {
                   let action = component.get("c.getEmployess");
                        action.setParam("departmentId", component.get("v.OneAccount.Id"));

                        console.log("component.get" + component.get("v.OneAccount.Id"));

                        action.setCallback(this, function(response) {
                             let state = response.getState();
                             if (state === "SUCCESS") {
                                 component.set("v.Employees", response.getReturnValue());
                             } else {
                                 component.set("v.Employees", Array());
                                 console.log("handleEmployeesFromDepartment Failed with state: " + state);
                             }
                        });
                        $A.enqueueAction(action);
             }
    },
    handleOneDepartment: function(component, event, helper) {
            let oneAccount = event.getParam("OneAccount");
            component.set("v.OneAccount", oneAccount);
    }
})