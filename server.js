const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const products=[
 {id:1,name:"Kivi Essential",price:129000,category:"Featured",emoji:"👜"},
 {id:2,name:"Kivi Daily",price:89000,category:"Lifestyle",emoji:"✨"},
 {id:3,name:"Kivi Premium",price:249000,category:"Premium",emoji:"🎀"},
 {id:4,name:"Kivi Accessory",price:59000,category:"Accessories",emoji:"💎"}
];

app.get("/api/products",(req,res)=>{
 const q=String(req.query.q||"").toLowerCase();
 res.json(products.filter(p=>
   !q || p.name.toLowerCase().includes(q) ||
   p.category.toLowerCase().includes(q)
 ));
});

app.get("/api/health",(req,res)=>res.json({
 ok:true,app:"KIVI STORE",version:"1.0.0"
}));

app.use((req,res)=>res.sendFile(path.join(__dirname,"public/index.html")));

app.listen(PORT,"0.0.0.0",()=>console.log(
 `KIVI STORE running: http://127.0.0.1:${PORT}`
));
