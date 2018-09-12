
	//Toggle additional content on checkbox change
	$('.additional-entry-toggle input').on('change', function(){
		$(this).closest('.additional-entry').toggleClass('is-active');
	});

	// don't ask for information about spouse if non-existent
	$('input[name=maritalStatus]').on('change',function(){
		let $this = $(this);
		if ($this.val() !== 'single') {
			$('#spouse').show();
		} else {
			$('#spouse').hide();
		}
	});

	// deal with spouse occupation selection
	$('input[name=spouseOccupation]').on('change',function(){
		let $this = $(this);
		let val = $this.val();

		//Only ask for student enrollment financial documentation if the spouse is actually a student
		if (val.toLowerCase() === 'student') {
			$('#spouseStudentFinancial').removeClass('d-none');
		} else {
			$('#spouseStudentFinancial').addClass('d-none');
		}

		// create ID selector for which container to show
		let valueTarget = '#spouseOccupation' + val.charAt(0).toUpperCase() + val.substr(1) + 'Entry';

		// make sure we're showing the .additional-entry UI
		$this.closest('.additional-entry').addClass('is-active');

		// make sure we hide the container that was showing
		$(valueTarget).siblings().not('.d-none').addClass('d-none');

		// show the container for the new radio button selection
		$(valueTarget).removeClass('d-none');
	});

	function addChildRow() {
		let $childrenTable = $('#childrenList');
		let $childrenTbody = $childrenTable.find('tbody');
		let childRow = `
			<tr>
			<td scope="row">
				<div>
					<!-- <label for="childFirstName" class="required">First Name</label> -->
					<input type="text" class="form-control form-control-sm" id="childFirstName" required="">
				</div>
			</td>
			<td>
				<div>
					<!-- <label for="childFirstName" class="required">First Name</label> -->
					<input type="text" class="form-control form-control-sm" id="childLastName" required="">
				</div>
			</td>
			<td>
				<div>
					<!-- <label for="childFirstName" class="required">First Name</label> -->
					<input type="date" class="form-control form-control-sm" id="childBirthDate" required="">
				</div>
			</td>
			<td>
				<div>
					<label class="d-none" for="childTCC"></label>
						<select class="form-control form-control-sm childTCC" id="childTCC">
							<option value="Eastgate">Eastgate</option>
							<option value="Koch">Koch</option>
							<option value="Linc">Linc</option>
							<option value="Stata">Stata</option>
							<option value="Westgate">Westgate</option>
						</select>
					</div>
			</td>
			<td class="js-child-classroom">
			<div>
				<label class="d-none" for="childClassroom"></label>
					<select class="form-control form-control-sm" id="childClassroom">
						<option value="infant">Infant</option>
						<option value="toddler">Toddler</option>
						<option value="preschool">Preschool</option>
					</select>
				</div>
			</td>
			<td>
				<div>
					<label class="d-none" for="childDays"></label>
						<select class="form-control form-control-sm" id="childDays">
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="5">5</option>
						</select>
					</div>
			</td>
			<td class="js-child-hours">
				<div>
					<label class="d-none" for="childHours"></label>
					<select class="form-control form-control-sm" id="childHours">
						<option value="fulltime">full-time</option>
						<option value="halftime">half-time</option>
					</select>
				</div>
			</td>
			<td>
				<button type="button" class="btn btn-light btn-sm js-delete-row">⨉</button>
			</td>
			<!--<td>
				<input type="date" class="form-control form-control-sm" id="childEnrollmentStart" required="">
			</td>
			<td>
				<input type="date" class="form-control form-control-sm" id="childEnrollmentEnd" required="">
			</td>-->
			</tr>
		`;
		$childrenTbody.append(childRow);
		$('.js-delete-row').on('click', function(){
			$(this).closest('tr').remove();
		});
		checkWestgate();
	};

	$('#addChild').on('click', function(){ addChildRow() });

	//show/hide hours column based on Westgate selection (should also check when removing children)
	function checkWestgate(){
		let westgateCount = 0;
		let $childTCCSelects = $('.childTCC');
		$childTCCSelects.each(function(){
			if ($(this).find('option').filter(':selected').val().toLowerCase() === 'westgate') { westgateCount++ }
		});

		(westgateCount === 0) ? $('.js-child-hours').addClass('d-none') : $('.js-child-hours').removeClass('d-none');
	};

	$('#childrenList').on('change', '.childTCC', function() {
		let $this = $(this);
		let $classRoom =  $this.closest('td').siblings('.js-child-classroom');
		let $notPreschool = $classRoom.find('option').filter(':not([value="preschool"])');

		// Only allow preschool selection if westgate
		if ($this.val().toLowerCase() === "westgate") {
			$notPreschool.hide();
			$classRoom.find('select').val('preschool');
		} else {
			$notPreschool.show();
		};

		checkWestgate();
	});

	// init
	addChildRow();
	$('.js-child-hours').addClass('d-none');
