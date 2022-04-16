
const router = require('express').Router()

const Person = require('../models/Person')


//Rotas da API


//CREATE
router.post('/', async (req, res) => {

    //req.body
    const {name, salary, approved} = req.body

    //{name: "Danilo", salary: 10000, approved: true}

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório' }) 
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    //Metodo create do mongoose
    try {
      
        //Criando dados 
      await Person.create(person)

      //responsta de sucecso
      res.status(201).json({message:'Pessoa inserida no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }



})



//READ - Leitura de dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    } catch(error) {
        res.status(500).json({error: error})
    }
})


router.get('/:id', async (req, res) => {

    //extrai o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(424).json({message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }


})

//Upadate - atualização dos dados (PUT - PATCH)
router.patch('/:id', async (req, res) =>{

    const id = req.params.id

    // cria 3 variaveis que serão populadas com oque vem do body da requisição
     const {name, salary, approved} = req.body


     // cria um objeto que recebe as 3 variaveis para que possa ser passsado para o mongoose   
     const person = {
         name,
         salary,
         approved
     }

     try {
        
        const updatePerson = await Person.updateOne({_id:id},person)


        console.log(updatePerson)


        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: 'O usuario não foi encontrado!'})
            return
        }


        res.status(200).json(person)

     } catch (error) {

            res.status(500).json({error: error})
     }

})


//Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id:id})

    if(!person){
        res.status(422).json({message: 'usuario não encontrado'})
        return
    }

    try {
    
     await Person.deleteOne({_id:id})

     res.status(200).json({message: 'Usuario removido com sucesso!'})
        

    } catch (error) {
            res.status(500).json('Erro ao deletar o dado')
    }


})




module.exports = router
