

/* Convert Unixtime to 'Month DD, YYYY' */
function convertUnixTimeToHumanReadable(unixtime) {
	let date = new Date(Number.parseInt(unixtime));
	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	let year = date.getFullYear();
	let month = months[date.getMonth()];
	let day = date.getDate();
	return `${month} ${day}, ${year}`;
};


/* Person Constructor */
function Person(data){
	person = {};
	person.employeeName = data.employeeName;
	person.mitId = data.mitId;
	person.fundingSource = data.fundingSource;
	person._submissionDate = data.submissionDate;
	person.submissionDate = convertUnixTimeToHumanReadable(person._submissionDate);
	person.academicYear = data.academicYear;
	person.status = data.status;
	return person;
}


// Initialize Admin Inbox
function initTable(people) {
	$('#inboxTable').DataTable({
		data: people,
		'columns': [
			{data: 'employeeName'},
			{data: 'mitId'},
			{data: 'fundingSource'},
			{data: 'submissionDate'},
			{data: 'academicYear'},
			{data: 'status'}
		]
	});
};


/* IIFE to load employee JSON and create array of objects using Employee Constructor to pass to DataTable */
var loadPeopleData = (function() {
	let people = [];
	$.getJSON('people.json', function(peopleData){
		$.each(peopleData.people, function(key, value) {
			people.push(Person(value));
		});
		initTable(people);
	});
})();
