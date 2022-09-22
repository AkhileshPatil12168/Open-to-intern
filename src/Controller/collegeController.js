
//---------------------Improting Models and validators-------------------------------------------------------

const collegeModel = require("../Model/collegeModel")
const { isString, isNotEmpty, isWrong, isValidCollege, isValidLink } = require("../validators/validator")
const internModel = require("../Model/internModel")

//-----------------------------------------------------------------------------------------------------------

//--------------------- Creating Controller for College DataBase POST API /functionup/colleges -----------------------------------------------

const createCollege = async function (req, res) {
    try {
        let data = req.body

        //Checking the data in req body is present or not
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Please provide some data." })

        let { name, fullName, logoLink } = data


        //Validating name
        if (!name)
            return res.status(400).send({ status: false, message: "Please provide name." })
        if (!isString(name))
            return res.status(400).send({ status: false, message: "Name must be in string." })

        data.name = name.trim()

        if (!isNotEmpty(data.name))
            return res.status(400).send({ status: false, message: "Please provide some data in name." })
        if (!isWrong(data.name))
            return res.status(400).send({ status: false, message: "Please provide valid name" })

        data.name = data.name.toLowerCase()

        //Checking the unique name
        const collageData = await collegeModel.findOne({ name: data.name })
        if (collageData)
            return res.status(409).send({ status: false, msg: "college name already Exists" });


        //Validating fullName
        if (!fullName)
            return res.status(400).send({ status: false, message: "Please provide fullName." })
        if (!isString(fullName))
            return res.status(400).send({ status: false, message: "fullName must be in string." })

        data.fullName = fullName.trim()

        if (!isNotEmpty(data.fullName))
            return res.status(400).send({ status: false, message: "Please provide some data in fullName." })
        if (!isValidCollege(data.fullName))
            return res.status(400).send({ status: false, message: "Please provide valid fullName." })

        data.fullName = data.fullName.toLowerCase()


        //Validating logoLink
        if (!logoLink)
            return res.status(400).send({ status: false, message: "Please provide logo link." })
        if (!isString(logoLink))
            return res.status(400).send({ status: false, message: "logo link must be in string." })

        data.logoLink = logoLink.trim()

        if (!isNotEmpty(data.logoLink))
            return res.status(400).send({ status: false, message: "Please provide some data in logo link." })
        if (!isValidLink(data.logoLink))
            return res.status(400).send({ status: false, message: "Please provide a correct link" })


        //Creating data of College
        let createdData = await collegeModel.create(data)

        return res.status(201).send({ status: true, data: createdData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}

//-----------------------------------------------------------------------------------------------------------


//-----------------------Creating Controller for GET API /functionup/collegeDetails--------------------------

const getCollegeDetails = async function (req, res) {
    try {

        let collegeName = req.query.collegeName

        //Checking collegeName is present or not
        if (!collegeName) return res.status(400).send({ status: false, msg: "Please Provide College Name" })
        collegeName = collegeName.toLowerCase()

        //Finding the college in college dataBase
        const collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1 })

        if (!collegeData) return res.status(404).send({ status: false, msg: "College Not Found" })


        //Finding the intern's in intern dataBase
        const internData = await internModel.find({ collegeId: collegeData._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

        res.status(200).send({ status: true, data: { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, interns: internData } })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = { createCollege, getCollegeDetails }
