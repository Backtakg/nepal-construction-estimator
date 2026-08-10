// ==========================================================
// NEPAL CONSTRUCTION ESTIMATOR
// KATHMANDU DISTRICT RATE DATABASE
// FY 2083/84
// ==========================================================
//
// IMPORTANT:
// These are MATERIAL reference rates extracted from the
// uploaded Kathmandu District Rate document.
//
// They are NOT composite construction-work rates.
// Therefore PCC, RCC, plaster, painting, etc. should not
// automatically receive a fabricated rate.
//
// Always verify the current applicable rate before
// commercial use.
// ==========================================================


const NEPAL_RATE_DATABASE = {

    Kathmandu: {

        "2083/84": {

            source:
                "Kathmandu District Rate — FY 2083/84",

            sourceType:
                "District Rate Reference",

            sourceYear:
                "2083/84",

            items: [

                // ==================================================
                // REINFORCEMENT STEEL
                // ==================================================

                {
                    id: "tmt-8",
                    category: "Reinforcement",
                    description: "TMT Bar 8 mm dia",
                    unit: "kg",
                    rate: 94,
                    verified: true
                },

                {
                    id: "tmt-10-20",
                    category: "Reinforcement",
                    description:
                        "TMT Bar 10, 12, 16, 20 mm dia",
                    unit: "kg",
                    rate: 90,
                    verified: true
                },

                {
                    id: "tmt-25",
                    category: "Reinforcement",
                    description: "TMT Bar 25 mm dia",
                    unit: "kg",
                    rate: 94,
                    verified: true
                },

                {
                    id: "tmt-28-32",
                    category: "Reinforcement",
                    description:
                        "TMT Bar 28, 32 mm dia",
                    unit: "kg",
                    rate: 94,
                    verified: true
                },


                // ==================================================
                // FE 500D STEEL
                // ==================================================

                {
                    id: "fe500d-8",
                    category: "Reinforcement",
                    description:
                        "TMT Bar FE 500D 8 mm dia",
                    unit: "kg",
                    rate: 104,
                    verified: true
                },

                {
                    id: "fe500d-10-20",
                    category: "Reinforcement",
                    description:
                        "TMT Bar FE 500D 10, 12, 16, 20 mm dia",
                    unit: "kg",
                    rate: 100,
                    verified: true
                },

                {
                    id: "fe500d-25",
                    category: "Reinforcement",
                    description:
                        "TMT Bar FE 500D 25 mm dia",
                    unit: "kg",
                    rate: 104,
                    verified: true
                },

                {
                    id: "fe500d-28-32",
                    category: "Reinforcement",
                    description:
                        "TMT Bar FE 500D 28, 32 mm dia",
                    unit: "kg",
                    rate: 104,
                    verified: true
                },


                // ==================================================
                // TOR STEEL
                // ==================================================

                {
                    id: "tor-8",
                    category: "Reinforcement",
                    description:
                        "TOR Steel 8 mm dia",
                    unit: "kg",
                    rate: 94,
                    verified: true
                },

                {
                    id: "tor-10-25",
                    category: "Reinforcement",
                    description:
                        "TOR Steel 10–25 mm dia",
                    unit: "kg",
                    rate: 91,
                    verified: true
                },

                {
                    id: "tor-28-32",
                    category: "Reinforcement",
                    description:
                        "TOR Steel 28–32 mm dia",
                    unit: "kg",
                    rate: 94,
                    verified: true
                },


                // ==================================================
                // TOR WIRE
                // ==================================================

                {
                    id: "tor-wire",
                    category: "Reinforcement",
                    description:
                        "TOR Wire 4.75 / 7 mm dia",
                    unit: "kg",
                    rate: 86,
                    verified: true
                },


                // ==================================================
                // SAND
                // ==================================================

                {
                    id: "sand-river",
                    category: "Concrete",
                    description:
                        "River Sand",
                    unit: "cu.ft",
                    rate: 78,
                    verified: true
                },

                {
                    id: "sand-coarse",
                    category: "Concrete",
                    description:
                        "Coarse Sand",
                    unit: "cu.ft",
                    rate: 90,
                    verified: true
                },


                // ==================================================
                // CRUSHED AGGREGATE
                // ==================================================

                {
                    id: "crusher-63",
                    category: "Concrete",
                    description:
                        "Crusher Run Sub-base Material 63 mm Down",
                    unit: "cu.ft",
                    rate: 74,
                    verified: true
                },

                {
                    id: "aggregate-40",
                    category: "Concrete",
                    description:
                        "40 mm Down Crushed Base Material",
                    unit: "cu.ft",
                    rate: 80,
                    verified: true
                },


                // ==================================================
                // STONE / AGGREGATE MATERIALS
                // ==================================================

                {
                    id: "stone-dust",
                    category: "Masonry",
                    description:
                        "Stone Dust",
                    unit: "cu.ft",
                    rate: 37,
                    verified: true
                },

                {
                    id: "granular-soil",
                    category: "Earthwork",
                    description:
                        "Granular Soil",
                    unit: "cu.ft",
                    rate: 685,
                    verified: true
                },


                // ==================================================
                // BRICK
                // ==================================================

                {
                    id: "brick",
                    category: "Masonry",
                    description:
                        "Brick",
                    unit: "cu.m",
                    rate: 2625,
                    verified: true
                },


                // ==================================================
                // ECO BRICK
                // ==================================================

                {
                    id: "eco-brick-sada",
                    category: "Masonry",
                    description:
                        "ECO BRICK Sada",
                    unit: "no.",
                    rate: 19,
                    verified: true
                },

                {
                    id: "eco-brick-colour",
                    category: "Masonry",
                    description:
                        "ECO BRICK Colour",
                    unit: "no.",
                    rate: 21,
                    verified: true
                },


                // ==================================================
                // AAC BLOCK
                // ==================================================

                {
                    id: "aac-2x8x4",
                    category: "Masonry",
                    description:
                        "Autoclaved Aerated Concrete Block 2x8x4",
                    unit: "no.",
                    rate: 137,
                    verified: true
                },

                {
                    id: "aac-2x8x6",
                    category: "Masonry",
                    description:
                        "Autoclaved Aerated Concrete Block 2x8x6",
                    unit: "no.",
                    rate: 205,
                    verified: true
                },

                {
                    id: "aac-2x8x8",
                    category: "Masonry",
                    description:
                        "Autoclaved Aerated Concrete Block 2x8x8",
                    unit: "no.",
                    rate: 275,
                    verified: true
                },


                // ==================================================
                // FLAG STONE
                // ==================================================

                {
                    id: "flag-stone-small",
                    category: "Flooring",
                    description:
                        "Flag Stone up to 1 inch",
                    unit: "sq.ft",
                    rate: 87,
                    verified: true
                },

                {
                    id: "flag-stone-medium",
                    category: "Flooring",
                    description:
                        "Flag Stone up to 1.5 inch",
                    unit: "sq.ft",
                    rate: 100,
                    verified: true
                },

                {
                    id: "flag-stone-2",
                    category: "Flooring",
                    description:
                        "Flag Stone up to 2 inch",
                    unit: "sq.ft",
                    rate: 118,
                    verified: true
                },


                // ==================================================
                // WATER
                // ==================================================

                {
                    id: "construction-water",
                    category: "Concrete",
                    description:
                        "Water for Construction",
                    unit: "liter",
                    rate: 0.28,
                    verified: true
                },


                // ==================================================
                // PLASTIC SHEET
                // ==================================================

                {
                    id: "plastic-sheet",
                    category: "Other",
                    description:
                        "Plastic Sheet",
                    unit: "sq.m",
                    rate: 33,
                    verified: true
                },


                // ==================================================
                // CSEB
                // ==================================================

                {
                    id: "cseb-large",
                    category: "Masonry",
                    description:
                        "Compressed Stabilized Earth Block 300x150x100 mm",
                    unit: "no.",
                    rate: 50,
                    verified: true
                },

                {
                    id: "cseb-small",
                    category: "Masonry",
                    description:
                        "Compressed Stabilized Earth Block 230x110x60 mm",
                    unit: "no.",
                    rate: 14,
                    verified: true
                },


                // ==================================================
                // MOSQUITO / WIRE MESH
                // ==================================================

                {
                    id: "mosquito-net",
                    category: "Other",
                    description:
                        "Mosquito Proof Net",
                    unit: "sq.ft",
                    rate: 137,
                    verified: true
                },

                {
                    id: "chicken-wire",
                    category: "Other",
                    description:
                        "Chicken Wire Mesh",
                    unit: "sq.ft",
                    rate: 86,
                    verified: true
                },


                // ==================================================
                // WATERPROOFING / OTHER
                // ==================================================

                {
                    id: "capping-layer",
                    category: "Earthwork",
                    description:
                        "Capping Layer 0–75 mm",
                    unit: "cu.ft",
                    rate: 63,
                    verified: true
                }

            ]
        }
    }
};


// ==========================================================
// GET AVAILABLE LOCATIONS
// ==========================================================

function getRateLocations() {

    return Object.keys(
        NEPAL_RATE_DATABASE
    );

}


// ==========================================================
// GET AVAILABLE YEARS
// ==========================================================

function getRateYears(location) {

    if (
        !NEPAL_RATE_DATABASE[location]
    ) {

        return [];

    }


    return Object.keys(
        NEPAL_RATE_DATABASE[location]
    );

}


// ==========================================================
// GET RATE SCHEDULE
// ==========================================================

function getRateSchedule(
    location,
    year
) {

    if (
        !NEPAL_RATE_DATABASE[location]
    ) {

        return null;

    }


    return (
        NEPAL_RATE_DATABASE[location][year] ||
        null
    );

}


// ==========================================================
// CHECK WHETHER RATE IS VERIFIED
// ==========================================================

function isVerifiedRate(item) {

    return (
        item &&
        item.verified === true &&
        typeof item.rate === "number" &&
        item.rate >= 0
    );

}
