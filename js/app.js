// Ledger App - Main JavaScript
// Privacy-first lifestyle planning calculator

// ============ STATE ============
const ledgerState = {
    startingAmount: 0,
    timePreferences: ['1_year'],
    yearlyIncome: 0,
    country: 'US',
    region: '',
    additionalIncomes: [],
    donations: [],
    businessExpenses: [],
    livingExpenses: [],
    stocks: [],
    previousStocks: [],
    targetPurchases: [],
    futurePurchases: [],
    vehicleName: '',
    vehiclePrice: 0,
    vehicleDate: '',
    propertyDownPayment: 0,
    propertyDate: '',
    mortgageAmount: 0,
    mortgageDuration: 30,
    cashPurchase: false,
    monthlyRent: 0,
    rentDate: '',
    applyInflation: false,
    detailedMode: false
};

// ============ COMPREHENSIVE INTERNATIONAL TAX DATA (2025) ============

// US Federal Tax Brackets (2025)
const usFederalBrackets = [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 }
];

// US State Tax - comprehensive state data
const usStateTaxFunctions = {
    'Alabama': (income) => {
        const ded = Math.min(income, 3000);
        const taxable = income - ded;
        if (taxable <= 500) return taxable * 0.02;
        if (taxable <= 3000) return 10 + (taxable - 500) * 0.04;
        return 110 + (taxable - 3000) * 0.05;
    },
    'Alaska': () => 0,
    'Arizona': (income) => income * 0.025,
    'Arkansas': (income) => {
        const taxable = income - 2340;
        if (taxable <= 4400) return taxable * 0.02;
        return taxable * 0.039;
    },
    'California': (income) => {
        const taxable = income - 5706;
        if (taxable <= 10412) return taxable * 0.01;
        if (taxable <= 24684) return 104 + (taxable - 10412) * 0.02;
        if (taxable <= 38959) return 389 + (taxable - 24684) * 0.04;
        if (taxable <= 54081) return 960 + (taxable - 38959) * 0.06;
        if (taxable <= 68350) return 1867 + (taxable - 54081) * 0.08;
        if (taxable <= 349137) return 3009 + (taxable - 68350) * 0.093;
        if (taxable <= 418961) return 29122 + (taxable - 349137) * 0.103;
        if (taxable <= 698271) return 36314 + (taxable - 418961) * 0.113;
        return 67886 + (taxable - 698271) * 0.123;
    },
    'Colorado': (income) => income * 0.0425,
    'Connecticut': (income) => {
        if (income <= 10000) return income * 0.03;
        if (income <= 50000) return 300 + (income - 10000) * 0.05;
        if (income <= 100000) return 2300 + (income - 50000) * 0.055;
        if (income <= 200000) return 5050 + (income - 100000) * 0.06;
        if (income <= 250000) return 11050 + (income - 200000) * 0.065;
        return 14300 + (income - 250000) * 0.0699;
    },
    'Delaware': (income) => {
        const taxable = income - 3250;
        if (taxable <= 2000) return 0;
        if (taxable <= 5000) return (taxable - 2000) * 0.022;
        if (taxable <= 10000) return 66 + (taxable - 5000) * 0.039;
        if (taxable <= 20000) return 261 + (taxable - 10000) * 0.048;
        if (taxable <= 25000) return 741 + (taxable - 20000) * 0.052;
        if (taxable <= 60000) return 1001 + (taxable - 25000) * 0.0555;
        return 2944 + (taxable - 60000) * 0.066;
    },
    'Florida': () => 0,
    'Georgia': (income) => (income - 12000) * 0.0539,
    'Hawaii': (income) => {
        const taxable = income - 2200;
        if (taxable <= 2400) return taxable * 0.014;
        if (taxable <= 4800) return 34 + (taxable - 2400) * 0.032;
        if (taxable <= 9600) return 111 + (taxable - 4800) * 0.055;
        if (taxable <= 14400) return 375 + (taxable - 9600) * 0.064;
        if (taxable <= 19200) return 682 + (taxable - 14400) * 0.068;
        if (taxable <= 24000) return 1009 + (taxable - 19200) * 0.072;
        if (taxable <= 36000) return 1355 + (taxable - 24000) * 0.076;
        if (taxable <= 48000) return 2267 + (taxable - 36000) * 0.079;
        if (taxable <= 150000) return 3215 + (taxable - 48000) * 0.0825;
        if (taxable <= 175000) return 11630 + (taxable - 150000) * 0.09;
        if (taxable <= 200000) return 13880 + (taxable - 175000) * 0.10;
        return 16380 + (taxable - 200000) * 0.11;
    },
    'Idaho': (income) => (income - 15750) * 0.05695,
    'Illinois': (income) => (income - 2775) * 0.0495,
    'Indiana': (income) => (income - 1000) * 0.0453,
    'Iowa': (income) => (income - 15750) * 0.038,
    'Kansas': (income) => {
        const taxable = income - 3500;
        if (taxable <= 15000) return taxable * 0.031;
        if (taxable <= 30000) return 465 + (taxable - 15000) * 0.0525;
        return 1252.5 + (taxable - 30000) * 0.057;
    },
    'Kentucky': (income) => (income - 3160) * 0.04,
    'Louisiana': (income) => {
        const taxable = income - 4500;
        if (taxable <= 12500) return taxable * 0.0185;
        if (taxable <= 50000) return 231.25 + (taxable - 12500) * 0.035;
        return 1543.75 + (taxable - 50000) * 0.0425;
    },
    'Maine': (income) => {
        if (income <= 24500) return income * 0.058;
        if (income <= 58050) return 1421 + (income - 24500) * 0.0675;
        return 3685 + (income - 58050) * 0.0715;
    },
    'Maryland': (income) => {
        const deduction = Math.min(Math.max(income * 0.15, 1700), 2550);
        return (income - deduction) * 0.08; // State + avg local
    },
    'Massachusetts': (income) => {
        const tax = (income - 4400) * 0.05;
        return income > 1000000 ? tax + (income - 1000000) * 0.04 : tax;
    },
    'Michigan': (income) => (income - 5900) * 0.0425,
    'Minnesota': (income) => {
        if (income <= 31690) return income * 0.0535;
        if (income <= 104090) return 1695 + (income - 31690) * 0.068;
        if (income <= 183340) return 6618 + (income - 104090) * 0.0785;
        return 12839 + (income - 183340) * 0.0985;
    },
    'Mississippi': (income) => (income - 12300) * 0.04,
    'Missouri': (income) => (income - 15750) * 0.048,
    'Montana': (income) => {
        if (income <= 20500) return income * 0.047;
        if (income <= 36000) return 964 + (income - 20500) * 0.054;
        return 1801 + (income - 36000) * 0.059;
    },
    'Nebraska': (income) => {
        const taxable = income - 7900;
        if (taxable <= 3700) return taxable * 0.0246;
        if (taxable <= 22170) return 91 + (taxable - 3700) * 0.0351;
        if (taxable <= 35730) return 739 + (taxable - 22170) * 0.0501;
        return 1418 + (taxable - 35730) * 0.052;
    },
    'Nevada': () => 0,
    'New Hampshire': () => 0,
    'New Jersey': (income) => {
        if (income <= 20000) return income * 0.014;
        if (income <= 35000) return 280 + (income - 20000) * 0.0175;
        if (income <= 40000) return 542.5 + (income - 35000) * 0.035;
        if (income <= 75000) return 717.5 + (income - 40000) * 0.05525;
        if (income <= 500000) return 2651 + (income - 75000) * 0.0637;
        if (income <= 1000000) return 29731 + (income - 500000) * 0.0897;
        return 74581 + (income - 1000000) * 0.1075;
    },
    'New Mexico': (income) => {
        if (income <= 5500) return income * 0.017;
        if (income <= 11000) return 93.5 + (income - 5500) * 0.032;
        if (income <= 16000) return 269.5 + (income - 11000) * 0.047;
        if (income <= 210000) return 504.5 + (income - 16000) * 0.049;
        return 10010.5 + (income - 210000) * 0.059;
    },
    'New York': (income) => {
        const taxable = income - 8000;
        if (taxable <= 8500) return taxable * 0.04;
        if (taxable <= 11700) return 340 + (taxable - 8500) * 0.045;
        if (taxable <= 13900) return 484 + (taxable - 11700) * 0.0525;
        if (taxable <= 80650) return 600 + (taxable - 13900) * 0.055;
        if (taxable <= 215400) return 4271 + (taxable - 80650) * 0.06;
        if (taxable <= 1077550) return 12356 + (taxable - 215400) * 0.0685;
        return 71413 + (taxable - 1077550) * 0.109;
    },
    'North Carolina': (income) => (income - 12750) * 0.0425,
    'North Dakota': (income) => income > 44725 ? (income - 44725) * 0.0195 : 0,
    'Ohio': (income) => {
        if (income <= 26050) return 0;
        if (income <= 100000) return 360.69 + (income - 26050) * 0.0275;
        return 2394.32 + (income - 100000) * 0.035;
    },
    'Oklahoma': (income) => (income - 6350) * 0.0475,
    'Oregon': (income) => {
        const taxable = income - 2745;
        if (taxable <= 4300) return taxable * 0.0475;
        if (taxable <= 10750) return 204 + (taxable - 4300) * 0.0675;
        if (taxable <= 125000) return 640 + (taxable - 10750) * 0.0875;
        return 10637 + (taxable - 125000) * 0.099;
    },
    'Pennsylvania': (income) => income * 0.0307,
    'Rhode Island': (income) => {
        const taxable = income - 10650;
        if (taxable <= 77450) return taxable * 0.0375;
        if (taxable <= 176050) return 2904 + (taxable - 77450) * 0.0475;
        return 7588 + (taxable - 176050) * 0.0599;
    },
    'South Carolina': (income) => income <= 17330 ? income * 0.03 : income * 0.064,
    'South Dakota': () => 0,
    'Tennessee': () => 0,
    'Texas': () => 0,
    'Utah': (income) => {
        const credit = Math.max(0, 945 - (income - 15750) * 0.013);
        return income * 0.0455 - credit;
    },
    'Vermont': (income) => {
        if (income <= 45400) return income * 0.0335;
        if (income <= 110050) return 1521 + (income - 45400) * 0.066;
        if (income <= 229550) return 5788 + (income - 110050) * 0.076;
        return 14870 + (income - 229550) * 0.0875;
    },
    'Virginia': (income) => {
        if (income <= 3000) return income * 0.02;
        if (income <= 5000) return 60 + (income - 3000) * 0.03;
        if (income <= 17000) return 120 + (income - 5000) * 0.05;
        return 720 + (income - 17000) * 0.0575;
    },
    'Washington': () => 0,
    'West Virginia': (income) => {
        if (income <= 10000) return income * 0.0236;
        if (income <= 25000) return 236 + (income - 10000) * 0.0315;
        if (income <= 40000) return 709 + (income - 25000) * 0.0354;
        if (income <= 60000) return 1240 + (income - 40000) * 0.0472;
        return 2184 + (income - 60000) * 0.0512;
    },
    'Wisconsin': (income) => {
        const taxable = income - 12760;
        if (taxable <= 14320) return taxable * 0.035;
        if (taxable <= 28640) return 501 + (taxable - 14320) * 0.044;
        if (taxable <= 315310) return 1131 + (taxable - 28640) * 0.053;
        return 16325 + (taxable - 315310) * 0.0765;
    },
    'Wyoming': () => 0
};

// Canada Federal Tax Brackets (2025)
const caFederalBrackets = [
    { min: 0, max: 57375, rate: 0.15 },
    { min: 57375, max: 114750, rate: 0.205 },
    { min: 114750, max: 177882, rate: 0.26 },
    { min: 177882, max: 253414, rate: 0.29 },
    { min: 253414, max: Infinity, rate: 0.33 }
];

// Canada Provincial Tax Functions (2025 - all provinces/territories)
const caProvincialTaxFunctions = {
    'Alberta': (income) => {
        if (income <= 151234) return income * 0.10;
        if (income <= 181481) return 15123 + (income - 151234) * 0.12;
        if (income <= 241974) return 18752 + (income - 181481) * 0.13;
        if (income <= 362961) return 26616 + (income - 241974) * 0.14;
        return 43554 + (income - 362961) * 0.15;
    },
    'British Columbia': (income) => {
        if (income <= 49279) return income * 0.0506;
        if (income <= 98560) return 2493 + (income - 49279) * 0.077;
        if (income <= 113158) return 6288 + (income - 98560) * 0.105;
        if (income <= 137407) return 7821 + (income - 113158) * 0.1229;
        if (income <= 186306) return 10801 + (income - 137407) * 0.147;
        if (income <= 259829) return 17989 + (income - 186306) * 0.168;
        return 30341 + (income - 259829) * 0.205;
    },
    'Manitoba': (income) => {
        if (income <= 47564) return income * 0.108;
        if (income <= 101200) return 5137 + (income - 47564) * 0.1275;
        return 11975 + (income - 101200) * 0.174;
    },
    'New Brunswick': (income) => {
        if (income <= 51306) return income * 0.094;
        if (income <= 102614) return 4822 + (income - 51306) * 0.14;
        if (income <= 190060) return 12005 + (income - 102614) * 0.16;
        return 25997 + (income - 190060) * 0.195;
    },
    'Newfoundland': (income) => {
        if (income <= 44192) return income * 0.087;
        if (income <= 88382) return 3844 + (income - 44192) * 0.145;
        if (income <= 157792) return 10252 + (income - 88382) * 0.158;
        if (income <= 220789) return 21219 + (income - 157792) * 0.173;
        if (income <= 282245) return 32117 + (income - 220789) * 0.183;
        if (income <= 564491) return 43364 + (income - 282245) * 0.198;
        if (income <= 1128858) return 99248 + (income - 564491) * 0.208;
        return 216637 + (income - 1128858) * 0.218;
    },
    'Nova Scotia': (income) => {
        if (income <= 30507) return income * 0.0879;
        if (income <= 61015) return 2681 + (income - 30507) * 0.1495;
        if (income <= 95883) return 7242 + (income - 61015) * 0.1667;
        if (income <= 154650) return 13055 + (income - 95883) * 0.175;
        return 23339 + (income - 154650) * 0.21;
    },
    'Ontario': (income) => {
        let bot = 0;
        if (income <= 52886) bot = income * 0.0505;
        else if (income <= 105775) bot = 2670 + (income - 52886) * 0.0915;
        else if (income <= 150000) bot = 7510 + (income - 105775) * 0.1116;
        else if (income <= 220000) bot = 12445 + (income - 150000) * 0.1216;
        else bot = 20957 + (income - 220000) * 0.1316;
        // Ontario Surtax
        const surtax1 = Math.max(0, (bot - 5315) * 0.20);
        const surtax2 = Math.max(0, (bot - 6802) * 0.36);
        return bot + surtax1 + surtax2;
    },
    'Prince Edward Island': (income) => {
        if (income <= 33328) return income * 0.095;
        if (income <= 64656) return 3166 + (income - 33328) * 0.1347;
        if (income <= 105000) return 7386 + (income - 64656) * 0.166;
        if (income <= 140000) return 14083 + (income - 105000) * 0.1762;
        return 20250 + (income - 140000) * 0.19;
    },
    'Quebec': (income) => {
        if (income <= 53255) return income * 0.14;
        if (income <= 106495) return 7455 + (income - 53255) * 0.19;
        if (income <= 129590) return 17571 + (income - 106495) * 0.24;
        return 23114 + (income - 129590) * 0.2575;
    },
    'Saskatchewan': (income) => {
        if (income <= 53463) return income * 0.105;
        if (income <= 152750) return 5613 + (income - 53463) * 0.125;
        return 18024 + (income - 152750) * 0.145;
    },
    'Yukon': (income) => {
        if (income <= 57375) return income * 0.064;
        if (income <= 114750) return 3672 + (income - 57375) * 0.09;
        if (income <= 177882) return 8835 + (income - 114750) * 0.109;
        if (income <= 500000) return 15717 + (income - 177882) * 0.128;
        return 56948 + (income - 500000) * 0.15;
    },
    'Northwest Territories': (income) => {
        if (income <= 51964) return income * 0.059;
        if (income <= 103930) return 3065 + (income - 51964) * 0.086;
        if (income <= 168967) return 7535 + (income - 103930) * 0.122;
        return 15469 + (income - 168967) * 0.1405;
    },
    'Nunavut': (income) => {
        if (income <= 54707) return income * 0.04;
        if (income <= 109413) return 2188 + (income - 54707) * 0.07;
        if (income <= 177881) return 6017 + (income - 109413) * 0.09;
        return 12179 + (income - 177881) * 0.115;
    }
};

// UK Constituent Nations Tax Brackets (2025/2026)
// England, Wales, Northern Ireland share the same income tax rates
const ukBracketsEnglandWalesNI = [
    { min: 0, max: 12570, rate: 0 },
    { min: 12570, max: 50270, rate: 0.20 },
    { min: 50270, max: 125140, rate: 0.40 },
    { min: 125140, max: Infinity, rate: 0.45 }
];

// Scotland has its own distinct tax system
const ukBracketsScotland = [
    { min: 0, max: 12570, rate: 0 },        // Personal Allowance
    { min: 12570, max: 14876, rate: 0.19 }, // Starter
    { min: 14876, max: 26561, rate: 0.20 }, // Basic
    { min: 26561, max: 43662, rate: 0.21 }, // Intermediate
    { min: 43662, max: 75000, rate: 0.42 }, // Higher
    { min: 75000, max: 125140, rate: 0.45 },// Advanced
    { min: 125140, max: Infinity, rate: 0.48 } // Top
];

// UK National Insurance (same for all UK nations)
function calculateUKNationalInsurance(income) {
    // Weekly thresholds converted to yearly: £242/week = £12,584/yr, £967/week = £50,284/yr
    const lowerThreshold = 12584;
    const upperThreshold = 50284;
    let ni = 0;
    if (income > lowerThreshold) {
        ni += Math.min(income - lowerThreshold, upperThreshold - lowerThreshold) * 0.08;
        if (income > upperThreshold) {
            ni += (income - upperThreshold) * 0.02;
        }
    }
    return ni;
}

// Cost of living modifiers for UK regions
const ukCostOfLivingModifiers = {
    // England
    'London': 1.30, 'South East England': 1.15, 'South West England': 1.05,
    'Midlands': 1.00, 'North England': 0.95,
    // Scotland
    'Edinburgh': 1.10, 'Glasgow': 1.00, 'Scottish Highlands': 0.90,
    // Wales
    'Cardiff': 1.00, 'South Wales': 0.95, 'Mid & North Wales': 0.90,
    // Northern Ireland
    'Belfast': 0.95, 'Other NI': 0.88
};

// Germany Tax (2025) - uses algebraic formula
function calculateGermanTax(income) {
    if (income <= 12096) return 0;
    if (income <= 68430) {
        const y = (income - 12096) / 10000;
        return (995.21 * y + 1400) * y;
    }
    if (income <= 277825) {
        const z = (income - 68430) / 10000;
        return (208.85 * z + 2397) * z + 10636.31;
    }
    return 0.45 * income - 18971.06;
}

// France Tax (2025) - quotient familial system
function calculateFrenchTax(income, parts = 1) {
    const r = income / parts;
    let tax = 0;
    if (r <= 11497) tax = 0;
    else if (r <= 29315) tax = (r - 11497) * 0.11;
    else if (r <= 83823) tax = 1960 + (r - 29315) * 0.30;
    else if (r <= 180294) tax = 18312 + (r - 83823) * 0.41;
    else tax = 57865 + (r - 180294) * 0.45;
    return tax * parts;
}

// Netherlands Tax (2025)
function calculateDutchTax(income) {
    if (income <= 38441) return income * 0.3582;
    if (income <= 76817) return 13770 + (income - 38441) * 0.3748;
    return 28148 + (income - 76817) * 0.495;
}

// Switzerland Tax (2025) - Federal only (cantons vary significantly)
function calculateSwissFederalTax(income) {
    if (income <= 18500) return 0;
    if (income <= 33200) return (income - 18500) * 0.0077;
    if (income <= 43500) return 113.15 + (income - 33200) * 0.0088;
    if (income <= 58000) return 203.80 + (income - 43500) * 0.0264;
    if (income <= 76100) return 586.60 + (income - 58000) * 0.0297;
    if (income <= 82000) return 1124.15 + (income - 76100) * 0.0594;
    if (income <= 108800) return 1474.60 + (income - 82000) * 0.066;
    if (income <= 141500) return 3243.40 + (income - 108800) * 0.088;
    if (income <= 184900) return 6121.00 + (income - 141500) * 0.11;
    if (income <= 793400) return 10895.00 + (income - 184900) * 0.132;
    return income * 0.115;
}

// Swiss Canton Multipliers
const swissCantonMultipliers = {
    'Zurich': 2.19, 'Bern': 4.60, 'Lucerne': 3.45, 'Uri': 1.90, 'Schwyz': 2.30,
    'Obwalden': 3.25, 'Nidwalden': 2.25, 'Glarus': 1.00, 'Zug': 1.36, 'Fribourg': 1.80,
    'Solothurn': 2.15, 'Basel-Stadt': 1.00, 'Basel-Landschaft': 1.05, 'Schaffhausen': 2.05,
    'Appenzell AR': 2.70, 'Appenzell AI': 1.75, 'St. Gallen': 2.49, 'Graubunden': 1.85,
    'Aargau': 2.04, 'Thurgau': 2.77, 'Ticino': 1.90, 'Vaud': 2.34, 'Valais': 2.10,
    'Neuchatel': 2.10, 'Geneva': 0.925, 'Jura': 3.80
};

// Nordic Countries Tax Functions
// Denmark (2025)
function calculateDanishTax(income, municipality = 'Copenhagen') {
    const amBidrag = income * 0.08;
    const afterAM = income - amBidrag;
    const personalAllowance = 51600;
    const taxableIncome = Math.max(0, afterAM - personalAllowance);
    const municipalRates = {
        'Copenhagen': 0.237, 'Frederiksberg': 0.231, 'Aarhus': 0.2452,
        'Odense': 0.253, 'Aalborg': 0.254, 'default': 0.2507
    };
    const muniRate = municipalRates[municipality] || municipalRates['default'];
    const bottomTax = taxableIncome * 0.1201;
    const topTax = afterAM > 611800 ? (afterAM - 611800) * 0.15 : 0;
    const muniTax = taxableIncome * muniRate;
    return amBidrag + bottomTax + topTax + muniTax;
}

// Sweden (2025)
function calculateSwedishTax(income, municipality = 'Stockholm') {
    const municipalRates = {
        'Stockholm': 0.2982, 'Gothenburg': 0.326, 'Malmö': 0.3242,
        'Uppsala': 0.3307, 'default': 0.3241
    };
    const muniRate = municipalRates[municipality] || municipalRates['default'];
    // Basic deduction (simplified)
    const basicDeduction = income < 45300 ? Math.min(45300, Math.max(17300, income * 0.35)) : 17300;
    const taxableIncome = Math.max(0, income - basicDeduction);
    const muniTax = taxableIncome * muniRate;
    const stateTax = income > 643100 ? (income - 643100) * 0.20 : 0;
    return muniTax + stateTax;
}

// Norway (2025)
function calculateNorwegianTax(income) {
    // Bracket tax (Trinnskatt)
    let bracketTax = 0;
    if (income > 217400) bracketTax += Math.min(income - 217400, 88650) * 0.017;
    if (income > 306050) bracketTax += Math.min(income - 306050, 391100) * 0.04;
    if (income > 697150) bracketTax += Math.min(income - 697150, 245250) * 0.136;
    if (income > 942400) bracketTax += Math.min(income - 942400, 468350) * 0.166;
    if (income > 1410750) bracketTax += (income - 1410750) * 0.176;
    // National insurance (7.7%)
    const nationalInsurance = income * 0.077;
    // Ordinary tax (22% on net income)
    const minstefradrag = Math.min(104450, Math.max(31800, income * 0.46));
    const personalAllowance = 88250;
    const netIncome = Math.max(0, income - minstefradrag - personalAllowance);
    const ordinaryTax = netIncome * 0.22;
    return bracketTax + nationalInsurance + ordinaryTax;
}

// Finland (2025)
function calculateFinnishTax(income, municipality = 'Helsinki') {
    const municipalRates = {
        'Helsinki': 0.053, 'Espoo': 0.053, 'Tampere': 0.064,
        'Vantaa': 0.064, 'Oulu': 0.064, 'Turku': 0.061, 'default': 0.074
    };
    const muniRate = municipalRates[municipality] || municipalRates['default'];
    // State tax
    let stateTax = 0;
    if (income <= 21200) stateTax = income * 0.1264;
    else if (income <= 31500) stateTax = 2680 + (income - 21200) * 0.19;
    else if (income <= 52100) stateTax = 4637 + (income - 31500) * 0.3025;
    else if (income <= 88200) stateTax = 10868 + (income - 52100) * 0.34;
    else if (income <= 150000) stateTax = 23142 + (income - 88200) * 0.4175;
    else stateTax = 48944 + (income - 150000) * 0.4425;
    const muniTax = income * muniRate;
    // Yle tax (broadcasting)
    const yleTax = income > 15150 ? Math.min(163, (income - 15150) * 0.025) : 0;
    return stateTax + muniTax + yleTax;
}

// Tax deduction rules by country
const taxDeductionRules = {
    US: { standardDeduction: 15750, donationMaxPercent: 0.60, expenseDeductible: true, donationReducesTaxableIncome: true },
    CA: { standardDeduction: 16129, donationMaxPercent: 0.75, expenseDeductible: true, donationReducesTaxableIncome: true },
    // UK Constituent Nations (Gift Aid allows full donation deduction)
    EN: { standardDeduction: 0, donationMaxPercent: 1.0, expenseDeductible: true, donationReducesTaxableIncome: true }, // England
    SC: { standardDeduction: 0, donationMaxPercent: 1.0, expenseDeductible: true, donationReducesTaxableIncome: true }, // Scotland
    WA: { standardDeduction: 0, donationMaxPercent: 1.0, expenseDeductible: true, donationReducesTaxableIncome: true }, // Wales
    NI: { standardDeduction: 0, donationMaxPercent: 1.0, expenseDeductible: true, donationReducesTaxableIncome: true }, // Northern Ireland
    // European Countries
    DE: { standardDeduction: 12096, donationMaxPercent: 0.20, expenseDeductible: true, donationReducesTaxableIncome: true },
    FR: { standardDeduction: 0, donationMaxPercent: 0.20, expenseDeductible: true, donationReducesTaxableIncome: true },
    NL: { standardDeduction: 0, donationMaxPercent: 0.10, expenseDeductible: true, donationReducesTaxableIncome: true },
    CH: { standardDeduction: 0, donationMaxPercent: 0.20, expenseDeductible: true, donationReducesTaxableIncome: true },
    // Nordic Countries
    DK: { standardDeduction: 51600, donationMaxPercent: 0.15, expenseDeductible: true, donationReducesTaxableIncome: true },
    SE: { standardDeduction: 17300, donationMaxPercent: 0.25, expenseDeductible: true, donationReducesTaxableIncome: true },
    NO: { standardDeduction: 88250, donationMaxPercent: 0.25, expenseDeductible: true, donationReducesTaxableIncome: true },
    FI: { standardDeduction: 0, donationMaxPercent: 0.25, expenseDeductible: true, donationReducesTaxableIncome: true }
};

// All regions by country
const regionsByCountry = {
    US: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
         'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
         'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
         'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
         'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
         'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
         'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    CA: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Nova Scotia',
         'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon', 'Northwest Territories', 'Nunavut'],
    // UK Constituent Nations with regions
    EN: ['London', 'South East England', 'South West England', 'Midlands', 'North England'],
    SC: ['Edinburgh', 'Glasgow', 'Scottish Highlands'],
    WA: ['Cardiff', 'South Wales', 'Mid & North Wales'],
    NI: ['Belfast', 'Other NI'],
    // European Countries
    DE: ['Bavaria', 'Berlin', 'Hamburg', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse'],
    FR: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Occitanie'],
    NL: ['North Holland', 'South Holland', 'Utrecht', 'Noord-Brabant'],
    CH: ['Zurich', 'Bern', 'Lucerne', 'Geneva', 'Zug', 'Basel-Stadt', 'Vaud', 'Ticino'],
    // Nordic Countries
    DK: ['Copenhagen', 'Frederiksberg', 'Aarhus', 'Odense', 'Aalborg'],
    SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala'],
    NO: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
    FI: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku']
};

