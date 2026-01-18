# Multi-Country Personal Income Tax Brackets + Key Deductions (Approx/Reference Build)

> **Important:** This file is designed for **app functionality first**.  
> When authoritative, jurisdiction-by-jurisdiction bracket tables were accessible in a single, citable source, they are reproduced below.  
> Where local/regional income-tax brackets **do not exist** (or are not administered at that level), the regional section is explicitly set to **0.00% additional income tax** (i.e., “national only”).  
> Where only partial/summary tables were accessible, the values are included as an **approximation dataset** (still fully bracketed with numbers) and should be covered by your disclaimer.

---

## Countries Included
- United States (Federal + all States + DC)
- Canada (Federal + all Provinces/Territories)
- England (UK)
- Scotland (UK)
- Wales (UK)
- Northern Ireland (UK)
- Germany
- France
- Netherlands
- Switzerland
- Denmark
- Sweden
- Norway
- Finland

---

# United States Tax Data (2025 Tax Year)

## 1. Federal Income Tax (2025)

**Filing Status:** Single
**Standard Deduction:** `$15,750`

| Bracket Floor | Bracket Ceiling | Rate | Cumulative Tax at Floor |
| :--- | :--- | :--- | :--- |
| $0 | $11,925 | **10%** | $0 |
| $11,926 | $48,475 | **12%** | $1,192.50 |
| $48,476 | $103,350 | **22%** | $5,578.50 |
| $103,351 | $197,300 | **24%** | $17,651.00 |
| $197,301 | $250,525 | **32%** | $40,199.00 |
| $250,526 | $626,350 | **35%** | $57,231.00 |
| $626,351 | Unlimited | **37%** | $188,769.75 |

**National Property Tax:** **$0** (No federal property tax in the US).

---

## 2. State Tax Data (A-Z)

### Alabama
* **Income Tax (Single):**
    * `$0 - $500`: **2.00%**
    * `$501 - $3,000`: **4.00%**
    * `$3,001+`: **5.00%**
* **Standard Deduction:** `$3,000`
* **Property Tax:** `0.39%` (Effective Rate)
* **Vehicle Reg:** `$23 Base + Ad Valorem (Market Value * 0.007)`

### Alaska
* **Income Tax:** **0%**
* **Property Tax:** `1.02%`
* **Vehicle Reg:** `$100` (Passenger Car, flat).

### Arizona
* **Income Tax:** **Flat 2.50%**
* **Standard Deduction:** `$15,750` (Matches Federal)
* **Property Tax:** `0.72%`
* **Vehicle Reg:** `$8.00 + (MSRP * 0.60 * (1 - (0.1625 * Age)) * 0.028)`
    * *Note: Vehicle License Tax (VLT) is based on 60% of MSRP, depreciating 16.25% annually.*

### Arkansas
* **Income Tax (Single):**
    * `$0 - $5,100`: **2.00%**
    * `$5,101+`: **3.90%**
* **Standard Deduction:** `$2,340`
* **Property Tax:** `0.61%`
* **Vehicle Reg:**
    * `Weight < 3000 lbs`: `$17`
    * `Weight 3001-4500 lbs`: `$25`
    * `Weight > 4500 lbs`: `$30`

### California
* **Income Tax (Single):**
    * `$0 - $10,756`: **1.00%**
    * `$10,757 - $25,499`: **2.00%**
    * `$25,500 - $40,245`: **4.00%**
    * `$40,246 - $55,866`: **6.00%**
    * `$55,867 - $70,606`: **8.00%**
    * `$70,607 - $360,659`: **9.30%**
    * `$360,660 - $432,787`: **10.30%**
    * `$432,788 - $721,314`: **11.30%**
    * `$721,315 - $1,000,000`: **12.30%**
    * `$1,000,001+`: **13.30%** (Includes 1% Mental Health Surcharge)
* **Standard Deduction:** `$5,706`
* **Property Tax:** `0.76%`
* **Vehicle Reg:** `$72 Base + (Market_Value * 0.0065) + $25`

### Colorado
* **Income Tax:** **Flat 4.25%** (Usually reduced to 4.25% or 4.4% by TABOR triggers; use 4.4% as conservative baseline).
* **Property Tax:** `0.49%`
* **Vehicle Reg:** Based on Weight and Age. Avg New Car: `~$500`.
    * *Formula:* `(MSRP * 0.85 * Tax_Rate)`. Tax Rate starts at 2.1% (Year 1) and drops to 0.45% (Year 9).

### Connecticut
* **Income Tax (Single):**
    * `$0 - $10,000`: **2.00%**
    * `$10,001 - $50,000`: **4.50%**
    * `$50,001 - $100,000`: **5.50%**
    * `$100,001 - $200,000`: **6.00%**
    * `$200,001 - $250,000`: **6.50%**
    * `$250,001 - $500,000`: **6.90%**
    * `$500,001+`: **6.99%**
* **Recapture:** Benefit of 2% bracket is recaptured for income > $200k.
* **Property Tax:** `1.79%`
* **Vehicle Reg:** `$120` (2 years) + Local Car Tax (`Assessment * Mill Rate`). Avg total ~$400/yr.

### Delaware
* **Income Tax (Single):**
    * `$0 - $2,000`: **0.00%**
    * `$2,001 - $5,000`: **2.20%**
    * `$5,001 - $10,000`: **3.90%**
    * `$10,001 - $20,000`: **4.80%**
    * `$20,001 - $25,000`: **5.20%**
    * `$25,001 - $60,000`: **5.55%**
    * `$60,001+`: **6.60%**
* **Standard Deduction:** `$3,250`
* **Property Tax:** `0.57%`
* **Vehicle Reg:** `$40`

### District of Columbia (DC)
* **Income Tax (Single):**
    * `$0 - $10,000`: **4.00%**
    * `$10,001 - $40,000`: **6.00%**
    * `$40,001 - $60,000`: **6.50%**
    * `$60,001 - $250,000`: **8.50%**
    * `$250,001 - $500,000`: **9.25%**
    * `$500,001 - $1,000,000`: **9.75%**
    * `$1,000,001+`: **10.75%**
* **Property Tax:** `0.57%`
* **Vehicle Reg:**
    * `Weight < 3500 lbs`: `$72`
    * `Weight 3500-5000 lbs`: `$115`
    * `Weight > 5000 lbs`: `$155`

### Florida
* **Income Tax:** **0%**
* **Property Tax:** `0.83%`
* **Vehicle Reg:**
    * `Initial Fee`: **$225** (One-time)
    * `Annual`: **$28 - $46** (Weight based).

### Georgia
* **Income Tax:** **Flat 5.39%**
    * *Note: Rate reduced from 5.49% to 5.39% for 2025.*
* **Standard Deduction:** `$12,000`
* **Property Tax:** `0.94%`
* **Vehicle Reg:** `$20` (Annual).
    * *TAVT:* 6.6% Tax on value paid *once* at purchase.

### Hawaii
* **Income Tax (Single):**
    * `$0 - $2,400`: **1.40%**
    * `$2,401 - $4,800`: **3.20%**
    * `$4,801 - $9,600`: **5.50%**
    * `$9,601 - $14,400`: **6.40%**
    * `$14,401 - $19,200`: **6.80%**
    * `$19,201 - $24,000`: **7.20%**
    * `$24,001 - $36,000`: **7.60%**
    * `$36,001 - $48,000`: **7.90%**
    * `$48,001 - $150,000`: **8.25%**
    * `$150,001 - $175,000`: **9.00%**
    * `$175,001 - $200,000`: **10.00%**
    * `$200,001+`: **11.00%**
* **Standard Deduction:** `$2,200`
* **Property Tax:** `0.27%` (Lowest in US)
* **Vehicle Reg:** `Weight * 0.05` (Avg ~$300/yr).

### Idaho
* **Income Tax:** **Flat 5.695%**
* **Standard Deduction:** `$15,750`
* **Property Tax:** `0.69%`
* **Vehicle Reg:**
    * `Age 1-2`: `$69`
    * `Age 3-6`: `$57`
    * `Age 7+`: `$45`

### Illinois
* **Income Tax:** **Flat 4.95%**
* **Standard Deduction:** `$2,775`
* **Property Tax:** `2.08%`
* **Vehicle Reg:** `$151`

### Indiana
* **Income Tax:** **Flat 3.00%** (plus County Tax ~1.5%)
* **Standard Deduction:** `$1,000`
* **Property Tax:** `0.76%`
* **Vehicle Reg:** `$21.35 + Excise Tax`. Excise tax is value-based (tier system), ranging from $12 to $532.

### Iowa
* **Income Tax:** **Flat 3.80%**
    * *Note: Iowa completed its transition to a flat tax in 2025.*
* **Standard Deduction:** `$15,750`
* **Property Tax:** `1.57%`
* **Vehicle Reg:** `(Value * 0.01) + (Weight * 0.004)`

### Kansas
* **Income Tax (Single):**
    * `$0 - $15,000`: **3.10%**
    * `$15,001 - $30,000`: **5.25%**
    * `$30,001+`: **5.58%**
* **Standard Deduction:** `$3,500`
* **Property Tax:** `1.14%`
* **Vehicle Reg:** `$35`

### Kentucky
* **Income Tax:** **Flat 4.00%**
* **Standard Deduction:** `$3,160`
* **Property Tax:** `0.78%`
* **Vehicle Reg:** `$21`

### Louisiana
* **Income Tax (Single):**
    * `$0 - $12,500`: **1.85%**
    * `$12,501 - $50,000`: **3.50%**
    * `$50,001+`: **4.25%**
* **Property Tax:** `0.55%`
* **Vehicle Reg:** `Value * 0.001` (min $20).

### Maine
* **Income Tax (Single):**
    * `$0 - $26,050`: **5.80%**
    * `$26,051 - $61,600`: **6.75%**
    * `$61,601+`: **7.15%**
* **Property Tax:** `0.96%`
* **Vehicle Reg:** `$35 + Excise Tax`. Excise tax is ~2.4% of MSRP in year 1.

### Maryland
* **Income Tax (Single):**
    * `$0 - $1,000`: **2.00%**
    * `$1,001 - $2,000`: **3.00%**
    * `$2,001 - $3,000`: **4.00%**
    * `$3,001 - $100,000`: **4.75%**
    * `$100,001 - $125,000`: **5.00%**
    * `$125,001 - $150,000`: **5.25%**
    * `$150,001 - $250,000`: **5.50%**
    * `$250,001+`: **5.75%**
    * *Plus Local Tax:* Add ~3.20% for app estimation.
* **Property Tax:** `0.95%`
* **Vehicle Reg:** `$135` (Every 2 years).

### Massachusetts
* **Income Tax:** **Flat 5.00%**
    * *Millionaire Tax:* **+4.00%** surtax on income > $1,000,000.
* **Standard Deduction:** `$4,400`
* **Property Tax:** `1.63%`
* **Vehicle Reg:** `$60` (Every 2 years).

### Michigan
* **Income Tax:** **Flat 4.25%**
* **Standard Deduction:** `$5,900`
* **Property Tax:** `1.31%`
* **Vehicle Reg:** Ad Valorem (Based on MSRP). Approx **0.6%** of value.

### Minnesota
* **Income Tax (Single):**
    * `$0 - $31,690`: **5.35%**
    * `$31,691 - $104,090`: **6.80%**
    * `$104,091 - $193,240`: **7.85%**
    * `$193,241+`: **9.85%**
* **Property Tax:** `1.08%`
* **Vehicle Reg:** `$10 + (Base_Value * 1.25%)`

### Mississippi
* **Income Tax:** **Flat 4.40%**
    * *Note: First $10,000 exempt.*
* **Property Tax:** `0.65%`
* **Vehicle Reg:** `$15 + Ad Valorem Tax` (~4-5% of assessed value).

### Missouri
* **Income Tax (Single):**
    * *Logic:* Graduated rates up to $9,000, then flat.
    * `$0 - $1,200`: **0%**
    * `$1,201 - $9,000`: Graduated **2.00% - 4.5%**
    * `$9,001+`: **4.70%** (Top Rate reduced in 2025).
* **Property Tax:** `0.73%`
* **Vehicle Reg:** Based on Horsepower ($18 - $51).

### Montana
* **Income Tax (Single):**
    * `$0 - $20,500`: **4.70%**
    * `$20,501+`: **5.90%**
    * *Note: Top rate 5.9% in 2025, drops to 5.65% in 2026.*
* **Property Tax:** `0.74%`
* **Vehicle Reg:**
    * `Age < 5`: **$217**
    * `Age 5-10`: **$87**
    * `Age 11+`: **$28**

### Nebraska
* **Income Tax (Single):**
    * `$0 - $3,700`: **2.46%**
    * `$3,701 - $22,170`: **3.51%**
    * `$22,171 - $35,730`: **5.01%**
    * `$35,731+`: **5.20%**
* **Property Tax:** `1.36%`
* **Vehicle Reg:** `$15 + Value Tax`. Value tax depends on MSRP and Age (starts ~1.5%).

### Nevada
* **Income Tax:** **0%**
* **Property Tax:** `0.50%`
* **Vehicle Reg:** `$33 + GST`. GST (Govt Services Tax) = `MSRP * 0.35 * 0.04`.

### New Hampshire
* **Income Tax:** **0%** on Wages.
    * *Investment Tax:* 3% on Interest/Dividends (phasing out).
* **Property Tax:** `1.93%`
* **Vehicle Reg:** Weight based (~$50) + Local Mill Rate on Value (High, ~$300-$500).

### New Jersey
* **Income Tax (Single):**
    * `$0 - $20,000`: **1.40%**
    * `$20,001 - $35,000`: **1.75%**
    * `$35,001 - $40,000`: **3.50%**
    * `$40,001 - $75,000`: **5.525%**
    * `$75,001 - $500,000`: **6.37%**
    * `$500,001 - $1,000,000`: **8.97%**
    * `$1,000,001+`: **10.75%**
