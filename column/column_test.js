


$(document).ready(function getSavings() {

    var baseUrl = $('#stage_select').find(":selected").val();

    //$('#date-output').html("UTC date now: " + moment.utc().format());
    //var url = baseUrl + "/savings/acunits/41c278ce-4573-4eb4-9b71-7dcbbacf97a5/random";
    //var url = baseUrl + "/savings/acunits/" + acid;
    var url = baseUrl + "/savings/acunits/78505ce4-8336-430d-bb1a-0f7f97b03853/random";

    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var data = {"email" : username , "password" : password};
    //$('#output').append("request " + url + "\n");
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        async: true,
        beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Basic ' + btoa(username + ':' + password));
        },
        success: function (res) {
        $('#output').append(JSON.stringify(res));
        
        //Start JSON Parser
        var firstDivContent = document.getElementById('output');
        var array = firstDivContent.innerHTML;
        var all =  eval("(function(){return " + array + ";})()");
        //Var for savings $
        var savings_total = all.totalSavings;
        var total_round = Math.ceil(savings_total * 100)/100;
        var savings_sun = all.savings[0].savedMoney;
        var rounded_sun = Math.ceil(savings_sun * 100)/100;
        var savings_mon = all.savings[1].savedMoney;
        var rounded_mon = Math.ceil(savings_mon * 100)/100;
        var savings_tues = all.savings[2].savedMoney;
        var rounded_tues = Math.ceil(savings_tues * 100)/100;
        var savings_wed = all.savings[3].savedMoney;
        var rounded_wed = Math.ceil(savings_wed * 100)/100;
        var savings_thu = all.savings[4].savedMoney;
        var rounded_thu = Math.ceil(savings_thu * 100)/100;
        var savings_fri = all.savings[5].savedMoney;
        var rounded_fri = Math.ceil(savings_fri * 100)/100;
        var savings_sat = all.savings[6].savedMoney;
        var rounded_sat = Math.ceil(savings_sat * 100)/100;
        //Var for daily run
        var savings_run_sun = all.savings[0].savedRunSeconds;
        var run_round_sun = Math.ceil(savings_run_sun /3600);
        var savings_run_mon = all.savings[1].savedRunSeconds;
        var run_round_mon = Math.ceil(savings_run_mon /3600);
        var savings_run_tues = all.savings[2].savedRunSeconds;
        var run_round_tues = Math.ceil(savings_run_tues /3600);
        var savings_run_wed = all.savings[3].savedRunSeconds;
        var run_round_wed = Math.ceil(savings_run_wed /3600);
        var savings_run_thu = all.savings[4].savedRunSeconds;
        var run_round_thu = Math.ceil(savings_run_thu /3600);
        var savings_run_fri = all.savings[5].savedRunSeconds;
        var run_round_fri = Math.ceil(savings_run_fri /3600);
        var savings_run_sat = all.savings[6].savedRunSeconds;
        var run_round_sat = Math.ceil(savings_run_sat /3600);
        //Var for KwH
        var savings_KwH_sun = all.savings[0].kwhSaved;
        var KwH_round_sun = Math.ceil(savings_KwH_sun /60);
        var savings_KwH_mon = all.savings[1].kwhSaved;
        var KwH_round_mon = Math.ceil(savings_KwH_mon /60);
        var savings_KwH_tues = all.savings[2].kwhSaved;
        var KwH_round_tues = Math.ceil(savings_KwH_tues /60);
        var savings_KwH_wed = all.savings[3].kwhSaved;
        var KwH_round_wed = Math.ceil(savings_KwH_wed /60);
        var savings_KwH_thu = all.savings[4].kwhSaved;
        var KwH_round_thu = Math.ceil(savings_KwH_thu /60);
        var savings_KwH_fri = all.savings[5].kwhSaved;
        var KwH_round_fri = Math.ceil(savings_KwH_fri /60);
        var savings_KwH_sat = all.savings[6].kwhSaved;
        var KwH_round_sat = Math.ceil(savings_KwH_sat /60);
        //Parsed display data

/*
 Copyright (c) 2016, BrightPoint Consulting, Inc.

 This source code is covered under the following license: http://vizuly.io/license/

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// @version 1.0.35

//**Getting runing with Vizly is as simple** as including
// <code>d3.js.min</code> and <code>vizuly.js.min</code> in your html and the following line in your javascript:
//
// <code>vizuly.component.bar(myElement).data(myData).update();</code>
//
// Thats it.
//
// But, for a slightly more in-depth look, I recommend getting familiar with the example files included for each of the packages you purchased.
// These example files were designed to validate the features and functionality of each component. They also serve as
// introduction to vizuly component programming. For this tutorial we will use the bar chart component and be referencing.
// the <code>BarChart.html</code> and <code>BarChart.js</code> file.

// Locate the <code>**bar/BarTest.html**</code> and <code>**bar/bar_test.js**</code> files in the root directory of the software download.
// Open this file with your browser, Chrome is recommended.  If you are not running a local web server you may
// need to set a browser flag to allow local file access (to load the sample data.)   Here are some helpful tips
// for using local file access with chrome for
// <a href='http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/'>Mac</a>
// and <a href='http://chrisbitting.com/2014/03/04/allow-local-file-access-in-chrome-windows/'>Windows</a>
//
// Validate that the test file works and you can toggle through the various layout and property options.
//
// **Our first look**
//
// Take a look at the <code>BarChart.html</code> file and you will notice several debug source scripts that have been
// commented out, as well as the <code>vizuly_core.min.js</code> and <code>vizuly_bar.min.js</code> scripts.   If you want to
// debug the specific components of vizuly, simply comment out the <code>min.js</code> files and uncomment the debug files.
// You will now be able to step through all of the source code. The materialize and jQuery libraries are for the test container only
// and vizuly does not rely upon them.
//
// The easiest way to understand vizuly is to walk through the test container code and see how the bar chart is
// implemented. So lets take a look at just a 100 lines of code or so and see how things work.

// **Starting off**, we do a little bit of house cleaning and set up the test container page with some global variables.
// Once that is done we load the data via D3 and call our initialize routine.
var viz, viz_container, viz_title, data, theme, screenWidth;

function loadData() {
    //Here we grab our data via the <code>d3.json</code> utility.
    d3.json("data/column_olympics.json", function (json) {
        data = json;
        initialize();
    });
}
//** Creating your first bar chart **

//Vizuly follows an almost identical function chaining syntax as that of D3.  If you know D3, vizuly will feel familiar to you,
// and if you are new to D3, programming vizuly will be a good introduction.
//
//In this routine we create our bar chart, set various properties, create a title and
//update the display.
//
function initialize() {

    //Here we set our <code>viz</code> variable by instantiating the <code>vizuly.component.bar</code> function.
    //All vizuly components require a parent DOM element at initialization so they know where to inject their display elements.
    viz = vizuly.component.column(document.getElementById("viz_container"));

    //Using the function chain syntax we can now set various properties of the bar chart.
    //
    //Both the <code>x</code> and <code>y</code> properties are used to map the data values
    //to the corresponding x and y axis within the chart.
var a = 
[
  [
    {
      "country": "Monday",
      "category": "Money",
      "value": rounded_mon
    },
    {
      "country": "Tuesday",
      "category": "Money",
      "value": rounded_tues,
    },
    {
      "country": "Wednesday",
      "category": "Money",
      "value": rounded_wed,
    },
    {
      "country": "Thursday",
      "category": "Money",
      "value": rounded_thu,
    },
    {
      "country": "Friday",
      "category": "Money",
      "value": rounded_fri,
    },
    {
      "country": "Saturday",
      "category": "Money",
      "value": rounded_sat,
    },
    {
      "country": "Sunday",
      "category": "Money",
      "value": rounded_sun,
    }
  ],
  [
    {
      "country": "Monday",
      "category": "KwH",
      "value": KwH_round_mon,
    },
    {
      "country": "Tuesday",
      "category": "KwH",
      "value": KwH_round_tues,
    },
    {
      "country": "Wednesday",
      "category": "KwH",
      "value": KwH_round_wed,
    },
    {
      "country": "Thursday",
      "category": "KwH",
      "value": KwH_round_thu,
    },
    {
      "country": "Friday",
      "category": "KwH",
      "value": KwH_round_fri,
    },
    {
      "country": "Saturday",
      "category": "KwH",
      "value": KwH_round_sat,
    },
    {
      "country": "Sunday",
      "category": "KwH",
      "value": KwH_round_sun,
    }
  ],
  [
    {
      "country": "Monday",
      "category": "Runtime",
      "value": run_round_mon,
    },
    {
      "country": "Tuesday",
      "category": "Runtime",
      "value": run_round_tues,
    },
    {
      "country": "Wednesday",
      "category": "Runtime",
      "value": run_round_wed,
    },
    {
      "country": "Thursday",
      "category": "Runtime",
      "value": run_round_thu,
    },
    {
      "country": "Friday",
      "category": "Runtime",
      "value": run_round_fri,
    },
    {
      "country": "Saturday",
      "category": "Runtime",
      "value": run_round_sat,
    },
    {
      "country": "Sunday",
      "category": "Runtime",
      "value": run_round_sun,
    }
  ]
]
;
    viz.data(a)
        .width(screenWidth).height(390)     //initial component display size
        .y(function (d, i)
            { return Number(d.value); })    //property for x axis plot
        .x(function (d, i)
            { return d.country; })          //property for y axis plot
        .padding(0.2)                       //spacing between bars
        .on("update",onUpdate)              //fires every time viz is updated
        .on("zoom",zoom)                    //handles zoom event
        .on("mouseover",onMouseOver)        //handles mouse over event
        .on("mouseout",onMouseOut)          //handles mouse out event
        .on("measure", onMeasure);          //handles measure event


    //** Themes and skins **  play a big role in vizuly, and are designed to make it easy to make subtle or drastic changes
    //to the look and feel of any component.   Here we choose a theme and skin to use for our bar chart.
    // *See this <a href=''>guide</a> for understanding the details of themes and skins.*
    theme = vizuly.theme.column_bar(viz)
        .skin(vizuly.skin.COLUMNBAR_AXIIS);

    //T he <code>viz.selection()</code> property refers to the parent
    // container that was used at the object construction.  With this <code>selection</code> property we can use D3
    // add, remove, or manipulate elements within the component.  In this case we add a title label to our chart.
    viz_title = viz.selection()
        .select("svg")
        .append("text")
        .attr("class", "title")
        .attr("x", viz.width() / 2)
        .attr("y", 25).attr("text-anchor", "middle")
        .style("fill", "#FFF")
        .style("font-weight",300)
        .text("Mistbox Weekly Savings");

    //The <code>viz.update()</code> function tells the component to render itself to the display.
    //Any property changes that have occurred since the last update (including changes to the data) will now be rendered.
    viz.update();

    /*
    //This code is for the purposes of the demo and simply cycles through the various skins
    //The user can stop this by clicking anywhere on the page.
    var reel = vizuly.showreel(theme,['MaterialPink','MaterialBlue'],2000).start();
    var stopReel = function () {
        //Stop show reel
        reel.stop();
        //Remove event listeners
        d3.select("body").on("mousedown.reel",null);
        d3.select("body").on("wheel.reel",null);
    }

    // We need a two event listeners to stop the reel (because of the zoom operation)
    d3.select("body").on("mousedown.reel",stopReel);
    d3.select("body").on("wheel.reel",stopReel);
    */

}

//That's really all there is to getting up and running with vizuly.  Below you will find some additional functionality that may find
//helpful as well.

//** Making your own datatip **

// Data tips can be simple roll-overs that show a single value, or complex visualizations in themselves; showing charts and other data
// when the user clicks or moves the mouse over certain visualization display elements .
// Because there is no one size fits all, vizuly provides the hooks for you to create and manage data tips any way you see fit.
// Below is just one example of how you can do that.



//First we want to capture the <code>mouseover</code> event from the <code>viz</code> object so we know when to display the datatip.
//At the same time we will pass along some event parameters to the data tip so we know where to position it, and what values to show.
//When vizuly components emit a interaction event, they pass the DOM element, associated datum, and the datum index as seen here.
function onMouseOver(bar, d, i) {

    var rect = bar.getBoundingClientRect();
    var x = rect.left + d3.select(bar).attr("width") / 2;
    var y = rect.top;

    setDataTip("myDataTip", d, i, x, y);
}

//For this example we are going to use a simple HTML template for the datatip.  You can also use more complex and dynamic DOM elements declared
//dynamically via javascript or statically within your HTML.
var datatipHtml = "<div style='text-align:left;'><span class='datatip-label'>Gold</span><span class='datatip-value'>000</span><br><span class='datatip-label'>Silver:</span><span class='datatip-value'>000</span><br><span class='datatip-label'>Bronze:</span><span class='datatip-value'>000</span></div>";



//Here is the function that creates and updates the display position and values for the datatip.
function setDataTip(name, datum, index, x, y) {

    //First we look to see if the datatip already exists based on the name parameter.
    var tip = d3.selectAll("#" + name);

    //If the datatip does not exist we then create it here and insert the HTML template defined above.
    if (tip[0].length < 1) {
        tip = d3.select("body").append("div").attr("id", name).style("position", "absolute").style("z-index", 99999);
        tip.html(datatipHtml);
    }

    //Here we update various styles and display measurements of the <code>viz</code> component.
    tip.attr("class", theme.skin().datatip_class)
        .style("width", (Math.max(75, viz.width() / 8) + "px"))
        .style("font-size", function () {
            return Math.max(9, Math.round(viz.width() / 70)) + "px";
        });

    //This is where we set the number of olympic medals in the <code>'.datatip-value' span</code>.
    tip.selectAll(".datatip-value")
        .style("font-weight", function (d, i) {
            return (index == i) ? 400 : 200;
        })
        .style("color", function (d, i) {
            return (index == i) ? theme.skin().color : null;
        })
        .html(function (d, i) {
            return viz.data()[i][getSeriesIndex(datum)].value;
        });

    //Now we show what type of medal (bronze, silver, gold) in the <code>'.datatip-label' span</code>.
    tip.selectAll(".datatip-label")
        .style("font-weight", function (d, i) {
            return (index == i) ? 400 : 200;
        })
        .style("color", function (d, i) {
            return (index == i) ? theme.skin().color : null;
        })
        .html(function (d, i) {
            return viz.data()[i][getSeriesIndex(datum)].category;
        });

    //We add a little logic to position the datatip at the right end of the bar element.
    x = x - tip[0][0].getBoundingClientRect().width / 2;
    y = y - tip[0][0].getBoundingClientRect().height;

    tip.style("left", x + "px").style("top", y + "px");
}

//Here is a quick utility function that tells us what type of medal we are displaying in the datatip
function getSeriesIndex(val) {
    return viz.xScale().domain().indexOf(viz.x().apply(this, [val]));
}

//All we need to do here is remove the datatip when the user moves the mouse away.
function onMouseOut(bar, d, i) {
    removeDataTip("myDataTip")
}

function removeDataTip(name) {
    d3.selectAll("#" + name).remove();
}

//Just a simple function to make sure our title is centered if the <code>viz</code> measurements have changed.
function onMeasure() {
    viz_title.attr("x", viz.width() / 2);
}

//Here are the test container functions that show you how set **various properties** of the <code>vizuly.component.bar</code> component.
//
//We change the skin by passing in a new skin value, which is a string constant declared in the theme itself.
//For the bar chart we have these skins available:
//
//<code>vizuly.skin.COLUMNBAR_AXIIS</code><br>
//<code>vizuly.skin.COLUMNBAR_NEON</code><br>
//<code>vizuly.skin.COLUMNBAR_MATERIALBLUE</code><br>
//<code>vizuly.skin.COLUMNBAR_MATERIALPINK</code>
function changeSkin(val) {
    if (!val) return;
    theme.skin(val);
    viz.selection().selectAll(".vz-bar").attr("height", 0).attr("y", viz.height());
    changeZoom(1);
    viz.update();
}






//Here we do a little animation magic with D3 and set all the bars to a width of <code>0</code>, so when we
//reset the size of the <code>viz</code> and call <code>.udpate()</code>, the bars animate by growing to the appropriate width.
function changeSize(val) {
    var s = String(val).split(",");
    viz.selection().selectAll(".vz-bar").attr("width", 0).attr("x", 0);
    viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
    viz.width(s[0]).height(s[1]).update();

}

//This changes the layout of the bar chart by updating the layout property which is a constant located in the
// <code>src/viz/_viz.js</code> namespace file.  These are the available values:
//
//<code>vizuly.component.layout.CLUSTERED</code><br>
//<code>vizuly.component.layout.STACKED</code><br>
//<code>vizuly.component.layout.OVERLAP</code><br>
//<code>vizuly.component.layout.STREAM</code><br>
function changeLayout(val) {
    viz.layout(val).update();
}



//When the user slides the zoom slider in the test container, this is the routine
//that updates the zoom scale within the bar chart.  The <code>zoom</code> property
//expects a <a href='https://github.com/mbostock/d3/wiki/Zoom-Behavior'><code>d3.behavior.zoom()</code></a> object.
function changeZoom(val) {
    viz.zoom(viz.zoom().scale(val));
    d3.select("#zoomLabel").text("Zoom " + val + "x");
}


//When the user uses the mouse wheel or pinch/zoom touch gesture on the bar chart directly, this function makes sure
//that the test container zoom slider stays updated.!!
function zoom() {
    d3.select("#zoomLabel").text(Math.round(viz.zoom().scale()*100)/100 + "x");
}

//When the component is updated, we want to update the title of the viz
function onUpdate() {
    viz_title.style("fill",theme.skin().labelColor)
}

//**Some other features** to be aware of, are the internal **events** that vizuly exposes to make
//programming easier.
//
// * The <code>.on('initialize')</code> event is executed one time when the object is first constructed and has set up all the static
// DOM display containers.
//
// * The <code>.on('measure')</code> event is executed prior to any <code>viz.update()</code> calls and determines the size of internal display objects.
// This gives the developer a chance to override any internal measurements.  Typically a developer may set special axis properties
// or override some scales prior to rendering.
//
// * The <code>.on('update')</code> event is executed immediately after the component has rendered or updated
// any of the dom display elements, primarily D3 svg objects.
//
// * Vizuly also publishes events any time a public **property changes**.   For instance, you may want to adjust the position of
//  a display element each time the width of the component has changed.  That would be done like so:
//
//  <code> viz.on('width_change',myFunction) </code>
//
//  This applies to all public properties of the component.   To see the public properties of all vizuly components look <a href='coming soon'>here</a>
//
//Vizuly also supports **dynamic margins** with the <code>.margin()</code> property as seen here:
//
//  <code> viz.margin({top:10,bottom:10,left:10,right:10})</code>
//
//  you can also use something like the following
//
//  <code> viz.margin({top:'10%',bottom:'10%',left:'10%',right:'10%'})</code>
//
//  or any combination of fixed and relative margins.
//
//
    //Once the document is ready we set javascript and page settings
    var screenWidth;
    var screenHeight;

    $(document).ready(function () {

        var rect;
        if (self==top) {
            rect = document.body.getBoundingClientRect();
        }
        else {
            rect = document.body.getBoundingClientRect();
        }

        //Set display size based on window size.
        screenWidth = (rect.width < 960) ? Math.round(rect.width*.95) : Math.round((rect.width - 210) *.95);
        screenHeight = 600;

        d3.select("#currentDisplay")
                .attr("item_value", (String(screenWidth) + "," + String(screenHeight)))
                .attr("class", "selected")
                .html("<a>" + screenWidth + "px - " + screenHeight + "px</a>");

        $("#cssmenu").menumaker({
            title: "VIZULY BAR CHART",
            format: "multitoggle"
        });


        // Set the size of our container element.
        viz_container = d3.selectAll("#viz_container")
                .style("width", screenWidth + "px")
                .style("height", screenHeight + "px");

        loadData();


    });

},
        error: function (jqxhr) {
            $('#output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        },
    });
})
