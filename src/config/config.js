process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local') {
	console.log('local');
	urlDB = 'mongodb://localhost:27017/guater-mongo-db';
} else {
	urlDB = 'mongodb+srv://superuser:tWcy72K5wi4gljzf@cluster0-3vnbl.mongodb.net/elguater?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB
