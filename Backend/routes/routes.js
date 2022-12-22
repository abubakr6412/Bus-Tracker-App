const express = require('express');
const Model_Vehicles = require('../models/model');
const Model_Directions = require('../models/model2');
const Model_Routes = require('../models/model3');
const Model_Stops = require('../models/model4');
const Model_Patterns = require('../models/model5');
const Model_Patterns_2 = require('../models/model6');
const router = express.Router();

const request = require('request');





router.get('/getAll', async (req, res) => {
    try {
        const data = await Model_Vehicles.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.get('/UpdateData', async (req, res) => {
    console.log("Routes active")
    request("http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json", function (error, response, body) {
        if (!error && response.statusCode == 200) {


            var myJson = JSON.parse(body);

            for (var key in myJson) {
                inner_data = (myJson[key])
                for (var key in inner_data["routes"]) {

                    routes = inner_data["routes"][key]

                    const data = new Model_Routes({
                        rt: inner_data["routes"][key]["rt"],
                        rtnm: inner_data["routes"][key]["rtnm"],
                        rtclr: inner_data["routes"][key]["rtclr"],
                        rtdd: inner_data["routes"][key]["rtdd"]
                    })
                    const dataToSave = data.save();
                }


            }

        }
    })






    if (req.body["vehicle"] != null) {
        console.log("Vehicle active")
        request('https://ctabustracker.com/bustime/api/v2/getvehicles?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=' + req.body["vehicle"] + '&format=json', function (error, response, body) {
            if (!error && response.statusCode == 200) {


                var myJson = JSON.parse(body);
                for (var key in myJson) {
                    inner_data = (myJson[key])

                    for (var key2 in inner_data) {
                        route_data = (inner_data[key2])
                        for (var key3 in route_data) {


                            const data = new Model_Vehicles({
                                vid: route_data[key3]["vid"],
                                timestamp: route_data[key3]["tmstmp"],
                                lat: route_data[key3]["lat"],
                                lon: route_data[key3]["lon"],
                                hdg: route_data[key3]["hdg"],
                                pid: route_data[key3]["pid"],
                                rt: route_data[key3]["rt"],
                                des: route_data[key3]["des"],
                                pdist: route_data[key3]["pdist"],
                                dly: route_data[key3]["dly"],
                                tatripid: route_data[key3]["tatripid"],
                                origtatripno: route_data[key3]["origtatripno"],
                                tablockid: route_data[key3]["tablockid"],
                                zone: route_data[key3]["zone"],
                            })
                            const dataToSave = data.save();
                        }
                    }
                }
                /*
                  const data=new Model_Vehicles({
                    dir1:dir_1,
                    dir2:dir_2
                  })
                  const dataToSave = data.save();
                  */
            }
        })
    }





    if (req.body["directions"] != null) {
        console.log("Direction active")
        request("http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=" + req.body["directions"] + "&format=json", function (error, response, body) {
            if (!error && response.statusCode == 200) {


                var myJson = JSON.parse(body);

                for (var key in myJson) {
                    inner_data = (myJson[key])
                    data_1 = (myJson[key]["directions"])





                    const data = new Model_Directions({
                        rt: req.body["directions"],
                        dir1: data_1[0]["dir"],
                        dir2: data_1[1]["dir"]
                    })
                    const dataToSave = data.save();



                }

            }
        })
    }



    if (req.body["stops"] != null) {
        console.log("Stops active")

        request("https://ctabustracker.com/bustime/api/v2/getstops?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=" + req.body["stops"] + "&dir=" + req.body["stops2"] + "&format=json", function (error, response, body) {
            if (!error && response.statusCode == 200) {


                var myJson = JSON.parse(body);

                for (var key in myJson) {
                    inner_data = (myJson[key])

                    data1 = inner_data["stops"]

                    for (var key2 in data1) {




                        const data = new Model_Stops({
                            stpid: data1[key2]["stpid"],
                            stpnm: data1[key2]["stpnm"],
                            lat: data1[key2]["lat"],
                            lon: data1[key2]["lon"]
                        })
                        const dataToSave = data.save();


                    }





                }

            }
        })
    }


    if (req.body["pattern"] != null) {
        console.log("Patterns active")

        request("https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=" + req.body["pattern"] + "&pid=" + req.body["pattern2"] + "&format=json", function (error, response, body) {
            if (!error && response.statusCode == 200) {


                var myJson = JSON.parse(body);
                for (var key in myJson) {
                    data = myJson[key]

                    for (var key2 in data) {
                        data2 = data[key2]

                        for (var key3 in data2) {
                            data3 = data2[key3]

                            //console.log(data3["pid"])

                            const data = new Model_Patterns({
                                pid: data3["pid"],
                                ln: data3["ln"],
                                rtdir: data3["rtdir"],

                            })
                            const dataToSave = data.save();


                            pt = data3["pt"]

                            for (var key4 in pt) {
                                //console.log(pt[key4]["seq"])

                                const data = new Model_Patterns_2({
                                    pid: data3["pid"],
                                    seq: pt[key4]["seq"],
                                    lat: pt[key4]["lat"],
                                    lon: pt[key4]["lon"],
                                    typ: pt[key4]["typ"],
                                    stpid: pt[key4]["stpid"],
                                    stpnm: pt[key4]["stpnm"],
                                    pdist: pt[key4]["pdist"]


                                })
                                const dataToSave = data.save();
                            }
                        }
                    }
                }






                /*
                    const data=new Model_Stops({
                        stpid:data1[key2]["stpid"],
                        stpnm:data1[key2]["stpnm"],
                        lat:data1[key2]["lat"],
                        lon:data1[key2]["lon"]
                      })
                    const dataToSave = data.save();
                    
               */








            }
        })
    }

})




router.post('/CreateVehicle', (req, res) => {
    console.log(req.body)
    const data = new Model_Vehicles({
        vid: req.body.vid,
        timestamp: req.body.timestamp,
        lat: req.body.lat,
        lon: req.body.lon,
        hdg: req.body.hdg,
        pid: req.body.pid,
        rt: req.body.rt,
        des: req.body.des,
        pdist: req.body.pdist,
        dly: req.body.dly,
        tatripid: req.body.tatripid,
        origtatripno: req.body.origtatripno,
        tablockid: req.body.tablockid,
        zone: req.body.zone

    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/SearchVehicle', async (req, res) => {
    try {
        const data = await Model_Vehicles.find({ vid: req.body.vid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/DeleteVehicle', async (req, res) => {
    try {
        const data = await Model_Vehicles.deleteOne({ vid: req.body.vid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/UpdateVehicle', async (req, res) => {
    try {
        const data = await Model_Vehicles.findOneAndUpdate({ vid: req.body.vid },
            {
                vid: req.body.vid2,
                timestamp: req.body.timestamp,
                lat: req.body.lat,
                lon: req.body.lon,
                hdg: req.body.hdg,
                pid: req.body.pid,
                rt: req.body.rt,
                des: req.body.des,
                pdist: req.body.pdist,
                dly: req.body.dly,
                tatripid: req.body.tatripid,
                origtatripno: req.body.origtatripno,
                tablockid: req.body.tablockid,
                zone: req.body.zone
            });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/CreateDirection', (req, res) => {

    const data = new Model_Directions({
        rt: req.body.rt,
        dir1: req.body.dir1,
        dir2: req.body.dir2

    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/SearchDirection', async (req, res) => {
    try {
        const data = await Model_Directions.find({ rt: req.body.rt });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/DeleteDirection', async (req, res) => {
    try {
        const data = await Model_Directions.deleteOne({ rt: req.body.rt });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/UpdateDirection', async (req, res) => {
    try {
        const data = await Model_Directions.findOneAndUpdate({ rt: req.body.rt },
            {
                rt: req.body.rt2,
                dir1: req.body.dir1,
                dir2: req.body.dir2
            });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})




router.post('/CreateRoute', (req, res) => {

    const data = new Model_Routes({
        rt: req.body.rt,
        rtnm: req.body.rtnm,
        rtclr: req.body.rtclr,
        rtdd: req.body.rtdd

    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/SearchRoute', async (req, res) => {
    try {
        const data = await Model_Routes.find({ rt: req.body.rt });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/DeleteRoute', async (req, res) => {
    try {
        const data = await Model_Routes.deleteOne({ rt: req.body.rt });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/UpdateRoute', async (req, res) => {
    try {
        const data = await Model_Routes.findOneAndUpdate({ rt: req.body.rt },
            {
                rt: req.body.rt2,
                rtnm: req.body.rtnm,
                rtclr: req.body.rtclr,
                rtdd: req.body.rtdd
            });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})




router.post('/CreateStop', (req, res) => {

    const data = new Model_Stops({
        stpid: req.body.stpid,
        stpnm: req.body.stpnm,
        lat: req.body.lat,
        lon: req.body.lon

    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/SearchStop', async (req, res) => {
    try {
        const data = await Model_Stops.find({ stpid: req.body.stpid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/DeleteStop', async (req, res) => {
    try {
        const data = await Model_Stops.deleteOne({ stpid: req.body.stpid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/UpdateStop', async (req, res) => {
    try {
        const data = await Model_Stops.findOneAndUpdate({ stpid: req.body.stpid },
            {
                stpid: req.body.stpid2,
                stpnm: req.body.stpnm,
                lat: req.body.lat,
                lon: req.body.lon
            });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})





router.post('/CreatePattern', (req, res) => {

    var data4 = 0;
    if (req.body.pid != null) {
        const data = new Model_Patterns({
            pid: req.body.pid,
            ln: req.body.ln,
            rtdir: req.body.rtdir

        })
        data4 = data;
    }
    if (req.body.pid2 != null && req.body.seq != null) {


        const data = new Model_Patterns_2({
            pid: req.body.pid2,
            seq: req.body.seq,
            lat: req.body.lat,
            lon: req.body.lon,
            typ: req.body.typ,
            stpid: req.body.stpid,
            stpnm: req.body.stpnm,
            pdist: req.body.pdist

        })
        data4 = data;
    }
    try {
        const data = data4
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/SearchPattern', async (req, res) => {
    try {
        const data = await Model_Patterns.find({ pid: req.body.pid });
        const data2 = await Model_Patterns_2.find({ pid: req.body.pid });
        var temp = data.concat(data2)
        res.json(temp)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/DeletePattern', async (req, res) => {
    try {
        const data = await Model_Patterns.deleteOne({ pid: req.body.pid });
        const data2 = await Model_Patterns_2.deleteMany({ pid: req.body.pid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/UpdatePattern', async (req, res) => {
    try {
        if (req.body.pid != null) {
            const data = await Model_Patterns.findOneAndUpdate({ pid: req.body.pid },
                {
                    pid: req.body.pid2,
                    ln: req.body.ln,
                    rtdir: req.body.rtdir,
                });
            res.json(data)
        }

        if (req.body.pid3 != null && req.body.seq != null) {
            const data = await Model_Patterns_2.findOneAndUpdate({ pid: req.body.pid3, seq: req.body.seq },
                {
                    pid: req.body.pid4,
                    seq: req.body.seq,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    typ: req.body.typ,
                    stpid: req.body.stpid,
                    stpnm: req.body.stpnm,
                    pdist: req.body.pdist

                });
            res.json(data)
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})




module.exports = router;