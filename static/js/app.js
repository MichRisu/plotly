// ----------------------------------------------------------------- //
// Use D3 library to read in samples.json
d3.json("samples.json").then(function(data){
    console.log(data);
// ----------------------------------------------------------------- //
    // Append IDs to dropdown list
    var subjIDlist = data.names;
    for (var i=0; i < subjIDlist.length; i++){
        var idDropdown = d3.select("#selDataset");
        idDropdown.append("option").text(subjIDlist[i]);
        };
// ----------------------------------------------------------------- //    
    // Create function buildPlots
    function buildPlots(sample_id) {
        d3.json("samples.json").then(function(data){
            // console.log(data);
            
            // Create a filter variable of samples and convert id to string
            var filtSamples = data.samples.filter(s => s.id.toString() === sample_id)[0];
            console.log(filtSamples);
            
            // Create sampleValues variable, slice for the top ten samples, and reverse for bar chart
            var sampleValues = filtSamples.sample_values.slice(0,10).reverse();
            console.log(sampleValues);

            // Create otuLabels variable, slice for the top ten for bar chart
            var otuLabels = filtSamples.otu_labels.slice(0,10);
            console.log(otuLabels);

            // Create sampleID variable, slice for top ten samples, and reverse for bar chart
            var sampleID = filtSamples.otu_ids.slice(0,10).reverse();
            console.log(sampleID)

            // Create washFreq variable using map function
            var washFreq = data.metadata.map(d => d.wfreq);
            console.log(washFreq);

            // Create idOTUs variable using map function to return text and data for bar chart
            var idOTUs = sampleID.map(d => "OTU" + d);
            console.log(idOTUs);
// ----------------------------------------------------------------- //
            // Create horizontal bar chart to display top 10 OTUs for each id
            // Create trace for horizontal bar chart
            var barTrace = {
                x: sampleValues,
                y: idOTUs,
                text: otuLabels,
                type: "bar",
                orientation: "h"
            };
            // Create the data variable
            var barData = [barTrace];
            // Create the layout
            var layout = {
                title: "Top 10 OTU",  
            };
            // Plot the horizontal bar chart
            Plotly.newPlot("bar", barData, layout);
// ----------------------------------------------------------------- //
            // Create bubble chart that displays each sample
            // Create trace for bubble chart
            var bubbleTrace = {
                x: filtSamples.otu_ids,
                y: filtSamples.sample_values,
                text: filtSamples.otu_labels,
                mode: "markers",
                marker: {
                    color: filtSamples.otu_ids,
                    size: filtSamples.sample_values
                }
            };
            // Create data variable
            var bubbleData = [bubbleTrace];
            // Create the layout
            var layout = {
                xaxis: {title: "OTU ID"}
            };
            // Plot the bubble chart
            Plotly.newPlot("bubble", bubbleData, layout);
// ----------------------------------------------------------------- //
            // Create gauge chart to plot the weekly washing frequency of the selected subject id
            // Create trace for the gauge chat
            // var gaugeTrace = {
            //     domain: {x: [0,1], y: [0,1]},
            //     value: parseFloat(washFreq),
            //     title: {text:"Belly Button Washing Frequency<br>Scrubs per Week"},
            //     type: "indicator",
            //     mode: "gauge+number",
            //     gauge: {
            //         axis: {range: [0, 9]},
            //         steps: [
            //             {range: [0,1], color: "#f8f3ec"},
            //             {range: [1,2], color: "#f4f1e5"},
            //             {range: [2,3], color: "#e9e6ca "},
            //             {range: [3,4], color: "#e5e7b3"},
            //             {range: [4,5], color: "#d5e49d"},
            //             {range: [5,6], color: "#b7cc92"},
            //             {range: [6,7], color: "#8cbf88"},
            //             {range: [7,8], color: "#8abb8f"},
            //             {range: [8,9], color: "#85b48a"},
            //         ],
            //         bar: {color: "purple"},
            //         bordercolor: "transparent"
            //     }
            // };
            // // Create data variable
            // var gaugeData = [gaugeTrace];
            // // Create the layout
            // var layout = { 
            //     width: 600, 
            //     height: 500,
            //     margin: {t:0, b:0}    
            // };
            // // Plot the gauge chart
            // Plotly.newPlot("gauge", gaugeData, layout);
        })};
// ----------------------------------------------------------------- //
    // Create a function to display sample metadata
    function buildDemo(sample_id) {
        d3.json("samples.json").then(function(data){
            // Filter the metadata for id, convert id to string
            var metadataID = data.metadata.filter(md => md.id.toString() === sample_id)[0];
            console.log(metadataID)
            // Get a reference for the demographic information
            var infoData = d3.select("#sample-metadata");
            // Clear the demographic display, with each new selection from dropdown 
            infoData.html("");
            // Loop through the metadataIDs and append the key, value pairs 
            Object.entries(metadataID).forEach((key) => {
                infoData.append("p").text(key[0] + ": " + key[1]);
            });    
    })};
// ----------------------------------------------------------------- //
    // Create function for change event
    function optionChanged(sample_id){
        // Prevent the page from refreshing
        d3.event.preventDefault();
        // Select the input value from the dropdown
        var sample_id = d3.select("#selDataset").node().value;
        console.log(sample_id);

        // d3.select("#selDataset").node().value = "";
        // Call the plot and demo functions with the new sample_id
        buildPlots(sample_id);
        buildDemo(sample_id);
    };
    // Add the event listener for submit button
    d3.select("#selDataset").on("change", optionChanged);
// ----------------------------------------------------------------- //
    // Create init function for default plot
    function init() {
        d3.json("samples.json").then(function(data){
            buildPlots(data.names[0]);
            buildDemo(data.names[0]);
        })};
// ----------------------------------------------------------------- //
    // Call the init function to load default data
    init();
});