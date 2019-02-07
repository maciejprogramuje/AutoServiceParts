({
   jsLoaded : function(component, event, helper) {
        let map = L.map('map', {zoomControl: false}).setView([51.5, -0.09], 2);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map);

        component.set("v.map", map);
   },

   handleOneDepartment: function(component, event, helper){
       helper.oneDepartment(component, event);
   },

   handleDisplayAllDepartments: function(component, event, helper){
       helper.displayAllDepartments(component, event);
   },

   handleSearchDepartment: function(component, event, helper){
       helper.searchDepartment(component, event);
   },

   toastInfo2: function(component, event, helper){
       helper.toastInfo2(component, event);
   }
})