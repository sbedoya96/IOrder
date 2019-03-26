
module.exports = app =>{
    const Order = app.db.models.Orders;    
    const Drivers = app.db.models.Drivers;
    const Adress = app.db.models.adressxClient;
    const Client = app.db.models.Clients;

    app.route('/orders')
    .post((req, res) => {
       var idClient = GetClientId(req.body.ClientName, req.body.ClientLastName, req.body.Email);
        console.log(idClient);
       if(parseInt(idClient) > 0){

        var idAdress = GetAdressId(idClient, req.body.Adress);
        if(parseInt(idAdress) > 0){

            var drivers = GetDriverId();
            if(parseInt(drivers) > 0){

                Orders.create({
                    DeliveryDate: req.body.DeliveryDate,
                    HoursRange: req.body.HoursRange,
                    idClient: idClient,
                    idAdress: idAdress,
                    idDrivers: drivers
        
        
                });

            }else{
                res.status(500).json({msg:'all drivers offline, sry' });


            }
        }

       }else{
        res.status(500).json({msg: error.message});
       return;
    }

    function GetClientId (name, lastname, email){
		Client.findOne({
			where: {
				Email: email
			} 
		}).then(user => {
			if(!user){
				Client.create({
					ClientName: name,
					ClientLastName: lastname,
					Email: email
				}).then(result => {
                    let Result = result.dataValues.id;
                    return Result;
				}).catch(error =>{
                    return 0;
                }); 
            }
            
		});
    }

    function GetClientId(idclient , adress){

        Adress.create({
            idClient: idclient,
            Adress: adress

        }).then(result => {

          let  Result = result.dataValues.idAdress
          return Result;
        }).catch(error =>{
            return 0;
        });
    }

    function GetDriverId(){

        var Result = 0;

        Drivers.findAll({
            attributes: ['id'],
            where: {
                state: true
            }
        }).then(result =>{
            if(result){
            	var items = result[Math.floor(Math.random()*result.length)];
            	for (let i = 0; i < items.length; i++) {
                	let Result = items[i].dataValues.id;
                }
                return Result;
            }
        });
        
    }    
       
    });
}





