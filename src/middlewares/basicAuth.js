const dbService = require('../services/dbService');

async function basicAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401);
        res.send('Access forbidden');
    } else {
        const decoded = Buffer.from(auth.split(' ')[1], 'base64').toString();
        const [id, password] = decoded.split(':').map((v) => v.trim());

        const user = await dbService.getUser(id, password);
        if(user) {
            next();
        }else{
            res.status(401);
            res.send('Access forbidden');
        }
    }
}

module.exports = basicAuth;