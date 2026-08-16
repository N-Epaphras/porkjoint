document.addEventListener('DOMContentLoaded', function() {
	var form = document.getElementById('reservation-form');
	if (!form) return;

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		var fullname = (form.elements['fullname'] || {}).value || '';
		var whatsapp = (form.elements['whatsapp'] || {}).value || '';
		var guests = (form.elements['guests'] || {}).value || '';

		fullname = fullname.trim();
		whatsapp = whatsapp.trim();
		guests = guests.toString().trim();

		var resp = document.getElementById('form-response');
		if (!fullname || !whatsapp || !guests) {
			if (resp) resp.textContent = 'Please fill out all fields.';
			return;
		}

		// Business WhatsApp number (without +)
		var businessPhone = '256701845806';

		var message = 'Hello, I would like to reserve a table.\nName: ' + fullname + '\nGuests: ' + guests + '\nContact: ' + whatsapp;
		var url = 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(businessPhone) + '&text=' + encodeURIComponent(message);

		window.open(url, '_blank');
	});
});
