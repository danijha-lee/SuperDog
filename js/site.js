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

buildDropDown()

//build a dropdown of distinct cities
function buildDropDown() {
  
    let eventDD = document.getElementById("eventDropDown");

    //clear out the drop down
    eventDD.innerHTML = "";
    //Get the template
    let ddTemplate = document.getElementById("cityDd-template");

    let curEvents = events;

    //get unique values from the array
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let ddItemNode = document.importNode(ddTemplate.contentEditable, true);
    
    let ddItem = ddItemNode.querySelector("a");
    //<li> <a class = "dropdown-item" onclick ="getEvents(this)"></a></li>
    
    ddItem.setAttribute("data-string", "All");
   //<li> <a class = "dropdown-item" data-string="All" onclick ="getEvents(this)"></a></li>

    ddItem.textContent = "All";
     //<li> <a class = "dropdown-item" data-string="All"  onclick ="getEvents(this)">All</a></li>
    
    eventDD.appendChild(ddItem);
}