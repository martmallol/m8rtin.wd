const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const ideasMoney = numWeeks * weeklyRevenue;   
    if (!numWeeks || !weeklyRevenue || !isNaN(numWeeks) || 
        !isNaN(weeklyRevenue) || ideasMoney < 1_000_000) {
        res.sendStatus(400);
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
