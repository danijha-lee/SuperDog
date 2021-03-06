let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]



//build a dropdown of distinct cities
function buildDropDown() {
  
    let eventDD = document.getElementById("eventDropDown");

    //clear out the drop down
    eventDD.innerHTML = "";
    //Get the template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    
    //get unique values from the array
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let ddItemNode = document.importNode(ddTemplate.content, true);
    
    let ddItem = ddItemNode.querySelector("a");
    //<li> <a class = "dropdown-item" onclick ="getEvents(this)"></a></li>
    
    ddItem.setAttribute("data-string", "All");
   //<li> <a class = "dropdown-item" data-string="All" onclick ="getEvents(this)"></a></li>

    ddItem.textContent = "All";
     //<li> <a class = "dropdown-item" data-string="All"  onclick ="getEvents(this)">All</a></li>
    
    eventDD.appendChild(ddItemNode);

    for (let index = 0; index < distinctEvents.length; index++) {
       ddItemNode= document.importNode(ddTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[index]);
        ddItem.textContent = distinctEvents[index];
        eventDD.appendChild(ddItemNode);
        
    }
    //display stats for all events
    displayStats(curEvents);
    
    displayData();
}

//displays data for the current events
function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

     eventBody.innerHTML = "";
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = new Date(
            curEvents[index].date).toLocaleString();
        
        eventBody.appendChild(eventRow);
            
    }
}
//display stats for the filtered events "array"
function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;
    
    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
            
        }if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
        
    }
    //calculate the events for the selected City
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    )
    document.getElementById("least").innerHTML = least.toLocaleString();
}

//get the events for the selected City
function getEvents(ddElement) {
    
    let cityName = ddElement.getAttribute("data-string");
   
     let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    let filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} Events`

    if (cityName != "All") {
        filteredEvents = curEvents.filter(function (item) {
           if (item.city == cityName) {
               return item;
           } 
        })
        
    }
    displayStats(filteredEvents);
}

//save event to local storage
function saveData() {
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    let stateSelect = document.getElementById("newEventState");
    let eventDate = document.getElementById("addDate").value;
    let eventDate2 = `${eventDate} 00:00`;
    let newEvent =
    {
        event: document.getElementById("addEventName").value,
        city: document.getElementById("addCity").value,
        state: stateSelect.options[stateSelect.selectedIndex].text,
        attendance: parseInt(document.getElementById("addAttendance").value, 10),
        date: new Date(eventDate2).toLocaleDateString()

    };
    
    //push this object we just created to the curEvents array
    curEvents.push(newEvent);
    //Save Changes to the DataBase (local Storage)
    localStorage.setItem("eventData", JSON.stringify(curEvents));
    
    buildDropDown();
    displayData();
    
    swal({
        title: "Thank You!",
        text: `Your Event ${newEvent.event}  has been added!`,
        icon: "success",
    });
  
}

// function dismissModal(){
// $('#exampleModal').modal('hide');
// }