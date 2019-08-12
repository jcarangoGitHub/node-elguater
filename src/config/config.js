process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local') {
	console.log('local');
	urlDB = 'mongodb://localhost:27017/guater-mongo-db';
} else {
	urlDB = 'mongodb+srv://jca-admin:jca87admin@cluster0-zfyfv.mongodb.net/coursesManager?retryWrites=true';
}

process.env.URLDB = urlDB