* **Standard Deduction:** `$0` (Only $1,000 personal exemption).
* **Property Tax:** `2.23%` (Highest in US)
* **Vehicle Reg:** `$46 - $84` (Weight based).

### New Mexico
* **Income Tax (Single):**
    * `$0 - $5,500`: **1.70%**
    * `$5,501 - $11,000`: **3.20%**
    * `$11,001 - $16,000`: **4.70%**
    * `$16,001 - $210,000`: **4.90%**
    * `$210,001+`: **5.90%**
* **Property Tax:** `0.65%`
* **Vehicle Reg:** `$27 - $62` (Weight/Age based).

### New York
* **Income Tax (Single):**
    * `$0 - $8,500`: **4.00%**
    * `$8,501 - $11,700`: **4.50%**
    * `$11,701 - $13,900`: **5.25%**
    * `$13,901 - $80,650`: **5.50%**
    * `$80,651 - $215,400`: **6.00%**
    * `$215,401 - $1,077,550`: **6.85%**
    * `$1,077,551 - $5,000,000`: **9.65%**
    * `$5,000,001 - $25,000,000`: **10.30%**
    * `$25,000,001+`: **10.90%**
* **NYC Residents:** Add local tax ~3.8%.
* **Standard Deduction:** `$8,000`
* **Property Tax:** `1.64%` (Statewide avg)
* **Vehicle Reg:** `Weight / 100 * 1.50` (~$50-$70/year).

### North Carolina
* **Income Tax:** **Flat 4.25%**
    * *Note: Scheduled to drop to 3.99% in 2026.*
* **Standard Deduction:** `$12,750`
* **Property Tax:** `0.84%`
* **Vehicle Reg:** `$38.75`. Plus 3% Highway Use Tax paid once at purchase.

### North Dakota
* **Income Tax (Single):**
    * `$0 - $44,725`: **0%**
    * `$44,726 - $225,975`: **1.95%**
    * `$225,976+`: **2.50%**
* **Property Tax:** `1.05%`
* **Vehicle Reg:** `$73 - $274` (Based on Weight and Age).

### Ohio
* **Income Tax (Single):**
    * `$0 - $26,050`: **0%**
    * `$26,051 - $100,000`: **2.75%**
    * `$100,001+`: **3.125%**
    * *Note: Scheduled to become a flat 2.75% in 2026.*
* **Property Tax:** `1.56%`
* **Vehicle Reg:** `$31 + Local Taxes` (Max local tax is $30).

### Oklahoma
* **Income Tax (Single):**
    * `$0 - $1,000`: **0.25%**
    * `$1,001 - $2,500`: **0.75%**
    * `$2,501 - $3,750`: **1.75%**
    * `$3,751 - $4,900`: **2.75%**
    * `$4,901 - $7,200`: **3.75%**
    * `$7,201+`: **4.75%**
* **Property Tax:** `0.97%`
* **Vehicle Reg:**
    * `Years 1-4`: **$96**
    * `Years 5-8`: **$86**
    * `Years 9+`: **$66**

### Oregon
* **Income Tax (Single):**
    * `$0 - $4,300`: **4.75%**
    * `$4,301 - $10,750`: **6.75%**
    * `$10,751 - $125,000`: **8.75%**
    * `$125,001+`: **9.90%**
* **Standard Deduction:** `$2,745`
* **Property Tax:** `0.90%`
* **Vehicle Reg:** Based on MPG.
    * `0-19 MPG`: **$126** (2 yrs)
    * `20-39 MPG`: **$136** (2 yrs)
    * `40+ MPG`: **$156** (2 yrs)
    * `EV`: **$316** (2 yrs)

### Pennsylvania
* **Income Tax:** **Flat 3.07%**
* **Property Tax:** `1.09%`
* **Vehicle Reg:** `$39`.

### Rhode Island
* **Income Tax (Single):**
    * `$0 - $77,450`: **3.75%**
    * `$77,451 - $176,050`: **4.75%**
    * `$176,051+`: **5.99%**
* **Property Tax:** `1.63%`
* **Vehicle Reg:** `$30 + Weight Surcharge`.

### South Carolina
* **Income Tax (Single):**
    * `$0 - $3,460`: **0%**
    * `$3,461 - $17,330`: **3.00%**
    * `$17,331+`: **6.40%**
* **Property Tax:** `0.56%`
* **Vehicle Reg:** `$40 + Personal Property Tax`. (Tax is ~6% of assessed value).

### South Dakota
* **Income Tax:** **0%**
* **Property Tax:** `1.22%`
* **Vehicle Reg:**
    * `Weight < 2000`: **$36**
    * `Weight 2000-4000`: **$72**
    * `Weight > 4000`: **$108**
    * *(Fees drop by 30% for cars > 5 years old).*

### Tennessee
* **Income Tax:** **0%**
* **Property Tax:** `0.66%`
* **Vehicle Reg:** `$26.50` flat fee.

### Texas
* **Income Tax:** **0%**
* **Property Tax:** `1.10%`
* **Vehicle Reg:** `$51.75 + Local Fee`. Local fees range from $10 to $20.

### Utah
* **Income Tax:** **Flat 4.55%**
* **Standard Deduction:** Credit of 6% of Federal Deduction.
* **Property Tax:** `0.63%`
* **Vehicle Reg:** Age Based.
    * `Age < 3`: **$150**
    * `Age 3-6`: **$110**
    * `Age 6-9`: **$80**
    * `Age 9-12`: **$50**
    * `Age 12+`: **$10**

### Vermont
* **Income Tax (Single):**
    * `$0 - $45,400`: **3.35%**
    * `$45,401 - $110,050`: **6.60%**
    * `$110,051 - $229,550`: **7.60%**
    * `$229,551+`: **8.75%**
* **Property Tax:** `1.76%`
* **Vehicle Reg:** `$76` (1 year).

### Virginia
* **Income Tax (Single):**
    * `$0 - $3,000`: **2.00%**
    * `$3,001 - $5,000`: **3.00%**
    * `$5,001 - $17,000`: **5.00%**
    * `$17,001+`: **5.75%**
* **Property Tax:** `0.85%`
* **Vehicle Reg:** `$40.75 - $45.75`. Plus annual "Car Tax" (~4% of value depending on locality).

### Washington
* **Income Tax:** **0%** on Wages.
    * *Capital Gains:* 7% on long-term capital gains > $250,000.
* **Property Tax:** `0.93%`
* **Vehicle Reg:** `$30 + RTA Tax`. RTA tax is 1.1% of value (MSRP * Depreciation Schedule) for Puget Sound residents.

### West Virginia
* **Income Tax (Single):**
    * `$0 - $10,000`: **2.36%**
    * `$10,001 - $25,000`: **3.15%**
    * `$25,001 - $40,000`: **3.54%**
    * `$40,001 - $60,000`: **4.72%**
    * `$60,001+`: **5.12%**
* **Property Tax:** `0.58%`
* **Vehicle Reg:** `$51.50`.

### Wisconsin
* **Income Tax (Single):**
    * `$0 - $14,320`: **3.50%**
    * `$14,321 - $28,640`: **4.40%**
    * `$28,641 - $315,310`: **5.30%**
    * `$315,311+`: **7.65%**
* **Property Tax:** `1.53%`
* **Vehicle Reg:** `$85`.

### Wyoming
* **Income Tax:** **0%**
* **Property Tax:** `0.58%`
* **Vehicle Reg:** `State Fee ($30) + County Fee`.
    * *County Fee Formula:* `Factory_Price * Age_Rate * 0.03`.
    * *Age Rates:* Year 1 (60%), Year 2 (50%), Year 3 (40%), Year 4 (30%), Year 5 (20%), Year 6+ (15%).

## 6. Administrative Notes
* **Property Tax Payment Frequency:** Varies by County.
* **Standard Model:** **Semi-Annual**.
    * *Typical Due Dates:* **November 1** and **February 1** (or March 1).
    * *Escrow:* Most homeowners pay **monthly** into a mortgage escrow account; the lender pays the tax authority on the due dates.
* **Late Fees:** Significant penalties (often 10%) apply immediately after the delinquency date (e.g., April 10 and December 10 in California).    

---

# Canada Tax Data (2025 Tax Year)

## 1. Federal Income Tax (2025)

**Effective Rate Note:** The base rate is legally 15.0%, but a reduction to 14.0% effective July 1, 2025, creates a blended **effective annual rate of 14.5%** for the 2025 tax return.

**Basic Personal Amount (BPA):** ~$16,129 (Reduces for net income >$177,882).

| Bracket Floor | Bracket Ceiling | Effective Rate | Cumulative Tax at Floor |
| :--- | :--- | :--- | :--- |
| $0 | $57,375 | **14.50%** | $0 |
| $57,376 | $114,750 | **20.50%** | $8,319.38 |
| $114,751 | $177,882 | **26.00%** | $20,081.25 |
| $177,883 | $253,414 | **29.00%** | $36,495.57 |
| $253,415 | Unlimited | **33.00%** | $58,399.85 |

**Payroll Deductions (Employee Share):**
* **CPP (Pension):** 5.95% on earnings between $3,500 and $69,700. (Max ~$3,939).
* **CPP2 (Enhancement):** 4.00% on earnings between $69,700 and $73,200. (Max ~$188).
* **EI (Insurance):** 1.64% on earnings up to $65,700. (Max ~$1,077).
    * *Quebec EI:* 1.31% (Max ~$860).

---

## 2. Provincial Tax Data (A-Z)

### Alberta
* **Income Tax:**
    * `$0 - $60,000`: **8.00%** *(New 2025 Bracket)*
    * `$60,001 - $151,234`: **10.00%**
    * `$151,235 - $181,481`: **12.00%**
    * `$181,482 - $241,974`: **13.00%**
    * `$241,975 - $362,961`: **14.00%**
    * `$362,962+`: **15.00%**
* **Property Tax:** `0.64%` (Provincial Avg).
    * *Edmonton:* ~0.94%.
* **Vehicle Reg:** **$93.00** (Passenger Class 3).

### British Columbia
* **Income Tax:**
    * `$0 - $49,279`: **5.06%**
    * `$49,280 - $98,560`: **7.70%**
    * `$98,561 - $113,158`: **10.50%**
    * `$113,159 - $137,407`: **12.29%**
    * `$137,408 - $186,306`: **14.70%**
    * `$186,307 - $259,829`: **16.80%**
    * `$259,830+`: **20.50%**
* **Property Tax:** `0.29%` (Provincial Avg - Lowest in Canada).
    * *Vancouver:* ~0.29% + Utility Fees.
* **Vehicle Reg:** **$0** (ICBC insurance required, but "plate fee" is effectively bundled or negligible).
    * *Luxury Tax:* 12%-20% PST on vehicles >$55,000 paid at purchase.

### Manitoba
* **Income Tax:**
    * `$0 - $47,564`: **10.80%**
    * `$47,565 - $101,200`: **12.75%**
    * `$101,201+`: **17.40%**
* **Property Tax:** `2.72%` (Provincial Avg - Highest in Canada).
* **Vehicle Reg:** **$139.00** (Passenger Vehicle).

### New Brunswick
* **Income Tax:**
    * `$0 - $51,306`: **9.40%**
    * `$51,307 - $102,614`: **14.00%**
    * `$102,615 - $190,060`: **16.00%**
    * `$190,061+`: **19.50%**
* **Property Tax:** `1.58%` (Saint John Representative).
* **Vehicle Reg:** **$115.00** (Avg Passenger; varies by weight).

### Newfoundland and Labrador
* **Income Tax:**
    * `$0 - $44,192`: **8.70%**
    * `$44,193 - $88,382`: **14.50%**
    * `$88,383 - $157,792`: **15.80%**
    * `$157,793 - $220,910`: **17.80%**
    * `$220,911 - $282,214`: **19.80%**
    * `$282,215 - $564,429`: **20.80%**
    * `$564,430 - $1,128,858`: **21.30%**
    * `$1,128,859+`: **21.80%**
* **Property Tax:** `0.70% - 1.20%` (Varies by municipality).
* **Vehicle Reg:** **$180.00** (Online) / **$195.00** (In-person).

### Northwest Territories
* **Income Tax:**
    * `$0 - $51,964`: **5.90%**
    * `$51,965 - $103,930`: **8.60%**
    * `$103,931 - $168,967`: **12.20%**
    * `$168,968+`: **14.05%**
* **Property Tax:** Varies significantly by hamlet (Yellowknife ~1.2%).
* **Vehicle Reg:** **$92.00**.

### Nova Scotia
* **Income Tax:**
    * `$0 - $30,507`: **8.79%**
    * `$30,508 - $61,015`: **14.95%**
    * `$61,016 - $95,883`: **16.67%**
    * `$95,884 - $154,650`: **17.50%**
    * `$154,651+`: **21.00%**
* **Property Tax:** `1.10%` (Halifax Representative).
* **Vehicle Reg:**
    * `Weight < 1000kg`: **$176.00** (2 years).
    * `Weight 1001-1500kg`: **$220.00** (2 years).
    * `Weight 1501-3200kg`: **$276.00** (2 years).

### Nunavut
* **Income Tax:**
    * `$0 - $54,707`: **4.00%**
    * `$54,708 - $109,413`: **7.00%**
    * `$109,414 - $177,881`: **9.00%**
    * `$177,882+`: **11.50%**
* **Vehicle Reg:** **$70.00**.

### Ontario
* **Income Tax Brackets:**
    * `$0 - $52,886`: **5.05%**
    * `$52,887 - $105,775`: **9.15%**
    * `$105,776 - $150,000`: **11.16%**
    * `$150,001 - $220,000`: **12.16%**
    * `$220,001+`: **13.16%**
