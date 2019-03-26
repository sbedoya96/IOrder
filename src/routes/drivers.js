module.exports = app =>{

    const Drivers = app.db.models.Drivers;
    const config = require('../config/config.js');
    var bcrypt = require('bcryptjs');
    var jwt = require('jsonwebtoken');

    app.route('/drivers')
    .get((req, res) => {
        
        Drivers.findAll({
            attributes: ['id','name', 'userName','state']
        })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
        
    })
    .post((req, res) => {
        Drivers.findOne({
            where: {
                userName: req.body.userName
            } 
        }).then(user => {
            if(user){
                res.status(500).json({msg:'User '+ req.body.userName + ' has already exist' });
                return;
            }else{
                Drivers.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    password: bcrypt.hashSync(req.body.password, 2)
        
                });
                res.status(201).json({msg:'User '+ req.body.userName + ' has been created' });
            }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

    app.route('/drivers/login')
    .put((req,res) => {

        Drivers.findOne({
            where: {
                username: req.body.userName
            }
        }).then(user => {
            if (!user) {
                return res.json({"message":'User Not Found.'});
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.json({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              
                
              Drivers.update({ state: '1' }, 
                { where: {userName: req.body.userName} })
              .then(driver =>{
                res.json({ user: req.body.userName , auth: true, accessToken: token, state: req.params.state });
              });
            }).catch(err => {
                res.json('Error -> ' + err);
            });
            
    });

    app.route('/drivers/logoff')
    .put((req,res) => {
    
            Drivers.findOne({
                where: {
                    username: req.body.userName
                }
            }).then(user => {
                  
                    
                  Drivers.update({ state: '0' }, 
                    { where: {userName: req.body.userName} })
                  .then(driver =>{
                    return res.json({"message": req.body.userName +'  has been disconnected'});
                  })

                }).catch(err => {
                    res.json('Error -> ' + err);
                });
                
    });

        

    
};