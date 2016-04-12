function onDeleteMessage(address) {
	var r = confirm("Dou you really want to delete this message?");
	if (r == true) {
		window.location.href = address;
	} 
}

function onDeleteContact(address) {
	var r = confirm("Dou you really want to delete this contact?");
	if (r == true) {
		window.location.href = address;
	} 
}