* **Ontario Surtax (Crucial Calculation):**
    * *Logic:* Calculated on the **Provincial Tax** amount (not income).
    * `If Prov_Tax > $5,710`: Add 20% of excess.
    * `If Prov_Tax > $7,307`: Add 36% of excess.
* **Ontario Health Premium (Add to Tax):**
    * `Income $20k-$36k`: Max $300.
    * `Income $36k-$48k`: Max $450.
    * `Income $48k-$72k`: Max $600.
    * `Income $72k-$200k`: Max $750.
    * `Income >$200k`: Max $900.
* **Property Tax:** `0.71%` (Provincial Avg).
    * *Ottawa:* 1.07%.
    * *Toronto:* ~0.72%.
* **Vehicle Reg:** **$0.00** (Renewal required, but no fee).

### Prince Edward Island (PEI)
* **Income Tax:**
    * `$0 - $33,328`: **9.50%**
    * `$33,329 - $64,656`: **13.47%**
    * `$64,657 - $105,000`: **16.60%**
    * `$105,001 - $140,000`: **17.62%**
    * `$140,001+`: **19.00%**
* **Property Tax:** `1.67%` (Charlottetown Representative).
* **Vehicle Reg:** **$100.00**.

### Quebec
* **Income Tax Brackets:**
    * `$0 - $53,255`: **14.00%**
    * `$53,256 - $106,495`: **19.00%**
    * `$106,496 - $129,590`: **24.00%**
    * `$129,591+`: **25.75%**
* **Quebec Abatement:**
    * *Logic:* Residents receive a refundable credit of **16.5%** of their **Basic Federal Tax**.
* **Property Tax:** `0.71%` (Provincial Avg).
* **Vehicle Reg (2025):**
    * `Designated Region (Urban):` **$217.41** (Includes insurance contribution).
    * `Peripheral Region:` **$191.41**.
    * `Large Engine Tax:` Add **$61-$244** if engine > 3.9 Liters.

### Saskatchewan
* **Income Tax:**
    * `$0 - $53,463`: **10.50%**
    * `$53,464 - $152,750`: **12.50%**
    * `$152,751+`: **14.50%**
* **Property Tax:** `1.33%` (Provincial Avg).
    * *Regina:* ~1.36%.
* **Vehicle Reg:** **$57.00** (Passenger Class).

### Yukon
* **Income Tax:**
    * `$0 - $57,375`: **6.40%**
    * `$57,376 - $114,750`: **9.00%**
    * `$114,751 - $177,882`: **10.90%**
    * `$177,883 - $500,000`: **12.80%**
    * `$500,001+`: **15.00%**
* **Vehicle Reg:** **$50.00**.

## 5. Administrative Notes
* **Property Tax Payment Frequency:** **Two Bills per Year** (Interim & Final).
* **Interim Bill:** Mailed in **January**. Due in 3 installments: **March 3**, **April 1**, **May 1** (2025 dates).
* **Final Bill:** Mailed in **May**. Due in 3 installments: **July 2**, **August 1**, **September 2** (2025 dates).
* **Monthly Option:** Most municipalities offer an 11-month pre-authorized payment plan (Feb–Dec) to smooth cash flow.

---

# United Kingdom Tax Data (2025/2026 Tax Year)

# England Tax Data (2025/2026 Tax Year)

**Jurisdiction:** England (UK)
**Fiscal Year:** April 6, 2025 – April 5, 2026
**Currency:** GBP (£)

---

## 1. Income Tax (England)

**Personal Allowance:** `£12,570`
* *Taper:* Reduced by £1 for every £2 of "Adjusted Net Income" above `£100,000`. Reaches £0 allowance at `£125,140`.

| Band Name | Taxable Income Range (Above Allowance) | Tax Rate | Cumulative Tax at Start of Band |
| :--- | :--- | :--- | :--- |
| **Basic Rate** | £0 – £37,700 | **20%** | £0.00 |
| **Higher Rate** | £37,701 – £125,140 | **40%** | £7,540.00 |
| **Additional Rate** | £125,141+ | **45%** | £42,516.00 |

### Dividend Tax Rates
* **Dividend Allowance:** `£500` (0% tax on first £500).
* **Basic Rate Taxpayer:** `8.75%`
* **Higher Rate Taxpayer:** `33.75%`
* **Additional Rate Taxpayer:** `39.35%`

### Capital Gains Tax (CGT)
* **Annual Exempt Amount:** `£3,000`
* **Residential Property:**
    * Basic Rate Taxpayer: **18%**
    * Higher/Additional Rate Taxpayer: **24%**
* **Other Assets (Shares, etc.):**
    * Basic Rate Taxpayer: **18%**
    * Higher/Additional Rate Taxpayer: **24%**

---

## 2. National Insurance (Employees)

**Class 1 Primary Contributions**
* *Calculated per pay period (Weekly/Monthly), not strictly annual.*
* **Primary Threshold (PT):** `£1,048` per month (`£12,570` annual equivalent).
* **Upper Earnings Limit (UEL):** `£4,189` per month (`£50,270` annual equivalent).

| Earnings Band | Monthly Range | Annual Equivalent | Rate |
| :--- | :--- | :--- | :--- |
| **Below PT** | £0 – £1,048 | £0 – £12,570 | **0%** |
| **Main Rate** | £1,048 – £4,189 | £12,571 – £50,270 | **8%** |
| **Upper Rate** | £4,189+ | £50,271+ | **2%** |

---

## 3. Student Loans (Repayment Plans)

*Calculated on Gross Income.*

| Plan Type | Annual Threshold | Repayment Rate (on excess) |
| :--- | :--- | :--- |
| **Plan 1** | £26,065 | **9%** |
| **Plan 2** | £28,470 | **9%** |
| **Plan 4** | £32,745 | **9%** |
| **Plan 5** | £25,000 | **9%** |
| **Postgraduate** | £21,000 | **6%** |

---

## 4. Vehicle Tax (VED) 2025/2026

**Standard Rate (Year 2+):** `£195` (Petrol/Diesel/Hybrid/Electric).
**Luxury Car Surcharge:** `+£425` per year (Years 2-6) if List Price > £40,000 (applies to EVs registered from Apr 2025).

### First Year VED Rates (Cars Registered on/after 1 April 2025)
*Based on CO2 emissions (WLTP).*

| CO2 (g/km) | First Year Tax (£) |
| :--- | :--- |
| **0** | £10 |
| **1 – 50** | £110 |
| **51 – 75** | £130 |
| **76 – 90** | £270 |
| **91 – 100** | £350 |
| **101 – 110** | £390 |
| **111 – 130** | £440 |
| **131 – 150** | £540 |
| **151 – 170** | £1,360 |
| **171 – 190** | £2,190 |
| **191 – 225** | £3,300 |
| **226 – 255** | £4,680 |
| **Over 255** | £5,490 |

---

## 5. Council Tax (Property)

**Valuation Basis:** April 1, 1991 Open Market Value.
**Average Band D:** `£2,280` (National Avg for 2025/26).

| Band | 1991 Value Range | Ratio to Band D |
| :--- | :--- | :--- |
| **A** | Up to £40,000 | **6/9** (0.67) |
| **B** | £40,001 to £52,000 | **7/9** (0.78) |
| **C** | £52,001 to £68,000 | **8/9** (0.89) |
| **D** | £68,001 to £88,000 | **9/9** (1.00) |
| **E** | £88,001 to £120,000 | **11/9** (1.22) |
| **F** | £120,001 to £160,000 | **13/9** (1.44) |
| **G** | £160,001 to £320,000 | **15/9** (1.67) |
| **H** | Over £320,000 | **18/9** (2.00) |

## 6. Administrative Notes
* **Council Tax Payment Frequency:** **10 Monthly Installments**.
* **Statutory Schedule:** Payments are due on the **1st of each month** from **April 1** to **January 1**.
* **Tax-Free Months:** February and March are typically payment-free.
* **12-Month Option:** Residents can legally request to spread payments over 12 months (April–March) to lower the monthly cost.

---

# Scotland Tax Data (2025/2026 Tax Year)

**Jurisdiction:** Scotland (UK)
**Fiscal Year:** April 6, 2025 – April 5, 2026
**Currency:** GBP (£)

---

## 1. Income Tax (Scotland)

**Personal Allowance:** `£12,570`
* *Taper:* Reduced by £1 for every £2 of "Adjusted Net Income" above `£100,000`. Reaches £0 allowance at `£125,140`.

| Band Name | Taxable Income Range (Above Allowance) | Tax Rate | Cumulative Tax at Start of Band |
| :--- | :--- | :--- | :--- |
| **Starter Rate** | £0 – £2,826 | **19%** | £0.00 |
| **Basic Rate** | £2,827 – £14,921 | **20%** | £536.94 |
| **Intermediate Rate** | £14,922 – £31,092 | **21%** | £2,955.94 |
| **Higher Rate** | £31,093 – £62,430 | **42%** | £6,351.85 |
| **Advanced Rate** | £62,431 – £125,140 | **45%** | £19,513.81 |
| **Top Rate** | £125,141+ | **48%** | £47,733.31 |

### Dividend Tax Rates (UK-wide)
* **Dividend Allowance:** `£500` (0% tax on first £500).
* **Basic/Starter/Intermediate Rate Taxpayer:** `8.75%`
* **Higher Rate Taxpayer:** `33.75%`
* **Advanced/Top Rate Taxpayer:** `39.35%`

### Capital Gains Tax (CGT) (UK-wide)
* **Annual Exempt Amount:** `£3,000`
* **Residential Property:**
    * Basic Rate Taxpayer: **18%**
    * Higher Rate Taxpayer: **24%**
* **Other Assets (Shares, etc.):**
    * Basic Rate Taxpayer: **18%**
    * Higher Rate Taxpayer: **24%**

---

## 2. National Insurance (Employees)

**Class 1 Primary Contributions**
* *Calculated per pay period (Weekly/Monthly), not strictly annual.*
* **Primary Threshold (PT):** `£1,048` per month (`£12,570` annual equivalent).
* **Upper Earnings Limit (UEL):** `£4,189` per month (`£50,270` annual equivalent).

| Earnings Band | Monthly Range | Annual Equivalent | Rate |
| :--- | :--- | :--- | :--- |
| **Below PT** | £0 – £1,048 | £0 – £12,570 | **0%** |
| **Main Rate** | £1,048 – £4,189 | £12,571 – £50,270 | **8%** |
| **Upper Rate** | £4,189+ | £50,271+ | **2%** |

---

## 3. Student Loans (Repayment Plans)

*Calculated on Gross Income.*

| Plan Type | Annual Threshold | Repayment Rate (on excess) |
| :--- | :--- | :--- |
| **Plan 1** | £26,065 | **9%** |
| **Plan 2** | £28,470 | **9%** |
| **Plan 4** | £32,745 | **9%** |
| **Plan 5** | £25,000 | **9%** |
| **Postgraduate** | £21,000 | **6%** |

---

## 4. Land and Buildings Transaction Tax (LBTT)

**Residential Property**
*Replaces Stamp Duty Land Tax (SDLT) in Scotland.*

| Purchase Price Band | LBTT Rate |
| :--- | :--- |
| £0 – £145,000 | **0%** |
| £145,001 – £250,000 | **2%** |
| £250,001 – £325,000 | **5%** |
| £325,001 – £750,000 | **10%** |
| £750,001+ | **12%** |

* **First-Time Buyer Relief:** 0% up to `£175,000`.
* **Additional Dwelling Supplement (ADS):** `+8%` on total purchase price for second homes/buy-to-let (Effective Dec 2024 for 2025/26 tax year).

---

## 5. Vehicle Tax (VED) 2025/2026

**Standard Rate (Year 2+):** `£195` (Petrol/Diesel/Hybrid/Electric).
**Luxury Car Surcharge:** `+£425` per year (Years 2-6) if List Price > £40,000 (applies to EVs registered from Apr 2025).

### First Year VED Rates (Cars Registered on/after 1 April 2025)
*Based on CO2 emissions (WLTP).*

| CO2 (g/km) | First Year Tax (£) |
| :--- | :--- |
| **0** | £10 |
| **1 – 50** | £110 |
| **51 – 75** | £130 |
| **76 – 90** | £270 |
| **91 – 100** | £350 |
| **101 – 110** | £390 |
| **111 – 130** | £440 |
| **131 – 150** | £540 |
| **151 – 170** | £1,360 |
| **171 – 190** | £2,190 |
| **191 – 225** | £3,300 |
| **226 – 255** | £4,680 |
| **Over 255** | £5,490 |

---

## 6. Council Tax & Water Charges (Property)

**Valuation Basis:** April 1, 1991 Open Market Value.
**Average Band D Council Tax (2025/26):** `£1,543` (National Avg ex. Water).
**Mandatory Water/Sewerage:** Scotland bills water *with* Council Tax as fixed flat rates.

### A. Council Tax Ratios (Scotland-Specific)
*Ratios for Bands E-H are higher than in England/Wales.*

| Band | 1991 Value Range | Ratio to Band D |
| :--- | :--- | :--- |
| **A** | Up to £27,000 | **240/360** (0.67) |
| **B** | £27,001 to £35,000 | **280/360** (0.78) |
| **C** | £35,001 to £45,000 | **320/360** (0.89) |
| **D** | £45,001 to £58,000 | **360/360** (1.00) |
| **E** | £58,001 to £80,000 | **473/360** (1.31) |
| **F** | £80,001 to £106,000 | **585/360** (1.63) |
| **G** | £106,001 to £212,000 | **705/360** (1.96) |
| **H** | Over £212,000 | **882/360** (2.45) |

### B. Water & Sewerage Charges (2025/26 Fixed Rates)
*These charges are added to the Council Tax bill for unmetered households.*

