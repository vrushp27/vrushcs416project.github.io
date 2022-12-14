//FIRST GRAPH

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

//SECOND GRAPH

var second_graph = d3.select('#second_graph')

second_graph.append("g")
    .attr("transform", "translate(50,360)")
    .attr("class", "axis")
    .call(xAxis);

second_graph.append('text')
    .attr('x', 500)
    .attr('y', 390)
    .attr('text-anchor', 'middle')
    .text('Average City MPG')


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

//THIRD GRAPH

var third_graph = d3.select('#third_graph')

third_graph.append('text')
    .attr('x', -500)
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Number of Cylinders')

third_graph.append('text')
    .attr('x', 500)
    .attr('y', 1150)
    .attr('text-anchor', 'middle')
    .text('Fuel Type')


var keys_fuel = ["Diesel", "Gasoline", "Electricity"]
var shape = d3.scaleOrdinal()
    .domain(keys_fuel)
    .range([d3.symbol().type("circle"), d3.symbol().type("diamond"), d3.symbol().type("square")]);

var scatter_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")

async function load3() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data) {

        var fuelScale = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) { return d.Fuel; }))

        var fuelAxis = d3.axisBottom()
            .scale(fuelScale)
            .ticks(5);

        var cylScale = d3.scaleBand()
            .range([height, 0])
            .domain(keys_cyls)

        var cylAxis = d3.axisLeft()
            .scale(cylScale);

        third_graph.append("g")
            .attr("transform", "translate(50,160)")
            .attr("class", "axis")
            .call(cylAxis);

        third_graph.append("g")
            .attr("transform", "translate(50,1100)")
            .attr("class", "axis")
            .call(fuelAxis)
            .selectAll("text")

        third_graph.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return 200 + fuelScale(d.Fuel); })
            // .attr("cy", function (d) { return 1050 - cylScale(12-d.EngineCylinders); })
            .attr("cy", function (d) { return 1000 - 60 * d.EngineCylinders; })

            .attr("r", function (d) { return d.AverageHighwayMPG / 1.5; })
            .style("fill", function (d) { return "#5E4FA2"; })
            .style("opacity", "0.1")
            .attr("stroke", "black")
            .on("mouseover", function (d) {
                scatter_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                scatter_tooltip.html(d.Make)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                scatter_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

//FOURTH GRAPH

var fourth_graph = d3.select('#fourth_graph')

fourth_graph.append("g")
    .attr("transform", "translate(50,20)")
    .attr("class", "axis")
    .call(yAxis);

fourth_graph.append('text')
    .attr('x', -500)
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Mileage')

fourth_graph.append('text')
    .attr('x', 500)
    .attr('y', 1050)
    .attr('text-anchor', 'middle')
    .text('Cars')

var makes = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
    "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
    "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren Automotive", "Mercedes-Benz", "MINI", "Mitsubishi",
    "Nissan", "Porsche", "Ram", "Rolls-Royce", "Roush Performance", "smart", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"];

var highway_mpgs = ["35", "33", "19", "30", "22", "41", "27", "30", "29", "25", "24", "22", "103", "96", "24", "29", "38", "122",
    "30", "39", "27", "92", "21", "28", "30", "29", "24", "24", "34", "23", "82", "33", "102", "101", "27", "21", "19", "23", "39", "27",
    "98", "30", "28", "29"];

var city_mpgs = ["25", "24", "12", "23", "13", "30", "20", "22", "21", "16", "15", "16", "121", "118", "17", "21", "30", "150", "22",
    "30", "19", "120", "14", "22", "22", "23", "17", "16", "26", "16", "85", "24", "121", "124", "21", "14", "12", "14", "32", "21", "92",
    "23", "21", "22"];

var bar_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")

async function load4() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data_given) {

        var makeScale = d3.scaleBand()
            .range([0, width])
            .domain(data_given.map(function (d) { return d.Make; }))

        var makeAxis = d3.axisBottom()
            .scale(makeScale)
            .ticks(5);

        fourth_graph.append("g")
            .attr("transform", "translate(50,950)")
            .attr("class", "axis")
            .call(makeAxis)
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");

        fourth_graph.selectAll("mybar")
            .data(data_given)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return margin.left + makeScale(makes[i]); })
            .attr("y", function (d, i) { return y(highway_mpgs[i]) + 10; })
            .attr("width", makeScale.bandwidth() - 10)
            .attr("height", function (d, i) { return height - y(highway_mpgs[i]); })
            .attr("fill", "#5E4FA2").on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(makes[i])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

// This function is called by the buttons on top of the plot
function change(setting) {
    if (setting === "AverageHighwayMPG") {
        fourth_graph.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("fill", "#5E4FA2")
            .attr("y", function (d, i) { return y(highway_mpgs[i]) + 10; })
            .attr("height", function (d, i) { return height - y(highway_mpgs[i]); })
    } else {
        fourth_graph.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("fill", "#66C2A5")
            .attr("y", function (d, i) { return y(city_mpgs[i]) + 10; })
            .attr("height", function (d, i) { return height - y(city_mpgs[i]); })
    }
}