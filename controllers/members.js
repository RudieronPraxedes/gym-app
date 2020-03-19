const fs = require('fs')
const data = require("../data.json")
const { date } = require ('../utils')

exports.index = function (req, res) {
    
    return res.render("members/index", {members: data.members})
}

exports.show = function(req,res) {

    const { id } = req.params

    const foundMember = data.members.find(function(member){

        return member.id == id
    }) 
    if (!foundMember)  return  res.send ("Members Not found")



    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthday      
        
    }
    return res.render("members/show",{ member })
}

exports.edit =  function(req, res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){

        return member.id == id
    }) 
    if (!foundMember)  return  res.send ("Members Not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit',{ member })
    
}

exports.create = function(req, res){
    return res.render('members/create')
}
 
exports.post = function(req, res){    
    //req.query
    //req.body

    const keys = Object.keys (req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send ("Please, Fill all Fields")
        }
    }



birth = Date.parse(req.body.birth)
 

 const lastMember = data.members[data.members.length -1].id

    if(lastMember){
        id = lastMember +1
    }

data.members.push({
    ...req.body,
    id,
    birth
})





fs.writeFile("data.json", JSON.stringify (data, null, 2), function(err){
    if (err) return res.send("Write file error!")

        return res.redirect("/members")   
})
}

exports.put = function(req, res){

    const { id } = req.body

    const foundMember = data.members.find(function(member, foundIndex){
        if( id == member.id){
            index = foundIndex
            return true
        }
        
    }) 
    if (!foundMember)  return  res.send("Member not Found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

        data.members[index] = member

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write Error!")

            return res.redirect(`/members/${id}`)
        })

}

exports.delete = function(req, res){
    const { id } = req.body
    const filteredMembers = data.members.filter(function(member){

        return member.id !=id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){


        if (err) return res.send("Write file error!")
        return res.redirect ("/members")
    })
}