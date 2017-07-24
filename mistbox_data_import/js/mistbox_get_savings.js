
var el;

$(document).ready(function () {
    console.log("ready!");
    el = {
        getSavings: $('#get-savings'),
        btnAction: $('#get-status'),
        btnClear: $('#clear_console'),
        input: $('#input'),
        result: $('#output')
    };

    $("#get-savings").click(function () {
        getSavings();
        
        
    });

    $("#get-status").click(function () {
        getData();
    });

    $("#clear_console").click(function () {
        $('#output').html('');
        $('#date-output').html('');
    });


});


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
        var run_round_sun = Math.ceil(savings_run_sun /60);
        var savings_run_mon = all.savings[1].savedRunSeconds;
        var run_round_mon = Math.ceil(savings_run_mon /60);
        var savings_run_tues = all.savings[2].savedRunSeconds;
        var run_round_tues = Math.ceil(savings_run_tues /60);
        var savings_run_wed = all.savings[3].savedRunSeconds;
        var run_round_wed = Math.ceil(savings_run_wed /60);
        var savings_run_thu = all.savings[4].savedRunSeconds;
        var run_round_thu = Math.ceil(savings_run_thu /60);
        var savings_run_fri = all.savings[5].savedRunSeconds;
        var run_round_fri = Math.ceil(savings_run_fri /60);
        var savings_run_sat = all.savings[6].savedRunSeconds;
        var run_round_sat = Math.ceil(savings_run_sat /60);
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

 MIT LICENSE:

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 */

// @version 1.0.20

//**************************************************************************************************************
//
//  This is a test/example file that shows you one way you could use a vizuly object.
//  We have tried to make these examples easy enough to follow, while still using some more advanced
//  techniques.  Vizuly does not rely on any libraries other than D3.  These examples do use jQuery and
//  materialize.css to simplify the examples and provide a decent UI framework.
//
//**************************************************************************************************************


// html element that holds the chart
var viz_container;

// our radial components and an array to hold them
var viz1,viz2,viz3,vizs=[];

// our radial themes and an array to hold them
var theme1,theme2,theme3,themes;

// our div elements we will put radials in
var div1,div2,div3,divs;

// show reel for demo only;
var reels=[];


//Once the document is ready we set javascript and page settings
$(document).ready(function () {

    //Keeps margins for examples not in iFrames.
    if (self == top) {
        d3.select("body").style("margin", "20px");
    }
    //Some house keeping for the display of test container for smaller screens
    else {
        d3.selectAll("li.logo").style("display","none");
        d3.selectAll("div.container").style("margin-top","-30px");
        d3.selectAll("i.mdi-navigation-menu").style("margin-top","-10px")
    }

    //Set display size based on window size.
    var rect = document.body.getBoundingClientRect();
    screenWidth = (rect.width < 960) ? Math.round(rect.width*.95) : Math.round((rect.width - 210) *.95)

    d3.select("#currentDisplay").attr("value", screenWidth + ",600").attr("selected", true).text(screenWidth + "px - 600px");
    $('select').material_select(); //Materialize.css setup
    $(".button-collapse").sideNav({menuWidth:210}); //
    viz_container = d3.selectAll("#viz_container")
        .style("width",screenWidth + "px")
        .style("height","3200px");

    initialize();


});


