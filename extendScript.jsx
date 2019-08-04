$.runScript = {


	interpret: function () {
			var viewIDs = app.getProjectViewIDs(); // sample code optimized for a single open project
			var viewSelection = app.getProjectViewSelection(viewIDs[0]);
			/* if (viewSelection.length > 1) {
				alert('More than one file selected');
			} */



			for (var i = 0; i < viewSelection.length; i++) {
				var interpretation = viewSelection[i].getFootageInterpretation();
				interpretation.frameRate = arguments[0];
				viewSelection[i].setFootageInterpretation(interpretation);
				interpretation = viewSelection[i].getFootageInterpretation();


				if (arguments[1]) {
					viewSelection[i].setColorLabel(arguments[1]);
				}





			}


		}

		,

	applyEffect: function () {
		app.enableQE();


		var project = app.project;
		var seq = app.project.activeSequence;
		var tracks = seq.videoTracks;
		var tracksCount = app.project.activeSequence.videoTracks.numTracks;
		var startTicks = -1;
		var firstTrackItems;
		var currentTrack;

		var arr = [];


		for (var t = 0; t < tracksCount; t++) {
			firstTrackItems = tracks[t].clips;

			for (var i = 0; i < firstTrackItems.numItems; i++) {
				var currentClip = firstTrackItems[i];
				if (firstTrackItems[i].isSelected()) {
					startTicks = firstTrackItems[i].start.ticks;
					var loc = {
						y: t,
						startTicks: startTicks
					};
					arr.push(loc);

					
				}
			}
		}
		if (arr.length==0) {
			alert("No clip selected");
			return false;
		}
		//alert(arr.length+" items selected");
		for (var c = 0; c < arr.length; c++) {
			
			var item = arr[c];
			//alert("y: "+item.y+", StartTicks: "+item.startTicks);
			currentTrack = item.y;
			startTicks = item.startTicks;
			
			for (var i = 0; i < qe.project.getActiveSequence().getVideoTrackAt(currentTrack).numItems; i++) {
				if (qe.project.getActiveSequence().getVideoTrackAt(currentTrack).getItemAt(i).start.ticks == startTicks) {
					var dip = qe.project.getActiveSequence().getVideoTrackAt(currentTrack).getItemAt(i);
					dip.addVideoEffect(qe.project.getVideoEffectByName(arguments[0]));
				}
			}
		}




	}

}