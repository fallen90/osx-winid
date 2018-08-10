import { exec } from 'child_process';

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(error, stdout, stderr); });
}

Array.prototype._trim = function(){
	return this.filter(item => item != '');
};

function toObject(windowItem){
	const size= /size=([0-9]{0,4})x([0-9]{0,4})/ig;
	const id = /id=([0-9]{1,6})/ig;

	const sizeMatch = windowItem.match(size);
	const idMatch = windowItem.match(id);

	const title = windowItem.replace(size, '').replace(id, '').replace(/"/ig,'')._trim();

	let sizeObj = (sizeMatch && sizeMatch.length) ? sizeMatch[0].replace('size=','') : null;

	if(sizeObj){
		const parts = sizeObj.split('x').map(i => parseInt(i));
		sizeObj = {
			width : isNaN(parts[0]) ? 0 : parts[0],
			height : isNaN(parts[1]) ? 0 : parts[1]
		};
	}

	return {
		title : title, 
		size : sizeObj,
		id : (idMatch && idMatch.length) ? idMatch[0].replace('id=','') : null 
	};
}

function getId(appName, appTitle){
	if(!appTitle) appTitle = "";

	return new Promise((resolve, reject) => {
		exec(`GetWindowID "${appName}" "${appTitle}"`, (e,o,stderr) => {
			if(e) return resolve(e);
			if(o) return resolve(o);
			if(stderr) return resolve(stderr);
		});
	});
}

async function getList(appName){
	const windows = await getId(appName, '--list');

	if(!windows || !Array.isArray(windows)) return [];

	return windows.split('\n').trim().map(toObject);
}


export { getId, getList };