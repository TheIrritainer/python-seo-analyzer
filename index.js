const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {exec} = require('child_process');

const port = 3000


const sendError = (res, error) => {
    res.contentType('application/json');
    res.status(400);
    res.send({error});
}

const prepareDomain = (domain) => {
    domain += domain.endsWith("/") ? "" : "/"

    return domain;
}

const prepareSitemap = (sitemap, domain) => {
    if (!sitemap.startsWith(domain)) {
        sitemap = domain + sitemap;
    }

    return sitemap;
}

app.get('/', (req, res) => {
    res.status(400);
    res.send('Use post')
})

app.post('/', async (req, res) => {

    console.log('received body: ', req.body);
    if (!req.body.domain) {
        sendError(res, "No domain given in body");
        return;
    }
    const domain = prepareDomain(req.body.domain);

    let options = ""
    if (req.body.sitemap) {
        options += '-s ' + prepareSitemap(req.body.sitemap, domain);
    }

    const process = exec(`/usr/local/bin/seoanalyze ${options} ${domain} `, (error, stdout, stderr) => {
        if (!error && stdout) {
            const parsed = JSON.parse(stdout);

            res.status(200);
            res.contentType("application/json");
            res.send(parsed)
        } else {
            sendError(res, 'Something went wrong');
            console.log(error, stderr, stdout);
        }
    })

    process.on('exit', (exitCode) => {
        if (exitCode > 0) {
            console.log('got exit code ' + exitCode)
        }
    })
})

app.listen(port, () => {
    console.log(`python-seo-analyzer - web api is listening at:${port}`)
})
