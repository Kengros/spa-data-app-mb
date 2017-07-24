/*
Copyright (c) 2016, BrightPoint Consulting, Inc.

This source code is covered under the following license: http://vizuly.io/license/

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// @version 1.1.44

//**************************************************************************************************************
//
//  This is a test/example file that shows you one way you could use a vizuly object.
//  We have tried to make these examples easy enough to follow, while still using some more advanced
//  techniques.  Vizuly does not rely on any libraries other than D3.  These examples do use jQuery and
//  materialize.css to simplify the examples and provide a decent UI framework.
//
//**************************************************************************************************************

var viz;                // vizuly ui object
var data;               // holds our data
var viz_container;      // html element that holds the viz (d3 selection)
var viz_title;          // title element (d3 selection)
var theme;              // Theme variable to be used by our viz.

// Use jQuery to see when document is loaded
function loadData() {
    // Here we grab our data via the <code>d3.json</code> utility.
    d3.csv("data/linearea_stocks.csv", function (csv) {

        // We have to do some prep on the data to create make it ready for our display
        // The data comes in as one set of rows, but the linearea chart expects each series (line/area)
        // to come in its own array, so we use filter to seperate out the data.
        // We also need to clean the data to make sure the data values are of the appropriate value type

        // Parser we use to convert string values into date values
        var parse = d3.time.format("%m/%d/%Y %H:%M").parse;
        var series=[];
        //%H:%M:%S
        // Our filters
        //var google = csv.filter(function (d) { return (d.symbol == "GOOGL")}).slice(1,300);
        var apple = csv.filter(function (d) { return (d.symbol == "AAPL")}).slice(1,300);
        var adobe = csv.filter(function (d) { return (d.symbol == "ADBE")}).slice(1,300);
        var msft = csv.filter(function (d) { return (d.symbol == "MSFT")}).slice(1,300);
        //var amzn = csv.filter(function (d) { return (d.symbol == "AMZN")}).slice(1,300);

        series.push(apple,adobe,msft);

        // Cleaning data to create appropriate value types
        series.forEach(function (company) {
            company.forEach(function (row) {
                row.date = parse(row.date);
                row.Close = Number(row.Close);
                row.High = Number(row.High);
                row.Low = Number(row.Low);
                row.Open = Number(row.Open);
                row.Volume = Number(row.Volume);
            })
        });

        data=series;

        initialize();
    });

}

// Vizuly follows an almost identical function chaining syntax as that of D3.  If you know D3, vizuly will feel familiar to you,
// and if you are new to D3, programming vizuly will be a good introduction.
//
// In this routine we create our viz, set various properties, create a title and
// update the display.
//
function initialize() {

    // Determine our screen size so we can dynamically set our display containers
    var rect = document.body.getBoundingClientRect();
    var screenWidth = (rect.width < 960) ? Math.round(rect.width * .95) : Math.round((rect.width - 210) * .95);
    var screenHeight = Math.min(window.innerHeight * 0.75, screenWidth);

    //Here we set our <code>viz</code> variable by instantiating the <code>vizuly.viz.corona</code> function.
    //All vizuly components require a parent DOM element at initialization so they know where to inject their display elements.
    viz = vizuly.viz.linearea(document.getElementById("viz_container"));


    //Using the function chain syntax we can now set various properties of the bar chart.
    //
    //Both the <code>x</code> and <code>y</code> properties are used to map the data values
    //to the corresponding x and y axis within the chart.
    viz.data(data)
        .width(800).height(600)                     // initial component display size
        .y(function (d, i) { return d.Volume; })    // property for y axis plot
        .x(function (d, i) { return d.date; })      // property for x axis plot
        .on("update",onUpdate)                      // callback for update event
        .on("zoom",zoom)                            // callback for zoom event
        .on("mouseover",onMouseOver)                // callback for mouseover event
        .on("mouseout",onMouseOut)                  // callback for mouseout event
        .on("measure", onMeasure);                  // callback for measure event


    //** Themes and skins **  play a big role in vizuly, and are designed to make it easy to make subtle or drastic changes
    //to the look and feel of any component.   Here we choose a theme and skin to use for our bar chart.
    // *See this <a href=''>guide</a> for understanding the details of themes and skins.*
    theme = vizuly.theme.linearea(viz).skin(vizuly.skin.LINEAREA_BUSINESS);

    //The <code>viz.selection()</code> property refers to the parent
    //container that was used at the object construction.  With this <code>selection</code> property we can use D3
    //add, remove, or manipulate elements within the component.  In this case we add a title label and heading to our chart.
    viz_title = viz.selection()
        .select("svg")
        .append("text")
        .attr("class", "title")
        .attr("x", viz.width() / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .style("fill", "#FFF")
        .style("font-weight",300).text("");


    // Update the yAxis ticks function to show currency.
    viz.yAxis().tickFormat(function (d) { return "On";});

    // Update viz to appropriate size
    changeSize(d3.select("#currentDisplay").attr("item_value"));

    /*
    // This code is for the purposes of the demo and simply cycles through the various skins
    // The user can stop this by clicking anywhere on the page.
    var reel = vizuly.showreel(theme,['Sunset','Ocean','Neon','Business'],2000).start();
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

// Each tie the viz fires its update event we want to change the title color based on the selected skin
function onUpdate() {
    viz_title.style("fill", theme.skin().labelColor);
}

// Update the YAxis lines horizontally across the chart background.
function onMeasure() {
    viz_title.attr("x", viz.width() / 2);
    viz.xAxis().tickFormat(vizuly.format.YEAR_Mon_MonDay);
}

// When the user mouses over a given data point we want to create a datatip.
function onMouseOver(d,i) {

    // Make sure we have removed any previous tips
    viz.selection().selectAll(".my-tip").remove();

    // Dynamically calcuclate the font size.
    var fontSize=Math.round(Math.min(viz.width()/45,viz.height()/45));

    // Get a reference to the tip holder
    var g = d3.select(this);

    // Add the date
    var t = g.append("text")
        .attr("class","my-tip")
        .attr("y",-fontSize*3.2)
        .style("font-size",fontSize + "px")
        .style("text-anchor","middle")
        .style("shape-rendering","auto")
        .style("fill","#FFF")
        .style("stroke","none")
        .style("font-size",fontSize)
        .style("font-weight",200)
        .style("opacity",.6)
        .style("pointer-events","none")
        .text(function () { return d3.time.format("%b %d, 20%y")(d.date)});

    // Add series name and value amount
    var t2 = g.append("text")
        .attr("class","my-tip")
        .attr("y",-fontSize*2.5+fontSize*1.5)
        .style("font-size",fontSize + "px")
        .style("text-anchor","middle")
        .style("shape-rendering","auto")
        .style("fill","#FFF")
        .style("stroke","none")
        .style("font-size",fontSize)
        .style("font-weight",200)
        .style("pointer-events","none")
        .text(function () { return d.name + ": " + formatTip(viz.y()(d))});;

    var t3 = g.append("text")
        .attr("class","my-tip")
        .attr("y",-fontSize*2.5+fontSize*0.35)
        .style("font-size",fontSize + "px")
        .style("text-anchor","middle")
        .style("shape-rendering","auto")
        .style("fill","#FFF")
        .style("stroke","none")
        .style("font-size",fontSize)
        .style("font-weight",200)
        .style("pointer-events","none")
        .text(function () { return d3.time.format("%X %p")(d.date)});

    // See how long the text is for the name/value amount
    var rw = Math.max(t[0][0].getBoundingClientRect().width,t2[0][0].getBoundingClientRect().width,t3[0][0].getBoundingClientRect().width);

    // Position a semi-transparent box behind the text elements.
    g.insert("rect","text")
        .attr("class","my-tip")
        .style("fill","#000")
        .style("shape-rendering","auto")
        .style("fill-opacity",.8)
        .style("pointer-events","none")
        .attr("y",-fontSize*4.35)
        .attr("x",-rw/2 - 5)
        .attr("rx",3)
        .attr("width",rw+12)
        .attr("height",fontSize*4);

}

// Remove any data tips when we mouseout.
function onMouseOut(d,i) {
    viz.selection().selectAll(".my-tip").remove();
}

//
// Functions used by the test container to set various properties of the viz
//
function changeSkin(val) {
    if (!val) return;
    theme.skin(val);
    viz.update();
}

//Updates the chart layout for either Stacked or Clustered.
function changeLayout(val) {
    viz.layout(val).update();
}

function changeShape(val) {
    viz.interpolate(val).update();
}

function changeSize(val) {
    var s = String(val).split(",");
    viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
    viz.width(s[0]).height(s[1]).update();
}

function changeZoom(val) {
    viz.zoom(viz.zoom().scale(val));
    d3.select("#zoomLabel").text("Zoom " + val + "x");
}

// Sets the zoom level of the line chart externally.
function zoom() {
    d3.select("#zoomLabel").text(Math.round(viz.zoom().scale()*100)/100 + "x");
}

var field="Volume";
function changeField(val) {
    field=val;
    if (val == "Volume") {
        viz.yAxis().tickFormat(function (d) { return "On";});
    }
    else {
        viz.yAxis().tickFormat(function (d) { return "On";});
    }

    viz.y(function (d,i) { return d[val]})
        .update();
}

function formatTip(val) {
    return "On";
}









