const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", async (req, res, next) => {
//   try {
//     const data = await db.query("SELECT * FROM tags");
//     res.json(data.rows);
//   } catch (err) {
//     return next(err);
//   }
try{
    const message_and_tags = await db.query(
        `SELECT t.id, m.text, t.name 
         FROM messages m 
           JOIN messages_tags mt ON m.id=mt.message_id 
           JOIN tags t ON mt.tag_id = t.id 
         ORDER BY t.id`
      );
    
      let tags=[];
      //let prevIndex=0;
      let m_and_t=message_and_tags.rows;
      currentMessges=[];
      //prev=m_and_t[0].id;
      length=m_and_t.length;
      m_and_t.push({"id":-1});
     // console.log(m_and_t)
      for(let i=0;i<length;i++){
        currentTag=m_and_t[i];
        currentMessges.push(currentTag.text)
            
            if(m_and_t[i].id!= m_and_t[i+1].id){
                delete currentTag.text;
                currentTag.text=currentMessges;
                tags.push(currentTag);
                console.log(currentTag);
                currentMessges=[];
            }
           // prev=m_and_t[i].id;
      }
     
     return  res.json(tags);
    }
    catch(e){
        return next(err)
    }

});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;