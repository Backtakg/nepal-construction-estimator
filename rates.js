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


// ==========================================
// NEPAL DISTRICT RATE DATABASE
// Kathmandu District Rate 2083/84
// ==========================================

const nepalRates = [

    // ======================================
    // TMT / REINFORCEMENT STEEL
    // ======================================

    {
        id: "tmt-8mm",
        category: "Reinforcement",
        description: "TMT Bar 8 mm dia",
        unit: "kg",
        rate: 94
    },

    {
        id: "tmt-10mm",
        category: "Reinforcement",
        description: "TMT Bar 10 mm dia",
        unit: "kg",
        rate: 90
    },

    {
        id: "tmt-12mm",
        category: "Reinforcement",
        description: "TMT Bar 12 mm dia",
        unit: "kg",
        rate: 90
    },

    {
        id: "tmt-16mm",
        category: "Reinforcement",
        description: "TMT Bar 16 mm dia",
        unit: "kg",
        rate: 90
    },

    {
        id: "tmt-20mm",
        category: "Reinforcement",
        description: "TMT Bar 20 mm dia",
        unit: "kg",
        rate: 90
    },

    {
        id: "tmt-25mm",
        category: "Reinforcement",
        description: "TMT Bar 25 mm dia",
        unit: "kg",
        rate: 94
    },

    {
        id: "tmt-28mm",
        category: "Reinforcement",
        description: "TMT Bar 28 mm dia",
        unit: "kg",
        rate: 94
    },

    {
        id: "tmt-32mm",
        category: "Reinforcement",
        description: "TMT Bar 32 mm dia",
        unit: "kg",
        rate: 94
    },


    // ======================================
    // TMT FE500D
    // ======================================

    {
        id: "fe500d-8mm",
        category: "Reinforcement",
        description: "TMT FE500D 8 mm dia",
        unit: "kg",
        rate: 104
    },

    {
        id: "fe500d-10mm",
        category: "Reinforcement",
        description: "TMT FE500D 10 mm dia",
        unit: "kg",
        rate: 100
    },

    {
        id: "fe500d-12mm",
        category: "Reinforcement",
        description: "TMT FE500D 12 mm dia",
        unit: "kg",
        rate: 100
    },

    {
        id: "fe500d-16mm",
        category: "Reinforcement",
        description: "TMT FE500D 16 mm dia",
        unit: "kg",
        rate: 100
    },

    {
        id: "fe500d-20mm",
        category: "Reinforcement",
        description: "TMT FE500D 20 mm dia",
        unit: "kg",
        rate: 100
    },

    {
        id: "fe500d-25mm",
        category: "Reinforcement",
        description: "TMT FE500D 25 mm dia",
        unit: "kg",
        rate: 104
    },

    {
        id: "fe500d-28mm",
        category: "Reinforcement",
        description: "TMT FE500D 28 mm dia",
        unit: "kg",
        rate: 104
    },

    {
        id: "fe500d-32mm",
        category: "Reinforcement",
        description: "TMT FE500D 32 mm dia",
        unit: "kg",
        rate: 104
    },


    // ======================================
    // TOR STEEL
    // ======================================

    {
        id: "tor-8mm",
        category: "Reinforcement",
        description: "TOR Bar 8 mm dia",
        unit: "kg",
        rate: 94
    },

    {
        id: "tor-10mm",
        category: "Reinforcement",
        description: "TOR Bar 10 mm dia",
        unit: "kg",
        rate: 91
    },

    {
        id: "tor-12mm",
        category: "Reinforcement",
        description: "TOR Bar 12 mm dia",
        unit: "kg",
        rate: 91
    },

    {
        id: "tor-16mm",
        category: "Reinforcement",
        description: "TOR Bar 16 mm dia",
        unit: "kg",
        rate: 91
    },

    {
        id: "tor-20mm",
        category: "Reinforcement",
        description: "TOR Bar 20 mm dia",
        unit: "kg",
        rate: 91
    },

    {
        id: "tor-25mm",
        category: "Reinforcement",
        description: "TOR Bar 25 mm dia",
        unit: "kg",
        rate: 91
    },

    {
        id: "tor-28mm",
        category: "Reinforcement",
        description: "TOR Bar 28 mm dia",
        unit: "kg",
        rate: 94
    },

    {
        id: "tor-32mm",
        category: "Reinforcement",
        description: "TOR Bar 32 mm dia",
        unit: "kg",
        rate: 94
    },


    // ======================================
    // TOR KARI
    // ======================================

    {
        id: "tor-kari-4-75",
        category: "Reinforcement",
        description: "TOR Kari 4.75 mm",
        unit: "kg",
        rate: 96
    },

    {
        id: "tor-kari-7",
        category: "Reinforcement",
        description: "TOR Kari 7 mm",
        unit: "kg",
        rate: 96
    },


    // ======================================
    // GI WIRE
    // ======================================

    {
        id: "gi-heavy",
        category: "Wire",
        description: "GI Wire Heavy Zinc Coated 8/10/12 Gauge",
        unit: "kg",
        rate: 129
    },

    {
        id: "gi-medium",
        category: "Wire",
        description: "GI Wire Medium Zinc Coated 8/10/12 Gauge",
        unit: "kg",
        rate: 124
    },

    {
        id: "gi-light",
        category: "Wire",
        description: "GI Wire Light Zinc Coated 8/10/12 Gauge",
        unit: "kg",
        rate: 117
    },


    // ======================================
    // FENCING / MESH
    // ======================================

    {
        id: "barbed-wire",
        category: "Fencing",
        description: "Barbed Wire",
        unit: "kg",
        rate: 115
    },

    {
        id: "u-hook",
        category: "Fencing",
        description: "U-Hook for Barbed Wire Fencing",
        unit: "pc",
        rate: 0.89
    },

    {
        id: "chain-link-1x1",
        category: "Mesh",
        description: "Chain Link Mesh 1 x 1 inch, 12 Gauge",
        unit: "sq.ft",
        rate: 827
    },

    {
        id: "chain-link-1-6",
        category: "Mesh",
        description: "Chain Link Mesh 1.6 x 1.6 inch, 12 Gauge",
        unit: "sq.ft",
        rate: 774
    },

    {
        id: "chain-link-2x2",
        category: "Mesh",
        description: "Chain Link Mesh 2 x 2 inch, 10 Gauge",
        unit: "sq.ft",
        rate: 613
    },

    {
        id: "chain-link-3x3",
        category: "Mesh",
        description: "Chain Link Mesh 3 x 3 inch, 10 Gauge",
        unit: "sq.ft",
        rate: 501
    },

    {
        id: "chain-link-4x4",
        category: "Mesh",
        description: "Chain Link Mesh 4 x 4 inch, 10 Gauge",
        unit: "sq.ft",
        rate: 399
    },


    // ======================================
    // OTHER MESH
    // ======================================

    {
        id: "mosquito-net",
        category: "Mesh",
        description: "Mosquito Proof Net",
        unit: "sq.ft",
        rate: 137
    },

    {
        id: "mosquito-net-2",
        category: "Mesh",
        description: "Mosquito Net Type 2",
        unit: "sq.ft",
        rate: 143
    },

    {
        id: "chicken-wire",
        category: "Mesh",
        description: "Chicken Wire Mesh",
        unit: "sq.ft",
        rate: 86
    },

    {
        id: "expanded-mesh",
        category: "Mesh",
        description: "Expanded / Other Mesh",
        unit: "sq.ft",
        rate: 224
    },

    {
        id: "steel-crossing-mesh",
        category: "Mesh",
        description: "Steel Crossing Mesh",
        unit: "sq.ft",
        rate: 180
    },

    {
        id: "steel-mosquito-mesh",
        category: "Mesh",
        description: "Steel Mosquito Proof Mesh",
        unit: "sq.ft",
        rate: 312
    },


    // ======================================
    // COUPLERS
    // ======================================

    {
        id: "coupler-16",
        category: "Coupler",
        description: "Steel Bar Coupler 16 mm",
        unit: "pc",
        rate: 65
    },

    {
        id: "coupler-20",
        category: "Coupler",
        description: "Steel Bar Coupler 20 mm",
        unit: "pc",
        rate: 160
    },

    {
        id: "coupler-25",
        category: "Coupler",
        description: "Steel Bar Coupler 25 mm",
        unit: "pc",
        rate: 250
    },

    {
        id: "coupler-28",
        category: "Coupler",
        description: "Steel Bar Coupler 28 mm",
        unit: "pc",
        rate: 300
    },

    {
        id: "coupler-32",
        category: "Coupler",
        description: "Steel Bar Coupler 32 mm",
        unit: "pc",
        rate: 380
    },

    {
        id: "coupler-36",
        category: "Coupler",
        description: "Steel Bar Coupler 36 mm",
        unit: "pc",
        rate: 512
    },

    {
        id: "coupler-40",
        category: "Coupler",
        description: "Steel Bar Coupler 40 mm",
        unit: "pc",
        rate: 700
    },


    // ======================================
    // THREAD CAPS
    // ======================================

    {
        id: "thread-cap-16",
        category: "Thread Cap",
        description: "Thread Cap 16 mm",
        unit: "pc",
        rate: 27
    },

    {
        id: "thread-cap-20",
        category: "Thread Cap",
        description: "Thread Cap 20 mm",
        unit: "pc",
        rate: 40
    },

    {
        id: "thread-cap-25",
        category: "Thread Cap",
        description: "Thread Cap 25 mm",
        unit: "pc",
        rate: 74
    },

    {
        id: "thread-cap-28",
        category: "Thread Cap",
        description: "Thread Cap 28 mm",
        unit: "pc",
        rate: 90
    },

    {
        id: "thread-cap-32",
        category: "Thread Cap",
        description: "Thread Cap 32 mm",
        unit: "pc",
        rate: 99
    },

    {
        id: "thread-cap-36",
        category: "Thread Cap",
        description: "Thread Cap 36 mm",
        unit: "pc",
        rate: 165
    },

    {
        id: "thread-cap-40",
        category: "Thread Cap",
        description: "Thread Cap 40 mm",
        unit: "pc",
        rate: 180
    },


    // ======================================
    // FABRICATED STEEL
    // ======================================

    {
        id: "fabricated-steel-154",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 24",
        unit: "kg",
        rate: 154
    },

    {
        id: "fabricated-steel-141",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 25",
        unit: "kg",
        rate: 141
    },

    {
        id: "fabricated-steel-594",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 26",
        unit: "sq.ft",
        rate: 594
    },

    {
        id: "fabricated-steel-415",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 27",
        unit: "sq.ft",
        rate: 415
    },

    {
        id: "fabricated-steel-332",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 28",
        unit: "sq.ft",
        rate: 332
    },

    {
        id: "fabricated-steel-772",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 30",
        unit: "sq.ft",
        rate: 772
    },

    {
        id: "spiral-staircase",
        category: "Steel",
        description: "Spiral Staircase / Black Pipe Item",
        unit: "LS",
        rate: 3414
    },

    {
        id: "fabricated-steel-148",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 32",
        unit: "kg",
        rate: 148
    },

    {
        id: "fabricated-steel-132",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 33",
        unit: "kg",
        rate: 132
    },

    {
        id: "fabricated-steel-195",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 34",
        unit: "kg",
        rate: 195
    },

    {
        id: "fabricated-steel-52",
        category: "Fabricated Steel",
        description: "Fabricated Steel Item 35",
        unit: "kg",
        rate: 52
    },

    {
        id: "black-pipe-truss",
        category: "Steel",
        description: "Ready Made Black Pipe Tubular Truss",
        unit: "kg",
        rate: 166
    },

    {
        id: "mid-steel-props",
        category: "Steel",
        description: "Mid Steel Props",
        unit: "set",
        rate: 2304
    },

    {
        id: "steel-item-38",
        category: "Steel",
        description: "Steel Item 38",
        unit: "m",
        rate: 229
    },

    {
        id: "light-gauge-steel",
        category: "Steel Structure",
        description: "Light Gauge Steel Structure Installation",
        unit: "sq.ft",
        rate: 470
    }

];

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