function initialize() {

    //Here we use the three div tags from our HTML page to load the three components into.
    div1 = d3.select("#div1");
    div2 = d3.select("#div2");
    div3 = d3.select("#div3");

    div4 = d3.select("#div4");
    div5 = d3.select("#div5");
    div6 = d3.select("#div6");

    div7 = d3.select("#div7");
    div8 = d3.select("#div8");
    div9 = d3.select("#div9");

    div10 = d3.select("#div10");
    div11 = d3.select("#div11");
    div12 = d3.select("#div12");

    div13 = d3.select("#div13");
    div14 = d3.select("#div14");
    div15 = d3.select("#div15");

    div16 = d3.select("#div16");
    div17 = d3.select("#div17");
    div18 = d3.select("#div18");

    div19 = d3.select("#div19");
    div20 = d3.select("#div20");
    div21 = d3.select("#div21");

    //Store the divs in an array for easy access
    divs=[div1,div2,div3,div4,div5,div6,div7,div8,div9,div10,div11,div12,div13,div14,div15,div16,div17,div18,div19,div20,div21];

    //Here we create our three radial progress components by passing in a parent DOM element (our div tags)
    viz1 = vizuly.component.radial_progress(document.getElementById("div1"));
    viz2 = vizuly.component.radial_progress(document.getElementById("div2"));
    viz3 = vizuly.component.radial_progress(document.getElementById("div3"));
        
    viz4 = vizuly.component.radial_progress(document.getElementById("div4"));
    viz5 = vizuly.component.radial_progress(document.getElementById("div5"));
    viz6 = vizuly.component.radial_progress(document.getElementById("div6"));

    viz7 = vizuly.component.radial_progress(document.getElementById("div7"));
    viz8 = vizuly.component.radial_progress(document.getElementById("div8"));
    viz9 = vizuly.component.radial_progress(document.getElementById("div9"));

    viz10 = vizuly.component.radial_progress(document.getElementById("div10"));
    viz11 = vizuly.component.radial_progress(document.getElementById("div11"));
    viz12 = vizuly.component.radial_progress(document.getElementById("div12"));

    viz13 = vizuly.component.radial_progress(document.getElementById("div13"));
    viz14 = vizuly.component.radial_progress(document.getElementById("div14"));
    viz15 = vizuly.component.radial_progress(document.getElementById("div15"));

    viz16 = vizuly.component.radial_progress(document.getElementById("div16"));
    viz17 = vizuly.component.radial_progress(document.getElementById("div17"));
    viz18 = vizuly.component.radial_progress(document.getElementById("div18"));

    viz19 = vizuly.component.radial_progress(document.getElementById("div19"));
    viz20 = vizuly.component.radial_progress(document.getElementById("div20"));
    viz21 = vizuly.component.radial_progress(document.getElementById("div21"));

    //Store the vizs in an array for easy access
    vizs=[viz1,viz2,viz3,viz4,viz5,viz6,viz7,viz8,viz9,viz10,viz11,viz12,viz13,viz14,viz15,viz16,viz17,viz18,viz19,viz20,viz21];


    //Here we create three vizuly themes for each radial progress component.
    //A theme manages the look and feel of the component output.  You can only have
    //one component active per theme, so we bind each theme to the corresponding component.
    theme1 = vizuly.theme.radial_progress(viz1).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme2 = vizuly.theme.radial_progress(viz2).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme3 = vizuly.theme.radial_progress(viz3).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme4 = vizuly.theme.radial_progress(viz4).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme5 = vizuly.theme.radial_progress(viz5).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme6 = vizuly.theme.radial_progress(viz6).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme7 = vizuly.theme.radial_progress(viz7).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme8 = vizuly.theme.radial_progress(viz8).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme9 = vizuly.theme.radial_progress(viz9).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme10 = vizuly.theme.radial_progress(viz10).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme11 = vizuly.theme.radial_progress(viz11).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme12 = vizuly.theme.radial_progress(viz12).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme13 = vizuly.theme.radial_progress(viz13).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme14 = vizuly.theme.radial_progress(viz14).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme15 = vizuly.theme.radial_progress(viz15).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme16 = vizuly.theme.radial_progress(viz16).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme17 = vizuly.theme.radial_progress(viz17).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme18 = vizuly.theme.radial_progress(viz18).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    theme19 = vizuly.theme.radial_progress(viz19).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme20 = vizuly.theme.radial_progress(viz20).skin(vizuly.skin.RADIAL_PROGRESS_NEON);
    theme21 = vizuly.theme.radial_progress(viz21).skin(vizuly.skin.RADIAL_PROGRESS_NEON);

    themes=[theme1,theme2,theme3,theme4,theme5,theme6,theme7,theme8,theme9,theme10,theme11,theme12,theme13,theme14,theme15,theme16,theme17,theme18,theme19,theme20,theme21];

    //Like D3 and jQuery, vizuly uses a function chaining syntax to set component properties
    //Here we set some bases line properties for all three components.
    vizs.forEach(function (viz,i) {
        viz.data(250)                       // Current value
            .height(600)                    // Height of component - radius is calculated automatically for us
            .min(0)                         // min value
            .max(100)                       // max value
            .capRadius(1)                   // Sets the curvature of the ends of the arc.
            .on("tween",onTween)            // On the arc animation we create a callback to update the label
            .on("mouseover",onMouseOver)    // mouseover callback - all viz components issue these events
            .on("mouseout",onMouseOut)      // mouseout callback - all viz components issue these events
            .on("click",onClick);           // mouseout callback - all viz components issue these events
    })

    //
    // Now we set some unique properties for all three components to demonstrate the different settings.
    //
    vizs[0]
        .data(rounded_mon)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[1]
        .data(KwH_round_mon)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[2]
        .data(run_round_mon)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[3]
        .data(rounded_tues)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[4]
        .data(KwH_round_tues)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[5]
        .data(run_round_tues)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[6]
        .data(rounded_wed)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[7]
        .data(KwH_round_wed)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[8]
        .data(run_round_wed)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[9]
        .data(rounded_thu)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[10]
        .data(KwH_round_thu)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[11]
        .data(run_round_thu)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[12]
        .data(rounded_fri)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[13]
        .data(KwH_round_fri)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[14]
        .data(run_round_fri)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[15]
        .data(rounded_sat)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[16]
        .data(KwH_round_sat)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[17]
        .data(run_round_sat)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    vizs[18]
        .data(rounded_sun)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                 // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format("$,.2f")(d);
        });

    vizs[19]
        .data(KwH_round_sun)                              // current value
        .min(0)                                 // min value
        .max(0.75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " KwH"; });

    vizs[20]
        .data(run_round_sun)                              // current value
        .min(0)                                 // min value
        .max(75)                               // max value
        .capRadius(1)                           // Sets the curvature of the ends of the arc.
        .startAngle(250)                        // Angle where progress bar starts
        .endAngle(250)                          // Angle where the progress bar stops
        .arcThickness(.12)                      // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format(".0f")(d) + " Min"; });

    //We use this function to size the components based on the selected value from the RadiaLProgressTest.html page.
    changeSize(document.getElementById("displaySelect").value);

    // This code is for the purposes of the demo and simply cycles through the various skins
    // The user can stop this by clicking anywhere on the page.
    themes.forEach(function (theme) {
        var showReel = vizuly.showreel(theme,['Business'],2000)
            .tween(function (t) {
                t.viz().selection().style("opacity",0).transition().style("opacity",1);
            })
            .start();
        reels.push(showReel);
    })

    d3.select("body").on("mousedown.reel",function () {
        //Stop show reel
        reels.forEach(function (reel) { reel.stop() })
        //Remove event listener
        d3.select("body").on("mousedown.reel",null);
    })


}

