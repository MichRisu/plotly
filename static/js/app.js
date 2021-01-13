// Use D3 library to read in samples.json
d3.json("samples.json").then(function(data){
    console.log(data);

    // Append IDs to dropdown list
    var subjIDlist = data.names;
    for (var i=0; i < subjIDlist.length; i++){
        var idDropdown = d3.select("#selDataset");
        idDropdown.append("option").text(subjIDlist[i]);
        };

    // Create function buildPlots
    function buildPlots(id) {
        // Create a filter variable of samples and convert id to string
        var filtSamples = data.samples.filter(s => +s.id === id)[0];
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
        Plotly.newPlot()("bubble", bubbleData, layout);
    };

    // Display each key-value pair from the metadata JSON object
    // Create a function to display sample metadata
    function buildDemo() {
        // Filter the metadata for id, convert id to string
        var metadataID = data.metadata.filter(md => +md.id === id)[0];
        // Get a reference for the demographic information
        var infoData = d3.select("sample-metadata");
        // Loop through the metadataIDs and append the key, value pairs 
        Object.entries(metadataID).forEach(([key, value]) => {
            infoData.append("p").text(`key: value`);
        });    
    };

    // Create init function for default plot
    function init() {
        buildPlots();
    };

    // Create the function for the change event
    function optionChanged(id){
        buildPlots(id);
        buildDemo(id);
    };
    
    // Call the init function to load default data
    init();
});