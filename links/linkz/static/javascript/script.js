(function () {
	var menu, arrows, search, network, info, svg;
	var advanced;
	var easing = 400;
	var easing_fast = 80;
	
	// d3 graph variables
	var color, force;

	$(document).ready(function () {
		var _menu;
		
		search = $("#search");
		network = $("#network");
		info = $("#info");
		
		_menu = $("#menu li");
		
		menu = {
			"search" : $(_menu[0]),
			"network" : $(_menu[1]),
			"info" : $(_menu[2])
		};
		
		arrows = {
			"search" : $("#search .arrow:first"),
			"network" : $("#network .arrow:first")
		};
		
		advanced = false;
		
		menu.search.click(searchClick);
		arrows.search.click(searchClick);
		
		menu.network.click(networkClick);
		arrows.network.click(networkClick);
		
		menu.info.click(infoClick);
		
		$("#default-search input[name='advanced']").click(function (evt) {
			if (!advanced) {
				$(this).attr("value", "switch to default search");
				$("#advanced-search").slideDown(easing_fast);
			} else {
				$(this).attr("value", "switch to advanced search");
				$("#advanced-search").slideUp(easing_fast);
			}
			
			advanced = !advanced;
		});
		
		setupSearch();
		
		initializeGraph();
		
	});
	
	window.searchClick = function (evt) {
		search.animate({
			"left" : "0px"
		}, easing, null);
		
		network.animate({
			"left" : "100%"
		}, easing, null);
		
		info.animate({
			"left" : "100%"
		}, easing, null);
		
		menu.search.addClass("active");
		menu.network.removeClass("active");
		menu.info.removeClass("active");
	}
	
	window.networkClick = function (evt) {
		search.animate({
			"left" : "-100%"
		}, easing, null);
		
		network.animate({
			"left" : "0px"
		}, easing, null);
		
		info.animate({
			"left" : "100%"
		}, easing, null);
		
		menu.search.removeClass("active");
		menu.network.addClass("active");
		menu.info.removeClass("active");
	}
	
	window.infoClick = function (evt) {
		search.animate({
			"left" : "-100%"
		}, easing, null);
		
		network.animate({
			"left" : "-100%"
		}, easing, null);
		
		info.animate({
			"left" : "0px"
		}, easing, null);
		
		menu.search.removeClass("active");
		menu.network.removeClass("active");
		menu.info.addClass("active");
	}
	
	function initializeGraph () {
		svg = d3.select("svg");
	
		color = d3.scale.category20();

		force = d3.layout.force()
			.charge(-120)
			.linkDistance(30)
			.size([$("#network-graph").width(), $("#network-graph").height()]);

		d3.json(window.team42.static_url+"javascript/miserables.json", function(error, graph) {
			force
				.nodes(graph.nodes)
				.links(graph.links)
				.start();

			var link = svg.selectAll(".link")
				.data(graph.links)
				.enter().append("line")
				.attr("class", "link")
				.style("stroke-width", function(d) { return Math.sqrt(d.value); });

			var node = svg.selectAll(".node")
				.data(graph.nodes)
				.enter().append("circle")
				.attr("class", "node")
				.attr("r", 5)
				.style("fill", function(d) { return color(d.group); })
				.call(force.drag);

			node.append("title")
				.text(function(d) { return d.name; });

			force.on("tick", function() {
				link.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });

				node.attr("cx", function(d) { return d.x; })
					.attr("cy", function(d) { return d.y; });
			});
		});
	}
	
	function setupSearch() {
	    $("#search-button").click(function (evt) {
            
		    $.get("/search",
    		    {
		            "free_text":$('#default-search p input').val()
		        },
		        function (data) {
                    var _html = "";  
                    
		            if(data.length){

		                for (i=0;i<data.length;i++) {
		                    _html+="<li>" + data[i].fields.description + ", " + data[i].fields.ratingz+ "</li>";
		                }

	                }
	                else{
	                    _html = "<p>Couldn't find anything.</p>";
	                }
	                
	                $("#search-result ul").html(_html);
		    });
		    
			$("#search-result").slideDown(easing_fast);
		});
	}
})();
