// Use D3 library to read in samples.json

d3.json("samples.json").then(function(data){
    var data = data;
    console.log(data);
});

// Create horizontal bar chart with a dropdown menu to display top 10 OTUs for that individual
    // Use "sample_values" as values for bar chart
    // Use "otu_ids" as labels for bar chart
    // Use "otu_labels" as hovertext for the chart

// Create bubble chart that displays each sample

    // Use "otu_ids" for the x values
    
    // Use "sample_values" for the y values
    
    // Use "sample_values" for the marker size
    
    // Use "otu_ids" for the marker colors
    
    // Use "otu_labels" for the text values

// Display the sample metadata, i.e., an individual's demographic information

// Display each key-value pair from the metadata JSON object somewhere on the page

// Update all of the plots any time that a new sample is selected

// ***** Advanced Challenge *****

    // Modify the example gauge code to account for values ranging from 0 through 9

    // Update the chart whenever a new sample is selected

