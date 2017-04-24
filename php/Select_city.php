<?php
	function select_city(){
		header('Content-Type: text/html; charset=utf-8');
			$query = "SELECT * FROM Place";
		$res = mysql_query($query);

		while ($row = mysql_fetch_array($res)) {
		echo "<option>" .$row['Name']. "</option>";
	}
}
	?>