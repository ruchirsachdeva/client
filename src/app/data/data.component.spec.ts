import {Component, OnInit, Input} from '@angular/core';
import {UserService} from "../shared/user/user.service";
import * as d3 from 'd3';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {


  constructor(private userService: UserService) { }

  // Get the data

  ngOnInit() {
    alert('data component invoked');
    alert('data component ends');

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Define the div for the tooltip
    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

// set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    this.userService.getData().subscribe(session => {
      var data = session.data;
      // format the data
      alert('data received = '+data);
      data.forEach(function(d) {
        d.X = +d.X;
        d.Y = +d.Y;
        d.time = d.time;
        d.button = d.button;
        d.correct = d.correct;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.X; }));
      y.domain([0, d3.max(data, function(d) { return d.Y; })]);

      // Add the valueline path.
      svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.X); })
        .attr("cy", function(d) { return y(d.Y); })
        .on("mouseover", function(d) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div .html("Time: "+d.time+"<br>Button: "+d.button+"<br>Correct: "+d.correct)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });

    });

  }




}