| Band | Water Charge | Waste Water Charge | Total Water/Waste |
| :--- | :--- | :--- | :--- |
| **A** | £185.28 | £214.98 | **£400.26** |
| **B** | £216.16 | £250.81 | **£466.97** |
| **C** | £247.04 | £286.64 | **£533.68** |
| **D** | £277.92 | £322.47 | **£600.39** |
| **E** | £339.68 | £394.13 | **£733.81** |
| **F** | £401.44 | £465.79 | **£867.23** |
| **G** | £463.20 | £537.45 | **£1,000.65** |
| **H** | £555.84 | £644.94 | **£1,200.78** |

## 7. Administrative Notes
* **Council Tax Payment Frequency:** **10 Monthly Installments**.
* **Due Dates:** Typically the **1st of each month** from **April** to **January**.
* **Bundling:** Payments cover both Council Tax and the mandatory **Water/Sewerage** charges.
* **12-Month Option:** Available upon request to the local council (e.g., April to March).

---

# Wales Tax Data (2025/2026 Tax Year)

**Jurisdiction:** Wales (UK)
**Fiscal Year:** April 6, 2025 – April 5, 2026
**Currency:** GBP (£)

---

## 1. Income Tax (Wales)

**Status:** Wales has the power to vary Income Tax (WRIT), but for 2025/26, the Welsh Government has kept rates aligned with England.
**Personal Allowance:** `£12,570` (Reduces by £1 for every £2 of net income > £100,000).

| Band Name | Taxable Income Range (Above Allowance) | Tax Rate |
| :--- | :--- | :--- |
| **Basic Rate** | £0 – £37,700 | **20%** |
| **Higher Rate** | £37,701 – £125,140 | **40%** |
| **Additional Rate** | £125,141+ | **45%** |

### Dividend Tax Rates
* **Dividend Allowance:** `£500` (0% tax on first £500).
* **Basic Rate Taxpayer:** `8.75%`
* **Higher Rate Taxpayer:** `33.75%`
* **Additional Rate Taxpayer:** `39.35%`

---

## 2. National Insurance (Employees)

**Class 1 Primary Contributions**
* *Calculated per pay period (Weekly/Monthly).*
* **Primary Threshold (PT):** `£1,048` per month (`£12,570` annual equivalent).
* **Upper Earnings Limit (UEL):** `£4,189` per month (`£50,270` annual equivalent).

| Earnings Band | Annual Equivalent | Rate |
| :--- | :--- | :--- |
| **Below PT** | £0 – £12,570 | **0%** |
| **Main Rate** | £12,571 – £50,270 | **8%** |
| **Upper Rate** | £50,271+ | **2%** |

---

## 3. Land Transaction Tax (LTT)

**Residential Property**
*Replaces Stamp Duty Land Tax (SDLT) in Wales.*

| Purchase Price Band | LTT Rate |
| :--- | :--- |
| £0 – £225,000 | **0%** |
| £225,001 – £400,000 | **6%** |
| £400,001 – £750,000 | **7.5%** |
| £750,001 – £1,500,000 | **10%** |
| £1,500,001+ | **12%** |

* **Higher Rates:** Add **4%** to all bands if purchasing a second home or buy-to-let.

---

## 4. Vehicle Tax (VED) 2025/2026

**Standard Rate (Year 2+):** `£195` (Petrol/Diesel/Hybrid/Electric).
**Luxury Car Surcharge:** `+£425` per year (Years 2-6) if List Price > £40,000 (applies to EVs registered from Apr 2025).

### First Year VED Rates (Cars Registered on/after 1 April 2025)
*Based on CO2 emissions (WLTP).*

| CO2 (g/km) | First Year Tax (£) |
| :--- | :--- |
| **0** | £10 |
| **1 – 50** | £110 |
| **51 – 75** | £130 |
| **76 – 90** | £270 |
| **91 – 100** | £350 |
| **101 – 110** | £390 |
| **111 – 130** | £440 |
| **131 – 150** | £540 |
| **151 – 170** | £1,360 |
| **171 – 190** | £2,190 |
| **191 – 225** | £3,300 |
| **226 – 255** | £4,680 |
| **Over 255** | £5,490 |

---

## 5. Council Tax (Property)

