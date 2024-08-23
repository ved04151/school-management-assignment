const School = require('../models/schoolModel');
const {calculateDistance} = require('../utils/distance')


// Add a new school
exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            console.log(req.body.name); // Corrected to `console.log`
            return res.status(400).send({ message: "All fields are required!" });
        }

        const newSchool = {
            name,
            address,
            latitude,
            longitude
        };

        // Call School.create with async/await
        const data = await School.create(newSchool);
        
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.listSchools = async (req, res) => {
    try {
        const userLat = parseFloat(req.body.latitude);
        const userLon = parseFloat(req.body.longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).send({ message: "User latitude and longitude are required!" });
        }

        // Call School.getAll with async/await
        const data = await School.getAll();

        // Check if data is an array
        if (!Array.isArray(data)) {
            return res.status(500).send({ message: "Unexpected data format received!" });
        }

        const sortedSchools = data.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        console.log(sortedSchools);

        res.send(sortedSchools);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