// US Property Tax Rates (Effective Rate as Percentage of Property Value)
const usPropertyTaxRates = {
    'Alabama': 0.0039, 'Alaska': 0.0102, 'Arizona': 0.0072, 'Arkansas': 0.0061,
    'California': 0.0076, 'Colorado': 0.0049, 'Connecticut': 0.0179, 'Delaware': 0.0057,
    'Florida': 0.0083, 'Georgia': 0.0094, 'Hawaii': 0.0027, 'Idaho': 0.0069,
    'Illinois': 0.0208, 'Indiana': 0.0076, 'Iowa': 0.0157, 'Kansas': 0.0114,
    'Kentucky': 0.0078, 'Louisiana': 0.0055, 'Maine': 0.0096, 'Maryland': 0.0095,
    'Massachusetts': 0.0163, 'Michigan': 0.0131, 'Minnesota': 0.0108, 'Mississippi': 0.0065,
    'Missouri': 0.0073, 'Montana': 0.0074, 'Nebraska': 0.0136, 'Nevada': 0.0050,
    'New Hampshire': 0.0193, 'New Jersey': 0.0223, 'New Mexico': 0.0065, 'New York': 0.0164,
    'North Carolina': 0.0084, 'North Dakota': 0.0105, 'Ohio': 0.0156, 'Oklahoma': 0.0097,
    'Oregon': 0.0090, 'Pennsylvania': 0.0109, 'Rhode Island': 0.0163, 'South Carolina': 0.0056,
    'South Dakota': 0.0122, 'Tennessee': 0.0066, 'Texas': 0.0110, 'Utah': 0.0063,
    'Vermont': 0.0176, 'Virginia': 0.0085, 'Washington': 0.0093, 'West Virginia': 0.0058,
    'Wisconsin': 0.0153, 'Wyoming': 0.0058
};

// US Vehicle Registration Costs (Annual Base Fee)
const usVehicleRegCosts = {
    'Alabama': 23, 'Alaska': 100, 'Arizona': 32, 'Arkansas': 25,
    'California': 97, 'Colorado': 70, 'Connecticut': 200, 'Delaware': 40,
    'Florida': 46, 'Georgia': 20, 'Hawaii': 150, 'Idaho': 57,
    'Illinois': 151, 'Indiana': 50, 'Iowa': 35, 'Kansas': 35,
    'Kentucky': 21, 'Louisiana': 20, 'Maine': 70, 'Maryland': 68,
    'Massachusetts': 60, 'Michigan': 125, 'Minnesota': 50, 'Mississippi': 15,
    'Missouri': 35, 'Montana': 87, 'Nebraska': 30, 'Nevada': 33,
    'New Hampshire': 100, 'New Jersey': 65, 'New Mexico': 45, 'New York': 60,
    'North Carolina': 39, 'North Dakota': 100, 'Ohio': 61, 'Oklahoma': 86,
    'Oregon': 68, 'Pennsylvania': 39, 'Rhode Island': 60, 'South Carolina': 40,
    'South Dakota': 72, 'Tennessee': 27, 'Texas': 65, 'Utah': 80,
    'Vermont': 76, 'Virginia': 45, 'Washington': 90, 'West Virginia': 52,
    'Wisconsin': 85, 'Wyoming': 30
};

// Canadian Property Tax Rates (Provincial Average as Percentage)
const caPropertyTaxRates = {
    'Alberta': 0.0064, 'British Columbia': 0.0029, 'Manitoba': 0.0272, 'New Brunswick': 0.0158,
    'Newfoundland': 0.0095, 'Nova Scotia': 0.0110, 'Ontario': 0.0071, 'Prince Edward Island': 0.0167,
    'Quebec': 0.0071, 'Saskatchewan': 0.0133, 'Yukon': 0.0050, 'Northwest Territories': 0.0120,
    'Nunavut': 0.0100
};

// Canadian Vehicle Registration Costs (Annual Fee)
const caVehicleRegCosts = {
    'Alberta': 93, 'British Columbia': 50, 'Manitoba': 139, 'New Brunswick': 115,
    'Newfoundland': 188, 'Nova Scotia': 138, 'Ontario': 0, 'Prince Edward Island': 100,
    'Quebec': 205, 'Saskatchewan': 57, 'Yukon': 50, 'Northwest Territories': 92, 'Nunavut': 70
};

// UK Property Tax (Council Tax - Average Band D Annual)
const ukPropertyTaxRates = {
    'England': 2280, 'Scotland': 1543, 'Wales': 2170, 'Northern Ireland': 1440,
    // UK sub-regions
    'London': 2100, 'South East England': 2400, 'South West England': 2200, 'Midlands': 2100,
    'North England': 2000, 'Edinburgh': 1600, 'Glasgow': 1500, 'Scottish Highlands': 1400,
    'Cardiff': 2200, 'South Wales': 2100, 'Mid & North Wales': 2000, 'Belfast': 1440, 'Other NI': 1400
};

// UK Vehicle Tax (VED - Standard Rate Year 2+)
const ukVehicleTax = 195; // GBP per year

// European Property Tax Rates (as percentage of value or fixed annual)
const euPropertyTaxRates = {
    'DE': 0.0035, 'FR': 0.0100, 'NL': 0.0060, 'CH': 0.0020,
    'DK': 0.0092, 'SE': 0.0075, 'NO': 0.0050, 'FI': 0.0080
};

// Function to get annual property tax based on country and region
function getAnnualPropertyTax(propertyValue, country, region) {
    if (propertyValue <= 0) return 0;

    switch (country) {
        case 'US':
            const usRate = usPropertyTaxRates[region] || 0.01; // Default 1%
            return propertyValue * usRate;
        case 'CA':
            const caRate = caPropertyTaxRates[region] || 0.01;
            return propertyValue * caRate;
        case 'EN': case 'SC': case 'WA': case 'NI':
            // UK uses council tax bands, use fixed amounts based on region
            return ukPropertyTaxRates[region] || ukPropertyTaxRates[country === 'EN' ? 'England' :
                   country === 'SC' ? 'Scotland' : country === 'WA' ? 'Wales' : 'Northern Ireland'] || 2000;
        case 'DE': case 'FR': case 'NL': case 'CH': case 'DK': case 'SE': case 'NO': case 'FI':
            const euRate = euPropertyTaxRates[country] || 0.01;
            return propertyValue * euRate;
        default:
            return propertyValue * 0.01; // Default 1%
    }
}

// Function to get annual vehicle registration/tax based on country, region, and vehicle value
function getAnnualVehicleCost(vehicleValue, country, region) {
    if (vehicleValue <= 0) return 0;

    switch (country) {
        case 'US':
            // Base registration + ad valorem tax in some states
            const baseReg = usVehicleRegCosts[region] || 50;
            // Some states have additional value-based taxes
            const valueTax = ['California', 'Georgia', 'Michigan', 'Virginia', 'Mississippi'].includes(region)
                ? vehicleValue * 0.006 : 0;
            return baseReg + valueTax;
        case 'CA':
            return caVehicleRegCosts[region] || 100;
        case 'EN': case 'SC': case 'WA': case 'NI':
            return ukVehicleTax;
        case 'DE':
            // German Kfz-Steuer based on engine/CO2, simplified to flat rate
            return 100; // Simplified
        case 'FR':
            return 50; // Carte grise renewal minimal
        case 'NL':
            return vehicleValue * 0.02; // Road tax based on weight/value
        case 'CH':
            return vehicleValue * 0.005; // Canton-based
        case 'DK': case 'SE': case 'NO': case 'FI':
            return 150; // Nordic average
        default:
            return 50;
    }
}

// Calculate tax using progressive brackets
function calculateBracketTax(income, brackets) {
    if (!brackets || brackets.length === 0) return 0;
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        if (taxableInBracket > 0 && income > bracket.min) {
            const actualTaxable = Math.min(taxableInBracket, income - bracket.min);
            tax += Math.max(0, actualTaxable) * bracket.rate;
            remainingIncome -= taxableInBracket;
        }
    }
    return tax;
}

// ============ WEALTH & INCOME BENCHMARKS ============
// Global benchmarks (approximate global wealth/income distribution)
const globalBenchmarks = {
    income: [
        { percentile: 99, value: 200000 },
        { percentile: 95, value: 100000 },
        { percentile: 90, value: 60000 },
        { percentile: 80, value: 40000 },
        { percentile: 70, value: 25000 },
        { percentile: 50, value: 12000 },
        { percentile: 30, value: 5000 },
        { percentile: 10, value: 1500 }
    ],
    netWorth: [
        { percentile: 99, value: 5000000 },
        { percentile: 95, value: 1000000 },
        { percentile: 90, value: 500000 },
        { percentile: 80, value: 200000 },
        { percentile: 70, value: 100000 },
        { percentile: 50, value: 40000 },
        { percentile: 30, value: 10000 },
        { percentile: 10, value: 2000 }
    ]
};

// Country-specific benchmarks
const countryBenchmarks = {
    US: {
        income: [
            { percentile: 99, value: 500000 },
            { percentile: 95, value: 250000 },
            { percentile: 90, value: 175000 },
            { percentile: 80, value: 120000 },
            { percentile: 70, value: 90000 },
            { percentile: 50, value: 60000 },
            { percentile: 30, value: 40000 },
            { percentile: 10, value: 20000 }
        ],
        netWorth: [
            { percentile: 99, value: 15000000 },
            { percentile: 95, value: 3500000 },
            { percentile: 90, value: 1900000 },
            { percentile: 80, value: 900000 },
            { percentile: 70, value: 500000 },
            { percentile: 50, value: 200000 },
            { percentile: 30, value: 50000 },
            { percentile: 10, value: 7000 }
        ]
    },
    UK: {
        income: [
            { percentile: 99, value: 350000 },
            { percentile: 95, value: 150000 },
            { percentile: 90, value: 90000 },
            { percentile: 80, value: 65000 },
            { percentile: 50, value: 35000 },
            { percentile: 30, value: 25000 },
            { percentile: 10, value: 15000 }
        ],
        netWorth: [
            { percentile: 99, value: 5000000 },
            { percentile: 95, value: 1500000 },
            { percentile: 90, value: 800000 },
            { percentile: 50, value: 200000 },
            { percentile: 30, value: 50000 },
            { percentile: 10, value: 5000 }
        ]
    },
    CA: {
        income: [
            { percentile: 99, value: 400000 },
            { percentile: 95, value: 180000 },
            { percentile: 90, value: 120000 },
            { percentile: 50, value: 55000 },
            { percentile: 30, value: 35000 },
            { percentile: 10, value: 20000 }
        ],
        netWorth: [
            { percentile: 99, value: 8000000 },
            { percentile: 95, value: 2500000 },
            { percentile: 90, value: 1200000 },
            { percentile: 50, value: 250000 },
            { percentile: 30, value: 50000 },
            { percentile: 10, value: 5000 }
        ]
    },
    DE: {
        income: [
            { percentile: 99, value: 300000 },
            { percentile: 95, value: 130000 },
            { percentile: 90, value: 90000 },
            { percentile: 50, value: 45000 },
            { percentile: 30, value: 30000 },
            { percentile: 10, value: 18000 }
        ],
        netWorth: [
            { percentile: 99, value: 4000000 },
            { percentile: 95, value: 1000000 },
            { percentile: 90, value: 500000 },
            { percentile: 50, value: 100000 },
            { percentile: 30, value: 30000 },
            { percentile: 10, value: 5000 }
        ]
    }
};

// State-specific benchmarks (US states as example, with multipliers for others)
const stateBenchmarks = {
    US: {
        'California': { incomeMultiplier: 1.3, netWorthMultiplier: 1.4 },
        'New York': { incomeMultiplier: 1.35, netWorthMultiplier: 1.5 },
        'Texas': { incomeMultiplier: 1.0, netWorthMultiplier: 1.0 },
        'Florida': { incomeMultiplier: 0.95, netWorthMultiplier: 1.1 },
        'Washington': { incomeMultiplier: 1.2, netWorthMultiplier: 1.2 },
        'default': { incomeMultiplier: 1.0, netWorthMultiplier: 1.0 }
    },
    CA: {
        'Ontario': { incomeMultiplier: 1.1, netWorthMultiplier: 1.2 },
        'British Columbia': { incomeMultiplier: 1.15, netWorthMultiplier: 1.3 },
        'Alberta': { incomeMultiplier: 1.1, netWorthMultiplier: 1.1 },
        'Quebec': { incomeMultiplier: 0.9, netWorthMultiplier: 0.95 },
        'default': { incomeMultiplier: 1.0, netWorthMultiplier: 1.0 }
    },
    UK: { 'default': { incomeMultiplier: 1.0, netWorthMultiplier: 1.0 } },
    DE: { 'default': { incomeMultiplier: 1.0, netWorthMultiplier: 1.0 } }
};

// Legacy compatibility
const wealthBenchmarks = countryBenchmarks.US.netWorth;

// ============ AD SYSTEM ============
let adTimer = 15;
let adInterval = null;

function initAdSystem() {
    const container = document.getElementById('video-ad-container');
    const timerEl = document.getElementById('ad-timer');
    const skipBtn = document.getElementById('skip-ad-btn');

    function startAd() {
        container.style.display = 'flex';
        adTimer = 15;
        skipBtn.disabled = true;
        timerEl.textContent = `Ad: ${adTimer}s`;

        adInterval = setInterval(() => {
            adTimer--;
            timerEl.textContent = `Ad: ${adTimer}s`;
            if (adTimer <= 0) {
                clearInterval(adInterval);
                skipBtn.disabled = false;
            }
        }, 1000);
    }

    function hideAd() {
        clearInterval(adInterval);
        container.style.display = 'none';
        setTimeout(startAd, 180000);
    }

    skipBtn.addEventListener('click', hideAd);
    startAd();
}

// ============ SLIDER SYNC ============
function syncSliderAndInput(sliderId, inputId, callback) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);

    slider.addEventListener('input', () => {
        input.value = slider.value;
        if (callback) callback(parseFloat(slider.value));
    });

    input.addEventListener('input', () => {
        const value = parseFloat(input.value) || 0;
        // Only update slider if value is within range, but always use input value for calculations
        if (value <= parseFloat(slider.max)) {
            slider.value = value;
        } else {
            slider.value = slider.max;
        }
        if (callback) callback(value);
    });
}

// ============ COLLAPSIBLE SECTIONS ============
function initCollapsibleSections() {
    const toggles = [
        { btn: 'toggle-income-btn', section: 'income-section', label: 'Additional Income' },
        { btn: 'toggle-donation-btn', section: 'donation-section', label: 'Donations' },
        { btn: 'toggle-expense-btn', section: 'expense-section', label: 'Business Expenses' },
        { btn: 'toggle-living-btn', section: 'living-section', label: 'Living Expenses' },
        { btn: 'toggle-stock-btn', section: 'stock-section', label: 'Stock Investments' },
        { btn: 'toggle-prev-stock-btn', section: 'prev-stock-section', label: 'Previous Stock Investments' }
    ];

    toggles.forEach(({ btn, section, label }) => {
        const button = document.getElementById(btn);
        const content = document.getElementById(section);

        button.addEventListener('click', () => {
            const isHidden = content.style.display === 'none';
            content.style.display = isHidden ? 'block' : 'none';
            button.textContent = isHidden ? `− ${label}` : `+ ${label}`;
        });
    });
}

// ============ DYNAMIC ITEM GENERATORS ============
let itemIdCounter = 0;

const itemTypeLabels = {
    income: 'Income Source',
    donation: 'Donation',
    expense: 'Business Expense',
    living: 'Living Expense',
    stock: 'Stock Investment',
    prevStock: 'Previous Stock Investment',
    purchase: 'Target Purchase',
    future: 'Future Purchase'
};

// Helper function to calculate yearly cost based on frequency
function calculateYearlyCostFromFrequency(cost, frequency, customDays = 30, isRecurring = true) {
    if (!isRecurring) {
        return cost; // One-time purchase
    }
    switch (frequency) {
        case 'daily': return cost * 365;
        case 'weekly': return cost * 52;
        case 'monthly': return cost * 12;
        case 'quarterly': return cost * 4;
        case 'yearly': return cost;
        case 'custom': return cost * (365 / (customDays || 30));
        case 'once': return cost;
        default: return cost * 12;
    }
}

// Update the calculation display for purchase/future items
function updatePurchaseCalculationDisplay(div, type) {
    const calcTextEl = div.querySelector('.calc-text');
    const compareCalcTextEl = div.querySelector('.compare-calc-text');

    if (!calcTextEl) return;

    // Get values based on type
    const prefix = type === 'purchase' ? 'purchase' : 'future';
    const costInput = div.querySelector(`.${prefix}-cost-input`);
    const recurringToggle = div.querySelector(`.${prefix}-recurring-toggle`);
    const frequencySelect = div.querySelector(`.${prefix}-frequency`);
    const customDaysInput = div.querySelector(`.${prefix}-custom-days`);

    const cost = parseFloat(costInput?.value) || 0;
    const isRecurring = recurringToggle?.checked || false;
    const frequency = frequencySelect?.value || 'monthly';
    const customDays = parseInt(customDaysInput?.value) || 30;

    // Calculate yearly cost
    const yearlyCost = calculateYearlyCostFromFrequency(cost, frequency, customDays, isRecurring);

    // Format the calculation display
    let calcText = '';
    if (cost > 0) {
        if (isRecurring) {
            const freqLabel = frequency === 'custom' ? `every ${customDays} days` : frequency;
            const multiplier = frequency === 'daily' ? '365' :
                              frequency === 'weekly' ? '52' :
                              frequency === 'monthly' ? '12' :
                              frequency === 'quarterly' ? '4' :
                              frequency === 'yearly' ? '1' :
                              frequency === 'custom' ? `365/${customDays}` : '12';
            calcText = `$${cost.toLocaleString()} × ${multiplier} = $${Math.round(yearlyCost).toLocaleString()}/year`;
        } else {
            calcText = `One-time: $${cost.toLocaleString()}`;
        }
    } else {
        calcText = 'Yearly Cost: $0';
    }
    calcTextEl.textContent = calcText;

    // Update comparison calculation if visible
    if (compareCalcTextEl) {
        const compareToggle = div.querySelector(`.${prefix}-compare-toggle`);
        const compareCostInput = div.querySelector(`.${prefix}-compare-cost-input`);
        const compareFreqSelect = div.querySelector(`.${prefix}-compare-frequency`);

        if (compareToggle?.checked && compareCostInput) {
            const compareCost = parseFloat(compareCostInput.value) || 0;
            const compareFreq = compareFreqSelect?.value || 'same';

            if (compareCost > 0) {
                let compareYearly;
                let compareFreqLabel;

                if (compareFreq === 'same') {
                    compareYearly = calculateYearlyCostFromFrequency(compareCost, frequency, customDays, isRecurring);
                    compareFreqLabel = isRecurring ? frequency : 'one-time';
                } else if (compareFreq === 'once') {
                    compareYearly = compareCost;
                    compareFreqLabel = 'one-time';
                } else {
                    compareYearly = calculateYearlyCostFromFrequency(compareCost, compareFreq, 30, true);
                    compareFreqLabel = compareFreq;
                }

                const savings = yearlyCost - compareYearly;
                const savingsText = savings > 0 ? ` (Save $${Math.round(savings).toLocaleString()}/yr)` :
                                   savings < 0 ? ` (Costs $${Math.round(-savings).toLocaleString()}/yr more)` : '';

                compareCalcTextEl.textContent = `Alternative: $${compareCost.toLocaleString()} ${compareFreqLabel} = $${Math.round(compareYearly).toLocaleString()}/year${savingsText}`;
            } else {
                compareCalcTextEl.textContent = 'Comparison: $0/year';
            }
        }
    }
}

