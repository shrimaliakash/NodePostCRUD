const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'nodepost'
    }
}

const knex = require('knex')(options);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/post', (req, res) => {
    if(req.body.name == '' || req.body.name == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter name'}));
    } else if(req.body.description == '' || req.body.description == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter description'}));
    } else if(req.body.category == '' || req.body.category == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter category'}));
    } else if(req.body.status == '' || req.body.status == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter status'}));
    }
    if((req.body.name != '' && req.body.name != undefined) && (req.body.description != '' && req.body.description != undefined) && 
    	(req.body.category != '' && req.body.category != undefined) && (req.body.status != '' && req.body.status != undefined)) {
        const post =  [{
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            status : req.body.status
        }];
        knex('post').insert(post)
            .then((result) => res.send(JSON.stringify({success: true, Inserted: result[0], message: 'Post Inserted.'})))
            .catch((err) => res.send(JSON.stringify({success: false, message: err})));

    } else {
        res.send(JSON.stringify({success: false, message: 'Post Not Inserted.'}));
    }
});

app.get('/post', (req, res) => {
	var limit = req.query.limit;
    knex('post').select("*").limit(limit)
    .then((rows) => {
        if(rows != '') {
            res.send(JSON.stringify({success: true, message: 'post Found.', data: rows}))
        } else {
            res.send(JSON.stringify({success: true, message: 'post Not Found.'}))
        }
    })
    .catch((err) => { res.send(JSON.stringify({success: false, message: 'post Not Found.'})) });
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;

    knex('post').select("*").where('id', id).first()
    .then((rows) => {
        if(rows != '') {
            res.send(JSON.stringify({success: true, message: 'Post Found.', data: rows}))
        } else {
            res.send(JSON.stringify({success: true, message: 'Post Not Found.'}))
        }
    })
    .catch((err) => { res.send(JSON.stringify({success: false, message: 'Post Not Found.'})) });
});

app.post('/post/:id', (req, res) => {
    const id = req.params.id;
    if(req.body != '') {
	var post_details = knex('post').select("*").where('id', id).first()
	.then((rows) => {
		if(rows != '') {
            const posts =  {
                name : req.body.name != '' ? req.body.name : rows.name,
                description : req.body.description != '' ? req.body.description : rows.description,
                category : req.body.category != '' ? req.body.category : rows.category,
                status : req.body.status != '' ? req.body.status : rows.status
            };
			knex('post').where({ id: id }).update(posts)
		    .then((post) => res.send(JSON.stringify({success: true, message: 'Post Updated.'})))
		    .catch((err) => res.send(JSON.stringify({success: false, message: err})));
		} else {
		    res.send(JSON.stringify({success: true, message: 'Post Not Found.'}))
		}
	})
	.catch((err) => { res.send(JSON.stringify({success: false, message: 'Post Not Found.'})) });
    } else {
        res.send(JSON.stringify({success: false, message: 'Post Not Updated.'}));
    }
});

app.delete('/post/:id', (req, res) => {
    const id = req.params.id;
    knex('post').where({ id: id }).del()
        .then((post) => res.send(JSON.stringify({success: true, message: 'Post Deleted.'})))
        .catch((err) => res.send(JSON.stringify({success: false, message: err})));
});

app.get('/post/serach/:name', (req, res) => {
	const name = req.params.name;
	knex('post').select('*').where('name', 'like', '%name%')
	 .then((post) => {
	 	console.log(post);
	 	if(post != '' && post != undefined){
	 		res.send(JSON.stringify({success: true, data: post}));
	 	} else {
		    res.send(JSON.stringify({success: true, message: 'Post Not Found.'}));
		}
	})
	.catch((err) => res.send(JSON.stringify({success: false, message: err})));
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' || username == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter username'}));
    } else if(password == '' || password == null) {
        res.send(JSON.stringify({success: false, message: 'Please enter password'}));
    }
    if((username != '' && username != undefined) && (password != '' && password != undefined)) {
    var post_details = knex('admin').select("*").where('username', username).andWhere('password', password).first()
    .then((rows) => {
        if(rows != '' && rows != undefined) {
            res.send(JSON.stringify({success: true, message: 'Login Success.', data: rows}))
        } else {
            res.send(JSON.stringify({success: false, message: 'Incoreect username or password.'}))
        }
    })
    .catch((err) => { res.send(JSON.stringify({success: false, message: 'Incoreect username or password.'})) });
    } else {
        res.send(JSON.stringify({success: false, message: 'Incoreect username or password.'}));
    }
});

app.listen(port, () => console.log(`Post listing app listening on port ${port}!`));