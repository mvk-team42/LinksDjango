(function (undefined) {
	var menu, arrows, search, network, info, svg;
	var advanced;
	var easing = 400;
	var easing_fast = 80;
	
	var info_data;
	var current_search_data;
	
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
		
		$("#free-text-search > .search-area").keydown(function (evt) {
    		if(evt.keyCode == 13) {
    		    $("#free-text-search input[name=search]").click();
    		}
		});
		
		$("#source-tag-search > .search-area").keydown(function (evt) {
    		if(evt.keyCode == 13) {
    		    $("#source-tag-search input[name=search]").click();
    		}
		});
		
		
		// search areas
		$("#free-text-search > .header").click(function (evt) {
		    $("#free-text-search > .header").addClass("active");
   		    $("#source-tag-search > .header").removeClass("active");
		    
            $("#free-text-search > .search-area").slideDown(easing_fast);
            $("#source-tag-search > .search-area").slideUp(easing_fast);
		});
		$("#source-tag-search > .header").click(function (evt) {
		    $("#free-text-search > .header").removeClass("active");
   		    $("#source-tag-search > .header").addClass("active");
		
            $("#free-text-search > .search-area").slideUp(easing_fast);
            $("#source-tag-search > .search-area").slideDown(easing_fast);
		});
		
		// time slider
		$("slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ));
		
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
	    // source and tag search
	    $("#source-tag-search input[name=search]").click(function (evt) {
            var i, tag;
            var request = {};
            
            tag = $('#source-tag-search input[name=text]');
            request['source'] = tag.val();
            
	        tag = $('#source-tag-search input[type=checkbox]');
	        for(i in tag) {
	            if(tag.get(i).checked) {
	                if(!request['tag']) {
	                    request['tag'] = [];
	                }
           	        request['tag'].push(tag.get(i).name);
           	    }
	        }
	        if(request['tag']) {
                request['tag'] = request['tag'].toString().replace(',','+');
            }
            
            sendRequest(request);
	    });
	    
	    // free text search
	    $("#free-text-search input[name=search]").click(function (evt) {
            sendRequest({
                'free_text' : $("#free-text-search input[name=text]").val()
            });
	    });
	}
	
	function sendRequest(request) {
        console.log(request);
        
	    $.get("/search", request, function (data) {
            var _html, html;
            
            if(data.length){
                 if(request.source != undefined){
                    _html += "<thead><tr><th>Title</th><th>Type</th><th>Tag(s)</th><th>Rating</th></tr></thead>";
                 }
                 
                 current_search_data = data;
                 
                _html+="<tbody>";
                
                for (i=0;i<data.length;i++) {
                    if(request.free_text != undefined) {
                        _html += "<tr index='"+i+"'><td><p class='title'>" + data[i].fields.title + "</p><p class='source'>" + data[i].fields.source + "</p><p class='summary'>" + data[i].fields.summary + "</p></td><td class='rating'><div>" + data[i].fields.trustworthy + "</div></td></tr>";
                    } else {
                        _html += "<tr  index='"+i+"'><td>" + data[i].fields.name + "</td><td>" + data[i].fields.source_type + "</td><td>" + data[i].fields.tag + "</td>";
                        if( data[i].fields.rating > 1) _html += "<td class='rating'><div>" + data[i].fields.rating + "</div></td></tr>";
                        else _html += "<td class='rating'><div>N/A</div></td></tr>";
                    }
                }
                
                _html+="</tbody>";
            }
            else{
                _html = "<p>Couldn't find anything.</p>";
            }
            
            $("#search-result table").html(_html);
            $('#search-result table tbody tr').click(searchResultClick);
	    });
	    
		$("#search-result").slideDown(easing_fast);
	}
	
    function searchResultClick(evt){
        data = current_search_data[evt.currentTarget.getAttribute('index')];
        console.log(data);
    
        $("#network-info-view > .title").html(data.fields.name);
        $("#network-info-view > .description").html(data.fields.description);
        $("#network-info-view > .type").html(data.fields.source_type);
        $("#network-info-view > .tags").html(data.fields.tag);
        
        if(data.fields.rating > 1) {
            $("#network-info-view > > .rating").html(data.fields.rating);
        } else {
            $("#network-info-view > > .rating").html("N/A");
        }
        
        networkClick();
    }
})();
