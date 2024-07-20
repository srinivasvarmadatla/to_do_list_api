import express from "express"
import bodyParser from "body-parser"

const app=express();
const port=3000;

app.use(express.json())

var todolist=[
    {
        "id":1,
        "name":"project",
        "priority":3
    },
    {
        "id":2,
        "name":"cooking",
        "priority":3
    },
    {
        "id":3,
        "name":"shopping",
        "priority":2
    }
];

app.get("/to-do",(req,res)=>{
    res.json(todolist)
})

app.get("/to-do/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const disp=todolist.find(item=>item.id==id);
    if(disp){
        res.json(disp);
    }
    else{
        res.status(404).send("that work is not found in your to do list");
    }
})

app.delete("/to-do/remove/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=todolist.findIndex(item=>item.id==id);
    if(index!=-1){
        todolist.splice(index,1);
        res.json(todolist);
    }
    else{
        res.status(404).send("no such id found");
    }
})

app.post("/to-do/add",(req,res)=>{
    const work={
        "id":todolist.length+1,
        "to_do":req.body.name,
        "priority":req.body.priority
    };
    todolist.push(work);
    res.status(201).json(todolist);
})

app.put("/to-do/update/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const {name,priority}=req.body;
    const index=todolist.findIndex(item=>item.id==id);
    if(index!=-1){
        if(name && priority !=undefined){
            todolist[index].name=name;
            todolist[index].priority=priority;
            res.json(todolist)
        }
    }
    else{
        res.status(404).send("no such id found");
    }
})

app.listen(port,()=>{
    console.log(`server listening at port ${port}`);
})