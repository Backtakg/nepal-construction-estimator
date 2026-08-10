// ==========================================================
// NEPAL CONSTRUCTION ESTIMATOR
// RATE DATABASE
// ==========================================================
//
// IMPORTANT:
// These entries are STRUCTURE / DEMONSTRATION entries.
// Do not represent them as official government rates.
// Official Kathmandu FY 2083/84 rates are published by
// District Coordination Committee, Kathmandu.
//
// We will populate verified item-by-item rates from the
// official schedule in the next stage.
// ==========================================================

const RATE_DATABASE = {

    Kathmandu: {

        "2083/84": {

            source:
                "District Coordination Committee, Kathmandu",

            sourceType:
                "Government District Rate",

            sourceYear:
                "FY 2083/84",

            published:
                "2083-04-01",

            sourceURL:
                "https://dccktm.gov.np/district-rate-list",

            items: [

                {
                    code: "EARTH-001",
                    category: "Earthwork",
                    description:
                        "Excavation for foundation",
                    unit: "cu.ft",
                    rate: null
                },

                {
                    code: "CONC-001",
                    category: "Concrete",
                    description:
                        "PCC",
                    unit: "cu.ft",
                    rate: null
                },

                {
                    code: "CONC-002",
                    category: "Concrete",
                    description:
                        "RCC",
                    unit: "cu.ft",
                    rate: null
                },

                {
                    code: "STEEL-001",
                    category:
                        "Reinforcement",
                    description:
                        "Reinforcement steel",
                    unit: "kg",
                    rate: null
                },

                {
                    code: "MASON-001",
                    category:
                        "Masonry",
                    description:
                        "Brick masonry",
                    unit: "cu.ft",
                    rate: null
                },

                {
                    code: "PLAST-001",
                    category:
                        "Plaster",
                    description:
                        "Cement plaster",
                    unit: "sq.ft",
                    rate: null
                },

                {
                    code: "FLOOR-001",
                    category:
                        "Flooring",
                    description:
                        "Floor finishing",
                    unit: "sq.ft",
                    rate: null
                },

                {
                    code: "PAINT-001",
                    category:
                        "Painting",
                    description:
                        "Painting work",
                    unit: "sq.ft",
                    rate: null
                }

            ]
        },


        "2082/83": {

            source:
                "District Coordination Committee, Kathmandu",

            sourceType:
                "Government District Rate",

            sourceYear:
                "FY 2082/83",

            published:
                "2082-04-11",

            sourceURL:
                "https://dccktm.gov.np/detail/19",

            items: []

        }

    }

};


// ==========================================================
// GET AVAILABLE LOCATIONS
// ==========================================================

function getRateLocations() {

    return Object.keys(
        RATE_DATABASE
    );

}


// ==========================================================
// GET AVAILABLE YEARS
// ==========================================================

function getRateYears(
    location
) {

    if (
        !RATE_DATABASE[location]
    ) {

        return [];

    }


    return Object.keys(
        RATE_DATABASE[location]
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
        !RATE_DATABASE[location]
    ) {

        return null;

    }


    return (
        RATE_DATABASE[location][year] ||
        null
    );
}


// ==========================================================
// FIND RATE ITEM
// ==========================================================

function findRateItem(
    location,
    year,
    searchText
) {

    const schedule =
        getRateSchedule(
            location,
            year
        );


    if (!schedule) {

        return null;

    }


    const search =
        String(
            searchText || ""
        )
            .toLowerCase()
            .trim();


    if (!search) {

        return null;

    }


    return (
        schedule.items.find(
            function(item) {

                return (

                    item.description
                        .toLowerCase()
                        .includes(search)

                    ||

                    item.category
                        .toLowerCase()
                        .includes(search)

                    ||

                    item.code
                        .toLowerCase()
                        .includes(search)

                );

            }
        ) || null
    );
}


// ==========================================================
// CHECK WHETHER A RATE IS VERIFIED
// ==========================================================

function isVerifiedRate(
    item
) {

    return (
        item &&
        typeof item.rate === "number" &&
        item.rate > 0
    );

}


// ==========================================================
// FORMAT RATE
// ==========================================================

function formatRate(
    rate
) {

    if (
        typeof rate !== "number" ||
        rate <= 0
    ) {

        return "Not yet loaded";

    }


    return (
        "NPR " +
        rate.toLocaleString()
    );

}