function createDynamicItem(type, container) {
    const id = ++itemIdCounter;
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.dataset.id = id;

    const defaultLabel = itemTypeLabels[type] || 'Item';
    let contentHtml = '';
    let nameClass = '';

    switch (type) {
        case 'income':
            nameClass = 'income-name';
            contentHtml = `
                <div class="input-group">
                    <label>Income Source</label>
                    <input type="text" class="income-name item-name-input" placeholder="e.g. Freelance Work">
                </div>
                <div class="slider-group">
                    <label>Amount ($/year)</label>
                    <div class="slider-row">
                        <input type="range" class="income-slider" min="0" max="500000" step="1000" value="0">
                        <input type="number" class="income-input" value="0">
                    </div>
                </div>
            `;
            break;
        case 'donation':
            nameClass = 'donation-name';
            contentHtml = `
                <div class="input-group">
                    <label>Donation Recipient</label>
                    <input type="text" class="donation-name item-name-input" placeholder="e.g. Red Cross">
                </div>
                <div class="slider-group">
                    <label>Amount ($/year)</label>
                    <div class="slider-row">
                        <input type="range" class="donation-slider" min="0" max="100000" step="100" value="0">
                        <input type="number" class="donation-input" value="0">
                    </div>
                </div>
            `;
            break;
        case 'expense':
            nameClass = 'expense-name';
            contentHtml = `
                <div class="input-group">
                    <label>Expense Name</label>
                    <input type="text" class="expense-name item-name-input" placeholder="e.g. Office Supplies">
                </div>
                <div class="slider-group">
                    <label>Amount ($/year)</label>
                    <div class="slider-row">
                        <input type="range" class="expense-slider" min="0" max="200000" step="500" value="0">
                        <input type="number" class="expense-input" value="0">
                    </div>
                </div>
            `;
            break;
        case 'living':
            nameClass = 'living-name';
            contentHtml = `
                <div class="input-group">
                    <label>Expense Type</label>
                    <select class="living-type item-name-input">
                        <option value="Electricity Bill">Electricity Bill</option>
                        <option value="Internet Bill">Internet Bill</option>
                        <option value="Water Bill">Water Bill</option>
                        <option value="Phone Bill">Phone Bill</option>
                        <option value="Gas Bill">Gas Bill</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="input-group custom-living-name" style="display: none;">
                    <label>Custom Name</label>
                    <input type="text" class="living-name" placeholder="e.g. Streaming Services">
                </div>
                <div class="slider-group">
                    <label>Amount ($)</label>
                    <div class="slider-row">
                        <input type="range" class="living-amount-slider" min="0" max="2000" step="5" value="0">
                        <input type="number" class="living-amount-input" value="0">
                    </div>
                </div>
                <div class="input-group">
                    <label>Frequency</label>
                    <select class="living-frequency">
                        <option value="monthly" selected>Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div class="custom-frequency-input" style="display: none;">
                    <div class="input-group">
                        <label>Every X Days</label>
                        <input type="number" class="living-custom-days" value="30" min="1">
                    </div>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="living-hide-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Hide from calculations</span>
                </div>
            `;
            break;
        case 'stock':
            nameClass = 'stock-name';
            contentHtml = `
                <div class="input-group">
                    <label>Stock/Fund Name</label>
                    <input type="text" class="stock-name item-name-input" placeholder="e.g. S&P 500 ETF">
                </div>
                <div class="slider-group">
                    <label>Investment Amount ($)</label>
                    <div class="slider-row">
                        <input type="range" class="stock-amount-slider" min="0" max="500000" step="500" value="0">
                        <input type="number" class="stock-amount-input" value="0">
                    </div>
                </div>
                <div class="slider-group">
                    <label>Expected Growth Rate (%/year)</label>
                    <div class="slider-row">
                        <input type="range" class="stock-growth-slider" min="0" max="20" step="0.5" value="7">
                        <input type="number" class="stock-growth-input" value="7">
                    </div>
                </div>
                <div class="input-group">
                    <label>Start Date</label>
                    <input type="date" class="stock-date">
                </div>
                <div class="input-group">
                    <label>Sell At Date (optional)</label>
                    <input type="date" class="stock-sell-date">
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="stock-recurring">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Recurring Investment</span>
                </div>
                <div class="stock-frequency-section" style="display: none;">
                    <div class="input-group">
                        <label>Frequency</label>
                        <select class="stock-frequency">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly" selected>Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div class="stock-custom-frequency-input" style="display: none;">
                        <div class="input-group">
                            <label>Every X Days</label>
                            <input type="number" class="stock-custom-days" value="30" min="1">
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'prevStock':
            nameClass = 'prev-stock-name';
            contentHtml = `
                <div class="input-group">
                    <label>Stock/Fund Name</label>
                    <input type="text" class="prev-stock-name item-name-input" placeholder="e.g. S&P 500 ETF">
                </div>
                <div class="slider-group">
                    <label>Current Value ($)</label>
                    <div class="slider-row">
                        <input type="range" class="prev-stock-amount-slider" min="0" max="1000000" step="500" value="0">
                        <input type="number" class="prev-stock-amount-input" value="0">
                    </div>
                </div>
                <div class="slider-group">
                    <label>Expected Growth Rate (%/year)</label>
                    <div class="slider-row">
                        <input type="range" class="prev-stock-growth-slider" min="0" max="20" step="0.5" value="7">
                        <input type="number" class="prev-stock-growth-input" value="7">
                    </div>
                </div>
                <div class="input-group">
                    <label>Investment Start Date</label>
                    <input type="date" class="prev-stock-date">
                </div>
                <div class="input-group">
                    <label>Sell At Date (optional)</label>
                    <input type="date" class="prev-stock-sell-date">
                </div>
            `;
            break;
        case 'purchase':
            nameClass = 'purchase-name';
            contentHtml = `
                <div class="input-group">
                    <label>Item Name</label>
                    <input type="text" class="purchase-name item-name-input" placeholder="e.g. Morning Coffee">
                </div>
                <div class="slider-group">
                    <label>Cost ($)</label>
                    <div class="slider-row">
                        <input type="range" class="purchase-cost-slider" min="0" max="10000" step="10" value="0">
                        <input type="number" class="purchase-cost-input" value="0">
                    </div>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="purchase-recurring-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Recurring</span>
                </div>
                <div class="frequency-section" style="display: none;">
                    <div class="input-group">
                        <label>Frequency</label>
                        <select class="purchase-frequency">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly" selected>Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div class="custom-frequency-input" style="display: none;">
                        <div class="input-group">
                            <label>Every X Days</label>
                            <input type="number" class="purchase-custom-days" value="30" min="1">
                        </div>
                    </div>
                </div>
                <div class="calculation-display" style="background: rgba(212, 168, 70, 0.1); padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0; font-size: 0.85rem; color: var(--gold);">
                    <span class="calc-text">Yearly Cost: $0</span>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="purchase-hide-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Hide from calculations</span>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="purchase-compare-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Price Difference Comparison</span>
                </div>
                <div class="compare-section" style="display: none;">
                    <div class="slider-group">
                        <label>Compare: Alternative Cost ($)</label>
                        <div class="slider-row">
                            <input type="range" class="purchase-compare-cost-slider" min="0" max="10000" step="1" value="0">
                            <input type="number" class="purchase-compare-cost-input" value="0">
                        </div>
                    </div>
                    <div class="input-group">
                        <label>Comparison Frequency</label>
                        <select class="purchase-compare-frequency">
                            <option value="same" selected>Same as purchase</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="once">One-time</option>
                        </select>
                    </div>
                    <div class="compare-calculation-display" style="background: rgba(74, 222, 128, 0.1); padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0; font-size: 0.85rem; color: #4ade80;">
                        <span class="compare-calc-text">Comparison: $0/year</span>
                    </div>
                </div>
            `;
            break;
        case 'future':
            nameClass = 'future-name';
            contentHtml = `
                <div class="input-group">
                    <label>Purchase Name</label>
                    <input type="text" class="future-name item-name-input" placeholder="e.g. New Laptop">
                </div>
                <div class="slider-group">
                    <label>Cost ($)</label>
                    <div class="slider-row">
                        <input type="range" class="future-cost-slider" min="0" max="100000" step="100" value="0">
                        <input type="number" class="future-cost-input" value="0">
                    </div>
                </div>
                <div class="input-group">
                    <label>Purchase Date</label>
                    <input type="date" class="future-date">
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="future-recurring-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Recurring</span>
                </div>
                <div class="frequency-section" style="display: none;">
                    <div class="input-group">
                        <label>Frequency</label>
                        <select class="future-frequency">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly" selected>Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div class="custom-frequency-input" style="display: none;">
                        <div class="input-group">
                            <label>Every X Days</label>
                            <input type="number" class="future-custom-days" value="30" min="1">
                        </div>
                    </div>
                </div>
                <div class="calculation-display" style="background: rgba(212, 168, 70, 0.1); padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0; font-size: 0.85rem; color: var(--gold);">
                    <span class="calc-text">Yearly Cost: $0</span>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="future-hide-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Hide from calculations</span>
                </div>
                <div class="toggle-group">
                    <label class="toggle-switch">
                        <input type="checkbox" class="future-compare-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Price Difference Comparison</span>
                </div>
                <div class="compare-section" style="display: none;">
                    <div class="slider-group">
                        <label>Compare: Alternative Cost ($)</label>
                        <div class="slider-row">
                            <input type="range" class="future-compare-cost-slider" min="0" max="100000" step="100" value="0">
                            <input type="number" class="future-compare-cost-input" value="0">
                        </div>
                    </div>
                    <div class="input-group">
                        <label>Comparison Frequency</label>
                        <select class="future-compare-frequency">
                            <option value="same" selected>Same as purchase</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="once">One-time</option>
                        </select>
                    </div>
                    <div class="compare-calculation-display" style="background: rgba(74, 222, 128, 0.1); padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0; font-size: 0.85rem; color: #4ade80;">
                        <span class="compare-calc-text">Comparison: $0/year</span>
                    </div>
                </div>
            `;
            break;
    }

    // Wrap in collapsible structure
    const html = `
        <div class="item-header">
            <span class="item-toggle">−</span>
            <span class="item-title">${defaultLabel}</span>
            <button class="remove-btn">Remove</button>
        </div>
        <div class="item-content">
            ${contentHtml}
        </div>
    `;

    div.innerHTML = html;

    // Handle all sliders (including secondary ones for stocks)
    const sliders = div.querySelectorAll('input[type="range"]');
    const numInputs = div.querySelectorAll('input[type="number"]');
    sliders.forEach((s, i) => {
        if (numInputs[i]) {
            s.addEventListener('input', () => {
                numInputs[i].value = s.value;
                updateCalculations();
            });
            numInputs[i].addEventListener('input', () => {
                const value = parseFloat(numInputs[i].value) || 0;
                // Only update slider if within range, but always use input value
                if (value <= parseFloat(s.max)) {
                    s.value = value;
                } else {
                    s.value = s.max;
                }
                updateCalculations();
            });
        }
    });

    // Remove button
    div.querySelector('.remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        div.remove();
        updateCalculations();
    });

    // Collapsible toggle
    const header = div.querySelector('.item-header');
    const toggle = div.querySelector('.item-toggle');
    const content = div.querySelector('.item-content');
    const titleEl = div.querySelector('.item-title');

    header.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) return;
        const isCollapsed = content.style.display === 'none';
        content.style.display = isCollapsed ? 'block' : 'none';
        toggle.textContent = isCollapsed ? '−' : '+';
    });

    // Handle recurring toggle for purchases
    const recurringToggle = div.querySelector('.purchase-recurring-toggle, .future-recurring-toggle');
    const frequencySection = div.querySelector('.frequency-section');
    if (recurringToggle && frequencySection) {
        recurringToggle.addEventListener('change', () => {
            frequencySection.style.display = recurringToggle.checked ? 'block' : 'none';
            updateCalculations();
        });
    }

    // Handle recurring toggle for stock investments
    const stockRecurringToggle = div.querySelector('.stock-recurring');
    const stockFrequencySection = div.querySelector('.stock-frequency-section');
    if (stockRecurringToggle && stockFrequencySection) {
        stockRecurringToggle.addEventListener('change', () => {
            stockFrequencySection.style.display = stockRecurringToggle.checked ? 'block' : 'none';
            updateCalculations();
        });
    }

    // Handle custom frequency selection
    const frequencySelect = div.querySelector('.purchase-frequency, .future-frequency, .living-frequency');
    const customFrequencyInput = div.querySelector('.custom-frequency-input');
    if (frequencySelect && customFrequencyInput) {
        frequencySelect.addEventListener('change', () => {
            customFrequencyInput.style.display = frequencySelect.value === 'custom' ? 'block' : 'none';
            updateCalculations();
        });
    }

    // Handle stock frequency selection
    const stockFrequencySelect = div.querySelector('.stock-frequency');
    const stockCustomFrequencyInput = div.querySelector('.stock-custom-frequency-input');
    if (stockFrequencySelect && stockCustomFrequencyInput) {
        stockFrequencySelect.addEventListener('change', () => {
            stockCustomFrequencyInput.style.display = stockFrequencySelect.value === 'custom' ? 'block' : 'none';
            updateCalculations();
        });
    }

    // Handle living expense type selection (show custom name field when "Other" selected)
    const livingTypeSelect = div.querySelector('.living-type');
    const customLivingName = div.querySelector('.custom-living-name');
    if (livingTypeSelect && customLivingName) {
        livingTypeSelect.addEventListener('change', () => {
            customLivingName.style.display = livingTypeSelect.value === 'Other' ? 'block' : 'none';
            updateCalculations();
        });
    }

    // Handle price comparison toggle
    const compareToggle = div.querySelector('.purchase-compare-toggle, .future-compare-toggle');
    const compareSection = div.querySelector('.compare-section');
    if (compareToggle && compareSection) {
        compareToggle.addEventListener('change', () => {
            compareSection.style.display = compareToggle.checked ? 'block' : 'none';
            updateCalculations();
            updatePurchaseCalculationDisplay(div, type);
        });
    }

    // Sync compare slider and input
    const compareSlider = div.querySelector('.purchase-compare-cost-slider, .future-compare-cost-slider');
    const compareInput = div.querySelector('.purchase-compare-cost-input, .future-compare-cost-input');
    if (compareSlider && compareInput) {
        compareSlider.addEventListener('input', () => {
            compareInput.value = compareSlider.value;
            updateCalculations();
            updatePurchaseCalculationDisplay(div, type);
        });
        compareInput.addEventListener('input', () => {
            compareSlider.value = Math.min(compareInput.value, compareSlider.max);
            updateCalculations();
            updatePurchaseCalculationDisplay(div, type);
        });
    }

    // Handle comparison frequency change
    const compareFrequencySelect = div.querySelector('.purchase-compare-frequency, .future-compare-frequency');
    if (compareFrequencySelect) {
        compareFrequencySelect.addEventListener('change', () => {
            updateCalculations();
            updatePurchaseCalculationDisplay(div, type);
        });
    }

    // Update calculation display when purchase/future values change
    if (type === 'purchase' || type === 'future') {
        const updateCalc = () => updatePurchaseCalculationDisplay(div, type);
        const costInput = div.querySelector('.purchase-cost-input, .future-cost-input');
        const costSlider = div.querySelector('.purchase-cost-slider, .future-cost-slider');
        if (costInput) costInput.addEventListener('input', updateCalc);
        if (costSlider) costSlider.addEventListener('input', updateCalc);
        if (recurringToggle) recurringToggle.addEventListener('change', updateCalc);
        if (frequencySelect) frequencySelect.addEventListener('change', updateCalc);
        const customDaysInput = div.querySelector('.purchase-custom-days, .future-custom-days');
        if (customDaysInput) customDaysInput.addEventListener('input', updateCalc);
    }

    // Update title when name changes
    const nameInput = div.querySelector('.item-name-input');
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            titleEl.textContent = nameInput.value || defaultLabel;
        });
    }

    // Add change listeners
    div.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('change', updateCalculations);
    });

    container.appendChild(div);
    return div;
}

// ============ CALCULATIONS ============
function parseTimeToYears(timeValue) {
    const match = timeValue.match(/(\d+)_(month|year)s?/);
    if (!match) return 1;
    const num = parseInt(match[1]);
    return match[2] === 'month' ? num / 12 : num;
}

function getSelectedTimePreferences() {
    const buttons = document.querySelectorAll('#time-preference-container .time-btn.selected');
    return Array.from(buttons).map(btn => btn.dataset.value);
}

function getMaxYears() {
    const prefs = getSelectedTimePreferences();
    return Math.max(...prefs.map(parseTimeToYears), 1);
}

function calculateTaxes(income, country, region, donations = 0, expenses = 0) {
    const rules = taxDeductionRules[country] || taxDeductionRules.US;

    // Start with income and apply standard deduction
    let taxableIncome = Math.max(0, income - rules.standardDeduction);

    // Deduct business expenses from taxable income
    if (rules.expenseDeductible && expenses > 0) {
        taxableIncome -= expenses;
    }

    // Deduct donations from taxable income (within limits)
    if (rules.donationReducesTaxableIncome && donations > 0) {
        const maxDonationDeduction = income * rules.donationMaxPercent;
        const donationDeduction = Math.min(donations, maxDonationDeduction);
        taxableIncome -= donationDeduction;
    }

    taxableIncome = Math.max(0, taxableIncome);

    let federalTax = 0;
    let stateTax = 0;

    switch (country) {
        case 'US':
            federalTax = calculateBracketTax(taxableIncome, usFederalBrackets);
            // FICA taxes (Social Security + Medicare)
            const socialSecurity = Math.min(income, 176100) * 0.062;
            const medicare = income * 0.0145 + (income > 200000 ? (income - 200000) * 0.009 : 0);
            federalTax += socialSecurity + medicare;
            // State tax using comprehensive functions
            if (region && usStateTaxFunctions[region]) {
                stateTax = Math.max(0, usStateTaxFunctions[region](taxableIncome));
            }
            break;
        case 'EN': // England
        case 'WA': // Wales
        case 'NI': // Northern Ireland
            federalTax = calculateBracketTax(income, ukBracketsEnglandWalesNI);
            federalTax += calculateUKNationalInsurance(income);
            break;
        case 'SC': // Scotland
            federalTax = calculateBracketTax(income, ukBracketsScotland);
            federalTax += calculateUKNationalInsurance(income);
            break;
        case 'CA':
            // Canada Federal
            federalTax = calculateBracketTax(taxableIncome, caFederalBrackets);
            // CPP and EI
            federalTax += Math.min(4034.10, income * 0.0595); // CPP
            federalTax += Math.min(1077.48, income * 0.0163); // EI
            // Provincial tax using comprehensive functions
            if (region && caProvincialTaxFunctions[region]) {
                stateTax = Math.max(0, caProvincialTaxFunctions[region](taxableIncome));
            }
            // Quebec abatement (16.5% reduction in federal tax)
            if (region === 'Quebec') {
                federalTax *= 0.835;
            }
            break;
        case 'DE':
            federalTax = calculateGermanTax(taxableIncome);
            // Solidarity surcharge (5.5% of income tax if tax > €18,130)
            if (federalTax > 18130) federalTax += federalTax * 0.055;
            break;
        case 'FR':
            federalTax = calculateFrenchTax(taxableIncome);
            break;
        case 'NL':
            federalTax = calculateDutchTax(taxableIncome);
            break;
        case 'CH':
            federalTax = calculateSwissFederalTax(taxableIncome);
            // Apply canton multiplier
            const multiplier = swissCantonMultipliers[region] || 2.0;
            federalTax *= multiplier;
            break;
        case 'DK':
            federalTax = calculateDanishTax(income, region);
            break;
        case 'SE':
            federalTax = calculateSwedishTax(income, region);
            break;
        case 'NO':
            federalTax = calculateNorwegianTax(income);
            break;
        case 'FI':
            federalTax = calculateFinnishTax(income, region);
            // Pension/unemployment insurance (8.65%)
            federalTax += income * 0.0865;
            break;
        default:
            federalTax = calculateBracketTax(taxableIncome, usFederalBrackets);
    }

    return Math.max(0, federalTax + stateTax);
}

// Get detailed tax breakdown for display
function getTaxBreakdown(income, country, region, donations = 0, expenses = 0) {
    const rules = taxDeductionRules[country] || taxDeductionRules.US;
    let taxableIncome = Math.max(0, income - rules.standardDeduction);

    if (rules.expenseDeductible && expenses > 0) taxableIncome -= expenses;
    if (rules.donationReducesTaxableIncome && donations > 0) {
        const maxDonationDeduction = income * rules.donationMaxPercent;
        taxableIncome -= Math.min(donations, maxDonationDeduction);
    }
    taxableIncome = Math.max(0, taxableIncome);

    const breakdown = {
        grossIncome: income,
        standardDeduction: rules.standardDeduction,
        donationDeduction: Math.min(donations, income * rules.donationMaxPercent),
        expenseDeduction: expenses,
        taxableIncome: taxableIncome,
        federalTax: 0,
        stateTax: 0,
        payrollTax: 0,
        totalTax: 0,
        effectiveRate: 0
    };

    switch (country) {
        case 'US':
            breakdown.federalTax = calculateBracketTax(taxableIncome, usFederalBrackets);
            breakdown.payrollTax = Math.min(income, 176100) * 0.062 + income * 0.0145;
            if (region && usStateTaxFunctions[region]) {
                breakdown.stateTax = Math.max(0, usStateTaxFunctions[region](taxableIncome));
            }
            break;
        case 'CA':
            breakdown.federalTax = calculateBracketTax(taxableIncome, caFederalBrackets);
            breakdown.payrollTax = Math.min(4034.10, income * 0.0595) + Math.min(1077.48, income * 0.0163);
            if (region && caProvincialTaxFunctions[region]) {
                breakdown.stateTax = Math.max(0, caProvincialTaxFunctions[region](taxableIncome));
            }
            if (region === 'Quebec') breakdown.federalTax *= 0.835;
            break;
        case 'EN': // England
        case 'WA': // Wales
        case 'NI': // Northern Ireland
            breakdown.federalTax = calculateBracketTax(income, ukBracketsEnglandWalesNI);
            breakdown.payrollTax = calculateUKNationalInsurance(income);
            break;
        case 'SC': // Scotland
            breakdown.federalTax = calculateBracketTax(income, ukBracketsScotland);
            breakdown.payrollTax = calculateUKNationalInsurance(income);
            break;
        default:
            breakdown.federalTax = calculateTaxes(income, country, region, donations, expenses);
    }

    breakdown.totalTax = breakdown.federalTax + breakdown.stateTax + breakdown.payrollTax;
    breakdown.effectiveRate = income > 0 ? (breakdown.totalTax / income * 100).toFixed(1) : 0;
    return breakdown;
}

// Calculate taxes without deductions (for comparison)
function calculateTaxesWithoutDeductions(income, country, region) {
    return calculateTaxes(income, country, region, 0, 0);
}

function collectDynamicItems(containerSelector, fields) {
    const items = [];
    document.querySelectorAll(`${containerSelector} .dynamic-item`).forEach(div => {
        const item = {};
        fields.forEach(f => {
            const el = div.querySelector(f.selector);
            if (el) {
                item[f.key] = f.type === 'number' ? parseFloat(el.value) || 0 :
                             f.type === 'boolean' ? el.checked : el.value;
            }
        });
        items.push(item);
    });
    return items;
}

function updateCalculations() {
    // Gather state
    ledgerState.startingAmount = parseFloat(document.getElementById('starting-amount').value) || 0;
    ledgerState.yearlyIncome = parseFloat(document.getElementById('income-input').value) || 0;
    ledgerState.country = document.getElementById('country-select').value;
    ledgerState.region = document.getElementById('region-select').value;
    ledgerState.vehicleName = document.getElementById('vehicle-name').value;
    ledgerState.vehiclePrice = parseFloat(document.getElementById('vehicle-input').value) || 0;
    ledgerState.vehicleDate = document.getElementById('vehicle-date').value;
    ledgerState.propertyDownPayment = parseFloat(document.getElementById('property-down-input').value) || 0;
    ledgerState.propertyDate = document.getElementById('property-date').value;
    ledgerState.mortgageAmount = parseFloat(document.getElementById('mortgage-input').value) || 0;
    ledgerState.mortgageDuration = parseInt(document.getElementById('mortgage-duration').value) || 30;
    ledgerState.cashPurchase = document.getElementById('cash-purchase-toggle').checked;
    ledgerState.monthlyRent = parseFloat(document.getElementById('rent-input').value) || 0;
    ledgerState.rentDate = document.getElementById('rent-date').value;
    ledgerState.applyInflation = document.getElementById('inflation-toggle').checked;
    ledgerState.detailedMode = document.getElementById('detailed-mode-toggle').checked;
    ledgerState.timePreferences = getSelectedTimePreferences();

    // Collect dynamic items
    ledgerState.additionalIncomes = collectDynamicItems('#additional-income-container', [
        { selector: '.income-name', key: 'name', type: 'string' },
        { selector: '.income-input', key: 'amount', type: 'number' }
    ]);

    ledgerState.donations = collectDynamicItems('#donations-container', [
        { selector: '.donation-name', key: 'name', type: 'string' },
        { selector: '.donation-input', key: 'amount', type: 'number' }
    ]);

    ledgerState.businessExpenses = collectDynamicItems('#business-expense-container', [
        { selector: '.expense-name', key: 'name', type: 'string' },
        { selector: '.expense-input', key: 'amount', type: 'number' }
    ]);

    ledgerState.livingExpenses = collectDynamicItems('#living-expense-container', [
        { selector: '.living-type', key: 'type', type: 'string' },
        { selector: '.living-name', key: 'customName', type: 'string' },
        { selector: '.living-amount-input', key: 'amount', type: 'number' },
        { selector: '.living-frequency', key: 'frequency', type: 'string' },
        { selector: '.living-custom-days', key: 'customDays', type: 'number' },
        { selector: '.living-hide-toggle', key: 'hidden', type: 'boolean' }
    ]);

    ledgerState.stocks = collectDynamicItems('#stocks-container', [
        { selector: '.stock-name', key: 'name', type: 'string' },
        { selector: '.stock-amount-input', key: 'amount', type: 'number' },
        { selector: '.stock-growth-input', key: 'growthRate', type: 'number' },
        { selector: '.stock-date', key: 'startDate', type: 'string' },
        { selector: '.stock-sell-date', key: 'sellDate', type: 'string' },
        { selector: '.stock-recurring', key: 'recurring', type: 'boolean' },
        { selector: '.stock-frequency', key: 'frequency', type: 'string' },
        { selector: '.stock-custom-days', key: 'customDays', type: 'number' }
    ]);

    ledgerState.previousStocks = collectDynamicItems('#prev-stocks-container', [
        { selector: '.prev-stock-name', key: 'name', type: 'string' },
        { selector: '.prev-stock-amount-input', key: 'amount', type: 'number' },
        { selector: '.prev-stock-growth-input', key: 'growthRate', type: 'number' },
        { selector: '.prev-stock-date', key: 'startDate', type: 'string' },
        { selector: '.prev-stock-sell-date', key: 'sellDate', type: 'string' }
    ]);

    ledgerState.targetPurchases = collectDynamicItems('#target-purchase-container', [
        { selector: '.purchase-name', key: 'name', type: 'string' },
        { selector: '.purchase-cost-input', key: 'cost', type: 'number' },
        { selector: '.purchase-recurring-toggle', key: 'recurring', type: 'boolean' },
        { selector: '.purchase-frequency', key: 'frequency', type: 'string' },
        { selector: '.purchase-custom-days', key: 'customDays', type: 'number' },
        { selector: '.purchase-hide-toggle', key: 'hidden', type: 'boolean' },
        { selector: '.purchase-compare-toggle', key: 'hasComparison', type: 'boolean' },
        { selector: '.purchase-compare-cost-input', key: 'compareCost', type: 'number' },
        { selector: '.purchase-compare-frequency', key: 'compareFrequency', type: 'string' }
    ]);

    ledgerState.futurePurchases = collectDynamicItems('#future-purchase-container', [
        { selector: '.future-name', key: 'name', type: 'string' },
        { selector: '.future-cost-input', key: 'cost', type: 'number' },
        { selector: '.future-date', key: 'date', type: 'string' },
        { selector: '.future-recurring-toggle', key: 'recurring', type: 'boolean' },
        { selector: '.future-frequency', key: 'frequency', type: 'string' },
        { selector: '.future-custom-days', key: 'customDays', type: 'number' },
        { selector: '.future-hide-toggle', key: 'hidden', type: 'boolean' },
        { selector: '.future-compare-toggle', key: 'hasComparison', type: 'boolean' },
        { selector: '.future-compare-cost-input', key: 'compareCost', type: 'number' },
        { selector: '.future-compare-frequency', key: 'compareFrequency', type: 'string' }
    ]);

    // Calculate True Income
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    // Calculate taxes with deductions for donations and expenses
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    // True income is gross minus taxes (donations/expenses already factored into tax calculation)
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    document.getElementById('true-income-display').textContent = formatCurrency(trueIncome);

    // Calculate over time
    const maxYears = getMaxYears();
    const results = calculateProjection(trueIncome, maxYears);

    // Update final display
    document.getElementById('display-cash').textContent = formatCurrency(results.liquidCash);
    document.getElementById('display-assets').textContent = formatCurrency(results.assetValue);
    document.getElementById('display-net-worth').textContent = formatCurrency(results.netWorth);

    // Inflation readout and detailed worth section
    const inflationReadout = document.getElementById('inflation-readout');
    const detailedWorthSection = document.getElementById('detailed-worth-section');

    if (ledgerState.applyInflation) {
        inflationReadout.style.display = 'block';
        detailedWorthSection.style.display = 'block';

        const inflationFactor = Math.pow(0.97, maxYears);
        inflationReadout.textContent = `Values shown in today's dollars (${maxYears} years @ 3% inflation = ${(inflationFactor * 100).toFixed(1)}% purchasing power)`;

        // Update detailed breakdown
        document.getElementById('vehicle-depreciated-value').textContent = formatCurrency(results.vehicleValue);
        document.getElementById('property-appreciated-value').textContent = formatCurrency(results.propertyValue - results.mortgageRemaining);
        document.getElementById('stocks-projected-value').textContent = formatCurrency(results.stockValue);

        // Wealth percentile context
        const countryData = countryBenchmarks[ledgerState.country] || countryBenchmarks.US;
        const percentile = calculatePercentile(results.netWorth, countryData.netWorth);
        const percentileContext = document.getElementById('wealth-percentile-context');

        let contextText = '';
        if (percentile <= 1) {
            contextText = `You're in the <span class="percentile-highlight">top 1%</span> of wealth in ${ledgerState.country}. You have more net worth than 99% of the population.`;
        } else if (percentile <= 10) {
            contextText = `You're in the <span class="percentile-highlight">top 10%</span> of wealth. Your financial position is stronger than 90% of people in ${ledgerState.country}.`;
        } else if (percentile <= 25) {
            contextText = `You're in the <span class="percentile-highlight">top 25%</span>. You're doing better than most, with solid financial standing.`;
        } else if (percentile <= 50) {
            contextText = `You're <span class="percentile-highlight">above average</span>. Your net worth exceeds the median in ${ledgerState.country}.`;
        } else {
            contextText = `You're building wealth. The median net worth in ${ledgerState.country} is around ${formatCurrency(countryData.netWorth.find(b => b.percentile === 50)?.value || 100000)}.`;
        }
        percentileContext.innerHTML = contextText;

        // Home price tiers
        const homePriceTiers = document.getElementById('home-price-tiers');
        const homePrices = {
            'Top 1%': '$2M+',
            'Top 10%': '$800K-$2M',
            'Top 25%': '$400K-$800K',
            'Median': '$200K-$400K',
            'Below Median': '$100K-$200K'
        };
        homePriceTiers.innerHTML = Object.entries(homePrices).map(([tier, price]) =>
            `<div class="tier-item"><span class="tier-label">${tier}</span><span class="tier-value">${price}</span></div>`
        ).join('');
    } else {
        inflationReadout.style.display = 'none';
        detailedWorthSection.style.display = 'none';
    }

    // Update benchmarking
    updateBenchmark(results.netWorth);
    updateStatusStack(results.netWorth, results.assetValue, ledgerState.vehiclePrice);
}

