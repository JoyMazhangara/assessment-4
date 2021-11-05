const visions = require('./db.json');
let globalId = 4;

module.exports = {
 
    getVisions: (req,res) => {
        res.status(200).send(visions);
    },
 
    deleteHouse: (req,res) => {
        let visionIndex = visions.findIndex((vision) => vision.id === +req.params.id);
        visions.splice(visionIndex,1);
        res.status(200).send(visions);
    },
 
    createHouse: (req,res) => {
        let { title, countdown, imageURL } = req.body
        let newVision = {
            id: globalId,
            title,
            countdown,
            imageURL
        }
        visions.push(newVision)
        res.status(200).send(visions)
        globalId++
    },
 
    updateVision: (req,res) => {
        let { id } = req.params;
        let { type } = req.body;
        let index = visions.findIndex(vision => +vision.id === +id )

        if (visions[index].countdown <= 5 && type === 'minus') {
            visions[index].countdown = 0
            res.status(200).send(visions)
        } else if (type === 'plus') {
            visions[index].countdown += 5
            res.status(200).send(visions)
        } else if (type === 'minus') {
            visions[index].countdown -= 5
            res.status(200).send(visions)
        } else {
            res.sendStatus(400)
        }
    }
 
}