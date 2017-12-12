const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID })
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const router = vertex.router()

/*  This is a sample API route. */

router.post('/register', function (req, res) {

    turbo.createUser(req.body)
        .then(data => {
            res.json({
                confirmation: 'success',
                data
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        })
})

router.post('/login', function (req, res) {

    turbo.login(req.body)
        .then(data => {
            req.vertexSession.user = { id: data.id }
            res.json({
                confirmation: 'success',
                data
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        })
})

router.post('/update', function (req, res) {
    if (!req.vertexSession) {
        res.json({
            confirmation: 'fail',
            message: 'User Not Logged In'
        })
        return
    }
    if (!req.vertexSession.user) {
        res.json({
            confirmation: 'fail',
            message: 'User Not Logged In'
        })
        return
    }
    turbo.updateUser(req.vertexSession.user.id, req.body)
        .then(data => {
            res.json({
                confirmation: 'success',
                user: data
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
})

router.get('/currentuser', function (req, res) {
    if (!req.vertexSession) {
        res.json({
            confirmation: 'success',
            user: null
        })
        return
    }
    if (!req.vertexSession.user) {
        res.json({
            confirmation: 'success',
            user: null
        })
        return
    }

    turbo.fetchOne('user', req.vertexSession.user.id)
        .then(data => {
            res.json({
                confirmation: 'success',
                user: data
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
})

module.exports = router
