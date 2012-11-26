<script type="text/javascript">
function ShowMsg() {
	$('#btn').attr('disabled', true);

	if ( $('#msg').html().length == 0 ) {
		$('#msg').html('<h1>GOGOGO</h1>');
	}

	$('#msg').fadeIn();
	setTimeout(function(){
		$('#msg').fadeOut();
		$('#btn').attr('disabled', false);
	}, 1000);		
}
</script>

