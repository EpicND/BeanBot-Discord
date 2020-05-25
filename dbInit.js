const Sequelize = require('sequelize');



function url2obj(url) {
    var pattern = /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;
    var matches =  url.match(pattern);
    var params = {};
    if (matches[5] != undefined) { 
       matches[5].split('&').map(function(x){
         var a = x.split('=');
         params[a[0]]=a[1];
       });
    }

    return {
        protocol: matches[1],
        user: matches[2] != undefined ? matches[2].split(':')[0] : undefined,
        password: matches[2] != undefined ? matches[2].split(':')[1] : undefined,
        host: matches[3],
        hostname: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[0] : undefined,
        port: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[1] : undefined,
        segments : matches[4] != undefined ? matches[4].split('/') : undefined,
        params: params 
    };
}


const sequelize = new Sequelize('database', 'username', 'password', {
	host: url2obj(process.env.DATABASE_URL).host,
	port: url2obj(process.env.DATABASE_URL).port,
	dialect: 'postgres'
	// dialect: 'sqlite',
	// logging: false,
	// storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/currencyshop');
sequelize.import('models/users');
sequelize.import('models/useritems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
		CurrencyShop.upsert({ name: 'Coffee', cost: 2 }),
		CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
