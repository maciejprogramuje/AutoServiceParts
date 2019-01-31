({
   jsLoaded : function(component, event, helper) {
        let map = L.map('map', {zoomControl: false}).setView([51.5, -0.09], 2);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map);

        component.set("v.map", map);
   },

   handleOneDepartment: function(component, event, helper){
        let oneAccount = event.getParam("OneAccount");
        component.set("v.OneAccount", oneAccount);
        let map = component.get("v.map");

        let allMarkers = component.get("v.allMarkers");
        allMarkers.clearLayers();

        if(oneAccount.BillingLatitude != null && oneAccount.BillingLongitude != null) {
            map.flyTo([oneAccount.BillingLatitude, oneAccount.BillingLongitude], 8);

                    allMarkers = L.featureGroup([L.marker([oneAccount.BillingLatitude, oneAccount.BillingLongitude]).addTo(map)
                        .bindPopup(oneAccount.BillingCity + " " + oneAccount.BillingCountry)]);
                    component.set("v.allMarkers", allMarkers);

                    allMarkers.addTo(map);
        }

        component.set("v.map", map);
   },

   handleDisplayAllDepartments: function(component, event, helper){
        let allAccountsJson = event.getParam("AccountsToMap");
        let allAccounts = JSON.parse(allAccountsJson);
        let allMarkers = [];

        for(let i = 0; i < allAccounts.length; i++) {
            if(allAccounts[i].BillingLongitude != null && allAccounts[i].BillingLatitude != null) {
                let marker = L.marker([allAccounts[i].BillingLatitude, allAccounts[i].BillingLongitude])
                                .bindPopup(allAccounts[i].BillingCity + " " + allAccounts[i].BillingCountry);

                allMarkers.push(marker);
            }
        }

        let map = component.get("v.map");

        let group = L.featureGroup(allMarkers);
        component.set("v.allMarkers", group);

        group.addTo(map);

        map.fitBounds(group.getBounds());

        component.set("v.map", map);
   },

   handleSearchDepartment: function(component, event, helper){
        let map = component.get("v.map");
        let allMarkers = component.get("v.allMarkers");
        allMarkers.clearLayers();

        map.flyTo([51.5, -0.09], 2);

        component.set("v.map", map);
   },

   toastInfo2: function(component, event, helper){
        let oneAccount = event.getParam("OneAccount");
              component.set("v.OneAccount", oneAccount);
              let map = component.get("v.map");
              let allMarkers = component.get("v.allMarkers");
              allMarkers.clearLayers();
              console.log('oneAccount.BillingLatitude' + oneAccount.BillingLatitude);
              console.log('oneAccount.BillingLatitude' + oneAccount.BillingCity);

              if(oneAccount.BillingLatitude != null && oneAccount.BillingLongitude != null) {
                        map.flyTo([oneAccount.BillingLatitude, oneAccount.BillingLongitude], 8);
                      allMarkers = L.featureGroup([L.marker([oneAccount.BillingLatitude, oneAccount.BillingLongitude]).addTo(map)
                          .bindPopup(oneAccount.BillingCity + " " + oneAccount.BillingCountry)]);
                      component.set("v.allMarkers", allMarkers);

                      allMarkers.addTo(map);
          }
          component.set("v.map", map);
      }
})