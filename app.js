var first_graph = d3.select('#first_graph')
var keys_cyls = ["2", "4", "6", "8", "10", "12"]
var width = 920, height = 920
var size = 20

var myColor = d3.scaleOrdinal()
    .domain(keys_cyls)
    .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598",
        "#FFFFBF"]);

var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;


var x = d3.scaleBand()
    .domain([10, 20, 30, 40, 50])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, 120])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10);

first_graph.append("g")
    .attr("transform", "translate(50,360)")
    .attr("class", "axis")
    .call(xAxis);

first_graph.append('text')
    .attr('x', 500)
    .attr('y', 390)
    .attr('text-anchor', 'middle')
    .text('Average Highway MPG')

var tooltip = d3.select("body").append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")


first_graph.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("rect")
    .attr("x", 100)
    .attr("y", function (d, i) { return 200 + i * (size + 5) })
    .attr("width", size)
    .attr("height", size)
    .attr("stroke", "black")
    .style("fill", function (d) { return myColor(d) })
    .on("mouseover", function (d) { highlight(d) })
    .on("mouseleave", function (d) { noHighlight(d) })

first_graph.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", 100 + size * 1.2)
    .attr("y", function (d, i) { return 200 + i * (size + 5) + (size / 2) })
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

first_graph.append('rect')
    .attr("x", 300)
    .attr("y", 200)
    .attr("width", 500)
    .attr("height", 30)
    .style("fill", 'lightgray')

first_graph.append('text')
    .attr("x", 310)
    .attr("y", 220)
    .attr("width", 60)
    .attr("height", 20)
    .style("fill", 'black')
    .text("*The bubbles on the left are less MPG because of higher cylinders*")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

var highlight = function (d) {
    first_graph
.selectAll(".datapt").style("opacity", .05)
    first_graph
.selectAll(".a" + d).style("opacity", 1)
}

var noHighlight = function (d) {
    d3.selectAll(".datapt").style("opacity", 1)
}

async function load1() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (d) {
        first_graph.selectAll("p")
            .append("g")
            .data(d)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "datapt " + "a" + d.EngineCylinders })
            .attr("cx", function (d) { return d.AverageHighwayMPG * 20 })
            .attr("cy", function (d) { return 300 })
            .attr("r", "9")
            .attr("fill", function (d) { return myColor(d.EngineCylinders); })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.Make)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}


var second_graph = d3.select('#second_graph')

second_graph.append("g")
    .attr("transform", "translate(50,360)")
    .attr("class", "axis")
    .call(xAxis);

second_graph.append('text')
    .attr('x', 500)
    .attr('y', 390)
    .attr('text-anchor', 'middle')
    .text('Average Highway MPG')


second_graph.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("rect")
    .attr("x", 100)
    .attr("y", function (d, i) { return 200 + i * (size + 5) })
    .attr("width", size)
    .attr("height", size)
    .attr("stroke", "black")
    .style("fill", function (d) { return myColor(d) })
    .on("mouseover", function (d) { highlight2(d) })
    .on("mouseleave", function (d) { noHighlight2(d) })

second_graph.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", 100 + size * 1.2)
    .attr("y", function (d, i) { return 200 + i * (size + 5) + (size / 2) })
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight2)
    .on("mouseleave", noHighlight2)

second_graph.append('rect')
    .attr("x", 300)
    .attr("y", 200)
    .attr("width", 500)
    .attr("height", 30)
    .style("fill", 'lightgray')

second_graph.append('text')
    .attr("x", 310)
    .attr("y", 220)
    .attr("width", 60)
    .attr("height", 20)
    .style("fill", 'black')
    .text("*The bubbles on the left are less MPG because of higher cylinders*")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

var highlight2 = function (d) {
    second_graph.selectAll(".datapt").style("opacity", .05)
    second_graph.selectAll(".a" + d).style("opacity", 1)
}

var noHighlight2 = function (d) {
    d3.selectAll(".datapt").style("opacity", 1)
}

async function load2() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (d) {
        second_graph.selectAll("p")
            .append("g")
            .data(d)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "datapt " + "a" + d.EngineCylinders })
            .attr("cx", function (d) { return d.AverageCityMPG * 20 })
            .attr("cy", function (d) { return 300 })
            .attr("r", "9")
            .attr("fill", function (d) { return myColor(d.EngineCylinders); })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.Make)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}
