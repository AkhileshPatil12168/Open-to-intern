const express = require("express")
const router = express.Router()
const { createCollege, getCollegeDetails } = require("../Controller/collegeController")
const {createIntern} = require("../Controller/internController")


router.post('/functionup/colleges',createCollege)

router.post('/functionup/interns', createIntern);

router.get("/functionup/collegeDetails", getCollegeDetails)

router.all("/*", function (req, res) {
   return res.status(404).send({ status: false, message: "invalid http request" });
  });



module.exports=router; 