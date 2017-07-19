import express from 'express';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import nunjucks from 'nunjucks';

const app = new Koa();


function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});

console.log(s);
// const router = require(`koa-router`)();
// app.use(bodyParser());

// app.use(async(ctx,next) => {
//    console.log(`Process ${ctx.request.method} ${ctx.url}`);
//    await next();
// })

// router.get('/hello/:name',async(ctx,next) =>{
//   var name = ctx.params.name;
//   ctx.response.body = `<h1>Hello, ${name}!</h1>`
// })

// router.get('/',async ( ctx,next) => {
//     ctx.response.body = `<h1>Index</h1>
//       <form action="/signin" method="post">
//           <p>Name: <input name="name" value="koa"></p>
//           <p>Password: <input name="password" type="password"></p>
//           <p><input type="submit" value="Submit"></p>
//       </form>`;
// });
// router.post('/signin',async(ctx,next) => {
//   var 
//     name = ctx.request.body.name || '',
//     password = ctx.request.body.password || '';
//   console.log(`signin whit name: ${name}, password: ${password}`);
//   if(name === 'koa' && password ==='12345'){
//     ctx.response.body = `<h1>Welcome, ${name}13!</h1>`;
//   } else{
//      ctx.response.body = `<h1>Login failed!</h1>
//      <p>
//        <a href="/">Try again</a>
//      </p>`
//   }
// })

// app.use(router.routes());

// app.listen(3000);
// console.log('app started at port 3000...');
// const app = express()

// app.get('/', async (req, res) => {
//   try {
//     const thing = await Promise.resolve({ one: 'two' }) // async/await!
//     return res.json({...thing, hello: 'world'}) // object-rest-spread!
//   } catch (e) {
//     return res.json({ error: e.message })
//   }
// })
// const port = process.env.PORT || 3000

// app.listen(port, (err) => {
//   if (err) {
//     console.error(err)
//   }

//   if (__DEV__) { // webpack flags!
//     console.log('> in development')
//   }

//   console.log(`> listening on port ${port}`)
// })
