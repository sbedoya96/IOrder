
module.exports = app =>{
    const Order = app.db.models.Orders;    
    const Drivers = app.db.models.Drivers;
    const Adress = app.db.models.adressxClient;
    const Client = app.db.models.Clients;
    

    app.route('/orders')
    .post((req, res) => {

        const ClientName = req.body.ClientName;
        const ClientLastName = req.body.ClientLastName;
        const Email = req.body.Email;
        const Direccion = req.body.Adress;
        const DeliveryDate = req.body.DeliveryDate;
        const HoursRange = req.body.HoursRange;
   


       var idClient = GetClientId(ClientName, ClientLastName, Email);
       if(parseInt(idClient) > 0){

        var idAdress = GetAdressId(idClient, Direccion);

        if(parseInt(idAdress) > 0){

            var drivers = GetDriverId();
            if(parseInt(drivers) > 0){

                Orders.create({
                    DeliveryDate: DeliveryDate,
                    HoursRange: HoursRange,
                    idClient: idClient,
                    idAdress: idAdress,
                    idDrivers: drivers
                });
            }else{
                console.log({msg: error.message});
            }
        }
       }else{
        res.status(500).json({msg: "Email Exits"});
       return;
    }

    function ValidateEmail(email){
        Client.findOne({
			where: {
				Email: email
			} 
		}).then(result =>{
            return result;
        })
    }
    function GetClientId (name, lastname, email){
        if(ValidateEmail(email) == null){
            Client.create({
                ClientName: name,
                ClientLastName: lastname,
                Email: email
            }).then(result => {
                let Result = result.dataValues.id;
                return Result;
            }).catch(error =>{
                console.log({msg: error.message});
                return;
            }); 
        }else{
            return 0;
        }
    }

    function GetAdressId(id , address){
        Adress.create({
            idClient: idclient,
            Adress: address

        }).then(result => {
          let  Result = result.dataValues.idAdress;
          return Result;

        }).catch(error =>{
           console.log({msg: error.message});
            return;
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





