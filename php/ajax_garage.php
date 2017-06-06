<?
include './connect.php';
$DB = connect();
header('Content-type: application/json; charset=UTF-8');
$R = array();
try{
if (!isset($_POST['METHOD'])){
	throw new Exception('data');
}
if ($_POST['METHOD'] === 'analytics.getData'){
	if (!isset($_POST['TYPE'])){
		throw new Exception('data');
	}
	if($_POST['TYPE'] === 'km'){
		if (
		!isset($_POST['TRACTORS_ID']) || !is_array($_POST['TRACTORS_ID'])
		){
			throw new Exception('data');
		}
		$_POST['TRACTORS_ID'] = array_unique($_POST['TRACTORS_ID']);
		foreach ($_POST['TRACTORS_ID'] as $a){
			if (filter_var($a, FILTER_VALIDATE_INT) === false || $a < 1){
				throw new Exception('data');
			}
		}
		$R['tractors_trips'] = array();
		foreach ($_POST['TRACTORS_ID'] as $tractor_id){
			$total_days = date('z', mktime(0, 0, 0, 1, 0, date('Y') + 1));
			$trips = 40;
			$dd = ($total_days - 1)/$trips;
			$R['tractors_trips'][$tractor_id] = array('trips' => array());
			$r = &$R['tractors_trips'][$tractor_id];
			for ($i = 0; $i < $trips; ++$i){
				$a = 1 + round($i * $dd);
				$b = $a + round($dd * (0.5 + (($i + $tractor_id) % 5) / 10));
				$r['trips'][] = array(
					'start_day' => $a,
					'end_day' => $b,
					'km' => 800 + (($i + $tractor_id) % 8)*100
				);
			}
		}
	}
	else if($_POST['TYPE'] === 'stuff'){
		if (
		!isset($_POST['STUFFS_ID']) || !is_array($_POST['STUFFS_ID']) ||
		!isset($_POST['GROUP_BY']) || !in_array($_POST['GROUP_BY'], array('week', 'month')) ||
		!isset($_POST['YEAR']) || filter_var($_POST['YEAR'], FILTER_VALIDATE_INT) === false || $_POST['YEAR'] > date('Y')
		){
			throw new Exception('data');
		}
		$_POST['STUFFS_ID'] = array_unique($_POST['STUFFS_ID']);
		foreach($_POST['STUFFS_ID'] as $a){
			if(filter_var($a, FILTER_VALIDATE_INT) === false || $a < 1){
				throw new Exception('data');
			}
		}
		$group_by = ($_POST['GROUP_BY'] === 'week' ? '%u' : ($_POST['GROUP_BY'] === 'month' ? '%m' : ''));
		$year = (int)$_POST['YEAR'];
		$total_days = date('z', mktime(0, 0, 0, 1, 0, $year + 1));
		$q = $DB->prepare('SELECT
id,
id_group
FROM garage_stuff
WHERE (id_group IN ('.implode(',', array_fill(0, sizeof($_POST['STUFFS_ID']), '?')).'))');
		$q->execute($_POST['STUFFS_ID']);
		$group = array();
		foreach ($_POST['STUFFS_ID'] as $id){
			$group[$id] = array();
		}
		while ($a = $q->fetch(PDO::FETCH_ASSOC)){
			$group[$a['id_group']][] = (int)$a['id'];
		}
		$R['stuffs_info'] = array();
		foreach($group as $gr_id => $ids){
			$R['stuffs_info'][$gr_id] = array('info' => array());
		}
		if (true){
			foreach($group as $gr_id => $ids){
				$r = &$R['stuffs_info'][$gr_id];
				if ($_POST['GROUP_BY'] === 'week'){
					$week = 0;
					$day = date('N', mktime(0, 0, 0, 1, 1, $year));
					if ($day > 1){
						$q = 10 + (($week++ + $gr_id) % 8)*30;
						$r['info'][] = array(
							'group_entity' => 0,
							'quantity' => $q,
							'price' => $q * 10
						);
						$day = 7 - ($day-1);
						++$day;
					} else{
						++$week;
					}
					for (; $day < $total_days; ++$week){
						$q = 10 + (($week + $gr_id) % 8)*30;
						$r['info'][] = array(
							'group_entity' => $week,
							'quantity' => $q,
							'price' => $q * 10
						);
						$day += 7;
					}
				}
				else if($_POST['GROUP_BY'] === 'month'){
					for ($i = 0; $i < 12; ++$i){
						$q = (10 + (($i + $gr_id) % 8)*30)*4;
						$r['info'][] = array(
							'group_entity' => $i,
							'quantity' => $q,
							'price' => $q * 10
						);
					}
				}
			}
		}
		else{
			$sql = array();
			$params = array();
			foreach ($group as $gr_id => $ids){
				if (isset($ids[0])){
					$sql[] = 'SELECT
? `id`,
SUM(w.quantity) `quantity`,
SUM(w.quantity * s.price) `price`,
DATE_FORMAT(o.date_close, "'.$group_by.'") `group_entity`
FROM garage_stuff s
INNER JOIN garage_joborder_work w ON (w.id_stuff = s.id)
INNER JOIN garage_joborder o ON (o.id = w.id_joborder)
WHERE (s.id IN ('.implode(',', array_fill(0, sizeof($ids), '?')).') && o.date_close IS NOT NULL && YEAR(o.date_close) = ?)
GROUP BY id_group, DATE_FORMAT(o.date_close, "'.$group_by.'")';
					$params = array_merge($params, array($gr_id), $ids, array($year));
				}
				else{
					$sql[] = 'SELECT
? `id`,
SUM(w.quantity) `quantity`,
SUM(w.quantity * s.price) `price`,
DATE_FORMAT(o.date_close, "'.$group_by.'") `group_entity`
FROM garage_stuff s
INNER JOIN garage_joborder_work w ON (w.id_stuff = s.id)
INNER JOIN garage_joborder o ON (o.id = w.id_joborder)
WHERE (s.id = ? && o.date_close IS NOT NULL && YEAR(o.date_close) = ?)
GROUP BY DATE_FORMAT(o.date_close, "'.$group_by.'")';
					$params = array_merge($params, array($gr_id, $gr_id, $year));
				}
			}
			if (!isset($params[0])){
				$params[] = $_POST['STUFF_ID'];
			}
			$q = $DB->prepare(implode(' UNION ', $sql));
			$q->execute($params);
			while ($a = $q->fetch(PDO::FETCH_ASSOC)){
				$id = (int)$a['id'];
				unset($a['id']);
				$a['quantity'] = (int)$a['quantity'];
				$a['price'] = (double)$a['price'];
				$a['group_entity'] = (int)$a['group_entity'];
				$R['stuffs'][$a['id']]['info'][] = $a;
			}
		}
	}
	else{
		throw new Exception('data');
	}
}
echo json_encode($R);
} catch(Exception $e){
	header('HTTP/1.1 400 Bad Request');
	echo json_encode(array(
		'error' => $e->getMessage()
	));
}