function calculateProjection(trueIncome, years) {
    let liquidCash = ledgerState.startingAmount;
    let stockValue = 0;
    let prevStockValue = 0;

    const today = new Date();

    // Check if vehicle, property, and rent dates are in the future
    const vehicleDate = ledgerState.vehicleDate ? new Date(ledgerState.vehicleDate) : null;
    const propertyDate = ledgerState.propertyDate ? new Date(ledgerState.propertyDate) : null;
    const rentDate = ledgerState.rentDate ? new Date(ledgerState.rentDate) : null;

    // Calculate months until these assets/expenses start
    const vehicleMonthsFromNow = vehicleDate ? Math.max(0, (vehicleDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;
    const propertyMonthsFromNow = propertyDate ? Math.max(0, (propertyDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;
    const rentMonthsFromNow = rentDate ? Math.max(0, (rentDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;

    // Initialize values - only include if purchase date is in the past or not set
    let vehicleValue = (vehicleDate && vehicleDate > today) ? 0 : ledgerState.vehiclePrice;
    let propertyValue = (propertyDate && propertyDate > today) ? 0 : (ledgerState.propertyDownPayment + ledgerState.mortgageAmount);
    let mortgageRemaining = (propertyDate && propertyDate > today) ? 0 : ledgerState.mortgageAmount;

    // Track if vehicle/property have been purchased
    let vehiclePurchased = !(vehicleDate && vehicleDate > today);
    let propertyPurchased = !(propertyDate && propertyDate > today);
    let rentStarted = !(rentDate && rentDate > today);

    // Initial stock investments (deducts from cash)
    ledgerState.stocks.forEach(stock => {
        liquidCash -= stock.amount;
        stockValue += stock.amount;
    });

    // Previous stock investments (does NOT deduct from cash)
    ledgerState.previousStocks.forEach(stock => {
        prevStockValue += stock.amount;
    });

    // Monthly mortgage payment (simplified)
    const monthlyMortgage = ledgerState.mortgageAmount > 0
        ? (ledgerState.mortgageAmount * 1.05) / (ledgerState.mortgageDuration * 12)
        : 0;

    // Calculate yearly target purchase costs (for recurring items)
    let yearlyPurchaseCost = 0;
    let oneTimePurchaseCost = 0;
    ledgerState.targetPurchases.forEach(p => {
        if (p.hidden) return;
        if (!p.recurring) {
            // One-time purchase - deduct immediately
            oneTimePurchaseCost += p.cost;
        } else {
            switch (p.frequency) {
                case 'daily': yearlyPurchaseCost += p.cost * 365; break;
                case 'weekly': yearlyPurchaseCost += p.cost * 52; break;
                case 'monthly': yearlyPurchaseCost += p.cost * 12; break;
                case 'quarterly': yearlyPurchaseCost += p.cost * 4; break;
                case 'yearly': yearlyPurchaseCost += p.cost; break;
                case 'custom': yearlyPurchaseCost += p.cost * (365 / (p.customDays || 30)); break;
            }
        }
    });

    // Calculate yearly living expenses
    let yearlyLivingExpenses = 0;
    ledgerState.livingExpenses.forEach(le => {
        if (le.hidden) return;
        switch (le.frequency) {
            case 'daily': yearlyLivingExpenses += le.amount * 365; break;
            case 'weekly': yearlyLivingExpenses += le.amount * 52; break;
            case 'monthly': yearlyLivingExpenses += le.amount * 12; break;
            case 'quarterly': yearlyLivingExpenses += le.amount * 4; break;
            case 'yearly': yearlyLivingExpenses += le.amount; break;
            case 'custom': yearlyLivingExpenses += le.amount * (365 / (le.customDays || 30)); break;
        }
    });

    // Deduct one-time purchases immediately at start
    liquidCash -= oneTimePurchaseCost;

    // Use monthly calculation for sub-year periods to properly account for partial years
    const totalMonths = Math.ceil(years * 12);
    const monthlyIncome = trueIncome / 12;
    const monthlyPurchaseCost = yearlyPurchaseCost / 12;
    const monthlyLivingExpenses = yearlyLivingExpenses / 12;

    for (let month = 1; month <= totalMonths; month++) {
        // For the last month of a fractional year, apply proportional amount
        const monthFraction = (month === totalMonths && years % 1 !== 0)
            ? (years * 12) - Math.floor(years * 12)
            : 1;

        // Check if vehicle should be purchased this month
        if (!vehiclePurchased && month >= vehicleMonthsFromNow) {
            vehiclePurchased = true;
            vehicleValue = ledgerState.vehiclePrice;
            // Deduct vehicle cost from liquid cash (if cash purchase) or add to mortgage equivalent
            if (ledgerState.vehiclePrice > 0) {
                liquidCash -= ledgerState.vehiclePrice;
            }
        }

        // Check if property should be purchased this month
        if (!propertyPurchased && month >= propertyMonthsFromNow) {
            propertyPurchased = true;
            propertyValue = ledgerState.propertyDownPayment + ledgerState.mortgageAmount;
            mortgageRemaining = ledgerState.mortgageAmount;
            // Deduct down payment from liquid cash
            if (ledgerState.propertyDownPayment > 0 && !ledgerState.cashPurchase) {
                liquidCash -= ledgerState.propertyDownPayment;
            } else if (ledgerState.cashPurchase) {
                liquidCash -= (ledgerState.propertyDownPayment + ledgerState.mortgageAmount);
            }
        }

        // Check if rent should start this month
        if (!rentStarted && month >= rentMonthsFromNow) {
            rentStarted = true;
        }

        // Add monthly income
        liquidCash += monthlyIncome * monthFraction;

        // Subtract purchases
        liquidCash -= monthlyPurchaseCost * monthFraction;

        // Subtract living expenses
        liquidCash -= monthlyLivingExpenses * monthFraction;

        // Subtract rent (only if rent has started)
        if (rentStarted) {
            liquidCash -= ledgerState.monthlyRent * monthFraction;
        }

        // Subtract mortgage payments (only if property has been purchased)
        if (propertyPurchased && mortgageRemaining > 0) {
            const payment = Math.min(monthlyMortgage, mortgageRemaining) * monthFraction;
            liquidCash -= payment;
            mortgageRemaining -= payment * 0.3; // Principal portion
        }

        // Property tax (monthly) - only if property has been purchased
        if (propertyPurchased && propertyValue > 0) {
            const annualPropertyTax = getAnnualPropertyTax(propertyValue, ledgerState.country, ledgerState.region);
            liquidCash -= (annualPropertyTax / 12) * monthFraction;
        }

        // Vehicle registration/tax (monthly portion) - only if vehicle has been purchased
        if (vehiclePurchased && vehicleValue > 0) {
            const annualVehicleCost = getAnnualVehicleCost(vehicleValue, ledgerState.country, ledgerState.region);
            liquidCash -= (annualVehicleCost / 12) * monthFraction;
        }

        // Future purchases (check if falls in this month)
        ledgerState.futurePurchases.forEach(fp => {
            if (fp.hidden) return;
            if (fp.date) {
                const purchaseDate = new Date(fp.date);
                const monthsSinceStart = (purchaseDate - today) / (30.44 * 24 * 60 * 60 * 1000);
                if (Math.floor(monthsSinceStart) === month - 1 && monthsSinceStart >= 0) {
                    liquidCash -= fp.cost;
                }
            }
        });

        // Recurring stock investments (monthly)
        ledgerState.stocks.forEach(stock => {
            if (stock.recurring) {
                const freq = stock.frequency || 'monthly';
                let investmentsPerMonth = 0;
                switch (freq) {
                    case 'daily': investmentsPerMonth = 30.44; break;
                    case 'weekly': investmentsPerMonth = 4.33; break;
                    case 'monthly': investmentsPerMonth = 1; break;
                    case 'quarterly': investmentsPerMonth = 1/3; break;
                    case 'yearly': investmentsPerMonth = 1/12; break;
                    case 'custom': investmentsPerMonth = 30.44 / (stock.customDays || 30); break;
                    default: investmentsPerMonth = 1;
                }
                const monthlyAmount = stock.amount * investmentsPerMonth * monthFraction;
                liquidCash -= monthlyAmount;
                stockValue += monthlyAmount;
            }
        });

        // Apply monthly stock growth (new investments)
        ledgerState.stocks.forEach(stock => {
            const monthlyGrowthRate = Math.pow(1 + (stock.growthRate || 7) / 100, 1/12) - 1;
            stockValue *= (1 + monthlyGrowthRate * monthFraction);
        });

        // Apply monthly growth to previous stocks
        ledgerState.previousStocks.forEach(stock => {
            const monthlyGrowthRate = Math.pow(1 + (stock.growthRate || 7) / 100, 1/12) - 1;
            prevStockValue *= (1 + monthlyGrowthRate * monthFraction);
        });

        // Vehicle depreciation (10% yearly = ~0.87% monthly) - only if vehicle has been purchased
        if (vehiclePurchased && vehicleValue > 0) {
            const monthlyDepreciation = Math.pow(0.90, 1/12);
            vehicleValue *= Math.pow(monthlyDepreciation, monthFraction);
        }

        // Property appreciation (3-5% yearly, applied monthly) - only if property has been purchased
        if (propertyPurchased && propertyValue > 0) {
            const yearlyAppreciation = 0.03 + Math.random() * 0.02;
            const monthlyAppreciation = Math.pow(1 + yearlyAppreciation, 1/12);
            propertyValue *= Math.pow(monthlyAppreciation, monthFraction);
        }
    }

    // Apply inflation if toggled
    if (ledgerState.applyInflation) {
        const inflationFactor = Math.pow(0.97, years);
        liquidCash *= inflationFactor;
        stockValue *= inflationFactor;
        prevStockValue *= inflationFactor;
        vehicleValue *= inflationFactor;
        propertyValue *= inflationFactor;
        mortgageRemaining *= inflationFactor;
    }

    const totalStockValue = stockValue + prevStockValue;
    const assetValue = totalStockValue + vehicleValue + propertyValue;
    const netWorth = liquidCash + assetValue - mortgageRemaining;

    return { liquidCash, assetValue, netWorth, stockValue: totalStockValue, vehicleValue, propertyValue, prevStockValue, mortgageRemaining };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ============ BENCHMARKING ============
function calculatePercentile(value, benchmarks) {
    let percentile = 10;
    for (const b of benchmarks) {
        if (value >= b.value) {
            percentile = b.percentile;
            break;
        }
    }
    return 100 - percentile;
}

function getStateBenchmarks(country, region, type) {
    const countryData = countryBenchmarks[country] || countryBenchmarks.US;
    const stateData = stateBenchmarks[country] || { 'default': { incomeMultiplier: 1, netWorthMultiplier: 1 } };
    const multipliers = stateData[region] || stateData['default'];

    const multiplier = type === 'income' ? multipliers.incomeMultiplier : multipliers.netWorthMultiplier;
    return countryData[type].map(b => ({ ...b, value: b.value * multiplier }));
}

function updateBenchmark(netWorth) {
    const country = ledgerState.country;
    const region = ledgerState.region;

    // Calculate gross income for income percentiles
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;

    // Get benchmarks for each level
    const countryData = countryBenchmarks[country] || countryBenchmarks.US;
    const stateBenchmarksIncome = getStateBenchmarks(country, region, 'income');
    const stateBenchmarksNetWorth = getStateBenchmarks(country, region, 'netWorth');

    // Calculate all six percentiles
    const incomeStatePercentile = calculatePercentile(grossIncome, stateBenchmarksIncome);
    const incomeCountryPercentile = calculatePercentile(grossIncome, countryData.income);
    const incomeGlobalPercentile = calculatePercentile(grossIncome, globalBenchmarks.income);

    const networthStatePercentile = calculatePercentile(netWorth, stateBenchmarksNetWorth);
    const networthCountryPercentile = calculatePercentile(netWorth, countryData.netWorth);
    const networthGlobalPercentile = calculatePercentile(netWorth, globalBenchmarks.netWorth);

    // Update display
    document.getElementById('income-state-percentile').textContent = `Top ${incomeStatePercentile}%`;
    document.getElementById('income-country-percentile').textContent = `Top ${incomeCountryPercentile}%`;
    document.getElementById('income-global-percentile').textContent = `Top ${incomeGlobalPercentile}%`;

    document.getElementById('networth-state-percentile').textContent = `Top ${networthStatePercentile}%`;
    document.getElementById('networth-country-percentile').textContent = `Top ${networthCountryPercentile}%`;
    document.getElementById('networth-global-percentile').textContent = `Top ${networthGlobalPercentile}%`;

    // Context message
    const contextDisplay = document.getElementById('reality-context-display');
    if (netWorth >= 10000000) {
        contextDisplay.textContent = 'Ultra High Net Worth. You have achieved financial independence several times over.';
    } else if (netWorth >= 1500000) {
        contextDisplay.textContent = 'High Net Worth. Retirement is very comfortable at this level.';
    } else if (netWorth >= 500000) {
        contextDisplay.textContent = 'Upper Middle Class. On track for a comfortable retirement.';
    } else if (netWorth >= 100000) {
        contextDisplay.textContent = 'Building wealth. Keep investing and controlling expenses.';
    } else if (netWorth >= 0) {
        contextDisplay.textContent = 'Starting out. Focus on increasing income and building emergency savings.';
    } else {
        contextDisplay.textContent = 'In debt. Focus on debt payoff before aggressive investing.';
    }
}

// ============ STATUS STACK (GAMIFICATION) ============
function updateStatusStack(netWorth, assetValue, vehiclePrice) {
    const houseEl = document.getElementById('status-house');
    const vehicleEl = document.getElementById('status-vehicle');
    const labelEl = document.getElementById('status-label');

    // House status based on property value
    const propertyValue = ledgerState.propertyDownPayment + ledgerState.mortgageAmount;
    if (propertyValue >= 2000000) {
        houseEl.textContent = '🏰';
    } else if (propertyValue >= 1000000) {
        houseEl.textContent = '🏛️';
    } else if (propertyValue >= 500000) {
        houseEl.textContent = '🏠';
    } else if (propertyValue >= 200000) {
        houseEl.textContent = '🏡';
    } else if (ledgerState.monthlyRent > 0) {
        houseEl.textContent = '🏢';
    } else {
        houseEl.textContent = '⛺';
    }

    // Vehicle status
    if (vehiclePrice >= 200000) {
        vehicleEl.textContent = '🚁';
    } else if (vehiclePrice >= 100000) {
        vehicleEl.textContent = '🏎️';
    } else if (vehiclePrice >= 50000) {
        vehicleEl.textContent = '🚗';
    } else if (vehiclePrice >= 20000) {
        vehicleEl.textContent = '🚙';
    } else if (vehiclePrice >= 5000) {
        vehicleEl.textContent = '🚲';
    } else {
        vehicleEl.textContent = '🚶';
    }

    // Overall label based on NET WORTH (not just assets)
    // This reflects true financial status including debt
    if (netWorth >= 10000000) {
        labelEl.textContent = 'Mogul';
    } else if (netWorth >= 5000000) {
        labelEl.textContent = 'Elite';
    } else if (netWorth >= 1000000) {
        labelEl.textContent = 'Wealthy';
    } else if (netWorth >= 500000) {
        labelEl.textContent = 'Prosperous';
    } else if (netWorth >= 100000) {
        labelEl.textContent = 'Comfortable';
    } else if (netWorth >= 25000) {
        labelEl.textContent = 'Building';
    } else if (netWorth >= 0) {
        labelEl.textContent = 'Survivor';
    } else {
        labelEl.textContent = 'In Debt';
    }

    // Update current status in popup
    updateStatusPopup(netWorth, assetValue, ledgerState.propertyDownPayment + ledgerState.mortgageAmount, vehiclePrice);
}

// Status levels data (based on NET WORTH, not just assets)
const statusLevels = {
    overall: [
        { name: 'Mogul', threshold: 10000000, emoji: '👑' },
        { name: 'Elite', threshold: 5000000, emoji: '💎' },
        { name: 'Wealthy', threshold: 1000000, emoji: '🌟' },
        { name: 'Prosperous', threshold: 500000, emoji: '✨' },
        { name: 'Comfortable', threshold: 100000, emoji: '😊' },
        { name: 'Building', threshold: 25000, emoji: '🔨' },
        { name: 'Survivor', threshold: 0, emoji: '🏕️' },
        { name: 'In Debt', threshold: -Infinity, emoji: '📉' }
    ],
    housing: [
        { name: 'Castle', threshold: 2000000, emoji: '🏰' },
        { name: 'Mansion', threshold: 1000000, emoji: '🏛️' },
        { name: 'House', threshold: 500000, emoji: '🏠' },
        { name: 'Cottage', threshold: 200000, emoji: '🏡' },
        { name: 'Apartment', threshold: 0, emoji: '🏢', condition: 'renting' },
        { name: 'Tent', threshold: 0, emoji: '⛺' }
    ],
    vehicle: [
        { name: 'Helicopter', threshold: 200000, emoji: '🚁' },
        { name: 'Supercar', threshold: 100000, emoji: '🏎️' },
        { name: 'Luxury Car', threshold: 50000, emoji: '🚗' },
        { name: 'Standard Car', threshold: 20000, emoji: '🚙' },
        { name: 'Bicycle', threshold: 5000, emoji: '🚲' },
        { name: 'Walking', threshold: 0, emoji: '🚶' }
    ]
};

function updateStatusPopup(netWorth, assetValue, propertyValue, vehiclePrice) {
    const listEl = document.getElementById('status-list');

    // Determine current statuses (overall based on NET WORTH)
    let currentOverall = statusLevels.overall.find(s => netWorth >= s.threshold)?.name || 'In Debt';
    let currentHousing = statusLevels.housing.find(s => propertyValue >= s.threshold)?.name || 'Tent';
    if (ledgerState.monthlyRent > 0 && propertyValue < 200000) currentHousing = 'Apartment';
    let currentVehicle = statusLevels.vehicle.find(s => vehiclePrice >= s.threshold)?.name || 'Walking';

    let html = '<div style="margin-bottom: 1rem;"><strong style="color: var(--gold);">Overall Status (Net Worth)</strong></div>';
    statusLevels.overall.forEach(s => {
        const isCurrent = s.name === currentOverall;
        let thresholdText = s.threshold === -Infinity ? 'Negative net worth' :
                           (s.threshold > 0 ? '$' + s.threshold.toLocaleString() + '+ net worth' : 'Starting');
        html += `<div class="status-list-item ${isCurrent ? 'current' : ''}">
            <span class="status-emoji">${s.emoji}</span>
            <div class="status-info">
                <div class="status-name">${s.name}</div>
                <div class="status-threshold">${thresholdText}</div>
            </div>
        </div>`;
    });

    html += '<div style="margin: 1rem 0 0.5rem;"><strong style="color: var(--gold);">Housing</strong></div>';
    statusLevels.housing.forEach(s => {
        const isCurrent = s.name === currentHousing;
        let thresholdText = s.threshold > 0 ? '$' + s.threshold.toLocaleString() + '+ property' : (s.condition === 'renting' ? 'Renting' : 'No property');
        html += `<div class="status-list-item ${isCurrent ? 'current' : ''}">
            <span class="status-emoji">${s.emoji}</span>
            <div class="status-info">
                <div class="status-name">${s.name}</div>
                <div class="status-threshold">${thresholdText}</div>
            </div>
        </div>`;
    });

    html += '<div style="margin: 1rem 0 0.5rem;"><strong style="color: var(--gold);">Vehicle</strong></div>';
    statusLevels.vehicle.forEach(s => {
        const isCurrent = s.name === currentVehicle;
        html += `<div class="status-list-item ${isCurrent ? 'current' : ''}">
            <span class="status-emoji">${s.emoji}</span>
            <div class="status-info">
                <div class="status-name">${s.name}</div>
                <div class="status-threshold">${s.threshold > 0 ? '$' + s.threshold.toLocaleString() + '+ vehicle' : 'No vehicle'}</div>
            </div>
        </div>`;
    });

    listEl.innerHTML = html;
}

function toggleStatusPopup() {
    const popup = document.getElementById('status-popup');
    popup.classList.toggle('visible');
}

function initStatusPopup() {
    const container = document.getElementById('status-stack-container');
    const popup = document.getElementById('status-popup');

    container.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStatusPopup();
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && !container.contains(e.target)) {
            popup.classList.remove('visible');
        }
    });
}

// ============ RECEIPT OF REALITY ============
function showReceiptModal(type = 'all') {
    const modal = document.getElementById('receipt-modal');
    const body = document.getElementById('receipt-body');

    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Calculate hourly wage (assuming 2080 work hours per year)
    const hourlyWage = trueIncome / 2080;
    const workHoursPerWeek = 40;

    // Helper to convert cost to work time string
    function costToWorkTime(yearlyCost) {
        if (hourlyWage <= 0) return 'N/A';
        const hoursOfWork = yearlyCost / hourlyWage;
        const weeksOfWork = hoursOfWork / workHoursPerWeek;

        if (weeksOfWork >= 52) return `${(weeksOfWork / 52).toFixed(1)} years of work`;
        if (weeksOfWork >= 1) return `${weeksOfWork.toFixed(1)} weeks of work`;
        const days = weeksOfWork * 5;
        if (days >= 1) return `${days.toFixed(1)} days of work`;
        return `${hoursOfWork.toFixed(1)} hours of work`;
    }

    // Helper to get frequency description
    function getFrequencyDesc(p) {
        if (!p.recurring) return '';
        const freq = p.frequency || 'monthly';
        switch (freq) {
            case 'daily': return 'daily';
            case 'weekly': return 'weekly';
            case 'monthly': return 'monthly';
            case 'quarterly': return 'quarterly';
            case 'yearly': return 'yearly';
            case 'custom':
                if (p.customDays === 2) return 'every other day';
                return `every ${p.customDays} days`;
            default: return '';
        }
    }

    // Collect purchase details based on type
    const purchaseDetails = [];
    let yearlyPurchaseCost = 0;

    // Include target purchases if type is 'target' or 'all'
    if (type === 'target' || type === 'all') {
        ledgerState.targetPurchases.forEach(p => {
            if (p.hidden) return;
            let yearlyCost = 0;
            const freq = p.recurring ? (p.frequency || 'monthly') : 'once';
            switch (freq) {
                case 'daily': yearlyCost = p.cost * 365; break;
                case 'weekly': yearlyCost = p.cost * 52; break;
                case 'monthly': yearlyCost = p.cost * 12; break;
                case 'quarterly': yearlyCost = p.cost * 4; break;
                case 'yearly': yearlyCost = p.cost; break;
                case 'custom': yearlyCost = p.cost * (365 / (p.customDays || 30)); break;
                default: yearlyCost = p.cost; break;
            }
            yearlyPurchaseCost += yearlyCost;
            purchaseDetails.push({
                name: p.name || 'Purchase',
                yearlyCost,
                recurring: p.recurring,
                frequency: p.frequency,
                customDays: p.customDays,
                freqDesc: getFrequencyDesc(p),
                hasComparison: p.hasComparison,
                compareCost: p.compareCost,
                compareFrequency: p.compareFrequency || 'same'
            });
        });

        // Include living expenses only for target/all
        ledgerState.livingExpenses.forEach(le => {
            if (le.hidden) return;
            let yearlyCost = 0;
            switch (le.frequency) {
                case 'daily': yearlyCost = le.amount * 365; break;
                case 'weekly': yearlyCost = le.amount * 52; break;
                case 'monthly': yearlyCost = le.amount * 12; break;
                case 'quarterly': yearlyCost = le.amount * 4; break;
                case 'yearly': yearlyCost = le.amount; break;
                case 'custom': yearlyCost = le.amount * (365 / (le.customDays || 30)); break;
            }
            if (yearlyCost > 0) {
                yearlyPurchaseCost += yearlyCost;
                const name = le.type === 'Other' ? le.customName : le.type;
                purchaseDetails.push({
                    name: name || 'Living Expense',
                    yearlyCost,
                    recurring: true,
                    freqDesc: le.frequency || 'monthly',
                    hasComparison: false
                });
            }
        });
    }

    // Include future purchases if type is 'future' or 'all'
    if (type === 'future' || type === 'all') {
        ledgerState.futurePurchases.forEach(fp => {
        if (fp.hidden) return;
        let yearlyCost = 0;
        if (fp.recurring) {
            const freq = fp.frequency || 'monthly';
            switch (freq) {
                case 'daily': yearlyCost = fp.cost * 365; break;
                case 'weekly': yearlyCost = fp.cost * 52; break;
                case 'monthly': yearlyCost = fp.cost * 12; break;
                case 'quarterly': yearlyCost = fp.cost * 4; break;
                case 'yearly': yearlyCost = fp.cost; break;
                case 'custom': yearlyCost = fp.cost * (365 / (fp.customDays || 30)); break;
            }
        } else {
            yearlyCost = fp.cost; // One-time
        }
        if (yearlyCost > 0) {
            yearlyPurchaseCost += yearlyCost;
            purchaseDetails.push({
                name: fp.name || 'Future Purchase',
                yearlyCost,
                recurring: fp.recurring,
                frequency: fp.frequency,
                customDays: fp.customDays,
                freqDesc: fp.recurring ? (fp.frequency || 'monthly') : 'one-time',
                hasComparison: fp.hasComparison,
                compareCost: fp.compareCost,
                compareFrequency: fp.compareFrequency || 'same'
            });
        }
        });
    }

    // Determine title based on type
    const receiptTitle = type === 'future' ? 'RECEIPT OF REALITY - FUTURE PURCHASES' :
                         type === 'target' ? 'RECEIPT OF REALITY - CURRENT PURCHASES' :
                         'RECEIPT OF REALITY';

    // Build simple receipt-style HTML - just "this _ costs you _" format
    let html = `
        <div id="receipt-content" style="background: #1a1a2e; padding: 1.5rem; border-radius: 8px; font-family: 'Courier New', monospace;">
            <div style="text-align: center; border-bottom: 2px dashed var(--gold); padding-bottom: 1rem; margin-bottom: 1rem;">
                <h2 style="margin: 0; color: var(--gold);">${receiptTitle}</h2>
                <p style="margin: 0.5rem 0 0; color: #888; font-size: 0.9rem;">${new Date().toLocaleDateString()}</p>
            </div>
    `;

    if (purchaseDetails.length > 0) {
        purchaseDetails.forEach(p => {
            const type = p.recurring ? 'habit' : 'purchase';
            const freqLabel = p.freqDesc ? ` [${p.freqDesc}]` : '';
            const workTimeStr = costToWorkTime(p.yearlyCost);

            html += `
                <div style="padding: 0.75rem 0; border-bottom: 1px dotted #333;">
                    <p style="margin: 0; color: #fff;">This <strong style="color: var(--gold);">${p.name}</strong> ${type}${freqLabel}</p>
                    <p style="margin: 0.25rem 0 0; color: #ccc;">costs you <strong style="color: var(--gold);">${workTimeStr} (${formatCurrency(p.yearlyCost)})</strong> yearly</p>
                </div>
            `;

            // Price comparison
            if (p.hasComparison && p.compareCost > 0) {
                let compareYearly = 0;
                let compareFreqLabel = '';
                const compareFreq = p.compareFrequency || 'same';

                if (compareFreq === 'same') {
                    // Use same frequency as the purchase
                    if (p.recurring) {
                        switch (p.frequency || 'monthly') {
                            case 'daily': compareYearly = p.compareCost * 365; break;
                            case 'weekly': compareYearly = p.compareCost * 52; break;
                            case 'monthly': compareYearly = p.compareCost * 12; break;
                            case 'quarterly': compareYearly = p.compareCost * 4; break;
                            case 'yearly': compareYearly = p.compareCost; break;
                            case 'custom': compareYearly = p.compareCost * (365 / (p.customDays || 30)); break;
                            default: compareYearly = p.compareCost * 12; break;
                        }
                    } else {
                        compareYearly = p.compareCost;
                    }
                    compareFreqLabel = '';
                } else if (compareFreq === 'once') {
                    compareYearly = p.compareCost;
                    compareFreqLabel = ' (one-time)';
                } else {
                    // Use custom comparison frequency
                    switch (compareFreq) {
                        case 'daily': compareYearly = p.compareCost * 365; break;
                        case 'weekly': compareYearly = p.compareCost * 52; break;
                        case 'monthly': compareYearly = p.compareCost * 12; break;
                        case 'quarterly': compareYearly = p.compareCost * 4; break;
                        case 'yearly': compareYearly = p.compareCost; break;
                        default: compareYearly = p.compareCost * 12; break;
                    }
                    compareFreqLabel = ` at this frequency (${compareFreq})`;
                }

                const savings = p.yearlyCost - compareYearly;
                if (savings > 0) {
                    html += `<p style="margin: 0.25rem 0; color: #4ade80; font-size: 0.85rem;">If you spent ${formatCurrency(p.compareCost)}${compareFreqLabel} instead, you'd save ${costToWorkTime(savings)}</p>`;
                } else if (savings < 0) {
                    html += `<p style="margin: 0.25rem 0; color: #ef4444; font-size: 0.85rem;">If you spent ${formatCurrency(p.compareCost)}${compareFreqLabel} instead, you'd spend ${costToWorkTime(-savings)} more</p>`;
                }
            }
        });

        // Combined total
        if (purchaseDetails.length > 1) {
            html += `
                <div style="padding: 1rem 0; border-top: 2px dashed var(--gold); margin-top: 1rem;">
                    <p style="margin: 0; color: #fff; font-weight: bold;">COMBINED TOTAL</p>
                    <p style="margin: 0.25rem 0 0; color: var(--gold); font-size: 1.1rem;"><strong>${costToWorkTime(yearlyPurchaseCost)} (${formatCurrency(yearlyPurchaseCost)})</strong> of work yearly</p>
                </div>
            `;
        }
    } else {
        html += `<p style="color: #888; text-align: center; padding: 2rem 0;">No purchases or habits to display.</p>`;
    }

    html += `
            <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 2px dashed var(--gold);">
                <p style="margin: 0; color: #666; font-size: 0.75rem;">Your hourly rate: ${formatCurrency(hourlyWage)}/hr</p>
            </div>
        </div>
        <button id="download-receipt-jpeg-btn" class="btn-secondary" style="margin-top: 1rem; width: 100%;">Download as JPEG</button>
    `;

    body.innerHTML = html;
    modal.style.display = 'block';

    // Add JPEG download handler
    document.getElementById('download-receipt-jpeg-btn').addEventListener('click', downloadReceiptAsJPEG);
}

// Download receipt as JPEG image
async function downloadReceiptAsJPEG() {
    const receiptContent = document.getElementById('receipt-content');
    if (!receiptContent) return;

    try {
        // Use html2canvas to capture the receipt
        const canvas = await html2canvas(receiptContent, {
            backgroundColor: '#1a1a2e',
            scale: 2
        });

        // Convert to JPEG and download
        canvas.toBlob((blob) => {
            saveAs(blob, `receipt-of-reality-${new Date().toISOString().slice(0, 10)}.jpg`);
        }, 'image/jpeg', 0.95);
    } catch (e) {
        console.error('Error generating JPEG:', e);
        alert('Unable to generate JPEG. Please try again.');
    }
}

// ============ LIFESTYLE CALCULATIONS ============
function showLifestyleModal() {
    // Ensure state is synchronized with form
    updateCalculations();

    const modal = document.getElementById('lifestyle-modal');
    const body = document.getElementById('lifestyle-body');

    const timePrefs = getSelectedTimePreferences();
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxBreakdown = getTaxBreakdown(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const taxes = taxBreakdown.totalTax;
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Calculate living expenses yearly total
    let yearlyLivingExpenses = 0;
    ledgerState.livingExpenses.forEach(le => {
        if (le.hidden) return;
        switch (le.frequency) {
            case 'daily': yearlyLivingExpenses += le.amount * 365; break;
            case 'weekly': yearlyLivingExpenses += le.amount * 52; break;
            case 'monthly': yearlyLivingExpenses += le.amount * 12; break;
            case 'quarterly': yearlyLivingExpenses += le.amount * 4; break;
            case 'yearly': yearlyLivingExpenses += le.amount; break;
            case 'custom': yearlyLivingExpenses += le.amount * (365 / (le.customDays || 30)); break;
        }
    });

    const countryData = countryBenchmarks[ledgerState.country] || countryBenchmarks.US;
    const today = new Date();

    // Track one-time purchases that have already been displayed in earlier time preferences
    const displayedOneTimePurchases = new Set();

    let html = '';

    // Add inflation note if applied
    if (ledgerState.applyInflation) {
        html += `<p style="text-align: center; color: #ff6b6b; font-style: italic; margin-bottom: 0.5rem;">Adjusted for inflation compared to what things are worth today</p>`;
    }

    // Add property appreciation disclaimer
    html += `<p style="text-align: center; color: #9ca3af; font-style: italic; font-size: 0.85rem; margin-bottom: 1rem;">Note: Property appreciation is randomly calculated between 3-5% yearly, so calculations may vary slightly each time.</p>`;

    timePrefs.forEach(pref => {
        const years = parseTimeToYears(pref);
        const results = calculateProjection(trueIncome, years);
        const timeLabel = pref.replace('_', ' ').replace(/(\d+)/, '$1 ');

        // Calculate percentiles for this time preference
        const networthCountryPercentile = calculatePercentile(results.netWorth, countryData.netWorth);
        const networthGlobalPercentile = calculatePercentile(results.netWorth, globalBenchmarks.netWorth);
        const incomeCountryPercentile = calculatePercentile(grossIncome, countryData.income);

        // Calculate taxes over the period
        const totalTaxesOverPeriod = taxes * years;
        const totalDeductionsSavings = (totalDonations + totalExpenses) * (taxBreakdown.effectiveRate / 100) * years;

        html += `
            <div class="lifestyle-period">
                <h4>Over the Course of ${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)}</h4>
                <div class="reality-ranking-box" style="background: rgba(212, 168, 70, 0.1); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; border: 1px solid var(--gold);">
                    <div style="font-weight: bold; color: var(--gold); margin-bottom: 0.5rem;">Reality Ranking</div>
                    <div style="display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                        <span>Net Worth (${ledgerState.country}): <strong style="color: var(--gold);">Top ${networthCountryPercentile}%</strong></span>
                        <span>Net Worth (Global): <strong style="color: var(--gold);">Top ${networthGlobalPercentile}%</strong></span>
                        <span>Income (${ledgerState.country}): <strong style="color: var(--gold);">Top ${incomeCountryPercentile}%</strong></span>
                    </div>
                </div>

                <div style="background: rgba(239, 68, 68, 0.1); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; border: 1px solid #ef4444;">
                    <div style="font-weight: bold; color: #ef4444; margin-bottom: 0.5rem;">Taxes & Deductions (${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''})</div>
                    <div class="lifestyle-row"><span class="label">Federal/National Tax (yearly)</span><span class="value" style="color: #ef4444;">-${formatCurrency(taxBreakdown.federalTax)}</span></div>
                    ${taxBreakdown.stateTax > 0 ? `<div class="lifestyle-row"><span class="label">State/Provincial Tax (yearly)</span><span class="value" style="color: #ef4444;">-${formatCurrency(taxBreakdown.stateTax)}</span></div>` : ''}
                    ${taxBreakdown.payrollTax > 0 ? `<div class="lifestyle-row"><span class="label">Payroll/Social Insurance (yearly)</span><span class="value" style="color: #ef4444;">-${formatCurrency(taxBreakdown.payrollTax)}</span></div>` : ''}
                    <div class="lifestyle-row"><span class="label">Total Taxes (yearly)</span><span class="value" style="color: #ef4444;">-${formatCurrency(taxes)}</span></div>
                    <div class="lifestyle-row"><span class="label">Effective Tax Rate</span><span class="value" style="color: #ef4444;">${taxBreakdown.effectiveRate}%</span></div>
                    <div class="lifestyle-row" style="margin-top: 0.5rem; font-weight: bold;"><span class="label">Total Taxes Over ${timeLabel}</span><span class="value" style="color: #ef4444;">-${formatCurrency(totalTaxesOverPeriod)}</span></div>
                    ${(totalDonations + totalExpenses) > 0 ? `<div class="lifestyle-row" style="color: #4ade80;"><span class="label">Est. Tax Savings from Deductions</span><span class="value">+${formatCurrency(totalDeductionsSavings)}</span></div>` : ''}
                </div>

                ${yearlyLivingExpenses > 0 ? `
                <div style="background: rgba(251, 191, 36, 0.1); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; border: 1px solid #fbbf24;">
                    <div style="font-weight: bold; color: #fbbf24; margin-bottom: 0.5rem;">Living Expenses</div>
                    <div class="lifestyle-row"><span class="label">Yearly Living Expenses</span><span class="value" style="color: #fbbf24;">-${formatCurrency(yearlyLivingExpenses)}</span></div>
                    <div class="lifestyle-row"><span class="label">Total Over ${timeLabel}</span><span class="value" style="color: #fbbf24;">-${formatCurrency(yearlyLivingExpenses * years)}</span></div>
                </div>
                ` : ''}

                ${(() => {
                    // Calculate purchases breakdown
                    let yearlyPurchaseCost = 0;
                    let oneTimePurchaseCost = 0;
                    const purchaseBreakdown = [];
                    const totalMonths = years * 12;

                    // Helper to calculate years from now for a date
                    const getYearsFromNow = (dateStr) => {
                        if (!dateStr) return 0;
                        const date = new Date(dateStr);
                        return Math.max(0, (date - today) / (365.25 * 24 * 60 * 60 * 1000));
                    };

                    // Vehicle purchase - only include if within time period and not already displayed
                    const vehicleYearsFromNow = getYearsFromNow(ledgerState.vehicleDate);
                    if (ledgerState.vehiclePrice > 0 && vehicleYearsFromNow < years && !displayedOneTimePurchases.has('vehicle')) {
                        oneTimePurchaseCost += ledgerState.vehiclePrice;
                        const vehicleName = ledgerState.vehicleName || 'Vehicle';
                        const dateNote = ledgerState.vehicleDate ? ` (${new Date(ledgerState.vehicleDate).toLocaleDateString()})` : '';
                        purchaseBreakdown.push({ name: vehicleName + dateNote, yearly: ledgerState.vehiclePrice, freq: 'one-time', type: 'vehicle' });
                        displayedOneTimePurchases.add('vehicle');
                    }

                    // Property purchase - only include if within time period and not already displayed
                    const propertyYearsFromNow = getYearsFromNow(ledgerState.propertyDate);
                    if ((ledgerState.propertyDownPayment > 0 || ledgerState.mortgageAmount > 0) && propertyYearsFromNow < years && !displayedOneTimePurchases.has('property')) {
                        const propertyCost = ledgerState.cashPurchase
                            ? (ledgerState.propertyDownPayment + ledgerState.mortgageAmount)
                            : ledgerState.propertyDownPayment;
                        if (propertyCost > 0) {
                            oneTimePurchaseCost += propertyCost;
                            const dateNote = ledgerState.propertyDate ? ` (${new Date(ledgerState.propertyDate).toLocaleDateString()})` : '';
                            const label = ledgerState.cashPurchase ? 'Property (Cash)' : 'Property Down Payment';
                            purchaseBreakdown.push({ name: label + dateNote, yearly: propertyCost, freq: 'one-time', type: 'property' });
                            displayedOneTimePurchases.add('property');
                        }
                    }

                    // Rent - recurring, always show if within time period
                    const rentYearsFromNow = getYearsFromNow(ledgerState.rentDate);
                    if (ledgerState.monthlyRent > 0 && rentYearsFromNow < years) {
                        const rentMonthsActive = Math.max(0, totalMonths - (rentYearsFromNow * 12));
                        const totalRent = ledgerState.monthlyRent * rentMonthsActive;
                        const yearlyRent = ledgerState.monthlyRent * 12;
                        yearlyPurchaseCost += yearlyRent;
                        const dateNote = ledgerState.rentDate ? ` (starts ${new Date(ledgerState.rentDate).toLocaleDateString()})` : '';
                        purchaseBreakdown.push({ name: 'Rent' + dateNote, yearly: yearlyRent, freq: 'monthly', type: 'rent', totalOverPeriod: totalRent });
                    }

                    ledgerState.targetPurchases.forEach((p, idx) => {
                        if (p.hidden) return;
                        if (p.recurring) {
                            // Recurring purchases always show
                            let yearly = 0;
                            const freq = p.frequency || 'monthly';
                            switch (freq) {
                                case 'daily': yearly = p.cost * 365; break;
                                case 'weekly': yearly = p.cost * 52; break;
                                case 'monthly': yearly = p.cost * 12; break;
                                case 'quarterly': yearly = p.cost * 4; break;
                                case 'yearly': yearly = p.cost; break;
                                case 'custom': yearly = p.cost * (365 / (p.customDays || 30)); break;
                            }
                            yearlyPurchaseCost += yearly;
                            purchaseBreakdown.push({ name: p.name || 'Purchase', yearly, freq, type: 'recurring' });
                        } else {
                            // One-time purchases only show if not already displayed
                            const purchaseKey = `target-${idx}`;
                            if (!displayedOneTimePurchases.has(purchaseKey)) {
                                oneTimePurchaseCost += p.cost;
                                purchaseBreakdown.push({ name: p.name || 'One-time Purchase', yearly: p.cost, freq: 'one-time', type: 'one-time' });
                                displayedOneTimePurchases.add(purchaseKey);
                            }
                        }
                    });

                    // Future purchases - only include if within time period
                    ledgerState.futurePurchases.forEach((fp, idx) => {
                        if (fp.hidden) return;
                        const fpYearsFromNow = getYearsFromNow(fp.date);
                        if (fp.date && fpYearsFromNow >= years) return; // Skip if outside time period

                        if (fp.recurring) {
                            // Recurring purchases always show
                            let yearly = 0;
                            const freq = fp.frequency || 'monthly';
                            switch (freq) {
                                case 'daily': yearly = fp.cost * 365; break;
                                case 'weekly': yearly = fp.cost * 52; break;
                                case 'monthly': yearly = fp.cost * 12; break;
                                case 'quarterly': yearly = fp.cost * 4; break;
                                case 'yearly': yearly = fp.cost; break;
                                case 'custom': yearly = fp.cost * (365 / (fp.customDays || 30)); break;
                            }
                            yearlyPurchaseCost += yearly;
                            const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                            purchaseBreakdown.push({ name: (fp.name || 'Future Purchase') + dateNote, yearly, freq, type: 'future-recurring' });
                        } else {
                            // One-time future purchases only show if not already displayed
                            const purchaseKey = `future-${idx}`;
                            if (!displayedOneTimePurchases.has(purchaseKey)) {
                                oneTimePurchaseCost += fp.cost;
                                const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                                purchaseBreakdown.push({ name: (fp.name || 'Future Purchase') + dateNote, yearly: fp.cost, freq: 'one-time', type: 'future' });
                                displayedOneTimePurchases.add(purchaseKey);
                            }
                        }
                    });

                    const totalPurchaseCost = yearlyPurchaseCost * years + oneTimePurchaseCost;

                    if (purchaseBreakdown.length === 0) return '';

                    let purchaseHtml = `
                    <div style="background: rgba(249, 115, 22, 0.1); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; border: 1px solid #f97316;">
                        <div style="font-weight: bold; color: #f97316; margin-bottom: 0.5rem;">Purchases & Habits</div>
                    `;

                    purchaseBreakdown.forEach(p => {
                        if (p.type === 'one-time' || p.type === 'future' || p.type === 'vehicle' || p.type === 'property') {
                            purchaseHtml += '<div class="lifestyle-row"><span class="label">' + p.name + ' [one-time]</span><span class="value" style="color: #f97316;">-' + formatCurrency(p.yearly) + '</span></div>';
                        } else {
                            purchaseHtml += '<div class="lifestyle-row"><span class="label">' + p.name + ' [' + p.freq + ']</span><span class="value" style="color: #f97316;">-' + formatCurrency(p.yearly) + '/yr</span></div>';
                        }
                    });

                    purchaseHtml += '<div class="lifestyle-row" style="border-top: 1px solid #f97316; margin-top: 0.5rem; padding-top: 0.5rem;"><span class="label">Total Recurring Yearly</span><span class="value" style="color: #f97316;">-' + formatCurrency(yearlyPurchaseCost) + '/yr</span></div>';
                    if (oneTimePurchaseCost > 0) {
                        purchaseHtml += '<div class="lifestyle-row"><span class="label">Total One-time</span><span class="value" style="color: #f97316;">-' + formatCurrency(oneTimePurchaseCost) + '</span></div>';
                    }
                    purchaseHtml += '<div class="lifestyle-row" style="font-weight: bold;"><span class="label">Total Over ' + timeLabel + '</span><span class="value" style="color: #f97316;">-' + formatCurrency(totalPurchaseCost) + '</span></div>';
                    purchaseHtml += '</div>';

                    return purchaseHtml;
                })()}

                <div class="lifestyle-row"><span class="label">Starting Amount</span><span class="value">${formatCurrency(ledgerState.startingAmount)}</span></div>
                <div class="lifestyle-row"><span class="label">True Income (Yearly)</span><span class="value">${formatCurrency(trueIncome)}</span></div>
                <div class="lifestyle-row"><span class="label">Projected Liquid Cash</span><span class="value" style="color: #4ade80;">${formatCurrency(results.liquidCash)}</span></div>
                <div class="lifestyle-row"><span class="label">Projected Stock Value</span><span class="value" style="color: #60a5fa;">${formatCurrency(results.stockValue)}</span></div>
                <div class="lifestyle-row"><span class="label">Projected Vehicle Value</span><span class="value">${formatCurrency(results.vehicleValue)}</span></div>
                <div class="lifestyle-row"><span class="label">Projected Property Value</span><span class="value">${formatCurrency(results.propertyValue)}</span></div>
                <div class="lifestyle-row"><span class="label">Total Asset Value</span><span class="value" style="color: #60a5fa;">${formatCurrency(results.assetValue)}</span></div>
                <div class="lifestyle-row" style="font-size: 1.2rem; margin-top: 0.5rem;"><span class="label"><strong>Net Worth</strong></span><span class="value" style="color: #c084fc;"><strong>${formatCurrency(results.netWorth)}</strong></span></div>
            </div>
        `;
    });

    body.innerHTML = html;
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function downloadReceiptPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Calculate yearly purchase costs
    let yearlyPurchaseCost = 0;
    ledgerState.targetPurchases.forEach(p => {
        if (p.hidden) return;
        if (!p.recurring) {
            yearlyPurchaseCost += p.cost;
        } else {
            const freq = p.frequency || 'monthly';
            switch (freq) {
                case 'daily': yearlyPurchaseCost += p.cost * 365; break;
                case 'weekly': yearlyPurchaseCost += p.cost * 52; break;
                case 'monthly': yearlyPurchaseCost += p.cost * 12; break;
                case 'yearly': yearlyPurchaseCost += p.cost; break;
                case 'custom': yearlyPurchaseCost += p.cost * (365 / (p.customDays || 30)); break;
            }
        }
    });

    doc.setFontSize(20);
    doc.text('Receipt of Reality', 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Location: ${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''}`, 20, 30);

    let y = 42;
    doc.setFontSize(12);
    doc.text('--- INCOME ---', 20, y); y += 8;
    doc.setFontSize(10);
    doc.text(`Primary Income: ${formatCurrency(ledgerState.yearlyIncome)}/yr`, 20, y); y += 6;

    ledgerState.additionalIncomes.forEach(i => {
        doc.text(`${i.name || 'Additional'}: ${formatCurrency(i.amount)}/yr`, 20, y); y += 6;
    });
    doc.text(`Gross Income: ${formatCurrency(grossIncome)}/yr`, 20, y); y += 10;

    doc.setFontSize(12);
    doc.text('--- DEDUCTIONS ---', 20, y); y += 8;
    doc.setFontSize(10);
    doc.text(`Estimated Taxes: -${formatCurrency(taxes)}/yr`, 20, y); y += 6;

    ledgerState.donations.forEach(d => {
        doc.text(`${d.name || 'Donation'}: -${formatCurrency(d.amount)}/yr`, 20, y); y += 6;
    });
    ledgerState.businessExpenses.forEach(e => {
        doc.text(`${e.name || 'Expense'}: -${formatCurrency(e.amount)}/yr`, 20, y); y += 6;
    });

    y += 4;
    doc.setFontSize(12);
    doc.text('--- PURCHASES & HABITS ---', 20, y); y += 8;
    doc.setFontSize(10);

    ledgerState.targetPurchases.forEach(p => {
        if (!p.hidden) {
            const freq = p.recurring ? (p.frequency || 'monthly') : 'one-time';
            doc.text(`${p.name || 'Purchase'} (${freq}): -${formatCurrency(p.cost)}`, 20, y); y += 6;
        }
    });
    doc.text(`Total Yearly Purchases: -${formatCurrency(yearlyPurchaseCost)}/yr`, 20, y); y += 6;
    doc.text(`Monthly Rent: -${formatCurrency(ledgerState.monthlyRent * 12)}/yr`, 20, y); y += 10;

    doc.setFontSize(12);
    doc.text(`TRUE INCOME: ${formatCurrency(trueIncome)}/yr`, 20, y); y += 8;
    const netAvailable = trueIncome - yearlyPurchaseCost - (ledgerState.monthlyRent * 12);
    doc.text(`NET AVAILABLE: ${formatCurrency(netAvailable)}/yr`, 20, y);

    doc.save(`receipt-of-reality-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function downloadLifestylePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const timePrefs = getSelectedTimePreferences();

    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Get country benchmarks
    const countryData = countryBenchmarks[ledgerState.country] || countryBenchmarks.US;

    doc.setFontSize(20);
    doc.text('Lifestyle Calculations', 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Location: ${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''}`, 20, 28);

    let y = 40;

    // Input summary
    doc.setFontSize(12);
    doc.text('--- INPUT SUMMARY ---', 20, y); y += 8;
    doc.setFontSize(10);
    doc.text(`Starting Amount: ${formatCurrency(ledgerState.startingAmount)}`, 20, y); y += 6;
    doc.text(`Gross Income: ${formatCurrency(grossIncome)}/yr | True Income: ${formatCurrency(trueIncome)}/yr`, 20, y); y += 6;
    doc.text(`Vehicle: ${ledgerState.vehicleName || 'None'} (${formatCurrency(ledgerState.vehiclePrice)})`, 20, y); y += 6;
    doc.text(`Property: ${formatCurrency(ledgerState.propertyDownPayment)} down + ${formatCurrency(ledgerState.mortgageAmount)} mortgage`, 20, y); y += 6;
    doc.text(`Rent: ${formatCurrency(ledgerState.monthlyRent)}/mo`, 20, y); y += 6;

    // Stock investments
    const totalStockInvestment = ledgerState.stocks.reduce((sum, s) => sum + s.amount, 0);
    const totalPrevStock = ledgerState.previousStocks.reduce((sum, s) => sum + s.amount, 0);
    doc.text(`Stock Investments: ${formatCurrency(totalStockInvestment)} | Previous Stocks: ${formatCurrency(totalPrevStock)}`, 20, y); y += 12;

    // Time preference projections
    timePrefs.forEach(pref => {
        const years = parseTimeToYears(pref);
        const results = calculateProjection(trueIncome, years);
        const timeLabel = pref.replace('_', ' ').replace(/(\d+)/, '$1 ');

        if (y > 240) { doc.addPage(); y = 20; }

        // Calculate percentile for this time preference
        const networthPercentile = calculatePercentile(results.netWorth, countryData.netWorth);
        const incomePercentile = calculatePercentile(grossIncome, countryData.income);

        doc.setFontSize(14);
        doc.text(`${timeLabel.toUpperCase()} PROJECTION`, 20, y); y += 8;

        doc.setFontSize(10);
        doc.text(`Reality Ranking: Top ${networthPercentile}% Net Worth | Top ${incomePercentile}% Income (${ledgerState.country})`, 20, y); y += 8;

        doc.text(`Liquid Cash: ${formatCurrency(results.liquidCash)}`, 25, y); y += 6;
        doc.text(`Stock Value: ${formatCurrency(results.stockValue)}`, 25, y); y += 6;
        doc.text(`Vehicle Value: ${formatCurrency(results.vehicleValue)} (after depreciation)`, 25, y); y += 6;
        doc.text(`Property Value: ${formatCurrency(results.propertyValue)} (after appreciation)`, 25, y); y += 6;
        doc.text(`Total Asset Value: ${formatCurrency(results.assetValue)}`, 25, y); y += 6;

        doc.setFontSize(12);
        doc.text(`NET WORTH: ${formatCurrency(results.netWorth)}`, 25, y); y += 12;
    });

    doc.save(`lifestyle-calculations-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function downloadLifestyleJSON() {
    const blob = new Blob([JSON.stringify(ledgerState, null, 2)], { type: 'application/json' });
    saveAs(blob, `ledger-data-${new Date().toISOString().slice(0, 10)}.json`);
}

// Combined download: PDF + JSON in a single ZIP
async function downloadLifestyleZip() {
    // Ensure state is synchronized with form before generating PDF/JSON
    updateCalculations();

    const zip = new JSZip();
    const dateStr = new Date().toISOString().slice(0, 10);

    // Add JSON data
    zip.file('ledger-data.json', JSON.stringify(ledgerState, null, 2));

    // Generate comprehensive PDF mirroring Lifestyle Calculations viewer exactly
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const timePrefs = getSelectedTimePreferences();

    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxBreakdown = getTaxBreakdown(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const taxes = taxBreakdown.totalTax;
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Calculate yearly living expenses
    let yearlyLivingExpenses = 0;
    ledgerState.livingExpenses.forEach(le => {
        if (le.hidden) return;
        switch (le.frequency) {
            case 'daily': yearlyLivingExpenses += le.amount * 365; break;
            case 'weekly': yearlyLivingExpenses += le.amount * 52; break;
            case 'monthly': yearlyLivingExpenses += le.amount * 12; break;
            case 'quarterly': yearlyLivingExpenses += le.amount * 4; break;
            case 'yearly': yearlyLivingExpenses += le.amount; break;
            case 'custom': yearlyLivingExpenses += le.amount * (365 / (le.customDays || 30)); break;
        }
    });

    const countryData = countryBenchmarks[ledgerState.country] || countryBenchmarks.US;
    const today = new Date();

    let y = 20;

    // Helper function to check page overflow
    const checkPage = (needed = 10) => {
        if (y + needed > 280) { doc.addPage(); y = 20; }
    };

    // ===== HEADER =====
    doc.setFontSize(20);
    doc.setTextColor(212, 168, 70); // Gold
    doc.text('Ledger - Lifestyle Calculations', 20, y); y += 10;
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Location: ${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''}`, 20, y); y += 6;

    // Inflation note at top (matches Lifestyle Calculations viewer)
    if (ledgerState.applyInflation) {
        doc.setFontSize(9);
        doc.setTextColor(255, 107, 107);
        doc.text('Adjusted for inflation compared to what things are worth today', 105, y, { align: 'center' });
        y += 5;
    }

    // Property appreciation disclaimer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Note: Property appreciation is randomly calculated between 3-5% yearly, so calculations may vary slightly each time.', 105, y, { align: 'center' });
    y += 6;

    // ===== INPUT SUMMARY =====
    y += 4;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('INPUT SUMMARY', 20, y); y += 7;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(`Starting Amount: ${formatCurrency(ledgerState.startingAmount)} | Gross Income: ${formatCurrency(grossIncome)}/yr | True Income: ${formatCurrency(trueIncome)}/yr`, 20, y); y += 5;
    doc.text(`Vehicle: ${ledgerState.vehicleName || 'None'} (${formatCurrency(ledgerState.vehiclePrice)}) | Property: ${formatCurrency(ledgerState.propertyDownPayment)} down + ${formatCurrency(ledgerState.mortgageAmount)} mortgage | Rent: ${formatCurrency(ledgerState.monthlyRent)}/mo`, 20, y); y += 5;
    const totalStockInvestment = ledgerState.stocks.reduce((sum, s) => sum + s.amount, 0);
    const totalPrevStock = ledgerState.previousStocks.reduce((sum, s) => sum + s.amount, 0);
    doc.text(`Stock Investments: ${formatCurrency(totalStockInvestment)} | Previous Stocks: ${formatCurrency(totalPrevStock)}`, 20, y); y += 10;

    // Track one-time purchases that have already been displayed in earlier time preferences
    const displayedOneTimePurchases = new Set();

    // ===== TIME PERIOD SECTIONS =====
    timePrefs.forEach(pref => {
        const years = parseTimeToYears(pref);
        const results = calculateProjection(trueIncome, years);
        const timeLabel = pref.replace('_', ' ').replace(/(\d+)/, '$1 ');
        const totalMonths = years * 12;

        checkPage(120);

        // Time period header
        doc.setFontSize(14);
        doc.setTextColor(212, 168, 70);
        doc.text(`Over the Course of ${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)}`, 20, y); y += 8;

        // Calculate percentiles
        const networthCountryPercentile = calculatePercentile(results.netWorth, countryData.netWorth);
        const networthGlobalPercentile = calculatePercentile(results.netWorth, globalBenchmarks.netWorth);
        const incomeCountryPercentile = calculatePercentile(grossIncome, countryData.income);

        // ===== REALITY RANKING (gold box) =====
        doc.setFillColor(212, 168, 70);
        doc.rect(20, y - 2, 170, 18, 'F');
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(10);
        doc.text('Reality Ranking', 25, y + 4);
        doc.setFontSize(8);
        doc.text(`Net Worth (${ledgerState.country}): Top ${networthCountryPercentile}%`, 25, y + 11);
        doc.text(`Net Worth (Global): Top ${networthGlobalPercentile}%`, 85, y + 11);
        doc.text(`Income (${ledgerState.country}): Top ${incomeCountryPercentile}%`, 140, y + 11);
        y += 22;

        // ===== TAXES & DEDUCTIONS (red box) =====
        checkPage(35);
        doc.setFillColor(239, 68, 68);
        doc.rect(20, y - 2, 170, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`Taxes & Deductions (${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''})`, 25, y + 4);
        y += 11;

        doc.setTextColor(180, 60, 60);
        doc.setFontSize(8);
        doc.text(`Federal/National Tax (yearly): -${formatCurrency(taxBreakdown.federalTax)}`, 25, y); y += 4;
        if (taxBreakdown.stateTax > 0) {
            doc.text(`State/Provincial Tax (yearly): -${formatCurrency(taxBreakdown.stateTax)}`, 25, y); y += 4;
        }
        if (taxBreakdown.payrollTax > 0) {
            doc.text(`Payroll/Social Insurance (yearly): -${formatCurrency(taxBreakdown.payrollTax)}`, 25, y); y += 4;
        }
        doc.text(`Total Taxes (yearly): -${formatCurrency(taxes)}`, 25, y); y += 4;
        doc.text(`Effective Tax Rate: ${taxBreakdown.effectiveRate}%`, 25, y); y += 4;
        doc.setFontSize(9);
        doc.text(`Total Taxes Over ${timeLabel}: -${formatCurrency(taxes * years)}`, 25, y); y += 4;
        if ((totalDonations + totalExpenses) > 0) {
            const totalDeductionsSavings = (totalDonations + totalExpenses) * (taxBreakdown.effectiveRate / 100) * years;
            doc.setTextColor(74, 222, 128);
            doc.text(`Est. Tax Savings from Deductions: +${formatCurrency(totalDeductionsSavings)}`, 25, y); y += 4;
        }
        y += 4;

        // ===== LIVING EXPENSES (yellow box) =====
        if (yearlyLivingExpenses > 0) {
            checkPage(25);
            doc.setFillColor(251, 191, 36);
            doc.rect(20, y - 2, 170, 8, 'F');
            doc.setTextColor(60, 40, 0);
            doc.setFontSize(10);
            doc.text('Living Expenses', 25, y + 4);
            y += 11;

            doc.setTextColor(180, 140, 20);
            doc.setFontSize(8);
            doc.text(`Yearly Living Expenses: -${formatCurrency(yearlyLivingExpenses)}`, 25, y); y += 4;
            doc.text(`Total Over ${timeLabel}: -${formatCurrency(yearlyLivingExpenses * years)}`, 25, y); y += 8;
        }

        // ===== PURCHASES & HABITS (orange box) =====
        // Helper to calculate years from now for a date
        const getYearsFromNow = (dateStr) => {
            if (!dateStr) return 0;
            const date = new Date(dateStr);
            return Math.max(0, (date - today) / (365.25 * 24 * 60 * 60 * 1000));
        };

        // Collect all purchases
        let yearlyPurchaseCost = 0;
        let oneTimePurchaseCost = 0;
        const purchaseItems = [];

        // Vehicle (one-time, only show if not already displayed in earlier time preference)
        const vehicleYearsFromNow = getYearsFromNow(ledgerState.vehicleDate);
        if (ledgerState.vehiclePrice > 0 && vehicleYearsFromNow < years && !displayedOneTimePurchases.has('vehicle')) {
            oneTimePurchaseCost += ledgerState.vehiclePrice;
            const vehicleName = ledgerState.vehicleName || 'Vehicle';
            const dateNote = ledgerState.vehicleDate ? ` (${new Date(ledgerState.vehicleDate).toLocaleDateString()})` : '';
            purchaseItems.push({ name: vehicleName + dateNote, cost: ledgerState.vehiclePrice, type: 'one-time' });
            displayedOneTimePurchases.add('vehicle');
        }

        // Property (one-time, only show if not already displayed)
        const propertyYearsFromNow = getYearsFromNow(ledgerState.propertyDate);
        if ((ledgerState.propertyDownPayment > 0 || ledgerState.mortgageAmount > 0) && propertyYearsFromNow < years && !displayedOneTimePurchases.has('property')) {
            const propertyCost = ledgerState.cashPurchase
                ? (ledgerState.propertyDownPayment + ledgerState.mortgageAmount)
                : ledgerState.propertyDownPayment;
            if (propertyCost > 0) {
                oneTimePurchaseCost += propertyCost;
                const dateNote = ledgerState.propertyDate ? ` (${new Date(ledgerState.propertyDate).toLocaleDateString()})` : '';
                const label = ledgerState.cashPurchase ? 'Property (Cash)' : 'Property Down Payment';
                purchaseItems.push({ name: label + dateNote, cost: propertyCost, type: 'one-time' });
                displayedOneTimePurchases.add('property');
            }
        }

        // Rent (recurring, always show)
        const rentYearsFromNow = getYearsFromNow(ledgerState.rentDate);
        if (ledgerState.monthlyRent > 0 && rentYearsFromNow < years) {
            const yearlyRent = ledgerState.monthlyRent * 12;
            yearlyPurchaseCost += yearlyRent;
            const dateNote = ledgerState.rentDate ? ` (starts ${new Date(ledgerState.rentDate).toLocaleDateString()})` : '';
            purchaseItems.push({ name: 'Rent' + dateNote, cost: yearlyRent, type: 'recurring', freq: 'monthly' });
        }

        // Target purchases
        ledgerState.targetPurchases.forEach((p, idx) => {
            if (p.hidden) return;
            const tpDateNote = p.date ? ` (${new Date(p.date).toLocaleDateString()})` : '';
            if (p.recurring) {
                // Recurring purchases always show
                let yearly = 0;
                const freq = p.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = p.cost * 365; break;
                    case 'weekly': yearly = p.cost * 52; break;
                    case 'monthly': yearly = p.cost * 12; break;
                    case 'quarterly': yearly = p.cost * 4; break;
                    case 'yearly': yearly = p.cost; break;
                    case 'custom': yearly = p.cost * (365 / (p.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                purchaseItems.push({ name: (p.name || 'Purchase') + tpDateNote, cost: yearly, type: 'recurring', freq });
            } else {
                // One-time purchases only show if not already displayed
                const purchaseKey = `target-${idx}`;
                if (!displayedOneTimePurchases.has(purchaseKey)) {
                    oneTimePurchaseCost += p.cost;
                    purchaseItems.push({ name: (p.name || 'One-time Purchase') + tpDateNote, cost: p.cost, type: 'one-time' });
                    displayedOneTimePurchases.add(purchaseKey);
                }
            }
        });

        // Future purchases (only within time period)
        ledgerState.futurePurchases.forEach((fp, idx) => {
            if (fp.hidden) return;
            const fpYearsFromNow = getYearsFromNow(fp.date);
            if (fp.date && fpYearsFromNow >= years) return;

            if (fp.recurring) {
                // Recurring purchases always show
                let yearly = 0;
                const freq = fp.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = fp.cost * 365; break;
                    case 'weekly': yearly = fp.cost * 52; break;
                    case 'monthly': yearly = fp.cost * 12; break;
                    case 'quarterly': yearly = fp.cost * 4; break;
                    case 'yearly': yearly = fp.cost; break;
                    case 'custom': yearly = fp.cost * (365 / (fp.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                purchaseItems.push({ name: (fp.name || 'Future Purchase') + dateNote, cost: yearly, type: 'recurring', freq });
            } else {
                // One-time future purchases only show if not already displayed
                const purchaseKey = `future-${idx}`;
                if (!displayedOneTimePurchases.has(purchaseKey)) {
                    oneTimePurchaseCost += fp.cost;
                    const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                    purchaseItems.push({ name: (fp.name || 'Future Purchase') + dateNote, cost: fp.cost, type: 'one-time' });
                    displayedOneTimePurchases.add(purchaseKey);
                }
            }
        });

        if (purchaseItems.length > 0) {
            checkPage(30 + purchaseItems.length * 5);
            doc.setFillColor(249, 115, 22);
            doc.rect(20, y - 2, 170, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text('Purchases & Habits', 25, y + 4);
            y += 11;

            doc.setTextColor(200, 90, 20);
            doc.setFontSize(8);

            purchaseItems.forEach(p => {
                checkPage(5);
                if (p.type === 'one-time') {
                    doc.text(`${p.name} [one-time]: -${formatCurrency(p.cost)}`, 25, y);
                } else {
                    doc.text(`${p.name} [${p.freq}]: -${formatCurrency(p.cost)}/yr`, 25, y);
                }
                y += 4;
            });

            y += 2;
            doc.setFontSize(9);
            doc.text(`Total Recurring Yearly: -${formatCurrency(yearlyPurchaseCost)}/yr`, 25, y); y += 4;
            if (oneTimePurchaseCost > 0) {
                doc.text(`Total One-time: -${formatCurrency(oneTimePurchaseCost)}`, 25, y); y += 4;
            }
            const totalPurchaseCost = yearlyPurchaseCost * years + oneTimePurchaseCost;
            doc.text(`Total Over ${timeLabel}: -${formatCurrency(totalPurchaseCost)}`, 25, y); y += 8;
        }

        // ===== WEALTH PROJECTIONS (individual colored lines) =====
        checkPage(50);
        doc.setFontSize(9);

        // Starting Amount (default color)
        doc.setTextColor(60, 60, 60);
        doc.text(`Starting Amount: ${formatCurrency(ledgerState.startingAmount)}`, 25, y); y += 5;

        // True Income (Yearly) (default color)
        doc.text(`True Income (Yearly): ${formatCurrency(trueIncome)}`, 25, y); y += 5;

        // Projected Liquid Cash (green #4ade80)
        doc.setTextColor(74, 222, 128);
        doc.text(`Projected Liquid Cash: ${formatCurrency(results.liquidCash)}`, 25, y); y += 5;

        // Projected Stock Value (blue #60a5fa)
        doc.setTextColor(96, 165, 250);
        doc.text(`Projected Stock Value: ${formatCurrency(results.stockValue)}`, 25, y); y += 5;

        // Projected Vehicle Value (default color)
        doc.setTextColor(60, 60, 60);
        doc.text(`Projected Vehicle Value: ${formatCurrency(results.vehicleValue)}`, 25, y); y += 5;

        // Projected Property Value (default color)
        doc.text(`Projected Property Value: ${formatCurrency(results.propertyValue)}`, 25, y); y += 5;

        // Total Asset Value (blue #60a5fa)
        doc.setTextColor(96, 165, 250);
        doc.text(`Total Asset Value: ${formatCurrency(results.assetValue)}`, 25, y); y += 6;

        // Net Worth (purple #c084fc, larger)
        doc.setFontSize(12);
        doc.setTextColor(192, 132, 252);
        doc.text(`NET WORTH: ${formatCurrency(results.netWorth)}`, 25, y); y += 15;
    });

    // Add PDF to zip
    zip.file('lifestyle-calculations.pdf', doc.output('blob'));

    // Generate and save ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `ledger-${dateStr}.zip`);
}

// ============ FILE OPERATIONS ============
function loadFromJSON(jsonData) {
    try {
        const data = JSON.parse(jsonData);

        // Restore basic fields
        document.getElementById('starting-amount').value = data.startingAmount || 0;
        document.getElementById('income-input').value = data.yearlyIncome || 0;
        document.getElementById('income-slider').value = Math.min(data.yearlyIncome || 0, 1000000);
        document.getElementById('country-select').value = data.country || 'US';
        updateRegions();
        document.getElementById('region-select').value = data.region || '';
        document.getElementById('vehicle-name').value = data.vehicleName || '';
        document.getElementById('vehicle-input').value = data.vehiclePrice || 0;
        document.getElementById('vehicle-slider').value = Math.min(data.vehiclePrice || 0, 200000);
        document.getElementById('vehicle-date').value = data.vehicleDate || '';
        document.getElementById('property-down-input').value = data.propertyDownPayment || 0;
        document.getElementById('property-down-slider').value = Math.min(data.propertyDownPayment || 0, 1000000);
        document.getElementById('property-date').value = data.propertyDate || '';
        document.getElementById('mortgage-input').value = data.mortgageAmount || 0;
        document.getElementById('mortgage-slider').value = Math.min(data.mortgageAmount || 0, 2000000);
        document.getElementById('mortgage-duration').value = data.mortgageDuration || 30;
        document.getElementById('cash-purchase-toggle').checked = data.cashPurchase || false;
        document.getElementById('rent-input').value = data.monthlyRent || 0;
        document.getElementById('rent-slider').value = Math.min(data.monthlyRent || 0, 20000);
        document.getElementById('rent-date').value = data.rentDate || '';
        document.getElementById('inflation-toggle').checked = data.applyInflation || false;

        // Restore detailed mode and toggle visibility
        const detailedModeToggle = document.getElementById('detailed-mode-toggle');
        detailedModeToggle.checked = data.detailedMode || false;
        const detailedSections = document.querySelectorAll('.detailed-section');
        detailedSections.forEach(section => {
            section.style.display = data.detailedMode ? 'block' : 'none';
        });

        // Restore time preferences
        document.querySelectorAll('#time-preference-container .time-btn').forEach(btn => {
            if (data.timePreferences?.includes(btn.dataset.value)) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });

        // Clear and restore dynamic items
        ['additional-income-container', 'donations-container', 'business-expense-container', 'living-expense-container',
         'stocks-container', 'prev-stocks-container', 'target-purchase-container', 'future-purchase-container'].forEach(id => {
            document.getElementById(id).innerHTML = '';
        });

        // Recreate dynamic items
        data.additionalIncomes?.forEach(item => {
            const div = createDynamicItem('income', document.getElementById('additional-income-container'));
            div.querySelector('.income-name').value = item.name || '';
            div.querySelector('.income-input').value = item.amount || 0;
            div.querySelector('.income-slider').value = Math.min(item.amount || 0, 500000);
        });

        data.donations?.forEach(item => {
            const div = createDynamicItem('donation', document.getElementById('donations-container'));
            div.querySelector('.donation-name').value = item.name || '';
            div.querySelector('.donation-input').value = item.amount || 0;
            div.querySelector('.donation-slider').value = Math.min(item.amount || 0, 100000);
        });

        data.businessExpenses?.forEach(item => {
            const div = createDynamicItem('expense', document.getElementById('business-expense-container'));
            div.querySelector('.expense-name').value = item.name || '';
            div.querySelector('.expense-input').value = item.amount || 0;
            div.querySelector('.expense-slider').value = Math.min(item.amount || 0, 200000);
        });

        data.stocks?.forEach(item => {
            const div = createDynamicItem('stock', document.getElementById('stocks-container'));
            div.querySelector('.stock-name').value = item.name || '';
            div.querySelector('.stock-amount-input').value = item.amount || 0;
            div.querySelector('.stock-amount-slider').value = Math.min(item.amount || 0, 500000);
            div.querySelector('.stock-growth-input').value = item.growthRate || 7;
            div.querySelector('.stock-growth-slider').value = Math.min(item.growthRate || 7, 20);
            div.querySelector('.stock-recurring').checked = item.recurring || false;
            if (item.startDate) div.querySelector('.stock-date').value = item.startDate;
            if (item.sellDate) div.querySelector('.stock-sell-date').value = item.sellDate;
            // Restore frequency settings
            if (item.recurring) {
                div.querySelector('.stock-frequency-section').style.display = 'block';
                div.querySelector('.stock-frequency').value = item.frequency || 'monthly';
                if (item.frequency === 'custom') {
                    div.querySelector('.stock-custom-frequency-input').style.display = 'block';
                    div.querySelector('.stock-custom-days').value = item.customDays || 30;
                }
            }
        });

        data.previousStocks?.forEach(item => {
            const div = createDynamicItem('prevStock', document.getElementById('prev-stocks-container'));
            div.querySelector('.prev-stock-name').value = item.name || '';
            div.querySelector('.prev-stock-amount-input').value = item.amount || 0;
            div.querySelector('.prev-stock-amount-slider').value = Math.min(item.amount || 0, 1000000);
            div.querySelector('.prev-stock-growth-input').value = item.growthRate || 7;
            div.querySelector('.prev-stock-growth-slider').value = Math.min(item.growthRate || 7, 20);
            if (item.startDate) {
                div.querySelector('.prev-stock-date').value = item.startDate;
            }
        });

        data.targetPurchases?.forEach(item => {
            const div = createDynamicItem('purchase', document.getElementById('target-purchase-container'));
            div.querySelector('.purchase-name').value = item.name || '';
            div.querySelector('.purchase-cost-input').value = item.cost || 0;
            div.querySelector('.purchase-cost-slider').value = Math.min(item.cost || 0, 10000);
            // Restore recurring toggle and frequency settings
            div.querySelector('.purchase-recurring-toggle').checked = item.recurring || false;
            if (item.recurring) {
                div.querySelector('.frequency-section').style.display = 'block';
                div.querySelector('.purchase-frequency').value = item.frequency || 'monthly';
                if (item.frequency === 'custom') {
                    div.querySelector('.custom-frequency-input').style.display = 'block';
                    div.querySelector('.purchase-custom-days').value = item.customDays || 30;
                }
            }
            // Restore hide toggle
            div.querySelector('.purchase-hide-toggle').checked = item.hidden || false;
            // Restore comparison settings
            div.querySelector('.purchase-compare-toggle').checked = item.hasComparison || false;
            if (item.hasComparison) {
                div.querySelector('.compare-section').style.display = 'block';
                div.querySelector('.purchase-compare-cost-input').value = item.compareCost || 0;
                div.querySelector('.purchase-compare-cost-slider').value = Math.min(item.compareCost || 0, 10000);
                div.querySelector('.purchase-compare-frequency').value = item.compareFrequency || 'same';
            }
            // Update calculation display
            updatePurchaseCalculationDisplay(div, 'purchase');
        });

        data.futurePurchases?.forEach(item => {
            const div = createDynamicItem('future', document.getElementById('future-purchase-container'));
            div.querySelector('.future-name').value = item.name || '';
            div.querySelector('.future-cost-input').value = item.cost || 0;
            div.querySelector('.future-cost-slider').value = Math.min(item.cost || 0, 100000);
            div.querySelector('.future-date').value = item.date || '';
            // Restore recurring toggle and frequency settings
            div.querySelector('.future-recurring-toggle').checked = item.recurring || false;
            if (item.recurring) {
                div.querySelector('.frequency-section').style.display = 'block';
                div.querySelector('.future-frequency').value = item.frequency || 'monthly';
                if (item.frequency === 'custom') {
                    div.querySelector('.custom-frequency-input').style.display = 'block';
                    div.querySelector('.future-custom-days').value = item.customDays || 30;
                }
            }
            // Restore hide toggle
            div.querySelector('.future-hide-toggle').checked = item.hidden || false;
            // Restore comparison settings
            div.querySelector('.future-compare-toggle').checked = item.hasComparison || false;
            if (item.hasComparison) {
                div.querySelector('.compare-section').style.display = 'block';
                div.querySelector('.future-compare-cost-input').value = item.compareCost || 0;
                div.querySelector('.future-compare-cost-slider').value = Math.min(item.compareCost || 0, 100000);
                div.querySelector('.future-compare-frequency').value = item.compareFrequency || 'same';
            }
            // Update calculation display
            updatePurchaseCalculationDisplay(div, 'future');
        });

        // Restore living expenses
        data.livingExpenses?.forEach(item => {
            const div = createDynamicItem('living', document.getElementById('living-expense-container'));
            div.querySelector('.living-type').value = item.type || 'Other';
            if (item.type === 'Other') {
                div.querySelector('.custom-living-name').style.display = 'block';
                div.querySelector('.living-name').value = item.customName || '';
            }
            div.querySelector('.living-amount-input').value = item.amount || 0;
            div.querySelector('.living-amount-slider').value = Math.min(item.amount || 0, 10000);
            div.querySelector('.living-frequency').value = item.frequency || 'monthly';
            if (item.frequency === 'custom') {
                div.querySelector('.custom-frequency-input').style.display = 'block';
                div.querySelector('.living-custom-days').value = item.customDays || 30;
            }
            div.querySelector('.living-hide-toggle').checked = item.hidden || false;
        });

        updateMortgageVisibility();
        updateCalculations();
        alert('Ledger loaded successfully!');
    } catch (e) {
        alert('Error loading file: ' + e.message);
    }
}

async function downloadZip() {
    const zip = new JSZip();
    const timePrefs = getSelectedTimePreferences();

    // Pre-calculate common values
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxBreakdown = getTaxBreakdown(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const taxes = taxBreakdown.totalTax;
    const trueIncome = grossIncome - taxes - totalDonations - totalExpenses;

    // Calculate yearly living expenses
    let yearlyLivingExpenses = 0;
    ledgerState.livingExpenses.forEach(le => {
        if (le.hidden) return;
        switch (le.frequency) {
            case 'daily': yearlyLivingExpenses += le.amount * 365; break;
            case 'weekly': yearlyLivingExpenses += le.amount * 52; break;
            case 'monthly': yearlyLivingExpenses += le.amount * 12; break;
            case 'quarterly': yearlyLivingExpenses += le.amount * 4; break;
            case 'yearly': yearlyLivingExpenses += le.amount; break;
            case 'custom': yearlyLivingExpenses += le.amount * (365 / (le.customDays || 30)); break;
        }
    });

    const countryData = countryBenchmarks[ledgerState.country] || countryBenchmarks.US;
    const today = new Date();

    for (const pref of timePrefs) {
        const years = parseTimeToYears(pref);
        const timeLabel = pref.replace('_', ' ').replace(/(\d+)/, '$1 ');
        const folder = zip.folder(pref.replace('_', '-'));

        // Save JSON data
        const stateClone = { ...ledgerState };
        folder.file('data.json', JSON.stringify(stateClone, null, 2));

        // Generate PDF report mirroring Lifestyle Calculations
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const results = calculateProjection(trueIncome, years);

        // Calculate percentiles
        const networthCountryPercentile = calculatePercentile(results.netWorth, countryData.netWorth);
        const networthGlobalPercentile = calculatePercentile(results.netWorth, globalBenchmarks.netWorth);
        const incomeCountryPercentile = calculatePercentile(grossIncome, countryData.income);

        let y = 20;

        // Helper function to check page overflow
        const checkPage = (needed = 10) => {
            if (y + needed > 280) { doc.addPage(); y = 20; }
        };

        // ===== HEADER =====
        doc.setFontSize(20);
        doc.setTextColor(212, 168, 70); // Gold
        doc.text('Ledger - Lifestyle Report', 20, y); y += 10;
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text(`Generated: ${new Date().toLocaleDateString()} | Location: ${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''}`, 20, y); y += 8;

        // Inflation note at top (matches Lifestyle Calculations viewer)
        if (ledgerState.applyInflation) {
            doc.setFontSize(9);
            doc.setTextColor(255, 107, 107);
            doc.setFont(undefined, 'italic');
            doc.text('Adjusted for inflation compared to what things are worth today', 105, y, { align: 'center' });
            doc.setFont(undefined, 'normal');
            y += 6;
        }

        // ===== INPUT SUMMARY =====
        doc.setFontSize(12);
        doc.setTextColor(212, 168, 70);
        doc.text(`Over the Course of ${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)}`, 20, y); y += 10;

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(`Starting Amount: ${formatCurrency(ledgerState.startingAmount)}`, 25, y); y += 6;
        doc.text(`Yearly Gross Income: ${formatCurrency(grossIncome)}`, 25, y); y += 6;
        doc.text(`True Income (after taxes/deductions): ${formatCurrency(trueIncome)}`, 25, y); y += 10;

        // ===== REALITY RANKING =====
        checkPage(25);
        doc.setFillColor(212, 168, 70);
        doc.rect(20, y - 2, 170, 20, 'F');
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(11);
        doc.text('Reality Ranking', 25, y + 5);
        doc.setFontSize(9);
        doc.text(`Net Worth (${ledgerState.country}): Top ${networthCountryPercentile}%`, 25, y + 12);
        doc.text(`Net Worth (Global): Top ${networthGlobalPercentile}%`, 90, y + 12);
        doc.text(`Income (${ledgerState.country}): Top ${incomeCountryPercentile}%`, 145, y + 12);
        y += 25;

        // ===== TAXES & DEDUCTIONS =====
        checkPage(40);
        doc.setFillColor(239, 68, 68);
        doc.rect(20, y - 2, 170, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.text(`Taxes & Deductions (${ledgerState.country}${ledgerState.region ? ', ' + ledgerState.region : ''})`, 25, y + 4);
        y += 12;

        doc.setTextColor(180, 60, 60);
        doc.setFontSize(9);
        doc.text(`Federal/National Tax (yearly): -${formatCurrency(taxBreakdown.federalTax)}`, 25, y); y += 5;
        if (taxBreakdown.stateTax > 0) {
            doc.text(`State/Provincial Tax (yearly): -${formatCurrency(taxBreakdown.stateTax)}`, 25, y); y += 5;
        }
        if (taxBreakdown.payrollTax > 0) {
            doc.text(`Payroll/Social Insurance (yearly): -${formatCurrency(taxBreakdown.payrollTax)}`, 25, y); y += 5;
        }
        doc.text(`Total Taxes (yearly): -${formatCurrency(taxes)}`, 25, y); y += 5;
        doc.text(`Effective Tax Rate: ${taxBreakdown.effectiveRate}%`, 25, y); y += 5;
        doc.setFontSize(10);
        doc.text(`Total Taxes Over ${timeLabel}: -${formatCurrency(taxes * years)}`, 25, y); y += 5;

        // Est. Tax Savings from Deductions (green, if applicable)
        if ((totalDonations + totalExpenses) > 0) {
            const totalDeductionsSavings = (totalDonations + totalExpenses) * (taxBreakdown.effectiveRate / 100) * years;
            doc.setTextColor(74, 222, 128); // Green #4ade80
            doc.text(`Est. Tax Savings from Deductions: +${formatCurrency(totalDeductionsSavings)}`, 25, y); y += 5;
        }
        y += 5;

        // ===== LIVING EXPENSES =====
        if (yearlyLivingExpenses > 0) {
            checkPage(25);
            doc.setFillColor(251, 191, 36);
            doc.rect(20, y - 2, 170, 8, 'F');
            doc.setTextColor(60, 40, 0);
            doc.setFontSize(11);
            doc.text('Living Expenses', 25, y + 4);
            y += 12;

            doc.setTextColor(180, 140, 20);
            doc.setFontSize(9);
            doc.text(`Yearly Living Expenses: -${formatCurrency(yearlyLivingExpenses)}`, 25, y); y += 5;
            doc.text(`Total Over ${timeLabel}: -${formatCurrency(yearlyLivingExpenses * years)}`, 25, y); y += 10;
        }

        // ===== PURCHASES & HABITS =====
        checkPage(30);
        const totalMonths = years * 12;

        // Helper to calculate years from now for a date
        const getYearsFromNow = (dateStr) => {
            if (!dateStr) return 0;
            const date = new Date(dateStr);
            return Math.max(0, (date - today) / (365.25 * 24 * 60 * 60 * 1000));
        };

        // Collect all purchases
        let yearlyPurchaseCost = 0;
        let oneTimePurchaseCost = 0;
        const purchaseItems = [];

        // Vehicle
        const vehicleYearsFromNow = getYearsFromNow(ledgerState.vehicleDate);
        if (ledgerState.vehiclePrice > 0 && vehicleYearsFromNow < years) {
            oneTimePurchaseCost += ledgerState.vehiclePrice;
            const vehicleName = ledgerState.vehicleName || 'Vehicle';
            const dateNote = ledgerState.vehicleDate ? ` (${new Date(ledgerState.vehicleDate).toLocaleDateString()})` : '';
            purchaseItems.push({ name: vehicleName + dateNote, cost: ledgerState.vehiclePrice, type: 'one-time' });
        }

        // Property
        const propertyYearsFromNow = getYearsFromNow(ledgerState.propertyDate);
        if ((ledgerState.propertyDownPayment > 0 || ledgerState.mortgageAmount > 0) && propertyYearsFromNow < years) {
            const propertyCost = ledgerState.cashPurchase
                ? (ledgerState.propertyDownPayment + ledgerState.mortgageAmount)
                : ledgerState.propertyDownPayment;
            if (propertyCost > 0) {
                oneTimePurchaseCost += propertyCost;
                const dateNote = ledgerState.propertyDate ? ` (${new Date(ledgerState.propertyDate).toLocaleDateString()})` : '';
                const label = ledgerState.cashPurchase ? 'Property (Cash)' : 'Property Down Payment';
                purchaseItems.push({ name: label + dateNote, cost: propertyCost, type: 'one-time' });
            }
        }

        // Rent
        const rentYearsFromNow = getYearsFromNow(ledgerState.rentDate);
        if (ledgerState.monthlyRent > 0 && rentYearsFromNow < years) {
            const yearlyRent = ledgerState.monthlyRent * 12;
            yearlyPurchaseCost += yearlyRent;
            const dateNote = ledgerState.rentDate ? ` (starts ${new Date(ledgerState.rentDate).toLocaleDateString()})` : '';
            purchaseItems.push({ name: 'Rent' + dateNote, cost: yearlyRent, type: 'recurring', freq: 'monthly' });
        }

        // Target purchases
        ledgerState.targetPurchases.forEach(p => {
            if (p.hidden) return;
            const tpDateNote = p.date ? ` (${new Date(p.date).toLocaleDateString()})` : '';
            if (p.recurring) {
                let yearly = 0;
                const freq = p.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = p.cost * 365; break;
                    case 'weekly': yearly = p.cost * 52; break;
                    case 'monthly': yearly = p.cost * 12; break;
                    case 'quarterly': yearly = p.cost * 4; break;
                    case 'yearly': yearly = p.cost; break;
                    case 'custom': yearly = p.cost * (365 / (p.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                purchaseItems.push({ name: (p.name || 'Purchase') + tpDateNote, cost: yearly, type: 'recurring', freq });
            } else {
                oneTimePurchaseCost += p.cost;
                purchaseItems.push({ name: (p.name || 'One-time Purchase') + tpDateNote, cost: p.cost, type: 'one-time' });
            }
        });

        // Future purchases (only within time period)
        ledgerState.futurePurchases.forEach(fp => {
            if (fp.hidden) return;
            const fpYearsFromNow = getYearsFromNow(fp.date);
            if (fp.date && fpYearsFromNow >= years) return;

            if (fp.recurring) {
                let yearly = 0;
                const freq = fp.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = fp.cost * 365; break;
                    case 'weekly': yearly = fp.cost * 52; break;
                    case 'monthly': yearly = fp.cost * 12; break;
                    case 'quarterly': yearly = fp.cost * 4; break;
                    case 'yearly': yearly = fp.cost; break;
                    case 'custom': yearly = fp.cost * (365 / (fp.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                purchaseItems.push({ name: (fp.name || 'Future Purchase') + dateNote, cost: yearly, type: 'recurring', freq });
            } else {
                oneTimePurchaseCost += fp.cost;
                const dateNote = fp.date ? ` (${new Date(fp.date).toLocaleDateString()})` : '';
                purchaseItems.push({ name: (fp.name || 'Future Purchase') + dateNote, cost: fp.cost, type: 'one-time' });
            }
        });

        if (purchaseItems.length > 0) {
            doc.setFillColor(249, 115, 22);
            doc.rect(20, y - 2, 170, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.text('Purchases & Habits', 25, y + 4);
            y += 12;

            doc.setTextColor(200, 90, 20);
            doc.setFontSize(9);

            purchaseItems.forEach(p => {
                checkPage(6);
                if (p.type === 'one-time') {
                    doc.text(`${p.name} [one-time]: -${formatCurrency(p.cost)}`, 25, y);
                } else {
                    doc.text(`${p.name} [${p.freq}]: -${formatCurrency(p.cost)}/yr`, 25, y);
                }
                y += 5;
            });

            y += 3;
            doc.setFontSize(10);
            doc.text(`Total Recurring Yearly: -${formatCurrency(yearlyPurchaseCost)}/yr`, 25, y); y += 5;
            if (oneTimePurchaseCost > 0) {
                doc.text(`Total One-time: -${formatCurrency(oneTimePurchaseCost)}`, 25, y); y += 5;
            }
            const totalPurchaseCost = yearlyPurchaseCost * years + oneTimePurchaseCost;
            doc.text(`Total Over ${timeLabel}: -${formatCurrency(totalPurchaseCost)}`, 25, y); y += 10;
        }

        // ===== WEALTH PROJECTIONS (no box header, matches Lifestyle Calculations viewer) =====
        checkPage(50);
        doc.setFontSize(10);

        // Starting Amount (default color)
        doc.setTextColor(60, 60, 60);
        doc.text(`Starting Amount: ${formatCurrency(ledgerState.startingAmount)}`, 25, y); y += 6;

        // True Income (Yearly) (default color)
        doc.text(`True Income (Yearly): ${formatCurrency(trueIncome)}`, 25, y); y += 6;

        // Projected Liquid Cash (green #4ade80)
        doc.setTextColor(74, 222, 128);
        doc.text(`Projected Liquid Cash: ${formatCurrency(results.liquidCash)}`, 25, y); y += 6;

        // Projected Stock Value (blue #60a5fa)
        doc.setTextColor(96, 165, 250);
        doc.text(`Projected Stock Value: ${formatCurrency(results.stockValue)}`, 25, y); y += 6;

        // Projected Vehicle Value (default color)
        doc.setTextColor(60, 60, 60);
        doc.text(`Projected Vehicle Value: ${formatCurrency(results.vehicleValue)}`, 25, y); y += 6;

        // Projected Property Value (default color)
        doc.text(`Projected Property Value: ${formatCurrency(results.propertyValue)}`, 25, y); y += 6;

        // Total Asset Value (blue #60a5fa)
        doc.setTextColor(96, 165, 250);
        doc.text(`Total Asset Value: ${formatCurrency(results.assetValue)}`, 25, y); y += 8;

        // Net Worth (purple #c084fc, larger and bold)
        doc.setFontSize(14);
        doc.setTextColor(192, 132, 252);
        doc.text(`NET WORTH: ${formatCurrency(results.netWorth)}`, 25, y);

        folder.file('report.pdf', doc.output('blob'));
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `ledger-${new Date().toISOString().slice(0, 10)}.zip`);
}

// ============ CHARTS ============
let chartInstance = null;
let currentGraphIndex = 0;

function showGraphModal() {
    document.getElementById('graph-modal').style.display = 'block';
    currentGraphIndex = 0;
    renderGraph(currentGraphIndex);
}

function closeGraphModal() {
    document.getElementById('graph-modal').style.display = 'none';
}

// Calculate projection with different scenarios for comparison lines
// Now calculates monthly for proper income spreading over sub-year periods
function calculateProjectionDetailed(years, includeAssets = true, includeCosts = true) {
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const yearlyTrueIncome = grossIncome - taxes - totalDonations - totalExpenses;
    const monthlyTrueIncome = yearlyTrueIncome / 12;

    let liquidCash = ledgerState.startingAmount;
    let stockValue = 0;
    let prevStockValue = 0;

    const today = new Date();

    // Check if vehicle, property, and rent dates are in the future
    const vehicleDate = ledgerState.vehicleDate ? new Date(ledgerState.vehicleDate) : null;
    const propertyDate = ledgerState.propertyDate ? new Date(ledgerState.propertyDate) : null;
    const rentDate = ledgerState.rentDate ? new Date(ledgerState.rentDate) : null;

    // Calculate months until these assets/expenses start
    const vehicleMonthsFromNow = vehicleDate ? Math.max(0, (vehicleDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;
    const propertyMonthsFromNow = propertyDate ? Math.max(0, (propertyDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;
    const rentMonthsFromNow = rentDate ? Math.max(0, (rentDate - today) / (30.44 * 24 * 60 * 60 * 1000)) : 0;

    // Initialize values - only include if purchase date is in the past or not set
    let vehicleValue = (vehicleDate && vehicleDate > today) ? 0 : ledgerState.vehiclePrice;
    let propertyValue = (propertyDate && propertyDate > today) ? 0 : (ledgerState.propertyDownPayment + ledgerState.mortgageAmount);
    let mortgageRemaining = (propertyDate && propertyDate > today) ? 0 : ledgerState.mortgageAmount;

    // Track if vehicle/property have been purchased and rent has started
    let vehiclePurchased = !(vehicleDate && vehicleDate > today);
    let propertyPurchased = !(propertyDate && propertyDate > today);
    let rentStarted = !(rentDate && rentDate > today);

    // Track individual stock values for date-based growth and sell dates
    const stockValues = [];
    const prevStockValues = [];

    // Initial stock investments (deducts from cash)
    if (includeAssets) {
        ledgerState.stocks.forEach(stock => {
            liquidCash -= stock.amount;
            const sellDate = stock.sellDate ? new Date(stock.sellDate) : null;
            // Calculate investments per month based on frequency
            let investmentsPerMonth = 0;
            const freq = stock.frequency || 'monthly';
            if (stock.recurring) {
                switch (freq) {
                    case 'daily': investmentsPerMonth = 30.44; break;
                    case 'weekly': investmentsPerMonth = 4.33; break;
                    case 'monthly': investmentsPerMonth = 1; break;
                    case 'quarterly': investmentsPerMonth = 1/3; break;
                    case 'yearly': investmentsPerMonth = 1/12; break;
                    case 'custom': investmentsPerMonth = 30.44 / (stock.customDays || 30); break;
                    default: investmentsPerMonth = 1;
                }
            }
            stockValues.push({
                value: stock.amount,
                costBasis: stock.amount,
                growthRate: stock.growthRate || 7,
                sellDate: sellDate,
                recurring: stock.recurring,
                frequency: freq,
                investmentAmount: stock.amount,
                investmentsPerMonth: investmentsPerMonth,
                sold: false
            });
            stockValue += stock.amount;
        });
        // Previous stocks (does NOT deduct from cash)
        // Each stock is tracked individually with its start date and sell date
        ledgerState.previousStocks.forEach(stock => {
            const startDate = stock.startDate ? new Date(stock.startDate) : null;
            const sellDate = stock.sellDate ? new Date(stock.sellDate) : null;
            prevStockValues.push({
                value: stock.amount,
                costBasis: stock.amount,
                growthRate: stock.growthRate || 7,
                startDate: startDate,
                sellDate: sellDate,
                sold: false
            });
            prevStockValue += stock.amount;
        });
    }

    // Capital gains tax rate (simplified - 15% long-term rate)
    const capitalGainsTaxRate = 0.15;

    const monthlyMortgage = ledgerState.mortgageAmount > 0
        ? (ledgerState.mortgageAmount * 1.05) / (ledgerState.mortgageDuration * 12)
        : 0;

    // Calculate monthly purchase costs (only non-hidden items)
    let monthlyPurchaseCost = 0;
    let oneTimePurchaseTotal = 0;
    if (includeCosts) {
        ledgerState.targetPurchases.forEach(p => {
            if (p.hidden) return;
            if (!p.recurring) {
                oneTimePurchaseTotal += p.cost; // One-time purchases happen at start
            } else {
                const freq = p.frequency || 'monthly';
                switch (freq) {
                    case 'daily': monthlyPurchaseCost += p.cost * 30.44; break;
                    case 'weekly': monthlyPurchaseCost += p.cost * 4.33; break;
                    case 'monthly': monthlyPurchaseCost += p.cost; break;
                    case 'quarterly': monthlyPurchaseCost += p.cost / 3; break;
                    case 'yearly': monthlyPurchaseCost += p.cost / 12; break;
                    case 'custom': monthlyPurchaseCost += p.cost * (30.44 / (p.customDays || 30)); break;
                }
            }
        });

        // Add living expenses
        ledgerState.livingExpenses.forEach(le => {
            if (le.hidden) return;
            switch (le.frequency) {
                case 'daily': monthlyPurchaseCost += le.amount * 30.44; break;
                case 'weekly': monthlyPurchaseCost += le.amount * 4.33; break;
                case 'monthly': monthlyPurchaseCost += le.amount; break;
                case 'quarterly': monthlyPurchaseCost += le.amount / 3; break;
                case 'yearly': monthlyPurchaseCost += le.amount / 12; break;
                case 'custom': monthlyPurchaseCost += le.amount * (30.44 / (le.customDays || 30)); break;
            }
        });
    }

    const totalMonths = Math.ceil(years * 12);
    const dataPoints = [];

    // Deduct one-time purchases at month 0
    if (includeCosts) {
        liquidCash -= oneTimePurchaseTotal;
    }

    for (let month = 0; month <= totalMonths; month++) {
        const yearFraction = month / 12;

        if (month > 0) {
            // Check if vehicle should be purchased this month
            if (!vehiclePurchased && month >= vehicleMonthsFromNow && includeAssets) {
                vehiclePurchased = true;
                vehicleValue = ledgerState.vehiclePrice;
                // Deduct vehicle cost from liquid cash
                if (ledgerState.vehiclePrice > 0 && includeCosts) {
                    liquidCash -= ledgerState.vehiclePrice;
                }
            }

            // Check if property should be purchased this month
            if (!propertyPurchased && month >= propertyMonthsFromNow && includeAssets) {
                propertyPurchased = true;
                propertyValue = ledgerState.propertyDownPayment + ledgerState.mortgageAmount;
                mortgageRemaining = ledgerState.mortgageAmount;
                // Deduct down payment from liquid cash
                if (includeCosts) {
                    if (ledgerState.propertyDownPayment > 0 && !ledgerState.cashPurchase) {
                        liquidCash -= ledgerState.propertyDownPayment;
                    } else if (ledgerState.cashPurchase) {
                        liquidCash -= (ledgerState.propertyDownPayment + ledgerState.mortgageAmount);
                    }
                }
            }

            // Check if rent should start this month
            if (!rentStarted && month >= rentMonthsFromNow) {
                rentStarted = true;
            }

            // Add monthly income
            liquidCash += monthlyTrueIncome;

            if (includeCosts) {
                liquidCash -= monthlyPurchaseCost;

                // Only apply rent if it has started
                if (rentStarted) {
                    liquidCash -= ledgerState.monthlyRent;
                }

                // Only apply mortgage if property has been purchased
                if (propertyPurchased && mortgageRemaining > 0) {
                    const payment = Math.min(monthlyMortgage, mortgageRemaining);
                    liquidCash -= payment;
                    mortgageRemaining -= payment * 0.3;
                }

                // Future purchases (non-hidden)
                ledgerState.futurePurchases.forEach(fp => {
                    if (fp.hidden) return;
                    if (fp.date) {
                        const purchaseDate = new Date(fp.date);
                        const monthsSinceStart = (purchaseDate - today) / (30.44 * 24 * 60 * 60 * 1000);
                        // Trigger purchase in the month it falls into
                        if (Math.floor(monthsSinceStart) === month - 1 && monthsSinceStart >= 0) {
                            liquidCash -= fp.cost;
                        }
                    }
                });
            }

            if (includeAssets) {
                const simulatedDate = new Date(today.getTime() + month * 30.44 * 24 * 60 * 60 * 1000);
                const monthlyGrowthMultiplier = (rate) => Math.pow(1 + rate / 100, 1/12);

                // Handle new stock investments
                stockValue = 0;
                stockValues.forEach((sv, idx) => {
                    if (sv.sold) {
                        return; // Skip sold stocks
                    }

                    // Check if this stock should be sold this month
                    if (sv.sellDate && simulatedDate >= sv.sellDate && !sv.sold) {
                        // Calculate partial month growth if selling mid-year
                        const sellMonth = sv.sellDate.getMonth();
                        const currentMonth = simulatedDate.getMonth();
                        const sellDay = sv.sellDate.getDate();
                        const daysInMonth = new Date(sv.sellDate.getFullYear(), sellMonth + 1, 0).getDate();
                        const partialMonthFraction = sellDay / daysInMonth;

                        // Apply partial month growth
                        const partialGrowth = Math.pow(1 + sv.growthRate / 100, partialMonthFraction / 12);
                        sv.value *= partialGrowth;

                        // Calculate capital gains and tax
                        const capitalGains = sv.value - sv.costBasis;
                        const taxOnGains = capitalGains > 0 ? capitalGains * capitalGainsTaxRate : 0;

                        // Add sale proceeds minus tax to liquid cash
                        liquidCash += sv.value - taxOnGains;
                        sv.sold = true;
                        return;
                    }

                    // Recurring investment based on frequency
                    if (sv.recurring && sv.investmentsPerMonth > 0) {
                        const monthlyInvestment = sv.investmentAmount * sv.investmentsPerMonth;
                        liquidCash -= monthlyInvestment;
                        sv.value += monthlyInvestment;
                        sv.costBasis += monthlyInvestment;
                    }

                    // Apply monthly growth
                    sv.value *= monthlyGrowthMultiplier(sv.growthRate);
                    stockValue += sv.value;
                });

                // Previous stocks: apply growth only after investment start date, handle sell dates
                prevStockValue = 0;
                prevStockValues.forEach(ps => {
                    if (ps.sold) {
                        return; // Skip sold stocks
                    }

                    // Check if this stock should be sold this month
                    if (ps.sellDate && simulatedDate >= ps.sellDate && !ps.sold) {
                        // Calculate partial month growth if selling mid-year
                        const sellDay = ps.sellDate.getDate();
                        const daysInMonth = new Date(ps.sellDate.getFullYear(), ps.sellDate.getMonth() + 1, 0).getDate();
                        const partialMonthFraction = sellDay / daysInMonth;

                        // Apply partial month growth
                        const partialGrowth = Math.pow(1 + ps.growthRate / 100, partialMonthFraction / 12);
                        ps.value *= partialGrowth;

                        // Calculate capital gains and tax
                        const capitalGains = ps.value - ps.costBasis;
                        const taxOnGains = capitalGains > 0 ? capitalGains * capitalGainsTaxRate : 0;

                        // Add sale proceeds minus tax to liquid cash
                        liquidCash += ps.value - taxOnGains;
                        ps.sold = true;
                        return;
                    }

                    // Only apply growth if we're after the start date
                    if (!ps.startDate || simulatedDate >= ps.startDate) {
                        ps.value *= monthlyGrowthMultiplier(ps.growthRate);
                    }
                    prevStockValue += ps.value;
                });

                // Vehicle depreciation (10% yearly, applied at year boundaries) - only if vehicle purchased
                if (vehiclePurchased && month > 0 && month % 12 === 0) {
                    vehicleValue *= 0.90;

                    // Annual vehicle registration/tax (applied at year boundaries)
                    if (vehicleValue > 0 && includeCosts) {
                        const annualVehicleCost = getAnnualVehicleCost(vehicleValue, ledgerState.country, ledgerState.region);
                        liquidCash -= annualVehicleCost;
                    }
                }

                // Monthly property tax - only if property purchased
                if (propertyPurchased && propertyValue > 0 && includeCosts) {
                    const annualPropertyTax = getAnnualPropertyTax(propertyValue, ledgerState.country, ledgerState.region);
                    liquidCash -= annualPropertyTax / 12;
                }

                // Property appreciation (3-5% yearly, applied monthly compound) - only if property purchased
                if (propertyPurchased && propertyValue > 0) {
                    // Use a seeded pseudo-random for consistent results within same calculation
                    const monthSeed = month * 0.0001;
                    const appreciationRate = 0.03 + ((Math.sin(monthSeed * 1000) + 1) / 2) * 0.02; // 3-5%
                    propertyValue *= Math.pow(1 + appreciationRate, 1/12);
                }
            }
        }

        const totalStockValue = stockValue + prevStockValue;
        const assetValue = includeAssets ? (totalStockValue + vehicleValue + propertyValue) : 0;
        const netWorth = liquidCash + assetValue - (includeAssets ? mortgageRemaining : 0);

        dataPoints.push({
            year: yearFraction,
            month,
            liquidCash,
            assetValue,
            netWorth,
            stockValue: totalStockValue,
            vehicleValue,
            propertyValue,
            prevStockValue
        });
    }

    // Apply inflation if toggled
    if (ledgerState.applyInflation) {
        dataPoints.forEach((point, i) => {
            const inflationFactor = Math.pow(0.97, point.year);
            point.liquidCash *= inflationFactor;
            point.assetValue *= inflationFactor;
            point.netWorth *= inflationFactor;
            point.stockValue *= inflationFactor;
            point.vehicleValue *= inflationFactor;
            point.propertyValue *= inflationFactor;
            point.prevStockValue *= inflationFactor;
        });
    }

    return dataPoints;
}

// Calculate income growth without taxes for comparison (monthly calculation)
function calculateIncomeNoTaxes(years) {
    const totalAdditionalIncome = ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const grossIncome = ledgerState.yearlyIncome + totalAdditionalIncome;
    const monthlyIncome = grossIncome / 12;

    const dataPoints = [];
    let cash = ledgerState.startingAmount;
    const totalMonths = Math.ceil(years * 12);

    for (let month = 0; month <= totalMonths; month++) {
        if (month > 0) {
            cash += monthlyIncome;
        }
        const yearFraction = month / 12;
        dataPoints.push({ year: yearFraction, month, value: cash });
    }

    if (ledgerState.applyInflation) {
        dataPoints.forEach(point => {
            point.value *= Math.pow(0.97, point.year);
        });
    }

    return dataPoints;
}

// Get purchase events for marking on graph
function getPurchaseEvents(years) {
    const events = [];
    const today = new Date();

    // One-time target purchases (non-recurring, non-hidden)
    ledgerState.targetPurchases.forEach(p => {
        if (!p.hidden && !p.recurring) {
            events.push({ year: 0, cost: p.cost, name: p.name || 'Purchase' });
        }
    });

    // Future purchases
    ledgerState.futurePurchases.forEach(fp => {
        if (fp.hidden) return;
        if (fp.date) {
            const purchaseDate = new Date(fp.date);
            const yearsSinceStart = (purchaseDate - today) / (365.25 * 24 * 60 * 60 * 1000);
            if (yearsSinceStart >= 0 && yearsSinceStart <= years) {
                events.push({
                    year: Math.max(0, yearsSinceStart),
                    cost: fp.cost,
                    name: fp.name || 'Future Purchase'
                });
            }
        }
    });

    return events;
}

function renderGraph(index) {
    const canvas = document.getElementById('lifestyleChart');
    const ctx = canvas.getContext('2d');
    const titleEl = document.getElementById('graph-title');

    if (chartInstance) {
        chartInstance.destroy();
    }

    const timePrefs = getSelectedTimePreferences();
    if (timePrefs.length === 0) return;

    // Each time preference gets its own graph (cycle through)
    const currentPref = timePrefs[index % timePrefs.length];
    const years = parseTimeToYears(currentPref);
    const useDays = years <= 1;  // Daily granularity for 1 year or less
    const useMonths = years < 5 && !useDays;  // Monthly for 1-5 years

    const timeLabel = currentPref.replace('_', ' ').replace(/(\d+)/, '$1 ');
    titleEl.textContent = `Wealth Projection - ${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)}`;

    // Show/hide inflation note
    const inflationNote = document.getElementById('graph-inflation-note');
    if (inflationNote) {
        inflationNote.style.display = ledgerState.applyInflation ? 'block' : 'none';
    }

    // Build and show purchase summary
    const purchaseSummaryEl = document.getElementById('graph-purchase-summary');
    if (purchaseSummaryEl) {
        let yearlyPurchaseCost = 0;
        let oneTimePurchaseCost = 0;
        const purchaseItems = [];

        // Target purchases
        ledgerState.targetPurchases.forEach(p => {
            if (p.hidden) return;
            if (p.recurring) {
                let yearly = 0;
                const freq = p.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = p.cost * 365; break;
                    case 'weekly': yearly = p.cost * 52; break;
                    case 'monthly': yearly = p.cost * 12; break;
                    case 'quarterly': yearly = p.cost * 4; break;
                    case 'yearly': yearly = p.cost; break;
                    case 'custom': yearly = p.cost * (365 / (p.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                purchaseItems.push({ name: p.name || 'Purchase', yearly, freq, type: 'recurring' });
            } else {
                oneTimePurchaseCost += p.cost;
                purchaseItems.push({ name: p.name || 'One-time', yearly: p.cost, type: 'one-time' });
            }
        });

        // Future purchases
        ledgerState.futurePurchases.forEach(fp => {
            if (fp.hidden) return;
            if (fp.recurring) {
                let yearly = 0;
                const freq = fp.frequency || 'monthly';
                switch (freq) {
                    case 'daily': yearly = fp.cost * 365; break;
                    case 'weekly': yearly = fp.cost * 52; break;
                    case 'monthly': yearly = fp.cost * 12; break;
                    case 'quarterly': yearly = fp.cost * 4; break;
                    case 'yearly': yearly = fp.cost; break;
                    case 'custom': yearly = fp.cost * (365 / (fp.customDays || 30)); break;
                }
                yearlyPurchaseCost += yearly;
                purchaseItems.push({ name: fp.name || 'Future Purchase', yearly, freq, type: 'future-recurring' });
            } else {
                oneTimePurchaseCost += fp.cost;
                purchaseItems.push({ name: fp.name || 'Future Purchase', yearly: fp.cost, type: 'future' });
            }
        });

        const totalOverPeriod = yearlyPurchaseCost * years + oneTimePurchaseCost;

        if (purchaseItems.length > 0) {
            let summaryHtml = '<div style="color: #f97316; font-weight: bold; margin-bottom: 0.5rem;">Purchases Factored In:</div>';
            summaryHtml += '<div style="display: flex; flex-wrap: wrap; gap: 0.5rem 1rem;">';

            purchaseItems.forEach(p => {
                if (p.type === 'one-time' || p.type === 'future') {
                    summaryHtml += `<span style="color: #ccc;">${p.name}: <span style="color: #f97316;">-${formatCurrency(p.yearly)}</span> (one-time)</span>`;
                } else {
                    summaryHtml += `<span style="color: #ccc;">${p.name}: <span style="color: #f97316;">-${formatCurrency(p.yearly)}/yr</span> [${p.freq}]</span>`;
                }
            });

            summaryHtml += '</div>';
            summaryHtml += `<div style="margin-top: 0.5rem; border-top: 1px solid #f97316; padding-top: 0.5rem;">`;
            summaryHtml += `<span style="color: #ccc;">Total Recurring: <strong style="color: #f97316;">-${formatCurrency(yearlyPurchaseCost)}/yr</strong></span>`;
            if (oneTimePurchaseCost > 0) {
                summaryHtml += ` | <span style="color: #ccc;">One-time: <strong style="color: #f97316;">-${formatCurrency(oneTimePurchaseCost)}</strong></span>`;
            }
            summaryHtml += ` | <span style="color: #ccc;">Total over ${timeLabel}: <strong style="color: #f97316;">-${formatCurrency(totalOverPeriod)}</strong></span>`;
            summaryHtml += '</div>';

            purchaseSummaryEl.innerHTML = summaryHtml;
            purchaseSummaryEl.style.display = 'block';
        } else {
            purchaseSummaryEl.style.display = 'none';
        }
    }

    // Calculate different scenarios (all return monthly data points)
    const incomeOnlyData = calculateProjectionDetailed(years, false, false);
    const noTaxData = calculateIncomeNoTaxes(years);
    const withAssetsData = calculateProjectionDetailed(years, true, false);
    const fullData = calculateProjectionDetailed(years, true, true);

    // Create labels and extract data
    const labels = [];
    const incomeOnlyValues = [];
    const noTaxValues = [];
    const withAssetsValues = [];
    const fullValues = [];

    // Helper to interpolate between two values
    const interpolate = (v1, v2, fraction) => v1 + (v2 - v1) * fraction;

    // Get one-time purchase events with exact day numbers for instant dip display
    const getOneTimePurchasesByDay = () => {
        const purchases = {};
        const today = new Date();

        // One-time target purchases (non-recurring, non-hidden) happen at day 0
        ledgerState.targetPurchases.forEach(p => {
            if (!p.hidden && !p.recurring && p.cost > 0) {
                if (!purchases[0]) purchases[0] = 0;
                purchases[0] += p.cost;
            }
        });

        // Future purchases with specific dates (one-time only)
        ledgerState.futurePurchases.forEach(fp => {
            if (fp.hidden) return;
            if (fp.date && !fp.recurring) {
                const purchaseDate = new Date(fp.date);
                const daysSinceStart = Math.round((purchaseDate - today) / (24 * 60 * 60 * 1000));
                if (daysSinceStart >= 0 && daysSinceStart <= years * 365) {
                    if (!purchases[daysSinceStart]) purchases[daysSinceStart] = 0;
                    purchases[daysSinceStart] += fp.cost;
                }
            }
        });

        return purchases;
    };

    // Calculate cumulative one-time purchase costs up to (but not including) a given day
    const getCumulativePurchasesBefore = (targetDay, oneTimePurchases) => {
        let cumulative = 0;
        for (const [day, cost] of Object.entries(oneTimePurchases)) {
            const dayNum = parseInt(day);
            if (dayNum < targetDay) {
                cumulative += cost;
            }
        }
        return cumulative;
    };

    if (useDays) {
        // Daily granularity: handle one-time purchases with instant dips on exact purchase days
        const totalDays = Math.ceil(years * 365);
        const oneTimePurchases = getOneTimePurchasesByDay();
        const purchaseDays = Object.keys(oneTimePurchases).map(d => parseInt(d)).sort((a, b) => a - b);
        const totalOneTimeCost = Object.values(oneTimePurchases).reduce((sum, cost) => sum + cost, 0);

        for (let day = 0; day <= totalDays; day++) {
            labels.push(`Day ${day}`);

            // Convert day to month (fractional)
            const monthFrac = day / 30.44;
            const monthLow = Math.floor(monthFrac);
            const monthHigh = Math.min(monthLow + 1, incomeOnlyData.length - 1);
            const frac = monthFrac - monthLow;

            const idxLow = Math.min(monthLow, incomeOnlyData.length - 1);
            const idxHigh = Math.min(monthHigh, incomeOnlyData.length - 1);

            // Base interpolated values
            let incomeOnlyVal = interpolate(incomeOnlyData[idxLow]?.liquidCash ?? 0, incomeOnlyData[idxHigh]?.liquidCash ?? 0, frac);
            let noTaxVal = interpolate(noTaxData[idxLow]?.value ?? 0, noTaxData[idxHigh]?.value ?? 0, frac);
            let withAssetsVal = interpolate(withAssetsData[idxLow]?.netWorth ?? 0, withAssetsData[idxHigh]?.netWorth ?? 0, frac);
            let fullVal = interpolate(fullData[idxLow]?.netWorth ?? 0, fullData[idxHigh]?.netWorth ?? 0, frac);

            // For one-time purchases that happen on specific days after day 0:
            // The monthly data already includes all one-time purchases at their respective months.
            // To show an instant dip, we add back purchases that haven't happened yet,
            // then remove them on their exact day.
            if (purchaseDays.length > 0 && totalOneTimeCost > 0) {
                // Calculate how much of one-time purchases have NOT yet occurred as of this day
                let notYetSpent = 0;
                for (const purchaseDay of purchaseDays) {
                    if (purchaseDay > 0 && day < purchaseDay) {
                        notYetSpent += oneTimePurchases[purchaseDay];
                    }
                }
                // Add back the not-yet-spent amount to show pre-purchase value
                // Only affects the full calculation (which includes costs)
                fullVal += notYetSpent;
            }

            incomeOnlyValues.push(incomeOnlyVal);
            noTaxValues.push(noTaxVal);
            withAssetsValues.push(withAssetsVal);
            fullValues.push(fullVal);
        }
    } else {
        // Monthly or yearly granularity
        const stepMonths = useMonths ? 1 : 12;
        const totalMonths = Math.ceil(years * 12);

        for (let month = 0; month <= totalMonths; month += stepMonths) {
            if (useMonths) {
                labels.push(`Month ${month}`);
            } else {
                labels.push(`Year ${month / 12}`);
            }

            // Get data directly from monthly arrays (already computed at monthly granularity)
            const dataIndex = Math.min(month, incomeOnlyData.length - 1);

            incomeOnlyValues.push(incomeOnlyData[dataIndex]?.liquidCash ?? 0);
            noTaxValues.push(noTaxData[dataIndex]?.value ?? 0);
            withAssetsValues.push(withAssetsData[dataIndex]?.netWorth ?? 0);
            fullValues.push(fullData[dataIndex]?.netWorth ?? 0);
        }
    }

    // Get purchase events for annotations
    const purchaseEvents = getPurchaseEvents(years);
    const annotations = {};

    purchaseEvents.forEach((event, i) => {
        const pointIndex = useDays ? Math.round(event.year * 365) : (useMonths ? Math.round(event.year * 12) : Math.round(event.year));
        annotations[`purchase${i}`] = {
            type: 'point',
            xValue: pointIndex,
            yValue: fullValues[Math.min(pointIndex, fullValues.length - 1)],
            backgroundColor: '#ef4444',
            borderColor: '#ef4444',
            radius: 6,
            label: {
                enabled: true,
                content: `${event.name}: -${formatCurrency(event.cost)}`,
                position: 'top'
            }
        };
    });

    // Store data for detail view
    const chartData = {
        labels,
        incomeOnlyValues,
        noTaxValues,
        withAssetsValues,
        fullValues,
        fullData,
        useDays,
        useMonths,
        years
    };

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income Only (After Tax)',
                    data: incomeOnlyValues,
                    borderColor: '#22c55e',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Income Only (No Tax)',
                    data: noTaxValues,
                    borderColor: '#86efac',
                    backgroundColor: 'transparent',
                    borderDash: [10, 5],
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Net Worth (With Assets)',
                    data: withAssetsValues,
                    borderColor: '#3b82f6',
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Final Net Worth (All Costs)',
                    data: fullValues,
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: function(tooltipItems) {
                            const idx = tooltipItems[0].dataIndex;
                            const today = new Date();
                            if (chartData.useDays) {
                                const futureDate = new Date(today.getTime() + idx * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                            } else if (chartData.useMonths) {
                                const futureDate = new Date(today.getTime() + idx * 30.44 * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                            } else {
                                const futureDate = new Date(today.getTime() + idx * 365.25 * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                            }
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        callback: function(value, index) {
                            const today = new Date();
                            if (chartData.useDays) {
                                const futureDate = new Date(today.getTime() + value * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            } else if (chartData.useMonths) {
                                const futureDate = new Date(today.getTime() + value * 30.44 * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                            } else {
                                const futureDate = new Date(today.getTime() + value * 365.25 * 24 * 60 * 60 * 1000);
                                return futureDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                            }
                        },
                        maxTicksLimit: 10
                    }
                },
                y: {
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    modifierKey: 'shift',
                    onPanComplete: function({ chart }) {
                        updateAxisInfo(chart);
                    }
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    drag: {
                        enabled: false
                    },
                    mode: 'xy',
                    onZoomComplete: function({ chart }) {
                        updateAxisInfo(chart);
                        checkAutoRefit(chart);
                    }
                }
            },
            onClick: function(event, elements, chart) {
                if (elements.length > 0) {
                    // Show detail modal for clicked point
                    showGraphDetail(elements[0].index, chartData);
                } else {
                    // Click to zoom in 5%
                    const zoomFactor = 1.05;
                    chart.zoom(zoomFactor);
                    updateAxisInfo(chart);
                    checkAutoRefit(chart);
                }
            },
            onHover: function(event, elements, chart) {
                const hoverInfo = document.getElementById('graph-hover-info');
                if (elements.length > 0) {
                    const idx = elements[0].index;
                    const today = new Date();
                    let dateStr;
                    if (chartData.useDays) {
                        const futureDate = new Date(today.getTime() + idx * 24 * 60 * 60 * 1000);
                        dateStr = futureDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                    } else if (chartData.useMonths) {
                        const futureDate = new Date(today.getTime() + idx * 30.44 * 24 * 60 * 60 * 1000);
                        dateStr = futureDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                    } else {
                        const futureDate = new Date(today.getTime() + idx * 365.25 * 24 * 60 * 60 * 1000);
                        dateStr = futureDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                    }
                    const netWorth = chartData.fullValues[idx];
                    hoverInfo.innerHTML = `<span style="color: var(--gold);">${dateStr}</span> • Net Worth: <span style="color: #a855f7; font-weight: bold;">${formatCurrency(netWorth)}</span> <span style="color: #888; font-size: 0.85rem;">• Click for details</span>`;
                } else {
                    hoverInfo.innerHTML = '<span style="color: #888;">Hover over graph to see details • Click to view breakdown</span>';
                }
            }
        }
    };

    chartInstance = new Chart(ctx, config);

    // Store chart metadata for helper functions
    chartInstance.chartData = chartData;

    // Store original limits for refit detection and reset
    chartInstance.originalLimits = {
        xMin: chartInstance.scales.x.min,
        xMax: chartInstance.scales.x.max,
        yMin: chartInstance.scales.y.min,
        yMax: chartInstance.scales.y.max
    };

    // Store initial limits for true reset (separate from tracking limits)
    chartInstance.initialLimits = { ...chartInstance.originalLimits };

    // Initial axis info update
    updateAxisInfo(chartInstance);

    // Set date picker range
    const datePicker = document.getElementById('graph-date-picker');
    if (datePicker) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        datePicker.min = todayStr;

        // Set max date based on graph range
        const maxMs = today.getTime() + (chartData.years * 365.25 * 24 * 60 * 60 * 1000);
        const maxDate = new Date(maxMs);
        datePicker.max = maxDate.toISOString().split('T')[0];
        datePicker.value = '';  // Clear any previous value
    }
}

// Convert chart index to actual date string
function indexToDate(index, useDays, useMonths) {
    const today = new Date();
    if (useDays) {
        const futureDate = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } else if (useMonths) {
        const futureDate = new Date(today.getTime() + index * 30.44 * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } else {
        const futureDate = new Date(today.getTime() + index * 365.25 * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
}

// Update axis coordinate displays
function updateAxisInfo(chart) {
    const xMin = chart.scales.x.min;
    const xMax = chart.scales.x.max;
    const yMin = chart.scales.y.min;
    const yMax = chart.scales.y.max;

    // Get granularity flags from stored chartData
    const useDays = chart.chartData ? chart.chartData.useDays : false;
    const useMonths = chart.chartData ? chart.chartData.useMonths : false;

    // Show actual dates on x-axis info
    const minIdx = Math.max(0, Math.floor(xMin));
    const maxIdx = Math.min(chart.data.labels.length - 1, Math.ceil(xMax));

    document.getElementById('x-axis-min').textContent = minIdx === 0 ? 'Today' : indexToDate(minIdx, useDays, useMonths);
    document.getElementById('x-axis-max').textContent = indexToDate(maxIdx, useDays, useMonths);
    document.getElementById('y-axis-min').textContent = formatCurrency(yMin);
    document.getElementById('y-axis-max').textContent = formatCurrency(yMax);
}

// Check if we should auto-refit (at 3/4 of original zoom)
function checkAutoRefit(chart) {
    if (!chart.originalLimits) return;

    const origXRange = chart.originalLimits.xMax - chart.originalLimits.xMin;
    const origYRange = chart.originalLimits.yMax - chart.originalLimits.yMin;
    const currentXRange = chart.scales.x.max - chart.scales.x.min;
    const currentYRange = chart.scales.y.max - chart.scales.y.min;

    // If zoomed to about 75% or less of original in either direction, auto-fit
    if (currentXRange <= origXRange * 0.75 || currentYRange <= origYRange * 0.75) {
        // Update tracking limits to current view for next refit check
        chart.originalLimits = {
            xMin: chart.scales.x.min,
            xMax: chart.scales.x.max,
            yMin: chart.scales.y.min,
            yMax: chart.scales.y.max
        };

        // Force chart to recalculate axis ticks for the new zoom level
        chart.options.scales.x.min = chart.scales.x.min;
        chart.options.scales.x.max = chart.scales.x.max;
        chart.options.scales.y.min = chart.scales.y.min;
        chart.options.scales.y.max = chart.scales.y.max;
        chart.update('none');

        // Update axis info display with new ranges
        updateAxisInfo(chart);
    }
}

// Show detailed financial snapshot for a point in time
function showGraphDetail(index, chartData) {
    const modal = document.getElementById('graph-detail-modal');
    const title = document.getElementById('graph-detail-title');
    const body = document.getElementById('graph-detail-body');

    const today = new Date();
    let futureDate;
    let dataIndex;
    if (chartData.useDays) {
        futureDate = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
        // Map day index to month index for data lookup
        dataIndex = Math.floor(index / 30.44);
    } else if (chartData.useMonths) {
        futureDate = new Date(today.getTime() + index * 30.44 * 24 * 60 * 60 * 1000);
        dataIndex = index;
    } else {
        futureDate = new Date(today.getTime() + index * 365.25 * 24 * 60 * 60 * 1000);
        dataIndex = index * 12;  // Convert year index to month index
    }

    const dateStr = futureDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    title.textContent = `Financial Snapshot: ${dateStr}`;

    const dataPoint = chartData.fullData[Math.min(dataIndex, chartData.fullData.length - 1)];

    // Calculate what's happening at this point
    const grossIncome = ledgerState.yearlyIncome + ledgerState.additionalIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalDonations = ledgerState.donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = ledgerState.businessExpenses.reduce((sum, e) => sum + e.amount, 0);
    const taxes = calculateTaxes(grossIncome, ledgerState.country, ledgerState.region, totalDonations, totalExpenses);
    const monthlyTax = taxes / 12;
    const monthlyIncome = grossIncome / 12;

    let html = `
        <div style="background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="color: var(--gold); margin: 0 0 0.5rem;">Wealth Summary</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <span style="color: #888;">Net Worth:</span>
                <span style="color: #a855f7; font-weight: bold;">${formatCurrency(dataPoint?.netWorth || 0)}</span>
                <span style="color: #888;">Liquid Cash:</span>
                <span style="color: #22c55e;">${formatCurrency(dataPoint?.liquidCash || 0)}</span>
                <span style="color: #888;">Total Assets:</span>
                <span style="color: #3b82f6;">${formatCurrency(dataPoint?.assetValue || 0)}</span>
            </div>
        </div>

        <div style="background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="color: var(--gold); margin: 0 0 0.5rem;">Monthly Cash Flow</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <span style="color: #888;">Gross Income:</span>
                <span style="color: #22c55e;">+${formatCurrency(monthlyIncome)}</span>
                <span style="color: #888;">Taxes:</span>
                <span style="color: #ef4444;">-${formatCurrency(monthlyTax)}</span>
    `;

    // Add rent if applicable
    if (ledgerState.monthlyRent > 0) {
        html += `
                <span style="color: #888;">Rent:</span>
                <span style="color: #ef4444;">-${formatCurrency(ledgerState.monthlyRent)}</span>
        `;
    }

    // Calculate living expenses
    let monthlyLivingExpenses = 0;
    ledgerState.livingExpenses.forEach(le => {
        if (le.hidden) return;
        switch (le.frequency) {
            case 'daily': monthlyLivingExpenses += le.amount * 30.44; break;
            case 'weekly': monthlyLivingExpenses += le.amount * 4.33; break;
            case 'monthly': monthlyLivingExpenses += le.amount; break;
            case 'quarterly': monthlyLivingExpenses += le.amount / 3; break;
            case 'yearly': monthlyLivingExpenses += le.amount / 12; break;
            case 'custom': monthlyLivingExpenses += le.amount * (30.44 / (le.customDays || 30)); break;
        }
    });

    if (monthlyLivingExpenses > 0) {
        html += `
                <span style="color: #888;">Living Expenses:</span>
                <span style="color: #ef4444;">-${formatCurrency(monthlyLivingExpenses)}</span>
        `;
    }

    html += `
            </div>
        </div>
    `;

    // Build detailed purchases section
    let purchaseHtml = '';
    let monthlyPurchasesTotal = 0;
    const purchaseItems = [];

    // Recurring target purchases
    ledgerState.targetPurchases.forEach(p => {
        if (p.hidden) return;
        if (p.recurring) {
            const freq = p.frequency || 'monthly';
            let monthly = 0;
            switch (freq) {
                case 'daily': monthly = p.cost * 30.44; break;
                case 'weekly': monthly = p.cost * 4.33; break;
                case 'monthly': monthly = p.cost; break;
                case 'quarterly': monthly = p.cost / 3; break;
                case 'yearly': monthly = p.cost / 12; break;
                case 'custom': monthly = p.cost * (30.44 / (p.customDays || 30)); break;
            }
            monthlyPurchasesTotal += monthly;
            purchaseItems.push({
                name: p.name || 'Purchase',
                amount: monthly,
                type: 'recurring',
                freq: freq
            });
        }
    });

    // One-time target purchases (shown at start)
    if (index === 0 || (chartData.useDays && index === 0)) {
        ledgerState.targetPurchases.forEach(p => {
            if (p.hidden || p.recurring) return;
            purchaseItems.push({
                name: p.name || 'One-time Purchase',
                amount: p.cost,
                type: 'one-time',
                freq: 'one-time'
            });
        });
    }

    // Future purchases that occur on or near this date
    const daysSinceStart = chartData.useDays ? index : (chartData.useMonths ? index * 30.44 : index * 365);
    ledgerState.futurePurchases.forEach(fp => {
        if (fp.hidden) return;
        if (fp.date) {
            const purchaseDate = new Date(fp.date);
            const fpDaysSinceStart = Math.round((purchaseDate - today) / (24 * 60 * 60 * 1000));

            // Check if this future purchase occurs on this date (within a day tolerance for daily view, month for monthly)
            const tolerance = chartData.useDays ? 1 : (chartData.useMonths ? 30 : 365);
            if (Math.abs(fpDaysSinceStart - daysSinceStart) <= tolerance && fpDaysSinceStart >= 0) {
                purchaseItems.push({
                    name: fp.name || 'Future Purchase',
                    amount: fp.cost,
                    type: 'future',
                    freq: fp.recurring ? (fp.frequency || 'monthly') : 'one-time',
                    date: purchaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                });
            }
        }

        // Add recurring future purchases to monthly total if we're past the start date
        if (fp.recurring && fp.date) {
            const purchaseDate = new Date(fp.date);
            const fpDaysSinceStart = (purchaseDate - today) / (24 * 60 * 60 * 1000);
            if (daysSinceStart >= fpDaysSinceStart) {
                const freq = fp.frequency || 'monthly';
                let monthly = 0;
                switch (freq) {
                    case 'daily': monthly = fp.cost * 30.44; break;
                    case 'weekly': monthly = fp.cost * 4.33; break;
                    case 'monthly': monthly = fp.cost; break;
                    case 'quarterly': monthly = fp.cost / 3; break;
                    case 'yearly': monthly = fp.cost / 12; break;
                    case 'custom': monthly = fp.cost * (30.44 / (fp.customDays || 30)); break;
                }
                monthlyPurchasesTotal += monthly;
            }
        }
    });

    // Build purchases section HTML
    if (purchaseItems.length > 0 || monthlyPurchasesTotal > 0) {
        html += `
        <div style="background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="color: var(--gold); margin: 0 0 0.5rem;">Purchases & Expenses</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
        `;

        // Show individual recurring purchases
        purchaseItems.filter(p => p.type === 'recurring').forEach(p => {
            html += `
                <span style="color: #888; font-size: 0.9rem;">${p.name} [${p.freq}]:</span>
                <span style="color: #f97316; font-size: 0.9rem;">-${formatCurrency(p.amount)}/mo</span>
            `;
        });

        // Show one-time purchases
        purchaseItems.filter(p => p.type === 'one-time').forEach(p => {
            html += `
                <span style="color: #888; font-size: 0.9rem;">${p.name} [one-time]:</span>
                <span style="color: #ef4444; font-size: 0.9rem;">-${formatCurrency(p.amount)}</span>
            `;
        });

        // Show future purchases occurring on this date
        purchaseItems.filter(p => p.type === 'future').forEach(p => {
            html += `
                <span style="color: #888; font-size: 0.9rem;">${p.name} [${p.date}]:</span>
                <span style="color: #ef4444; font-size: 0.9rem;">-${formatCurrency(p.amount)}</span>
            `;
        });

        // Total monthly recurring
        if (monthlyPurchasesTotal > 0) {
            html += `
                <span style="color: #888; font-weight: bold; border-top: 1px solid #333; padding-top: 0.5rem; margin-top: 0.25rem;">Total Recurring:</span>
                <span style="color: #ef4444; font-weight: bold; border-top: 1px solid #333; padding-top: 0.5rem; margin-top: 0.25rem;">-${formatCurrency(monthlyPurchasesTotal)}/mo</span>
            `;
        }

        html += `
            </div>
        </div>
        `;
    }

    html += `
        <div style="background: #1a1a2e; padding: 1rem; border-radius: 8px;">
            <h4 style="color: var(--gold); margin: 0 0 0.5rem;">Asset Breakdown</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <span style="color: #888;">Stocks:</span>
                <span style="color: #3b82f6;">${formatCurrency(dataPoint?.stockValue || 0)}</span>
                <span style="color: #888;">Property Equity:</span>
                <span style="color: #3b82f6;">${formatCurrency((dataPoint?.propertyValue || 0) - (dataPoint?.mortgageRemaining || 0))}</span>
                <span style="color: #888;">Vehicle Value:</span>
                <span style="color: #3b82f6;">${formatCurrency(dataPoint?.vehicleValue || 0)}</span>
            </div>
        </div>
    `;

    body.innerHTML = html;
    modal.style.display = 'flex';
}

function resetZoom() {
    if (chartInstance) {
        // Clear any scale limits set during refit
        delete chartInstance.options.scales.x.min;
        delete chartInstance.options.scales.x.max;
        delete chartInstance.options.scales.y.min;
        delete chartInstance.options.scales.y.max;

        // Reset zoom to original full view
        chartInstance.resetZoom();

        // Reset tracking limits to initial values
        setTimeout(() => {
            // Restore to initial limits (the true original view)
            if (chartInstance.initialLimits) {
                chartInstance.originalLimits = { ...chartInstance.initialLimits };
            } else {
                chartInstance.originalLimits = {
                    xMin: chartInstance.scales.x.min,
                    xMax: chartInstance.scales.x.max,
                    yMin: chartInstance.scales.y.min,
                    yMax: chartInstance.scales.y.max
                };
            }
            updateAxisInfo(chartInstance);
        }, 100);
    }
}

function nextGraph() {
    const timePrefs = getSelectedTimePreferences();
    currentGraphIndex = (currentGraphIndex + 1) % Math.max(1, timePrefs.length);
    renderGraph(currentGraphIndex);
}

function prevGraph() {
    const timePrefs = getSelectedTimePreferences();
    const len = Math.max(1, timePrefs.length);
    currentGraphIndex = (currentGraphIndex - 1 + len) % len;
    renderGraph(currentGraphIndex);
}

function goToGraphDate() {
    if (!chartInstance || !chartInstance.chartData) return;

    const datePicker = document.getElementById('graph-date-picker');
    const selectedDate = datePicker.value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }

    const targetDate = new Date(selectedDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate days from today
    const diffMs = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));

    if (diffDays < 0) {
        alert('Please select a future date');
        return;
    }

    const chartData = chartInstance.chartData;
    let targetIndex;

    // Convert days to chart index based on granularity
    if (chartData.useDays) {
        targetIndex = diffDays;
    } else if (chartData.useMonths) {
        targetIndex = Math.round(diffDays / 30.44);
    } else {
        targetIndex = Math.round(diffDays / 365.25);
    }

    // Clamp to valid range
    const maxIndex = chartInstance.data.labels.length - 1;
    if (targetIndex > maxIndex) {
        alert(`Date is beyond this graph's range. Max date is approximately ${chartData.years} years from now.`);
        return;
    }

    targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));

    // Show the detail popup for this date
    showGraphDetail(targetIndex, chartData);
}

// ============ REGION DROPDOWN ============
function updateRegions() {
    const country = document.getElementById('country-select').value;
    const regionSelect = document.getElementById('region-select');
    const regions = regionsByCountry[country] || [];

    regionSelect.innerHTML = '<option value="">Select Region</option>';
    regions.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.textContent = r;
        regionSelect.appendChild(opt);
    });
}

// ============ MORTGAGE VISIBILITY ============
function updateMortgageVisibility() {
    const cashPurchase = document.getElementById('cash-purchase-toggle').checked;
    document.getElementById('mortgage-section').style.display = cashPurchase ? 'none' : 'block';
}

// ============ DRAG & DROP ============
function initDragDrop() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('json-upload');

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = '#dbeafe';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = '';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.background = '';
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (event) => loadFromJSON(event.target.result);
            reader.readAsText(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => loadFromJSON(event.target.result);
            reader.readAsText(file);
        }
    });
}