//Here we want to animate the label value by capturin the tween event
//that occurs when the component animates the value arcs.
function onTween(viz,i) {
    viz.selection().selectAll(".vz-radial_progress-label")
        .text(viz.label()(viz.data() * i));
}

function onMouseOver(viz,d,i) {
    //We can capture mouse over events and respond to them
}

function onMouseOut(viz,d,i) {
    //We can capture mouse out events and respond to them
}

function onClick(viz,d,i) {
    //We can capture click events and respond to them
}

//---------------------------------------------------------
//
//  The following functions are triggered by the user making changes in the settings panel which is declared in the
//  RadialProgressTest.html file.
//
//---------------------------------------------------------


//This function is called when the user selects a different skin.
function changeSkin(val) {
    themes.forEach(function (theme,i) {
        //If the user selects "none" for the skin we need to tell the theme to release the component and clear
        //any applied styles.
        if (val == "none") {
            theme.release();
            vizs[i].update();
        }
        //If the user selected a skin, make sure each viz has a theme and apply the skin
        else {
            theme.viz(vizs[i]);
            theme.skin(val);
            theme.viz().update();  //We could use theme.apply() here, but we want to trigger the tween.
        }
    })

}

//This is applies different end caps to each arc track by adjusting the 'capRadius' property
function changeEndCap(val) {
    vizs.forEach(function (viz,i) {
        vizs[i].capRadius(Number(val)).update();
    })
}

//This changes the size of the component by adjusting the radius and width/height;
function changeSize(val) {
    var s = String(val).split(",");
    viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');

    var divWidth = s[0] * 0.80 / 3;

    divs.forEach(function (div,i) {
        div.style("width",divWidth + 'px').style("margin-left", (s[0] *.05) + "px");
        vizs[i].width(divWidth).height(divWidth).radius(divWidth/2.2).update();
    })

}

//This sets the same value for each radial progress
function changeData(val) {
    vizs.forEach(function (viz,i) {
        vizs[i].data(Number(val)).update();
    })
}
        },
        error: function (jqxhr) {
            $('#output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        },
    });
})

