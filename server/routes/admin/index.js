module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../modules/category')
    const Items = require('../../modules/items')
    const Hero = require('../../modules/hero')
    const Journalism = require('../../modules/journalism')
    const Ads = require('../../modules/Ads')
    const Administrators = require('../../modules/administrators')
    const jwt = require('jsonwebtoken')
    const administrators = require('../../modules/administrators')
        // 获取登录权限token
    const findToken = async(req, res, next) => {
        // console.log(res, 'pppp')
        const token = String(req.headers.token || '').split(' ').pop()
        if (!token) {
            res.status(401).send({
                message: '请先登录'
            })
        }
        const {
            id
        } = jwt.verify(token, app.get('secret'))
        req.user = await Administrators.findById(id)
        if (!req.user) {
            res.status(401).send({
                message: '该用户不存在，请重新登录'
            })
        }
        await next()
    }


    // 新建分类列表
    router.post('/categories', findToken, async(req, res) => {
        const moudel = await Category.create(req.body)
        res.send(moudel)
    })

    //  获取分类列表数据
    router.get('/categories', findToken, async(req, res) => {
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })

    // 获取数据进入编辑页面
    router.get('/categories/edit', async(req, res) => {
        const item = await Category.findById(req.query.id)
        res.send(item)
    })

    // 删除分类列表数据
    router.delete('/categories/delete', findToken, async(req, res) => {
        await Category.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 更新分类列表数据
    router.put('/categories/update', findToken, async(req, res) => {
        const moudel = await Category.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })

    // 新建物品列表
    router.post('/items', findToken, async(req, res) => {
        const moudel = await Items.create(req.body)
        res.send(moudel)
    })

    //  获取物品列表数据
    router.get('/items', findToken, async(req, res) => {
        const items = await Items.find().populate('parent').limit(10)
        res.send(items)
    })

    // 获取数据进入编辑页面
    router.get('/items/edit', findToken, async(req, res) => {
        const item = await Items.findById(req.query.id)
        res.send(item)
    })

    // 删除物品列表数据
    router.delete('/items/delete', findToken, async(req, res) => {
        await Items.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 更新物品列表数据
    router.put('/items/update', findToken, async(req, res) => {
        const moudel = await Items.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })

    // 上传装备图片
    const multer = require('multer')
    const updated = multer({
        dest: __dirname + '/../../updateImg'
    })
    router.post('/items/updateImg', findToken, updated.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/updateImg/${file.filename}`
        res.send(file)
    })


    // 新建英雄列表
    router.post('/hero', findToken, async(req, res) => {
        const moudel = await Hero.create(req.body)
        res.send(moudel)
    })

    //  获取英雄列表数据
    router.get('/hero', findToken, async(req, res) => {
        const items = await Hero.find().populate('parent').limit(10)
        res.send(items)
    })

    // 获取数据进入编辑页面
    router.get('/hero/edit', findToken, async(req, res) => {
        const item = await Hero.findById(req.query.id)
        res.send(item)
    })

    // 删除英雄列表数据
    router.delete('/hero/delete', findToken, async(req, res) => {
        await Hero.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 更新英雄列表数据
    router.put('/hero/update', findToken, async(req, res) => {
        const moudel = await Hero.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })

    // 上传英雄图片
    const multerhero = require('multer')
    const updatedhero = multerhero({
        dest: __dirname + '/../../updateHeroImg'
    })
    router.post('/hero/updateHeroImg', findToken, updatedhero.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/updateHeroImg/${file.filename}`
        res.send(file)
    })

    // 上传英雄技能图片
    const multerheroDes = require('multer')
    const updatedheroDes = multerheroDes({
        dest: __dirname + '/../../updateHeroDesImg'
    })
    router.post('/hero/updateHeroDesImg', findToken, updatedheroDes.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/updateHeroDesImg/${file.filename}`
        res.send(file)
    })

    // 新建资讯列表
    router.post('/journalism', findToken, async(req, res) => {
        const moudel = await Journalism.create(req.body)
        res.send(moudel)
    })

    //  获取资讯列表数据
    router.get('/journalism', findToken, async(req, res) => {
        const items = await Journalism.find().populate('parent').limit(10)
        res.send(items)
    })

    // 获取数据进入编辑资讯页面
    router.get('/journalism/edit', findToken, async(req, res) => {
        const item = await Journalism.findById(req.query.id)
        res.send(item)
    })

    // 更新英雄列表数据
    router.put('/journalism/update', findToken, async(req, res) => {
        const moudel = await Hero.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })

    // 删除资讯列表数据
    router.delete('/journalism/delete', findToken, async(req, res) => {
        await Journalism.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 上传富文本编辑器
    const multerFutext = require('multer')
    const updatedFutext = multerFutext({
        dest: __dirname + '/../../multerFutext'
    })
    router.post('/multerFutext', findToken, updatedFutext.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/multerFutext/${file.filename}`
        res.send(file)
    })

    // 新建广告位列表
    router.post('/abs', findToken, async(req, res) => {
        const moudel = await Ads.create(req.body)
        res.send(moudel)
    })

    //  获取广告位列表数据
    router.get('/abs', findToken, async(req, res) => {
        const ads = await Ads.find().populate('parent').limit(10)
        res.send(ads)
    })

    // 获取数据进入编辑页面
    router.get('/abs/edit', findToken, async(req, res) => {
        const item = await Ads.findById(req.query.id)
        res.send(item)
    })

    // 删除广告位列表数据
    router.delete('/abs/delete', findToken, async(req, res) => {
        await Ads.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 更新广告位列表数据
    router.put('/abs/update', findToken, async(req, res) => {
        const moudel = await Ads.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })

    // 上传广告位图片
    const multerAbs = require('multer')
    const updatedAbs = multerAbs({
        dest: __dirname + '/../../multerAbs'
    })
    router.post('/multerAbs', findToken, updatedAbs.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/multerAbs/${file.filename}`
        res.send(file)
    })

    // 新建分类列表
    router.post('/administrators', findToken, async(req, res) => {
        const moudel = await Administrators.create(req.body)
        res.send(moudel)
    })

    //  获取分类列表数据
    router.get('/administrators', findToken, async(req, res) => {
        const items = await Administrators.find().limit(10)
        res.send(items)
    })

    // 获取数据进入编辑页面
    router.get('/administrators/edit', findToken, async(req, res) => {
        const item = await Administrators.findById(req.query.id)
        res.send(item)
    })

    // 删除分类列表数据
    router.delete('/administrators/delete', findToken, async(req, res) => {
        await Administrators.findByIdAndDelete(req.body.id)
        res.send({
            success: '删除成功'
        })
    })

    // 更新分类列表数据
    router.put('/administrators/update', findToken, async(req, res) => {
        const moudel = await Administrators.findByIdAndUpdate(req.body.id, req.body.model)
        res.send(moudel)
    })


    // 登录接口
    router.post('/login', async(req, res) => {
        const {
            name,
            password
        } = req.body
        const user = await administrators.findOne({
            name
        }).select('+password')
        if (!user) {
            return res.status(422).send({
                message: '用户名不存在'
            })
        }
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            return res.status(401).send({
                message: '用户名密码错误'
            })
        }
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        const tokenName = {
            userName: user.name,
            passWord: user.password
        }
        res.send({
            token,
            tokenName
        })
    })
    app.use('/admin/api', router)
}