// ============ INIT ============
function init() {
    // Init ad system
    initAdSystem();

    // Init drag & drop
    initDragDrop();

    // Init collapsible sections
    initCollapsibleSections();

    // Init status popup
    initStatusPopup();

    // Sync sliders
    syncSliderAndInput('income-slider', 'income-input', () => updateCalculations());
    syncSliderAndInput('vehicle-slider', 'vehicle-input', () => updateCalculations());
    syncSliderAndInput('property-down-slider', 'property-down-input', () => updateCalculations());
    syncSliderAndInput('mortgage-slider', 'mortgage-input', () => updateCalculations());
    syncSliderAndInput('rent-slider', 'rent-input', () => updateCalculations());

    // Country/Region
    document.getElementById('country-select').addEventListener('change', () => {
        updateRegions();
        updateCalculations();
    });
    document.getElementById('region-select').addEventListener('change', () => {
        updateCalculations();
    });
    updateRegions();

    // Cash purchase toggle
    document.getElementById('cash-purchase-toggle').addEventListener('change', () => {
        updateMortgageVisibility();
        updateCalculations();
    });

    // Inflation toggle
    document.getElementById('inflation-toggle').addEventListener('change', updateCalculations);

    // Detailed mode toggle
    document.getElementById('detailed-mode-toggle').addEventListener('change', (e) => {
        const detailedSections = document.querySelectorAll('.detailed-section');
        detailedSections.forEach(section => {
            section.style.display = e.target.checked ? 'block' : 'none';
        });
        ledgerState.detailedMode = e.target.checked;
        updateCalculations();
    });

    // Time preference buttons
    document.querySelectorAll('#time-preference-container .time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            // Ensure at least one is selected
            const selected = document.querySelectorAll('#time-preference-container .time-btn.selected');
            if (selected.length === 0) {
                btn.classList.add('selected');
            }
            updateCalculations();
        });
    });

    // Starting amount and other inputs
    document.getElementById('starting-amount').addEventListener('input', updateCalculations);
    document.getElementById('vehicle-name').addEventListener('input', updateCalculations);
    document.getElementById('vehicle-date').addEventListener('change', updateCalculations);
    document.getElementById('property-date').addEventListener('change', updateCalculations);
    document.getElementById('rent-date').addEventListener('change', updateCalculations);

    // Dynamic item buttons
    document.getElementById('add-income-btn').addEventListener('click', () => {
        createDynamicItem('income', document.getElementById('additional-income-container'));
    });
    document.getElementById('add-donation-btn').addEventListener('click', () => {
        createDynamicItem('donation', document.getElementById('donations-container'));
    });
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        createDynamicItem('expense', document.getElementById('business-expense-container'));
    });
    document.getElementById('add-living-btn').addEventListener('click', () => {
        createDynamicItem('living', document.getElementById('living-expense-container'));
    });
    document.getElementById('add-stock-btn').addEventListener('click', () => {
        createDynamicItem('stock', document.getElementById('stocks-container'));
    });
    document.getElementById('add-prev-stock-btn').addEventListener('click', () => {
        createDynamicItem('prevStock', document.getElementById('prev-stocks-container'));
    });
    document.getElementById('add-purchase-btn').addEventListener('click', () => {
        createDynamicItem('purchase', document.getElementById('target-purchase-container'));
    });
    document.getElementById('add-future-btn').addEventListener('click', () => {
        createDynamicItem('future', document.getElementById('future-purchase-container'));
    });

    // Receipt and Lifestyle modals
    document.getElementById('view-receipt-btn').addEventListener('click', () => showReceiptModal('target'));
    document.getElementById('view-future-receipt-btn').addEventListener('click', () => showReceiptModal('future'));
    document.getElementById('view-lifestyle-btn').addEventListener('click', showLifestyleModal);
    document.getElementById('download-lifestyle-zip-btn').addEventListener('click', downloadLifestyleZip);

    // Graph modal
    document.getElementById('open-visual-graphs-btn').addEventListener('click', showGraphModal);
    document.getElementById('open-purchase-graph-btn').addEventListener('click', showGraphModal);
    document.getElementById('open-future-graph-btn').addEventListener('click', showGraphModal);
    document.getElementById('next-graph-btn').addEventListener('click', nextGraph);
    document.getElementById('prev-graph-btn').addEventListener('click', prevGraph);
    document.getElementById('graph-goto-date-btn').addEventListener('click', goToGraphDate);
    document.getElementById('graph-date-picker').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') goToGraphDate();
    });

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            if (modalId) {
                closeModal(modalId);
            } else {
                closeGraphModal();
            }
        });
    });

    // Close modal on outside click
    ['graph-modal', 'receipt-modal', 'lifestyle-modal'].forEach(modalId => {
        document.getElementById(modalId).addEventListener('click', (e) => {
            if (e.target.id === modalId) closeModal(modalId);
        });
    });

    // Initial calculation
    updateCalculations();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
