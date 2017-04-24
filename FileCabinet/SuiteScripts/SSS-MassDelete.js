/***************************************

Script Used to quickly delete a large 
number of records. Use with caution.

Created by SeeSaaS LLC
Author: PRW 2.12.14

****************************************/

function massDelete(rec_type, rec_id){
	try {
		nlapiDeleteRecord(rec_type, rec_id);
		nlapiLogExecution ('DEBUG', rec_id + ' was deleted successfully');
	} catch(e) {
		nlapiLogExecution ('ERROR', rec_id + ' was not deleted. ', e);
	}
}