# Ledger App - Agent Instructions

You are tasked with writing the `app.js` file for the "Ledger" web application. The HTML and CSS are already provided.

## 1. UI/UX Philosophy (CRITICAL)
- **Fluid Layout:** The CSS relies on percentages and flexbox. **Do not inject inline styles** that fix widths in pixels.
- **Privacy First:** This is a zero-knowledge app. All `ledgerState` exists only in volatile memory.

## 2. Privacy & Data Handling (STRICT)
- **NO DATABASE / NO BACKEND:** Do not fetch or save to a server.
- **Volatile State:** If the user refreshes, data is gone. 
- **The "Save" Mechanism:** Users must use the "Download Lifestyle Calculations (ZIP)" button to save.
- **The "Load" Mechanism:** Users upload the JSON from the ZIP to restore state.

## 3. Specific Logic Requirements

### A. Ad Behavior (Sticky Video)
- **Target:** `#video-ad-container`
- **Logic:** 1. On load, start a 15-second countdown on `#ad-timer`.
    2. `#skip-ad-btn` disabled until 0.
    3. On skip/finish, hide container.
    4. Set `setTimeout` for 3 minutes (180,000ms) to unhide and restart.

### B. Input Handling
- **Sliders & Inputs:** Sync all sliders with their number inputs.
- **Dynamic Sections:** `addIncome`, `addDonation`, `addExpense`, `addStock`, `addPurchase`, `addFuturePurchase`.
    - Generate HTML using the template classes (`dynamic-item`, `slider-row`).
    - Attach listeners to all generated inputs immediately.
- **Future Purchases:** Include a `<input type="date">`. Only factor cost if `SimulationDate >= PurchaseDate`.
- **Stocks:** Include "Recurring" toggle. If recurring, deduct from Cash monthly and add to Stock Principal.

### C. Calculations & Physics
- **True Income:** Gross + Additional - Taxes (Est. by Country) - Expenses - Donations.
- **Asset Logic:**
    - **Stocks:** Transfer from Cash -> Asset. Apply Growth Rate.
    - **Vehicle:** Apply Depreciation (Year 1: -20%, Year 2+: -15%). Add to Asset Value.
    - **Real Estate:** Apply Appreciation (+3.5% annually). Net Worth = (Value - Mortgage).
- **Inflation Toggle:** If checked, deflate all future values by 3% annually. Update `#inflation-readout`.

### D. Benchmarking & Gamification
- **Percentiles:** Compare user Net Worth against static `wealthBenchmarks` (e.g., Age 30 P90 = $250k).
- **Status Stack:** Update `#status-house` and `#status-vehicle` emojis based on Asset Value thresholds (e.g., <$1k = Tent/Walker, >$2M = Castle/Helicopter).

### E. File Operations (The ZIP System)
1. **JSON Upload:** Parse JSON, map to `ledgerState`, update UI.
2. **Download ZIP:**
    - Iterate through selected `TimePreferences` (e.g., 5 Years, 30 Years).
    - Create subfolders for each.
    - Save `data.json` and `report.pdf` (using jsPDF) in each folder.