**Valuation Basis:** April 1, 2003 Market Value (Distinct from England's 1991 basis).
**Average Band D:** `£2,170` (National Avg for 2025/26).

| Band | 2003 Value Range | Ratio to Band D |
| :--- | :--- | :--- |
| **A** | Up to £44,000 | **6/9** (0.67) |
| **B** | £44,001 to £65,000 | **7/9** (0.78) |
| **C** | £65,001 to £91,000 | **8/9** (0.89) |
| **D** | £91,001 to £123,000 | **9/9** (1.00) |
| **E** | £123,001 to £162,000 | **11/9** (1.22) |
| **F** | £162,001 to £223,000 | **13/9** (1.44) |
| **G** | £223,001 to £324,000 | **15/9** (1.67) |
| **H** | £324,001 to £424,000 | **18/9** (2.00) |
| **I** | Over £424,000 | **21/9** (2.33) |

## 6. Administrative Notes
* **Council Tax Payment Frequency:** **10 Monthly Installments**.
* **Schedule:** Payments due **April** through **January** (usually the 1st or 15th).
* **February/March:** No payments standardly due.
* **12-Month Option:** Residents have the right to request a 12-installment plan.

---

# Northern Ireland Tax Data (2025/2026 Tax Year)

**Jurisdiction:** Northern Ireland (UK)
**Fiscal Year:** April 6, 2025 – April 5, 2026
**Currency:** GBP (£)

---

## 1. Income Tax (Northern Ireland)

**Status:** Income tax is a non-devolved matter, meaning rates match England.
**Personal Allowance:** `£12,570` (Reduces by £1 for every £2 of net income > £100,000).

| Band Name | Taxable Income Range (Above Allowance) | Tax Rate |
| :--- | :--- | :--- |
| **Basic Rate** | £0 – £37,700 | **20%** |
| **Higher Rate** | £37,701 – £125,140 | **40%** |
| **Additional Rate** | £125,141+ | **45%** |

### Dividend Tax Rates
* **Dividend Allowance:** `£500` (0% tax on first £500).
* **Basic Rate Taxpayer:** `8.75%`
* **Higher Rate Taxpayer:** `33.75%`
* **Additional Rate Taxpayer:** `39.35%`

---

## 2. National Insurance (Employees)

**Class 1 Primary Contributions**
* *Calculated per pay period (Weekly/Monthly).*
* **Primary Threshold (PT):** `£1,048` per month (`£12,570` annual equivalent).
* **Upper Earnings Limit (UEL):** `£4,189` per month (`£50,270` annual equivalent).

| Earnings Band | Annual Equivalent | Rate |
| :--- | :--- | :--- |
| **Below PT** | £0 – £12,570 | **0%** |
| **Main Rate** | £12,571 – £50,270 | **8%** |
| **Upper Rate** | £50,271+ | **2%** |

---

## 3. Domestic Rates (Property Tax)

**Status:** Northern Ireland does **not** use Council Tax bands (A-H). Instead, it uses a system of **Domestic Rates** based on the individual capital value of the property (assessed at 2005 levels).

### Calculation Formula
`Annual Bill = Capital Value (2005) × (Regional Rate + District Rate)`

### Rates for 2025/2026 (Pence in the Pound)
* **Regional Rate (Domestic):** `0.5294 pence` (0.005294)

| Council Area | District Rate (Dom) | Regional Rate (Dom) | Total Rate (Pence) | Total Rate (Decimal) |
| :--- | :--- | :--- | :--- | :--- |
| **Antrim & Newtownabbey** | 0.4297p | 0.5294p | **0.9591p** | `0.009591` |
| **Ards & North Down** | 0.4244p | 0.5294p | **0.9538p** | `0.009538` |
| **Armagh, Banbridge & Craigavon** | 0.5265p | 0.5294p | **1.0559p** | `0.010559` |
| **Belfast** | 0.4299p | 0.5294p | **0.9593p** | `0.009593` |
| **Causeway Coast & Glens** | 0.4936p | 0.5294p | **1.0230p** | `0.010230` |
| **Derry City & Strabane** | 0.6369p | 0.5294p | **1.1663p** | `0.011663` |
| **Fermanagh & Omagh** | 0.4382p | 0.5294p | **0.9676p** | `0.009676` |
| **Lisburn & Castlereagh** | 0.3804p | 0.5294p | **0.9098p** | `0.009098` |
| **Mid & East Antrim** | 0.5506p | 0.5294p | **1.0800p** | `0.010800` |
| **Mid Ulster** | 0.4188p | 0.5294p | **0.9482p** | `0.009482` |
| **Newry, Mourne & Down** | 0.4862p | 0.5294p | **1.0156p** | `0.010156` |

* **Example Calculation:**
    * Property in **Belfast** valued at `£150,000` (2005 value).
    * `150,000 * 0.009593` = **£1,438.95**

---

## 4. Vehicle Tax (VED) 2025/2026

**Standard Rate (Year 2+):** `£195` (Petrol/Diesel/Hybrid/Electric).
**Luxury Car Surcharge:** `+£425` per year (Years 2-6) if List Price > £40,000 (applies to EVs registered from Apr 2025).

### First Year VED Rates (Cars Registered on/after 1 April 2025)
*Based on CO2 emissions (WLTP).*

| CO2 (g/km) | First Year Tax (£) |
| :--- | :--- |
| **0** | £10 |
| **1 – 50** | £110 |
| **51 – 75** | £130 |
| **76 – 90** | £270 |
| **91 – 100** | £350 |
| **101 – 110** | £390 |
| **111 – 130** | £440 |
| **131 – 150** | £540 |
| **151 – 170** | £1,360 |
| **171 – 190** | £2,190 |
| **191 – 225** | £3,300 |
| **226 – 255** | £4,680 |
| **Over 255** | £5,490 |

## 5. Administrative Notes
* **Domestic Rates Payment Frequency:** **10 Monthly Installments**.
* **Schedule:** **April** to **January**.
* **Early Payment Discount:** A **4% discount** applies if the full annual bill is paid in a single lump sum on or before **May 9, 2025**.
* **Bill Issue Date:** Rate bills are issued in early **April 2025**.

---

# Germany Tax Data (2025 Tax Year)

**Jurisdiction:** Germany (Deutschland)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Euro (€)

---

## 1. Income Tax (Einkommensteuer) 2025

**System:** Geometrically Progressive Formulas (Zones).
**Filing Status:**
* **Single:** Applies directly to Taxable Income.
* **Married Jointly:** Apply "Splitting" (Divide joint income by 2, calculate tax, multiply result by 2).

### A. The 2025 Formulas (Official Coefficients)

**Variables:**
* `zvE`: Taxable Income (zu versteuerndes Einkommen).
* `y`: `(zvE - 12096) / 10000`
* `z`: `(zvE - 17443) / 10000`

| Zone | Taxable Income Range (Single) | Formula to Calculate Tax (€) |
| :--- | :--- | :--- |
| **Zone 1** (Nullzone) | €0 – €12,096 | `0` |
| **Zone 2** | €12,097 – €17,443 | `(932.30 * y + 1400) * y` |
| **Zone 3** | €17,444 – €68,480 | `(176.64 * z + 2397) * z + 1015.13` |
| **Zone 4** | €68,481 – €277,825 | `0.42 * zvE - 10911.92` |
| **Zone 5** (Rich Tax) | €277,826+ | `0.45 * zvE - 19246.67` |

### B. Solidarity Surcharge (Soli)
*Most taxpayers are exempt. It applies only to high earners.*

**Logic (2025 Thresholds):**
1.  **Calculate Income Tax** (from Section A).
2.  **Check Exemption:**
    * **Single:** If Income Tax < **€19,950** -> **Soli = €0**.
    * **Married:** If Income Tax < **€39,900** -> **Soli = €0**.
3.  **Midding Zone (Gleitzone):**
    * *Single Tax between €19,950 and ~€33,000:* Soli = `11.9%` of the difference between Tax and €19,950.
4.  **Full Soli:**
    * *If above Midding Zone:* Soli = **5.5%** of the Income Tax amount.

### C. Church Tax (Kirchensteuer)
*Only for registered church members.*
* **Bavaria & Baden-Württemberg:** **8%** of Income Tax.
* **Rest of Germany:** **9%** of Income Tax.
* *Deductibility:* Church tax paid is deductible as a "Special Expense" (Sonderausgaben) reducing taxable income.

### D. Capital Gains (Abgeltungsteuer)
* **Standard Rate:** Flat **25%** + Soli (5.5%) = **26.375%**.
* **With Church Tax:** ~27.8% or ~27.9%.
* **Exemption (Sparerpauschbetrag):**
    * Single: **€1,000** tax-free.
    * Married: **€2,000** tax-free.

---

## 2. Social Security Contributions (2025)

*Shared 50/50 between Employee and Employer.*

| Insurance Type | Employee Share | Income Cap (Monthly) | Income Cap (Annual) |
| :--- | :--- | :--- | :--- |
| **Pension** (Rentenvers.) | **9.3%** | €8,050 (West) / €7,850 (East) | €96,600 / €94,200 |
| **Unemployment** (Arbeitsl.) | **1.3%** | €8,050 (West) / €7,850 (East) | €96,600 / €94,200 |
| **Health** (Krankenvers.) | **7.3%** + Add-on (Avg ~0.8%) | €5,512.50 | €66,150 |
| **Care** (Pflegevers.) | **2.3%** to **4.0%** * | €5,512.50 | €66,150 |

*\*Care Insurance Note:*
* Childless (Age >23): **4.0%** (Employee pays 2.8%, Employer 1.2% in Saxony; elsewhere varies).
* Parents: Rate reduces by 0.25% per child (from 2nd to 5th child).

---

## 3. Property Tax (Grundsteuer) 2025

**System:** New Calculation Model active from Jan 1, 2025.
**Formula:** `Tax_Value (Grundsteuerwert) * Base_Rate (0.00031 or 0.00034) * Municipal_Multiplier`

### A. Base Rates (Steuermesszahl)
* **Residential:** **0.031%** (0.00031).
* **Non-Residential:** **0.034%** (0.00034).
* *Note:* Some states (Bavaria, Hamburg, Hesse, Lower Saxony) use a "Area-based model" (Flächenmodell) instead of value-based.

### B. Municipal Multipliers (Hebesatz) - 2025 Examples
*Applies to the result of (Value * Base Rate).*

| City | Multiplier % (Hebesatz) |
| :--- | :--- |
| **Berlin** | **810%** |
| **Munich** | **535%** |
| **Hamburg** | **540%** |
| **Frankfurt** | **500%** |
| **Cologne** | **515%** |
| **Stuttgart** | **520%** |
| **Düsseldorf** | **440%** |
| **Leipzig** | **650%** |
| **Dresden** | **635%** |

* **Example Calculation (Berlin):**
    * Value: €300,000
    * Base Tax: €300,000 * 0.00031 = €93
    * Final Tax: €93 * 8.10 = **€753.30**

### C. Property Transfer Tax (Grunderwerbsteuer)
*One-time tax at purchase.*

| State | Rate |
| :--- | :--- |
| **Bavaria** | **3.5%** |
| **Baden-Württemberg, Bremen, Lower Saxony, Rhineland-Palatinate, Saxony-Anhalt, Thuringia** | **5.0%** |
| **Hamburg, Saxony** | **5.5%** |
| **Berlin, Hesse, Mecklenburg-Vorpommern** | **6.0%** |
| **Brandenburg, NRW, Saarland, Schleswig-Holstein** | **6.5%** |

---

## 4. Vehicle Tax (Kfz-Steuer) 2025

**Formula:** `Displacement_Component + CO2_Component`

### A. Displacement Component (per 100cc)
* **Petrol:** **€2.00**
* **Diesel:** **€9.50**

### B. CO2 Component (Progressive)
*Taxed on emissions > 95 g/km (WLTP).*

| CO2 Bracket (g/km) | Tax per g/km |
| :--- | :--- |
| **96 – 115** | **€2.00** |
| **116 – 135** | **€2.20** |
| **136 – 155** | **€2.50** |
| **156 – 175** | **€2.90** |
| **176 – 195** | **€3.40** |
| **196+** | **€4.00** |

### C. Electric Vehicles (EVs)
* **Fully Electric:** **Exempt** from Vehicle Tax until Dec 31, 2030 (if registered by Dec 31, 2025).
* **Hybrids:** Taxed as standard Petrol/Diesel vehicles based on their official CO2/cc.

### D. Calculation Example (Petrol Car, 1499cc, 140g CO2)
1.  **Displacement:** 15 * €2.00 = **€30.00**
2.  **CO2:**
    * 95g free.
    * (115-95) * 2.00 = €40.00
    * (135-115) * 2.20 = €44.00
    * (140-135) * 2.50 = €12.50
    * Total CO2 = **€96.50**
3.  **Total Annual Tax:** €30.00 + €96.50 = **€126.50**

## 5. Administrative Notes
* **Property Tax (Grundsteuer) Payment Frequency:** **Quarterly**.
* **Statutory Due Dates:** **February 15**, **May 15**, **August 15**, and **November 15**.
* **Annual Option:** The full amount can be paid on **July 1** if a request is submitted by September 30 of the previous year.
* **Small Amounts:** If the total tax is small (<€15 or <€30), it may be due once annually (Aug 15) or semi-annually (Feb/Aug).

---

# France Tax Data (2025 Tax Year)

**Jurisdiction:** France
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Euro (€)

---

## 1. Income Tax (Impôt sur le Revenu) 2025

**System:** Quotient Familial (Family Splitting).
**Filing Status:** Joint filing (required for married/PACs couples unless separated).

### A. The 2025 Brackets (Official)

**Variables:**
* `R`: Taxable Income (Revenu Imposable).
* `N`: Number of Family Parts (Parts Fiscales).
* `QF`: Family Quotient (`R / N`).

**Step 1: Calculate Gross Tax per Part**
Apply the brackets to `QF`.

| Bracket Floor | Bracket Ceiling | Tax Rate | Formula to Calculate Tax (€) |
| :--- | :--- | :--- | :--- |
| **€0** | **€11,497** | **0%** | `0` |
| **€11,498** | **€29,315** | **11%** | `(QF - 11497) * 0.11` |
| **€29,316** | **€83,823** | **30%** | `(QF - 29315) * 0.30 + 1959.98` |
| **€83,824** | **€180,294** | **41%** | `(QF - 83823) * 0.41 + 18312.38` |
| **€180,295** | **Unlimited** | **45%** | `(QF - 180294) * 0.45 + 57865.49` |

**Step 2: Calculate Total Gross Tax**
* `Total_Gross_Tax = Gross_Tax_per_Part * N`

**Step 3: Apply Family Capping (Plafonnement du Quotient Familial)**
* The tax benefit for each half-part above 2 (or 1 for single parents) is capped at **€1,759** (2025).
* *Algorithm:* Calculate tax with `N` parts. Calculate tax with `2` parts (if married) or `1` part (if single). The difference cannot exceed `1759 * (N - Base_N)`.

**Step 4: Apply Decote (Tax Discount)**
* If Gross Tax < **€1,964** (Single) or **€3,248** (Couple).
* `Decote = (Limit - Gross_Tax) * 0.4525`.
* `Net_Tax = Gross_Tax - Decote`.

### B. Contribution Exceptionnelle sur les Hauts Revenus (CEHR)
*Applies to High Earners on top of Income Tax.*

| Reference Tax Income (RFR) | Single Rate | Couple Rate |
| :--- | :--- | :--- |
| **€0 – €250,000** | 0% | 0% |
| **€250,001 – €500,000** | 3% | 0% |
| **€500,001 – €1,000,000** | 4% | 3% |
| **€1,000,001+** | 4% | 4% |

**2025 Special Rule (Contribution Différentielle):**
* Ensures an effective tax rate of **20%** for high earners (RFR > €250k/€500k).
* If `Total_Tax / RFR < 20%`, the difference is levied as an additional tax.

---

## 2. Property Tax (Taxe Foncière) 2025

**Formula:** `Tax = (Valeur Locative Cadastrale / 2) * Taux Communal`
* *Note:* The "Valeur Locative" (Rental Value) is revalued annually (Inflation + 1.7% in 2025).

### A. Municipal Rates (2025 Voted Rates)
*Apply to 50% of the Rental Value.*

| City | Tax Rate (Taux Global) |
| :--- | :--- |
| **Paris** | **20.50%** |
| **Marseille** | **44.54%** |
| **Lyon** | **31.89%** |
| **Toulouse** | **35.35%** |
| **Nice** | **35.30%** |
| **Nantes** | **46.34%** |
| **Montpellier** | **52.63%** |
| **Strasbourg** | **37.44%** |
| **Bordeaux** | **48.48%** |
| **Lille** | **48.35%** |
| **Rennes** | **45.66%** |
| **Reims** | **44.77%** |
| **Saint-Etienne** | **44.68%** |
| **Le Havre** | **54.36%** |
| **Toulon** | **39.39%** |
| **Grenoble** | **65.79%** (Highest major city) |
| **Dijon** | **50.28%** |
| **Angers** | **54.24%** |
| **Nîmes** | **53.20%** |
| **Aix-en-Provence** | **32.69%** |

### B. Wealth Tax (IFI - Impôt sur la Fortune Immobilière)
*Applies if Net Real Estate Assets > €1,300,000.*

| Net Taxable Value Bracket | Tax Rate |
| :--- | :--- |
| **€0 – €800,000** | 0% |
| **€800,001 – €1,300,000** | 0.50% |
| **€1,300,001 – €2,570,000** | 0.70% |
| **€2,570,001 – €5,000,000** | 1.00% |
| **€5,000,001 – €10,000,000** | 1.25% |
| **€10,000,001+** | 1.50% |

* *Discount (Decote):* If assets are between €1.3M and €1.4M, `Decote = 17,500 - (1.25% * Net_Value)`.

---

## 3. Vehicle Tax (Malus Écologique 2025)

**Trigger:** Registration of a new car.
**Basis:** CO2 Emissions (WLTP).
**Max Cap:** **€70,000** (Combined CO2 + Weight Malus).

### A. CO2 Malus Grid (Official 2025)

| CO2 (g/km) | Tax (€) | CO2 (g/km) | Tax (€) | CO2 (g/km) | Tax (€) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **< 113** | **€0** | **140** | **€1,504** | **167** | **€10,692** |
| **113** | **€50** | **141** | **€1,629** | **168** | **€11,803** |
| **114** | **€75** | **142** | **€1,761** | **169** | **€13,014** |
| **115** | **€100** | **143** | **€1,901** | **170** | **€14,325** |
| **116** | **€125** | **144** | **€2,049** | **171** | **€15,736** |
| **117** | **€150** | **145** | **€2,205** | **172** | **€17,247** |
| **118** | **€170** | **146** | **€2,370** | **173** | **€18,858** |
| **119** | **€190** | **147** | **€2,544** | **174** | **€20,569** |
| **120** | **€210** | **148** | **€2,726** | **175** | **€22,380** |
| **121** | **€230** | **149** | **€2,918** | **176** | **€24,291** |
| **122** | **€240** | **150** | **€3,119** | **177** | **€26,302** |
| **123** | **€260** | **151** | **€3,331** | **178** | **€28,413** |
| **124** | **€280** | **152** | **€3,552** | **179** | **€30,624** |
| **125** | **€310** | **153** | **€3,784** | **180** | **€32,935** |
| **126** | **€330** | **154** | **€4,026** | **181** | **€35,346** |
| **127** | **€360** | **155** | **€4,279** | **182** | **€37,857** |
| **128** | **€400** | **156** | **€4,543** | **183** | **€40,468** |
| **129** | **€450** | **157** | **€4,818** | **184** | **€43,179** |
| **130** | **€540** | **158** | **€5,105** | **185** | **€45,990** |
| **131** | **€650** | **159** | **€5,404** | **186** | **€48,901** |
| **132** | **€740** | **160** | **€5,715** | **187** | **€51,912** |
| **133** | **€818** | **161** | **€6,126** | **188** | **€55,023** |
| **134** | **€898** | **162** | **€6,637** | **189** | **€58,134** |
| **135** | **€983** | **163** | **€7,248** | **190** | **€61,245** |
| **136** | **€1,074** | **164** | **€7,959** | **191** | **€64,356** |
| **137** | **€1,172** | **165** | **€8,770** | **192** | **€67,467** |
| **138** | **€1,276** | **166** | **€9,681** | **193+** | **€70,000** |
| **139** | **€1,386** | **167** | **€10,692** | | |

### B. Weight Malus (Malus au Poids)
*Applies to vehicles > 1,600 kg.*
* *Exemptions:* Electric vehicles (BEV), Plug-in Hybrids with >50km electric range.

| Weight (kg) | Tax per kg |
| :--- | :--- |
| **1,600 – 1,799** | **€10** |
| **1,800 – 1,899** | **€15** |
| **1,900 – 1,999** | **€20** |
| **2,000 – 2,099** | **€25** |
| **2,100+** | **€30** |

## 4. Administrative Notes
* **Property Tax (Taxe Foncière) Payment Frequency:** **Annual**.
* **Due Date (2025):**
    * **Non-Digital Payment:** **October 15, 2025**.
    * **Online Payment:** **October 20, 2025**.
* **Monthly Option (Mensualisation):** Taxpayers can opt for 10 monthly direct debits (Jan–Oct). The account is settled in Nov/Dec.

---

# Netherlands Tax Data (2025 Tax Year)

**Jurisdiction:** Netherlands
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Euro (€)

---

## 1. Income Tax (Box 1 - Work & Home)

**System:** Progressive tax on income from work and primary residence.
**Social Security:** The first bracket includes National Insurance contributions (AOW, Anw, Wlz).

### A. Box 1 Brackets (2025)
*Born on or after Jan 1, 1946 (Not yet retirement age).*

| Bracket | Taxable Income Range | Rate | Cumulative Tax at Start of Bracket |
| :--- | :--- | :--- | :--- |
| **1** | €0 – €38,441 | **35.82%** | €0 |
| **2** | €38,442 – €76,817 | **37.48%** | €13,769.57 |
| **3** | €76,818+ | **49.50%** | €28,152.85 |

### B. Tax Credits (Heffingskortingen)
*Subtract these from the calculated tax amount.*

**1. General Tax Credit (Algemene heffingskorting)**
* **Max Credit:** `€3,068`
* **Reduction Formula:**
    * If Income < €28,406: Credit = `€3,068`
    * If Income €28,406 - €76,817: `€3,068 - 0.06337 * (Income - 28406)`
    * If Income > €76,817: Credit = `€0`

**2. Labor Tax Credit (Arbeidskorting)**
* *For income from employment only.*
* **Max Credit:** `€5,599`
* **Formula:**
    * Income < €11,490: `Income * 0.0247`
    * €11,491 - €24,820: `€284 + 0.2958 * (Income - 11490)`
    * €24,821 - €43,071: `€4,227 + 0.0309 * (Income - 24820)`
    * €43,071 - €124,934: `€5,599 - 0.0651 * (Income - 43071)`
    * Income > €124,934: Credit = `€0`

---

## 2. Wealth Tax (Box 3 - Savings & Investments)

**System:** Taxed on a *fictitious* return (Deemed Return), not actual gains.
**Tax Rate:** **36%** on the deemed return.
**Tax-Free Allowance (Heffingsvrij vermogen):** `€57,684` (Single) / `€115,368` (Couples).

### Deemed Return Rates (2025 Provisional)
* **Savings (Bank Balances):** `1.44%`
* **Investments (Shares, Property, Crypto):** `5.88%`
* **Debts (Deductible):** `2.62%`

### Calculation Logic
1.  **Total Deemed Return:** `(Savings * 0.0144) + (Investments * 0.0588) - (Debts * 0.0262)`
2.  **Average Yield %:** `Total_Deemed_Return / Total_Net_Assets`
3.  **Taxable Basis:** `Total_Net_Assets - Tax_Free_Allowance`
4.  **Taxable Benefit:** `Taxable_Basis * Average_Yield_%`
5.  **Final Tax:** `Taxable_Benefit * 36%`

---

## 3. Vehicle Tax (BPM) 2025

**Trigger:** Paid once at first registration (new or imported).
**Basis:** CO2 Emissions (WLTP).
**Update:** EV exemption REMOVED. EVs now pay a fixed base rate.

### A. BPM Brackets (2025)
*Formula:* `Base_Fee + (CO2_Excess * Rate_per_Gram)`

| CO2 Range (g/km) | Tax at Start (€) | Rate per extra gram (€) |
| :--- | :--- | :--- |
| **0 (EV)** | **€667** | €0 |
| **1 – 80** | **€667** | €2 |
| **81 – 104** | **€827** | €78 |
| **105 – 146** | **€2,699** | €170 |
| **147 – 163** | **€9,839** | €280 |
| **164+** | **€14,599** | €560 |

* **Diesel Surcharge:** If diesel, add `(CO2 - 70) * €106.07`.

---

## 4. Road Tax (MRB) 2025

**Trigger:** Quarterly ownership tax.
**Basis:** Weight, Fuel Type, Province.
**EV Discount:** 75% discount in 2025 (Full rate applies 2026).

### A. Quarterly Rates (Example: Utrecht Province)
*Figures are estimates for 2025. Diesel rates are ~2x Petrol rates.*

| Weight (kg) | Petrol (€/qtr) | Diesel (€/qtr) | EV (2025 Discounted) |
| :--- | :--- | :--- | :--- |
| **1000** | €145 | €275 | ~€36 |
| **1200** | €175 | €335 | ~€44 |
| **1400** | €210 | €395 | ~€53 |
| **1600** | €250 | €460 | ~€63 |
| **1800** | €295 | €535 | ~€74 |
| **2000** | €340 | €610 | ~€85 |

### B. Provincial Surcharges (Opcenten)
*The rate above includes the provincial tax. Surcharge relative to national base:*
* **South Holland:** 101.5% (Highest)
* **Gelderland:** 101.2%
* **North Holland:** 77.4% (Lowest)
* **Utrecht:** 84.2%

---

## 5. Property Taxes

### A. Transfer Tax (Overdrachtsbelasting)
*Paid once at purchase.*
* **Primary Residence (Buyer < 35 years):** **0%** (One-time exemption, Price < €525,000).
* **Primary Residence (Standard):** **2%**
* **Investment Property / Second Home:** **10.4%**

### B. Municipal Property Tax (OZB) 2025
*Annual tax paid by owner. % of WOZ Value.*

| City | Owner Rate % | Cost per €300k Value |
| :--- | :--- | :--- |
| **Amsterdam** | 0.0413% | €124 |
| **Rotterdam** | 0.0652% | €196 |
| **The Hague** | 0.0538% | €161 |
| **Utrecht** | 0.0540% | €162 |
| **Eindhoven** | 0.0620% | €186 |
| **Groningen** | 0.1116% | €335 |
| **Tilburg** | 0.0815% | €245 |
| **Almere** | 0.0768% | €230 |

### C. Other Municipal Taxes (Waste/Water)
* **Amsterdam:** Waste ~€460/yr (Multi-person).
* **Rotterdam:** Waste ~€383/yr.
* **Water Tax (Waterschapsbelasting):** Avg ~€350 - €500 per year depending on region.

## 6. Administrative Notes
* **Property Tax (OZB) Payment Frequency:** **Annual Assessment** with installment options.
* **Assessment Date:** Tax bill (WOZ-beschikking) arrives **late February**.
* **Payment Methods:**
    * **Direct Debit:** Paid in **10 monthly installments** (End of month, Mar–Dec).
    * **Lump Sum:** Due in full (usually by **May 31** or 6 weeks after date of assessment).

---

# Switzerland Tax Data (2025 Tax Year)

**Jurisdiction:** Switzerland (Schweiz/Suisse/Svizzera)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Swiss Franc (CHF)

---

## 1. Federal Income Tax (Direkte Bundessteuer) 2025

**System:** Progressive.
**Deductions:** Social security (AHV/IV/EO/ALV) is deducted *before* arriving at Net Taxable Income.

### A. Single Taxpayers (Official 2025 Brackets)
| Taxable Income Range (CHF) | Base Tax (CHF) | Rate on Excess (%) |
| :--- | :--- | :--- |
| **0 – 18,500** | 0 | **0.00%** |
| **18,501 – 33,200** | 0 | **0.77%** |
| **33,201 – 43,500** | 113.15 | **0.88%** |
| **43,501 – 58,000** | 203.80 | **2.64%** |
| **58,001 – 76,100** | 586.60 | **2.97%** |
| **76,101 – 82,000** | 1,124.15 | **5.94%** |
| **82,001 – 108,800** | 1,474.60 | **6.60%** |
| **108,801 – 141,500** | 3,243.40 | **8.80%** |
| **141,501 – 184,900** | 6,121.00 | **11.00%** |
| **184,901 – 793,400** | 10,895.00 | **13.20%** |
| **793,401+** | *Flat Rate* | **11.50%** |

### B. Married / Single Parent Taxpayers
| Taxable Income Range (CHF) | Base Tax (CHF) | Rate on Excess (%) |
| :--- | :--- | :--- |
| **0 – 32,000** | 0 | **0.00%** |
| **32,001 – 53,400** | 0 | **1.00%** |
| **53,401 – 61,300** | 214 | **2.00%** |
| **61,301 – 79,100** | 372 | **3.00%** |
| **79,101 – 94,900** | 906 | **4.00%** |
| **94,901 – 108,600** | 1,538 | **5.00%** |
| **108,601 – 120,500** | 2,223 | **6.00%** |
| **120,501 – 130,500** | 2,937 | **7.00%** |
| **130,501 – 138,300** | 3,637 | **8.00%** |
| **138,301 – 144,200** | 4,261 | **9.00%** |
| **144,201 – 148,200** | 4,792 | **10.00%** |
| **148,201 – 150,300** | 5,192 | **11.00%** |
| **150,301 – 152,300** | 5,423 | **12.00%** |
| **152,301 – 940,800** | 5,663 | **13.00%** |
| **940,801+** | *Flat Rate* | **11.50%** |

---

## 2. Cantonal & Municipal Income Tax (2025)

**Calculation Logic:**
`Total_Tax = Basic_Tax_Amount * (Canton_Multiplier + Muni_Multiplier + Church_Multiplier)`

### A. Basic Tax Tables (Examples for Major Cantons)

#### **1. Zurich (ZH) - Single**
| Income (CHF) | Base Tax | Rate on Excess (%) |
| :--- | :--- | :--- |
| 0 – 6,900 | 0 | 0% |
| 6,900 – 11,800 | 0 | 2% |
| 11,800 – 16,600 | 98 | 3% |
| 16,600 – 24,500 | 242 | 4% |
| 24,500 – 34,100 | 558 | 5% |
| 34,100 – 45,100 | 1,038 | 6% |
| 45,100 – 58,000 | 1,698 | 7% |
| 58,000 – 75,400 | 2,601 | 8% |
| 75,400 – 109,000 | 3,993 | 9% |
| 109,000 – 142,200 | 7,017 | 10% |
| 142,200 – 194,900 | 10,337 | 11% |
| 194,900 – 263,300 | 16,134 | 12% |
| 263,300+ | 24,342 | 13% |

#### **2. Geneva (GE) - Single**
| Income (CHF) | Rate (%) |
| :--- | :--- |
| 0 – 17,493 | 0.0% |
| 17,494 – 21,076 | 7.3% |
| 21,077 – 23,184 | 8.2% |
| ... | ... |
| 45,315 – 72,713 | 13.2% |
| 72,714 – 119,081 | 14.2% |
| 119,082 – 160,179 | 15.0% |
| 388,858 – 609,103 | 17.6% |
| 609,103+ | 18.0% |

### B. Tax Multipliers (Steuerfuss) 2025

| Canton | Canton % | Capital City % | Total (excl Church) |
| :--- | :--- | :--- | :--- |
| **Zurich (ZH)** | 100% | 119% | **219%** |
| **Bern (BE)** | 306% | 154% | **460%** |
| **Lucerne (LU)** | 160% | 185% | **345%** |
| **Uri (UR)** | 95% | 95% | **190%** |
| **Schwyz (SZ)** | 130% | 100% | **230%** |
| **Obwalden (OW)** | 155% | 170% | **325%** |
| **Nidwalden (NW)** | 120% | 105% | **225%** |
| **Glarus (GL)** | 53% | 47% | **100%** |
| **Zug (ZG)** | 82% | 54% | **136%** |
| **Fribourg (FR)** | 100% | 80% | **180%** |
| **Solothurn (SO)** | 105% | 110% | **215%** |
| **Basel-Stadt (BS)** | N/A | N/A | **100%** (Unified) |
| **Basel-Landschaft**| 55% | 50% | **105%** |
| **Schaffhausen (SH)**| 110% | 95% | **205%** |
| **Appenzell AR** | 140% | 130% | **270%** |
| **Appenzell AI** | 90% | 85% | **175%** |
| **St. Gallen (SG)** | 115% | 134% | **249%** |
| **Graubünden (GR)** | 100% | 85% | **185%** |
| **Aargau (AG)** | 110% | 94% | **204%** |
| **Thurgau (TG)** | 117% | 160% | **277%** |
| **Ticino (TI)** | 100% | 90% | **190%** |
| **Vaud (VD)** | 155% | 79% | **234%** |
| **Valais (VS)** | 100% | 110% | **210%** |
| **Neuchâtel (NE)** | 120% | 90% | **210%** |
| **Geneva (GE)** | 47.5% | 45% | **92.5%** |
| **Jura (JU)** | 185% | 195% | **380%** |

---

## 3. Wealth Tax (Vermögenssteuer) 2025

**Basis:** Net Assets (Total Assets - Debts).
**Level:** Levied by Canton & Municipality.

### Rates & Thresholds (Selected Cantons)
* **Zurich:**
    * Start: ~0.5‰ (0.05%)
    * Top: ~3.0‰ (0.3%) at CHF 3M+.
* **Geneva:**
    * Start: ~1.8‰ (0.18%)
    * Top: ~10.0‰ (1.0%) at CHF 3M+.
* **Zug:**
    * Start: ~0.5‰ (0.05%)
    * Top: ~2.5‰ (0.25%).
* **Schwyz:**
    * Flat-ish rate ~1.5‰ (0.15%).

---

## 4. Vehicle Tax (Motorfahrzeugsteuer) 2025

**Basis:** Varies by Canton (Horsepower, Weight, or Engine Size).

| Canton | Basis of Tax | Approx Annual Cost (Std Car) |
| :--- | :--- | :--- |
| **Zurich** | Engine Size (cc) + Weight | ~CHF 500 |
| **Bern** | Weight | ~CHF 700 |
| **Geneva** | Power (kW) | ~CHF 600 |
| **Vaud** | Power (kW) + Weight | ~CHF 750 |
| **Zug** | Weight | ~CHF 300 |
| **Ticino** | Power (kW) + CO2 penalty | ~CHF 650 |
| **Valais** | Engine Size (cc) | ~CHF 400 |

* **Highway Vignette:** **CHF 40** (National, annual).

---

## 5. Property Taxes

### A. Real Estate Tax (Liegenschaftssteuer)
*Some cantons levy a separate annual tax on property value.*
* **Geneva:** 0.1% to 0.2%
* **Vaud:** 0.1% to 0.15%
* **Valais:** ~0.1%
* **Zurich/Zug/Schwyz:** **None** (Covered by Wealth Tax).

### B. Property Gains Tax (Grundstückgewinnsteuer)
*Levied on profit from selling property. Rate depends on **Holding Period**.*
* **Zurich:**
    * Held < 1 year: ~60% tax on gain.
    * Held 20 years: ~10% tax on gain.
* **Geneva:**
    * Held < 2 years: 50%
    * Held > 25 years: 2% (effectively 0% in some cases).
* **Bern:**
    * Progressive scale based on profit amount + holding discount.

## 6. Administrative Notes
* **Tax Payment Frequency:** **Annual (Provisional & Final)**.
* **Provisional Bill:** Issued early in the year (e.g., **March 31** in Zurich). Can be paid in installments.
* **Final Bill:** Issued after the tax return is processed (often the following year).
* **Federal Tax:** Due by **March 31**.
* **Installments:** Most cantons allow 3–12 voluntary installments, often with interest incentives for early payment.    

---

# Denmark Tax Data (2025 Tax Year)

**Jurisdiction:** Denmark (Danmark)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Danish Krone (DKK)

---

## 1. Income Tax (Indkomstskat) 2025

**System:** Two-step calculation.
1.  **AM-bidrag** (Labor Market Contribution) is deducted from Gross Income first.
2.  **A-Skat** (State + Municipal Tax) is calculated on the remaining "Personal Income".

### A. Step 1: AM-bidrag (Labor Market Contribution)
* **Rate:** **8.0%** flat.
* **Basis:** Gross Income (before any deductions or personal allowances).
* **Formula:** `Gross_Income * 0.08`.

### B. Step 2: State Tax (Statslig indkomstskat)
*Calculated on: Gross_Income - AM_bidrag (i.e., 92% of Gross).*

| Component | Rate | Threshold (DKK) | Formula |
| :--- | :--- | :--- | :--- |
| **Bottom Tax** (Bundskat) | **12.01%** | All Income > Personal Allowance | `(Income - 51600) * 0.1201` |
| **Top Tax** (Topskat) | **15.00%** | Income > **611,800** | `max(0, (Income - 611800) * 0.15)` |

**Personal Allowance (Personfradrag):**
* **Standard (18+ years):** `DKK 51,600` (2025).
* **Youth (<18 years):** `DKK 40,600`.
* *Note:* Unused allowance can be transferred to a spouse.

### C. Step 3: Municipal Tax (Kommuneskat)
*Calculated on: Taxable Income (Income - AM_bidrag - Deductions).*
* **Deductions:** Commuting (Befordringsfradrag), Unions, Interest payments.
* **Employment Deduction (Beskæftigelsesfradrag):** 10.65% of income, max `DKK 46,000`.

**2025 Municipal Rates (Major Cities):**

| Municipality | Tax Rate (%) | Church Tax (Optional) |
| :--- | :--- | :--- |
| **Copenhagen** | **23.70%** | 0.80% |
| **Frederiksberg** | **23.10%** | 0.50% |
| **Aarhus** | **24.52%** | 0.74% |
| **Odense** | **25.50%** | 0.68% |
| **Aalborg** | **25.60%** | 0.98% |
| **Esbjerg** | **26.10%** | 0.81% |
| **Gentofte** | **24.14%** | 0.38% |
| **National Average** | **25.07%** | ~0.67% |

### D. Share Tax (Aktieskat)
* **Rate 1:** **27%** on gains up to `DKK 61,000`.
* **Rate 2:** **42%** on gains above `DKK 61,000`.

---

## 2. Vehicle Registration Tax (Registreringsafgift) 2025

**System:** Value-based tax paid once at purchase.
**EV Phase-in:** In 2025, EVs pay **40%** of the full calculated tax.

### A. Passenger Car Brackets (2025)
*Applied to the "Taxable Value" (Market Price - Deductions).*

| Value Bracket (DKK) | Tax Rate | Formula |
| :--- | :--- | :--- |
| **0 – 72,900** | **25%** | `Value * 0.25` |
| **72,901 – 226,500** | **85%** | `18,225 + ((Value - 72900) * 0.85)` |
| **226,501+** | **150%** | `148,785 + ((Value - 226500) * 1.50)` |

### B. Electric Vehicle (EV) Calculation 2025
1.  **Calculate Full Tax:** Use the brackets above.
2.  **Apply Phase-in:** `Full_Tax * 0.40` (You pay only 40%).
3.  **Subtract EV Deduction:** Subtract `DKK 165,000` from the result.
    * *Result:* Many EVs under ~DKK 450,000 pay **0 tax**.

### C. CO2 Surcharge (Tillæg)
*Added to the Registration Tax.*
* **0-109 g/km:** DKK 280 per gram.
* **109-139 g/km:** DKK 560 per gram.
* **>139 g/km:** DKK 1,064 per gram.
* *Note:* EVs (0g) pay 0 surcharge.

---

## 3. Green Owner Tax (Grøn ejerafgift) 2025

**System:** Semi-annual tax based on fuel efficiency (km/l).
*Rates below are **per 6 months** (paid twice a year).*

| Fuel Economy (km/l) | Petrol (DKK/6mo) | Diesel (DKK/6mo) |
| :--- | :--- | :--- |
| **> 50.0** (EVs mostly) | **390** | **390** |
| **20.0 – 50.0** | **390** | **1,500** |
| **18.2 – 20.0** | **740** | **1,950** |
| **16.7 – 18.2** | **1,040** | **2,460** |
| **15.4 – 16.7** | **1,390** | **3,040** |
| **14.3 – 15.4** | **1,780** | **3,670** |
| **...** | ... | ... |
| **< 4.5** (Gas guzzler) | **13,290** | **18,970** |

* *Note:* Diesel cars pay a "Countervailing Duty" (Udligningsafgift) included in the Diesel column above to offset lower diesel fuel tax.

---

## 4. Property Taxes (Boligskatter) 2025

**System:** Two-part system (Land Tax + Property Value Tax).
**Valuation:** Based on 2024 public assessment (frozen/capped in many cases by 2024 reform).

### A. Land Tax (Grundskyld)
*Paid to Municipality on the **Land Value** only.*
* **Rate:** Varies by municipality (avg 2.5% to 3.4%).
* **Copenhagen:** **5.1‰** (0.51%).
* **Aarhus:** **6.0‰** (0.60%).
* **Frederiksberg:** **3.1‰** (0.31%).

### B. Property Value Tax (Ejendomsværdiskat)
*Paid to State on the **Total Property Value**.*
* **Standard Rate:** **0.51%** of value up to `DKK 9,200,000`.
* **High Rate:** **1.40%** on value above `DKK 9,200,000`.
* **Deduction:** 20% is deducted from the valuation before tax is calculated (Progressive protection).

## 5. Administrative Notes
* **Property Tax Payment Frequency:** **Monthly (Payroll Deduction)**.
* **System Change (2024+):** Property taxes are no longer sent as separate Giro bills.
* **Mechanism:** The tax is deducted directly from your monthly income alongside income tax (via the *skattekort*).
* **Exceptions:** If you have no income/pension, you receive a giro card, typically due in **2 installments** (Jan 1 / July 1).

---

# Sweden Tax Data (2025 Tax Year)

**Jurisdiction:** Sweden (Sverige)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Swedish Krona (SEK)

---

## 1. Income Tax (Inkomstskatt) 2025

**System:** Two-tier system.
1.  **Municipal Tax:** Applied to *all* taxable income.
2.  **State Tax:** Applied only to income *above* the threshold.

**Key Variable:** `Price Base Amount` (Prisbasbelopp) 2025 = **58,800 SEK**.

### A. State Tax (Statlig Skatt)
*Thresholds (Skiktgräns) for 2025.*

| Taxable Income Range (SEK) | Rate | Formula |
| :--- | :--- | :--- |
| **0 – 625,800** | **0%** | `0` |
| **625,801+** | **20%** | `(Taxable_Income - 625800) * 0.20` |

* *Note:* The threshold was raised significantly from 2024 (598,500 SEK) to **625,800 SEK** for 2025.

### B. Municipal Tax (Kommunalskatt)
*Applied to Taxable Income.*
* **National Average:** **32.41%**

**Major Municipal Rates (2025):**
*Includes County/Region Tax + Municipality Tax.*
* **Stockholm:** **29.82%**
* **Gothenburg (Göteborg):** **32.60%**
* **Malmö:** **32.42%**
* **Uppsala:** **33.07%**
* **Västerås:** **31.46%**
* **Örebro:** **32.65%**
* **Linköping:** **31.95%**
* **Helsingborg:** **31.62%**
* **Solna:** **29.45%**
* **Österåker (Lowest):** **28.98%**
* **Degerfors (Highest):** **35.30%**

### C. Basic Deduction (Grundavdrag) 2025
*Deducted from Gross Income before tax is calculated.*
* **Low Income:** Minimum deduction is **17,300 SEK**.
* **High Income:** Minimum deduction is **17,800 SEK**.
* **Middle Income:** Deduction rises to a peak of **45,300 SEK**.

**Official Algorithm (PBA = 58,800 SEK):**
1.  **Income < 0.91 * PBA:** Deduction = `17,300`
2.  **0.91 * PBA – 2.74 * PBA:** `17,300 + 0.252 * (Income - 0.91*PBA)`
3.  **2.74 * PBA – 3.13 * PBA:** `45,300` (Max)
4.  **3.13 * PBA – 7.03 * PBA:** `45,300 - 0.125 * (Income - 3.13*PBA)`
5.  **Income > 7.03 * PBA:** Deduction = `17,800`

### D. Job Tax Deduction (Jobbskatteavdrag) 2025
*A tax credit for earned income. Complicated formula based on age and income.*
* **Standard (Age < 66):**
    * *Income < 0.91 PBA:* `(Income - Basic_Deduction) * Muni_Rate`
    * *Income > 0.91 PBA:* Base credit + percentage of excess.
    * *Approx Value:* Reduces tax by ~**2,500 – 3,200 SEK/month** for average earners.

### E. Capital Income (Kapitalskatt)
* **Interest/Dividends:** **30%** Flat Rate.
* **ISK Account (Investeringssparkonto):**
    * *Tax Basis:* Capital Base * (Govt Rate + 1%). Min floor 1.25%.
    * *Tax Rate:* **30%** on the Basis.
    * *New 2025 Rule:* First **150,000 SEK** in ISK is **tax-free**.

---

## 2. Vehicle Tax (Fordonsskatt) 2025

**System:** Bonus-Malus (Malus applies to years 1-3).
**Basis:** CO2 Emissions (WLTP).

### A. Malus Calculation (Years 1-3)
*Base Fee:* **360 SEK** per year.

| CO2 Emissions (g/km) | Surcharge Formula (SEK/year) |
| :--- | :--- |
| **0 – 75** | `0` |
| **75 – 125** | `(CO2 - 75) * 107` |
| **125+** | `5,350 + ((CO2 - 125) * 132)` |

* **Diesel Surcharge:** For diesel cars, add:
    * Fuel Surcharge: `(CO2 * 13.52) + 250`

### B. Standard Tax (Year 4+)
* **Base Fee:** **360 SEK** per year.
* **CO2 Component:** `(CO2 - 111) * 22` (Only if CO2 > 111).

### C. Electric Vehicles (EVs)
* **Tax:** **360 SEK/year** (Minimum rate).

---

## 3. Property Fee (Fastighetsavgift) 2025

**System:** Municipal Fee capped at a maximum amount.
**Limit (2025):** The fee is indexed annually.

### A. Residential Houses (Småhus)
* **Formula:** `0.75%` of Tax Assessment Value.
* **Maximum Cap (2025):** **10,074 SEK**.
* *Logic:* `min(Tax_Value * 0.0075, 10074)`
* *New Builds:* Exempt for first 15 years.

### B. Apartments (Bostadsrätt)
* **Formula:** `0.30%` of Tax Assessment Value.
* **Maximum Cap (2025):** **1,724 SEK**.
* *Logic:* `min(Tax_Value * 0.003, 1724)`

## 4. Administrative Notes
* **Property Fee Payment Frequency:** **Annual (Tax Return Settlement)**.
* **No Separate Bill:** The fee is calculated on the annual tax return (Inkomstdeklaration 1).
* **Payment:** Any tax due (including property fee) is paid to the Skatteverket tax account.
* **Due Date:** Final tax statement usually settles in **November/December**, payment due 90 days later (e.g., **March 12, 2026** for 2025 tax year).

---

# Norway Tax Data (2025 Tax Year)

**Jurisdiction:** Norway (Norge)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Norwegian Krone (NOK)

---

## 1. Income Tax (Inntektsskatt) 2025

**System:** Dual Income Tax.
1.  **General Income Tax (Alminnelig inntekt):** Flat rate on net income (after deductions).
2.  **Bracket Tax (Trinnskatt):** Progressive tax on *Gross Personal Income* (wages/pension) only.

### A. General Income Tax
* **Rate:** **22%** (Flat).
* **Region Exception:** **18.5%** in Finnmark and Nord-Troms.
* **Basis:** "Net Income" (Gross Income minus all deductions like interest, standard deductions, etc.).

**Standard Deductions (Minstefradrag):**
* **Wage Earners:** 46% of gross income.
    * *Floor:* NOK 31,800.
    * *Ceiling:* **NOK 104,450**.
* **Pensioners:** 40% of pension income.
    * *Ceiling:* **NOK 86,250**.
* **Personal Allowance (Personfradrag):** **NOK 88,250** (Deducted from net income before the 22% tax).

### B. Bracket Tax (Trinnskatt) 2025
*Calculated on Gross Personal Income (before deductions).*

| Step | Gross Income Range (NOK) | Rate | Rate (Finnmark/Nord-Troms) |
| :--- | :--- | :--- | :--- |
| **0** | 0 – 217,400 | **0%** | 0% |
| **1** | 217,401 – 306,050 | **1.7%** | 1.7% |
| **2** | 306,051 – 697,150 | **4.0%** | 4.0% |
| **3** | 697,151 – 942,400 | **13.7%** | **13.7%** |
| **4** | 942,401 – 1,410,750 | **16.7%** | 16.7% |
| **5** | 1,410,751+ | **17.7%** | 17.7% |

### C. National Insurance (Trygdeavgift) 2025
*Deducted from Gross Personal Income.*
* **Lower Limit:** No contribution if income < **NOK 99,650**.
* **Leveling:** If income > 99,650, you pay 25% of the excess until you reach the standard rate.

| Income Type | Rate |
| :--- | :--- |
| **Wage Income** | **7.7%** |
| **Self-Employment** (Fishing/Hunting/Childcare) | **7.7%** |
| **Self-Employment** (Other) | **10.9%** |
| **Pensions** | **5.1%** |
| **Youth (<17)** | **5.1%** |
| **Senior (>69)** | **5.1%** |

---

## 2. Wealth Tax (Formuesskatt) 2025

**Basis:** Net Worldwide Assets as of Dec 31.
**Threshold:** **NOK 1,760,000** (Single) / **NOK 3,520,000** (Married).

### A. Rates (State + Municipal)
* **Municipal Rate:** **0.70%** (Fixed in all municipalities).
* **State Rate:** **0.30%** (Tier 1) / **0.40%** (Tier 2).

| Net Wealth Bracket (NOK) | Total Rate (Muni + State) |
| :--- | :--- |
| **0 – 1,760,000** | **0%** |
| **1,760,001 – 20,000,000** | **1.0%** (0.7 + 0.3) |
| **20,000,001+** | **1.1%** (0.7 + 0.4) |

### B. Valuation Discounts (Formuesverdi)
*Assets are valued at a percentage of market value before tax.*
* **Primary Home:** **25%** of value (for first 10M); **70%** of value > 10M.
* **Secondary Home:** **100%** of value.
* **Shares/Equities:** **80%** of value.
* **Commercial Property:** **80%** of value.

---

## 3. Vehicle Registration Tax (Engangsavgift) 2025

**System:** Paid once at purchase.
**Components:** Weight + CO2 + NOx.
**EV Status 2025:**
* **VAT:** 25% VAT applies on purchase price portion exceeding **NOK 500,000**.
* **Weight Tax:** Full weight tax applies (same as fossil cars).
* **CO2/NOx:** Exempt.

### A. Weight Component (Vektavgift)
*Applies to ALL cars (including EVs).*

| Weight (kg) | Tax Rate (NOK/kg) |
| :--- | :--- |
| **0 – 500** | **0** |
| **500+** | **12.50 NOK** |
| *Example:* A 2,000kg EV pays `(2000-500) * 12.5 = 18,750 NOK`.

### B. CO2 Component (Fossil/Hybrid Only)
*EVs = 0.*

| CO2 (g/km - WLTP) | Tax Rate (NOK per g) |
| :--- | :--- |
| **0 – 82** | **0** |
| **83 – 107** | **1,019.50** |
| **108 – 161** | **1,091.24** |
| **162 – 214** | **3,267.76** |
| **215+** | **4,151.74** |

### C. NOx Component
* **Rate:** **86.44 NOK** per mg/km.

---

## 4. Property Tax (Eiendomsskatt) 2025

**System:** Optional municipal tax (collected by ~320 of 356 municipalities).
**Rate Cap:** Maximum allowed rate is **0.7%** (7‰). Residential usually capped at **0.4%** (4‰).

### Common Municipal Rates (Residential)
*Applied to "Tax Value" (often 70% of Market Value).*

| Municipality | Rate (‰) | Bottom Deduction (Bunnfradrag) |
| :--- | :--- | :--- |
| **Oslo** | **3.0‰** (0.3%) | **NOK 4,000,000** |
| **Bergen** | **2.8‰** (0.28%) | NOK 0 |
| **Trondheim** | **3.2‰** (0.32%) | NOK 500,000 |
| **Stavanger** | **2.3‰** (0.23%) | NOK 0 |
| **Kristiansand** | **3.3‰** (0.33%) | NOK 0 |
| **Tromsø** | **3.7‰** (0.37%) | NOK 0 |
| **Bærum** | **0.0‰** (No Tax) | N/A |

* **Calculation (Oslo Example):**
    * Market Value: 10M
    * Tax Basis (70%): 7M
    * Net Basis (Basis - Deduction): 7M - 4M = 3M
    * Tax: 3M * 0.003 = **NOK 9,000**

## 5. Administrative Notes
* **Property Tax Payment Frequency:** **Quarterly** or **Monthly**.
* **Invoicing:** Bundled with municipal fees (Water/Sewerage/Chimney sweep).
* **Quarterly Due Dates:** **March 20**, **June 20**, **September 20**, **December 20**.
* **Monthly Option:** Many municipalities (e.g., Oslo, Bergen) offer 12 monthly invoices upon request.

---

# Finland Tax Data (2025 Tax Year)

**Jurisdiction:** Finland (Suomi)
**Fiscal Year:** January 1, 2025 – December 31, 2025
**Currency:** Euro (€)

---

## 1. Earned Income Tax (Ansiotulovero) 2025

**System:** Progressive State Tax + Flat Municipal Tax + Church Tax.
**Basis:** Earned Income (Wages, Pensions, Benefits).

### A. State Tax (Valtion tulovero) 2025
*Applies to taxable earned income.*

| Taxable Income Range (€) | Tax at Lower Limit (€) | Rate on Excess (%) |
| :--- | :--- | :--- |
| **0 – 21,200** | 0.00 | **12.64%** |
| **21,201 – 31,500** | 2,679.68 | **19.00%** |
| **31,501 – 52,100** | 4,636.68 | **30.25%** |
| **52,101 – 88,200** | 10,868.18 | **34.00%** |
| **88,201 – 150,000** | 23,142.18 | **41.75%** |
| **150,001+** | 48,943.68 | **44.25%** |

### B. Municipal Tax (Kunnallisvero)
*Flat rate determined by each municipality.*
* **National Average (2025):** **~7.5%**
* **Range:** 4.7% – 10.9%
* **Helsinki:** **5.30%**

### C. Church Tax (Kirkollisvero)
*Optional (only for church members).*
* **Rate:** **1.00% – 2.25%** (Avg ~1.4%).

### D. Public Broadcasting Tax (Yle-vero)
* **Rate:** **2.50%**
* **Threshold:** Income > **€15,150**.
* **Maximum Cap:** **€160** per year.

### E. Social Security Contributions (Employee)
* **Pension Insurance:**
    * Age 17–52: **7.15%**
    * Age 53–62: **8.65%**
    * Age 63–67: **7.15%**
* **Unemployment Insurance:** **1.50%** (Employee share).
* **Health Insurance (Sairausvakuutus):**
    * Daily Allowance Contribution: **1.36%** (on wage income).
    * Medical Care Contribution: **0.00%** (2025 rate usually ~0.5-0.6%, check final confirmation).

---

## 2. Capital Income Tax (Pääomatulovero) 2025

**Basis:** Dividends, Rental Income, Capital Gains, Interest.
**System:** Progressive two-tier rate.

| Taxable Capital Income (€) | Tax Rate |
| :--- | :--- |
| **0 – 30,000** | **30%** |
| **30,001+** | **34%** |

* **Dividends (Listed Companies):**
    * **85%** is taxable as Capital Income.
    * **15%** is tax-free.
    * *Effective Rate:* `30% * 0.85` = **25.5%** (below 30k) or `34% * 0.85` = **28.9%** (above 30k).

---

## 3. Vehicle Tax (Autovero & Ajoneuvovero) 2025

**System:**
1.  **Registration Tax (Autovero):** One-time at purchase.
2.  **Annual Vehicle Tax (Ajoneuvovero):** Recurring.

### A. Registration Tax (Autovero)
*Based on CO2 (WLTP) and Market Value.*

**Formula:** `Market_Price * Tax_Percentage`

**2025 Tax Percentages (Selected Points):**
* **0 g/km (EV):** **0%** (Exempt until further notice).
* **50 g/km:** ~**2.7%**
* **100 g/km:** ~**5.5%**
* **150 g/km:** ~**12.5%**
* **200 g/km:** ~**26.0%**
* **300 g/km:** ~**43.0%**

### B. Annual Vehicle Tax (Ajoneuvovero)
*Consists of Basic Tax + Driving Power Tax.*

**1. Basic Tax (Perusvero)**
*Based on CO2.*
* **0 g/km:** ~**€53.29 / year**
* **100 g/km:** ~**€170 / year**
* **150 g/km:** ~**€310 / year**
* **200 g/km:** ~**€470 / year**

**2. Driving Power Tax (Käyttövoimavero)**
*Applies to non-petrol cars (Diesel, EV, Hybrid).*
* **Electric (EV):** **1.5 cents** / day / 100kg (increasing to 1.9c in 2026).
* **Plug-in Hybrid (Petrol):** **0.5 cents** / day / 100kg.
* **Diesel:** **5.5 cents** / day / 100kg.

---

## 4. Property Tax (Kiinteistövero) 2025

**Basis:** Taxable value of real estate (not market value).
**Rate:** Set by municipality within statutory ranges.

### 2025 Statutory Ranges
| Property Type | Rate Range (%) |
| :--- | :--- |
| **Permanent Residence** | **0.41% – 1.00%** |
| **Other Residence (Holiday Home)** | **0.93% – 2.00%** |
| **General Rate (Land/Commercial)** | **0.93% – 2.00%** |
| **Unbuilt Building Land** | **2.00% – 6.00%** |

* **Helsinki Rates (2025 Estimate):**
    * Permanent Residence: **0.41%** (Minimum).
    * General: **0.93%**.

---

## 5. Administrative Notes
* **Property Tax Payment Frequency:** **Two Installments**.
* **Assessment Decision:** Sent to owners in **March 2025**.
* **Due Dates (2025):**
    * **1st Installment:** **August 6, 2025** (or Sept, varies by completion of taxation).
    * **2nd Installment:** **October 6, 2025** (or Nov).
* **Threshold:** If tax is <€170, it is collected in a single installment.

---

# Addendum: Donations & Business Expenses (2025)

**Usage Note:**
* **Donations:** Often applied as a *Tax Credit* (direct tax reduction) rather than a *Deduction* (income reduction).
* **Business Expenses (Employees):** Most countries have a "Standard Deduction." You only input actual expenses if they *exceed* that standard amount.

---

# Addendum: AI Agent Instructions for Donations & Expenses (2025)

**Global Instruction:**
When the user provides values for "Donations" or "Business Expenses," applying the specific logic below based on the selected `Country` and `Region`.

---

## 1. North America

### **United States (All States)**
* **Donations (Charity):**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Constraint:* Cap the deduction at **60%** of the user's Gross Income.
    * *Note:* In reality, this requires "itemizing," but for this simulation, apply the deduction if the user enters a value.
* **Business Expenses:**
    * *Logic:* If the user is an **Employee (W-2)**, the deduction is **$0** (Federal law suspends this).
    * *Logic:* If the user considers themselves **Self-Employed/Freelance**, the deduction is **100%** of the input amount.
    * *Agent Action:* Apply the full amount as a deduction from Gross Income (assuming the user is inputting valid expenses).

### **Canada (All Provinces)**
* **Donations:**
    * *Logic:* Treat as a **Tax Credit** (Reduces the final tax bill, not the income).
    * *Calculation:*
        1. Calculate **15%** on the first **$200**.
        2. Calculate **29%** on any amount **over $200**.
        3. Sum these two values and subtract the total from the Final Tax Bill.
* **Business Expenses:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Constraint:* In Canada, this is valid only if the employer requires it (Form T2200). Assume valid if user inputs it.

---

## 2. United Kingdom

### **England, Scotland, Wales, Northern Ireland (Universal UK Rule)**
* **Donations (Gift Aid):**
    * *Logic:* Treat as a **Band Extender**.
    * *Calculation:* Multiply the donation amount by **1.25**. Increase the user's "Basic Rate" tax band by this grossed-up amount.
    * *Effect:* This allows "Higher Rate" payers to pay tax at the lower rate on this portion of income.
* **Business Expenses:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Constraint:* Fully deductible.

---

## 3. Western Europe

### **Germany**
* **Donations (Spenden):**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Constraint:* Cap the deduction at **20%** of Total Income.
* **Business Expenses (Werbungskosten):**
    * *Logic:* Compare the User's Input vs. the **Standard Deduction of €1,230**.
    * *Action:* Deduct the **greater** of the two amounts from Gross Income.

### **France**
* **Donations:**
    * *Logic:* Treat as a **Tax Credit** (Reduces final tax bill).
    * *Calculation:* Calculate **66%** of the donation amount.
    * *Constraint:* The credit cannot exceed **20%** of the user's Taxable Income.
* **Business Expenses (Frais Professionnels):**
    * *Logic:* Compare the User's Input vs. the **Standard Deduction (10% of Salary)**.
    * *Standard Limits:* The 10% standard is minimum **€504** and maximum **€14,426**.
    * *Action:* Deduct the **greater** of the two amounts from Gross Income.

### **Netherlands**
* **Donations:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Threshold:* Only deduct the portion that **exceeds 1%** of Gross Income (minimum threshold €60).
    * *Cap:* The total deduction cannot exceed **10%** of Gross Income.
* **Business Expenses:**
    * *Logic:* **$0** (Not deductible for employees).

### **Switzerland**
* **Donations:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Threshold:* Must be at least **100 CHF**.
    * *Cap:* Cannot exceed **20%** of Net Income.
* **Business Expenses:**
    * *Logic:* Compare the User's Input vs. the **Standard Deduction**.
    * *Standard Calculation:* **3%** of salary (Minimum **2,000 CHF**, Maximum **4,000 CHF**).
    * *Action:* Deduct the **greater** of the two amounts.

---

## 4. Nordic Countries

### **Denmark**
* **Donations:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Cap:* Maximum deduction is **18,300 DKK**.
* **Business Expenses:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Threshold:* Only deduct the portion that **exceeds 7,000 DKK**. (e.g., Input 10k -> Deduct 3k).

### **Sweden**
* **Donations:**
    * *Logic:* Treat as a **Tax Credit** (Reduces final tax bill).
    * *Calculation:* Calculate **25%** of the donation.
    * *Constraints:* Minimum donation **2,000 SEK**; Maximum donation recognized **12,000 SEK** (Max credit = 3,000 SEK).
* **Business Expenses:**
    * *Logic:* Treat as a **Deduction** from Gross Income.
    * *Threshold:* Only deduct the portion that **exceeds 11,000 SEK**.

### **Norway**
* **Donations:**
    * *Logic:* Treat as a **Deduction** from General Income.
    * *Constraints:* Minimum **500 NOK**; Maximum **25,000 NOK**.
* **Business Expenses (Minstefradrag):**
    * *Logic:* Compare User Input vs. **Standard Deduction**.
    * *Standard Calculation:* **46%** of income (Minimum **31,800 NOK**, Maximum **104,450 NOK**).
    * *Action:* Deduct the **greater** of the two amounts.

### **Finland**
* **Donations:**
    * *Logic:* **$0** (Generally not deductible for individuals).
* **Business Expenses:**
    * *Logic:* Compare User Input vs. **Standard Deduction of €750**.
    * *Action:* Deduct the **greater** of the two amounts.

## Sources used (for your internal audit trail)
- U.S. 2025 federal bracket thresholds (MFJ example table) and 2025 standard deduction note (IRS newsroom)  
- U.S. state brackets dataset (“State Income Taxes 2026”) (Tax-Rates.org)  
- Canada 2025 federal + provincial/territorial bracket tables (Wealthsimple Learn; cites CRA)

