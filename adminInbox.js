function employeeInboxRowTemplate(data) {
	return `
		<tr>
			<th scope="row">${data.employeeName}</th>
			<td>${data.mitId}</td>
			<td>${data.fundingSource}</td>
			<td>${data.submissionDate}</td>
			<td>${data.academicYear}</td>
			<td>${data.status}</td>
		</tr>
	`;
};


// Get Inbox JSON, iterate over template and inject as HTML
$.getJSON('people.json', function(data) {
	let employeeInboxRows = [];
	let employeeInboxRowsString = "";
	$.each( data.people, function (key, value) {
	 employeeInboxRows.push(employeeInboxRowTemplate(value));
	});

	employeeInboxRowsString = employeeInboxRows.join('');

	$('#inboxTable tbody').html(employeeInboxRowsString);
});


$('#inboxTable').DataTable();
