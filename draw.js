var draw = function(id, mapOptions, positions) {

  var map = new google.maps.Map(document.getElementById(id),
      mapOptions);

  var myLatlng = new google.maps.LatLng(40.7293, -73.9906);

  //set up some empty arrays to use
  var markers = [];
  var infoWindows = [];
  var popUps = [];

  //create all of the markers on the map
  for (i in positions) {

    // To add the marker to the map, use the 'map' property
    markers[i] = new google.maps.Marker({
        position: positions[i].map,
        map: map,
        title:"The location of the " + positions[i].title
        // icon: 'http://placehold.it/24x50' //url to images
    });

  }

  //loop through the markers, and add pop-up windows to them
  for (i in markers) {

    //create a template with two placeholder to replace
    var popUpTemplate = '<div class="content">{{html}}<a href="{{link}}">{{content}}</a></div>';

    //replace the content placeholder
    popUps[i] = popUpTemplate.replace('{{content}}', positions[i].title);

    //replace the link placeholder
    popUps[i] = popUps[i].replace('{{link}}', positions[i].link);

    //replace the html placeholder

    if(positions[i].html != undefined) {
      popUps[i] = popUps[i].replace('{{html}}', positions[i].html);
    } else {
      popUps[i] = popUps[i].replace('{{html}}', '');
    }

    //create a new info window
    infoWindows[i] = new google.maps.InfoWindow({
      //the contents is the string-replaced template we created within this loop
      content:popUps[i]
    });

    //when a marker is clicked on
    google.maps.event.addListener(markers[i], 'click', function() {
      return function() {
        for (i in markers) {
          window.open(positions[i].link);
        }

      }
    }(i));

    google.maps.event.addListener(markers[i], 'mouseover', function(innerKey) {
      return function() {
          //comment out the for loop persist each info window
          // for (j in markers) {
          //   infoWindows[j].close(map, markers[j]);
          // }

          //open the infoWindow related to the marker clicked on
          infoWindows[innerKey].open(map, markers[innerKey]);

      }
    }(i));


    google.maps.event.addListener(markers[i], 'mouseout', function(innerKey) {
      return function() {
          //comment out the for loop persist each info window
          for (j in markers) {
            infoWindows[j].close(map, markers[j]);
          }

          //open the infoWindow related to the marker clicked on
          infoWindows[innerKey].close(map, markers[innerKey]);

      }
    }(i));



  }
} //end of the initiazlize function
